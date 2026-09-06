import { useState, useRef, useCallback } from 'react';
import { useLoaderData } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    Button,
    BlockStack,
    InlineStack,
    Box,
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
import { getAllTemplateContent, contentFactory } from '../services/template.content.server';

import { TEMPLATE_CATEGORIES } from '../services/utils/defines';
import { TEMPLATE_BASE_URL } from '../services/constants/routes';
import { authenticate } from '../shopify.server';
import { INTENT, INTENT_UPDATE } from '../services/constants/global';
import {
    CONTENT_TYPE_IMAGE,
    INTENT_SAVE_BLOCK,
    INTENT_SAVE_IMAGE_BLOCK,
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


export default function TemplateView() {
    const { template, templateContents } = useLoaderData();
    const [isEditing, setIsEditing] = useState(false);
    const [titleDraft, setTitleDraft] = useState(template.title);
    const [categoryDraft, setCategoryDraft] = useState(template.category);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Blocks report their latest edited value here as the user types/uploads.
    // Only blocks the user actually touched end up in this map, so Save only
    // persists what changed.
    const blockDraftsRef = useRef({});

    const handleStartEditing = () => {
        setTitleDraft(template.title);
        setCategoryDraft(template.category);
        blockDraftsRef.current = {};
        setError("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        blockDraftsRef.current = {};
        setError("");
        setIsEditing(false);
    };

    const handleBlockFieldChange = useCallback((contentId, contentType, value) => {
        blockDraftsRef.current[contentId] = { contentType, value };
    }, []);

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
            const detailsFormData = new FormData();
            detailsFormData.append(INTENT, INTENT_UPDATE);
            detailsFormData.append("id", template.id);
            detailsFormData.append("title", trimmedTitle);
            detailsFormData.append("category", categoryDraft);

            const requests = [
                fetch("/app/templates", { method: "POST", body: detailsFormData }),
            ];

            Object.entries(blockDraftsRef.current).forEach(([contentId, draft]) => {
                const blockFormData = new FormData();
                if (draft.contentType === CONTENT_TYPE_IMAGE) {
                    blockFormData.append(INTENT, INTENT_SAVE_IMAGE_BLOCK);
                    blockFormData.append("content_id", contentId);
                    blockFormData.append("content_obj", draft.value);
                } else {
                    blockFormData.append(INTENT, INTENT_SAVE_BLOCK);
                    blockFormData.append("content_id", contentId);
                    blockFormData.append("content_obj", JSON.stringify(draft.value));
                }
                requests.push(
                    fetch("/app/templates/" + template.id, { method: "POST", body: blockFormData })
                );
            });

            const responses = await Promise.all(requests);
            const allOk = responses.every((res) => res.ok);

            if (allOk) {
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
            backAction={{ content: "Templates", url: TEMPLATE_BASE_URL }}
            title={template.title}
            primaryAction={
                <TemplatePreviewComponent template={template} templateContents={templateContents} />
            }
            secondaryActions={
                isEditing ? (
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
                )
            }
        >
            <TitleBar title={`Size Chart \\ ${template.title}`} />
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
                        <Text variant="heading2xl" as="h3">
                            {template.title} Size Guide
                        </Text>
                        {isEditing ? (
                            <>
                                <TemplateContentComponent
                                    templateContents={templateContents}
                                    onFieldChange={handleBlockFieldChange}
                                />
                                <Box>
                                    <BlockButtonComponent btnText={'+ Add New Block'} templateId={template.id} />
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
        </Page>
    );
}
