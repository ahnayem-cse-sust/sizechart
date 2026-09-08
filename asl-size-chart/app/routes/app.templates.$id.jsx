import { useState, useRef, useCallback, useEffect } from 'react';
import { useLoaderData, useBeforeUnload, useBlocker } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    Button,
    BlockStack,
    InlineStack,
    Box,
    Divider,
    InlineError,
} from "@shopify/polaris";
import { EditIcon, CheckIcon, XIcon } from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById } from '../services/template.server';
import TemplatePreviewComponent from '../components/template/template_preview';
import BlockButtonComponent from '../components/template/block_button';
import TemplateContentComponent from '../components/template/template_content';
import TemplateDetailsComponent from '../components/template/template_details';
import TemplateContentBlocks from '../components/template/content_blocks_preview';
import MobilePreview from '../components/template/mobile_preview';
import { getAllTemplateContent, contentFactory } from '../services/template.content.server';

import { TEMPLATE_CATEGORIES } from '../services/utils/defines';
import { TEMPLATE_BASE_URL } from '../services/constants/routes';
import { authenticate } from '../shopify.server';
import { safeJsonParse } from '../services/utils/safeJson';
import { INTENT, INTENT_UPDATE } from '../services/constants/global';
import {
    CONTENT_TYPE_IMAGE,
    CONTENT_TYPE_TABLE,
    INTENT_ADD_BLOCK,
    INTENT_SAVE_BLOCK,
    INTENT_SAVE_IMAGE_BLOCK,
    INTENT_CONTENT_DELETE,
    INTENT_IMAGE_CONTENT_DELETE,
} from '../services/constants/content';

export async function loader({ request, params }) {
    await authenticate.admin(request);

    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    if (!template) {
        throw new Response("Not found", { status: 404 });
    }
    const templateContentsResponse = await getAllTemplateContent(Number(id));
    const { templateContents } = await templateContentsResponse.json();
    return Response.json({ template, templateContents });
}

export async function action({ request }) {
    await authenticate.admin(request);
    return await contentFactory({ request });
}

// Default content a brand-new block starts with — mirrors what the server
// used to generate in addBlockByTemplateId, so a pending (unsaved) block
// looks/behaves the same as a persisted one until Save actually creates it.
function defaultContentFor(contentType) {
    if (contentType === CONTENT_TYPE_TABLE) {
        return JSON.stringify([
            ["Size", "Chest", "Waist"],
            ["S", "6", "4"],
            ["M", "6", "6"],
            ["L", "7", "8"],
        ]);
    }
    return '';
}

// Pending (unsaved) blocks get a string id so they're never confused with a
// real numeric database id.
let tempIdCounter = 0;
function makeTempId() {
    tempIdCounter += 1;
    return `new-${Date.now()}-${tempIdCounter}`;
}
function isTempId(id) {
    return typeof id === 'string' && id.startsWith('new-');
}

export default function TemplateView() {
    const { template, templateContents } = useLoaderData();
    const [isEditing, setIsEditing] = useState(false);
    const [titleDraft, setTitleDraft] = useState(template.title);
    const [categoryDraft, setCategoryDraft] = useState(template.category);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Working copy of the content blocks while editing. Adding a block only
    // appends a local (temp-id) entry here; deleting only removes/queues an
    // entry here. Nothing hits the server until Save is pressed.
    const [contentItems, setContentItems] = useState(templateContents);
    // Real (already-persisted) blocks the user removed while editing —
    // actually deleted from the server only on Save.
    const [pendingDeletes, setPendingDeletes] = useState([]);
    // Ids of blocks whose current draft value actually differs from what's
    // saved. We diff against the real original value (not just "a change
    // event fired") so a component re-reporting its own unchanged value —
    // e.g. a rich-text editor normalizing markup on mount — never falsely
    // marks the page dirty.
    const [dirtyBlockIds, setDirtyBlockIds] = useState(() => new Set());

    // Blocks report their latest edited value here as the user types/uploads.
    // Only blocks whose value actually changed end up in this map, so Save
    // only persists what changed.
    const blockDraftsRef = useRef({});

    // Set right before the post-save `window.location.reload()` so the
    // beforeunload guard below doesn't mistake that intentional reload for
    // someone abandoning unsaved changes and pop the "leave site?" prompt.
    const skipUnloadWarningRef = useRef(false);

    // Comparisons below trim/normalize both sides so a title or category
    // that already has stray whitespace saved in the database (from before
    // this trimming existed, or just a typo) doesn't look "changed" the
    // instant Edit mode opens, before the user has touched anything.
    const baselineTitle = (template.title || '').trim();
    const baselineCategory = template.category ?? '';

    const isDirty = isEditing && (
        titleDraft.trim() !== baselineTitle ||
        (categoryDraft ?? '') !== baselineCategory ||
        dirtyBlockIds.size > 0 ||
        pendingDeletes.length > 0 ||
        contentItems.some((item) => isTempId(item.id))
    );

    const resetDraftState = () => {
        setTitleDraft(baselineTitle);
        setCategoryDraft(template.category);
        setContentItems(templateContents);
        setPendingDeletes([]);
        setDirtyBlockIds(new Set());
        blockDraftsRef.current = {};
        setError("");
    };

    const handleStartEditing = () => {
        resetDraftState();
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (isDirty && !window.confirm("You have unsaved changes. Discard them?")) {
            return;
        }
        resetDraftState();
        setIsEditing(false);
    };

    // A file selection is always treated as a real change (there's no
    // meaningful way to compare a freshly picked File to the previously
    // saved filename). Text and table blocks are compared against their
    // actual saved content_obj — decoded the same way the block components
    // themselves decode it, since content_obj is stored JSON-encoded
    // (saveAll always JSON.stringifies non-image drafts before sending).
    const isSameAsSaved = useCallback((item, contentType, value) => {
        if (!item || contentType === CONTENT_TYPE_IMAGE) return false;
        if (contentType === CONTENT_TYPE_TABLE) {
            const savedArray = safeJsonParse(item.content_obj, []);
            try {
                return JSON.stringify(value) === JSON.stringify(savedArray);
            } catch {
                return false;
            }
        }
        const savedText = safeJsonParse(item.content_obj, '');
        return value === savedText;
    }, []);

    const handleBlockFieldChange = useCallback((contentId, contentType, value) => {
        const item = contentItems.find((i) => i.id === contentId);
        const unchanged = isSameAsSaved(item, contentType, value);

        if (unchanged) {
            delete blockDraftsRef.current[contentId];
        } else {
            blockDraftsRef.current[contentId] = { contentType, value };
        }

        setDirtyBlockIds((prev) => {
            const alreadyMatches = unchanged ? !prev.has(contentId) : prev.has(contentId);
            if (alreadyMatches) return prev;
            const next = new Set(prev);
            if (unchanged) {
                next.delete(contentId);
            } else {
                next.add(contentId);
            }
            return next;
        });
    }, [contentItems, isSameAsSaved]);

    const handleAddBlock = useCallback((contentType) => {
        const newItem = {
            id: makeTempId(),
            template_id: template.id,
            content_type: contentType,
            content_obj: defaultContentFor(contentType),
        };
        setContentItems((prev) => [...prev, newItem]);
    }, [template.id]);

    const handleDeleteBlock = useCallback((contentId, contentType) => {
        delete blockDraftsRef.current[contentId];
        setDirtyBlockIds((prev) => {
            if (!prev.has(contentId)) return prev;
            const next = new Set(prev);
            next.delete(contentId);
            return next;
        });

        if (!isTempId(contentId)) {
            setPendingDeletes((prev) => [...prev, { id: contentId, content_type: contentType }]);
        }
        setContentItems((prev) => prev.filter((item) => item.id !== contentId));
    }, []);

    // Warn on hard navigations: refresh, closing the tab, typing a new URL,
    // or any link that causes a full page load (e.g. the Page backAction).
    useBeforeUnload(
        useCallback((event) => {
            if (isDirty && !skipUnloadWarningRef.current) {
                event.preventDefault();
                event.returnValue = '';
            }
        }, [isDirty])
    );

    // Warn on in-app (client-side) navigations too — the browser Back/Forward
    // buttons, or any Remix Link/navigate call while changes are unsaved.
    const blocker = useBlocker(
        useCallback(
            ({ currentLocation, nextLocation }) =>
                isDirty && currentLocation.pathname !== nextLocation.pathname,
            [isDirty]
        )
    );

    useEffect(() => {
        if (blocker.state !== "blocked") return;
        if (window.confirm("You have unsaved changes. Leave this page without saving?")) {
            blocker.proceed();
        } else {
            blocker.reset();
        }
    }, [blocker]);

    const handleSaveAll = async () => {
        const trimmedTitle = titleDraft.trim();
        if (!trimmedTitle) {
            setError("Title is required");
            return;
        }
        if (!categoryDraft) {
            setError("Category is required");
            return;
        }

        setSaving(true);
        setError("");

        try {
            // Newly added blocks don't exist on the server yet. Create them
            // first, one at a time (not in parallel), so the server's
            // "append to the end" serial-number logic sees them in the
            // order the user added them instead of racing.
            const idMap = {};
            for (const item of contentItems) {
                if (!isTempId(item.id)) continue;

                const addFormData = new FormData();
                addFormData.append(INTENT, INTENT_ADD_BLOCK);
                addFormData.append("template_id", template.id);
                addFormData.append("content_type", item.content_type);

                const addRes = await fetch("/app/templates/" + template.id, {
                    method: "POST",
                    body: addFormData,
                });
                if (!addRes.ok) {
                    throw new Error("Failed to create a new block");
                }
                const { templateContents: created } = await addRes.json();
                idMap[item.id] = created.id;
            }

            const detailsFormData = new FormData();
            detailsFormData.append(INTENT, INTENT_UPDATE);
            detailsFormData.append("id", template.id);
            detailsFormData.append("title", trimmedTitle);
            detailsFormData.append("category", categoryDraft);

            const requests = [
                fetch("/app/templates", { method: "POST", body: detailsFormData }),
            ];

            Object.entries(blockDraftsRef.current).forEach(([contentId, draft]) => {
                // A temp block that was added and then deleted again before
                // ever being created has no real id to save against — skip.
                if (isTempId(contentId) && idMap[contentId] === undefined) return;

                const realId = idMap[contentId] || contentId;

                const blockFormData = new FormData();
                if (draft.contentType === CONTENT_TYPE_IMAGE) {
                    blockFormData.append(INTENT, INTENT_SAVE_IMAGE_BLOCK);
                    blockFormData.append("content_id", realId);
                    blockFormData.append("content_obj", draft.value);
                } else {
                    blockFormData.append(INTENT, INTENT_SAVE_BLOCK);
                    blockFormData.append("content_id", realId);
                    blockFormData.append("content_obj", JSON.stringify(draft.value));
                }
                requests.push(
                    fetch("/app/templates/" + template.id, { method: "POST", body: blockFormData })
                );
            });

            pendingDeletes.forEach(({ id, content_type }) => {
                const deleteFormData = new FormData();
                deleteFormData.append(
                    INTENT,
                    content_type === CONTENT_TYPE_IMAGE ? INTENT_IMAGE_CONTENT_DELETE : INTENT_CONTENT_DELETE
                );
                deleteFormData.append("content_id", id);
                requests.push(
                    fetch("/app/templates/" + template.id, { method: "POST", body: deleteFormData })
                );
            });

            const responses = await Promise.all(requests);
            const allOk = responses.every((res) => res.ok);

            if (allOk) {
                skipUnloadWarningRef.current = true;
                window.location.reload();
            } else {
                setSaving(false);
                setError("Failed to save some changes. Please try again.");
            }
        } catch (err) {
            setSaving(false);
            setError("Failed to save changes. Please try again.");
        }
    };

    return (
        <Page
            backAction={{
                content: "Templates",
                url: TEMPLATE_BASE_URL,
                onAction: isDirty
                    ? () => {
                        if (window.confirm("You have unsaved changes. Leave this page without saving?")) {
                            window.location.href = TEMPLATE_BASE_URL;
                        }
                    }
                    : undefined,
            }}
            title={template.title}
            secondaryActions={
                <InlineStack gap="200" blockAlign="center">
                    <TemplatePreviewComponent template={template} templateContents={templateContents} />
                    {isEditing ? (
                        <BlockStack gap="150" inlineAlign="end">
                            <InlineStack gap="200">
                                <Button
                                    icon={XIcon}
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    icon={CheckIcon}
                                    variant="primary"
                                    disabled={!isDirty}
                                    loading={saving}
                                    onClick={handleSaveAll}
                                >
                                    Save
                                </Button>
                            </InlineStack>
                            {error && <InlineError message={error} />}
                        </BlockStack>
                    ) : (
                        <Button
                            icon={EditIcon}
                            onClick={handleStartEditing}
                        >
                            Edit
                        </Button>
                    )}
                </InlineStack>
            }
        >
            <TitleBar title={`Size Chart \\ ${template.title}`} />
            <style>{`
                .asc-template-layout {
                    display: flex;
                    gap: 16px;
                    align-items: flex-start;
                }
                .asc-template-layout__details {
                    flex: 0 0 70%;
                    max-width: 70%;
                }
                .asc-template-layout__preview {
                    flex: 0 0 30%;
                    max-width: 30%;
                    position: sticky;
                    top: 16px;
                }
                @media (max-width: 900px) {
                    .asc-template-layout {
                        flex-direction: column;
                    }
                    .asc-template-layout__details,
                    .asc-template-layout__preview {
                        flex: 1 1 100%;
                        max-width: 100%;
                        position: static;
                    }
                }
            `}</style>
            <div className="asc-template-layout">
                <div className="asc-template-layout__details">
                    <BlockStack gap="400">
                        <Card>
                            <BlockStack gap="400">
                                <BlockStack gap="200">
                                    <Text variant="headingMd" as="h2">Template Details</Text>
                                    <TemplateDetailsComponent
                                        template={template}
                                        templateCategories={TEMPLATE_CATEGORIES}
                                        isEditing={isEditing}
                                        title={titleDraft}
                                        category={categoryDraft}
                                        onTitleChange={setTitleDraft}
                                        onCategoryChange={setCategoryDraft}
                                    />
                                </BlockStack>
                                <Divider />
                                <Text variant="headingLg" as="h3">
                                    {template.title} Size Guide
                                </Text>
                                {isEditing ? (
                                    <>
                                        <TemplateContentComponent
                                            items={contentItems}
                                            setItems={setContentItems}
                                            onFieldChange={handleBlockFieldChange}
                                            onDeleteBlock={handleDeleteBlock}
                                        />
                                        <Box>
                                            <BlockButtonComponent btnText={'+ Add New Block'} onAddBlock={handleAddBlock} />
                                        </Box>
                                    </>
                                ) : templateContents.length > 0 ? (
                                    <TemplateContentBlocks templateContents={templateContents} />
                                ) : (
                                    <Text as="p" tone="subdued">No content blocks added yet.</Text>
                                )}
                            </BlockStack>
                        </Card>
                    </BlockStack>
                </div>
                <div className="asc-template-layout__preview">
                    <BlockStack gap="300">
                        <Text variant="headingSm" as="h3" tone="subdued">Mobile preview</Text>
                        <Card>
                            <MobilePreview
                                title={isEditing ? titleDraft : template.title}
                                contentItems={isEditing ? contentItems : templateContents}
                            />
                        </Card>
                    </BlockStack>
                </div>
            </div>
        </Page>
    );
}
