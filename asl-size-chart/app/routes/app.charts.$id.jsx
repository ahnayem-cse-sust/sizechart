import { useState, useRef, useCallback, useEffect } from 'react';
import { useLoaderData, useBeforeUnload, useBlocker } from '@remix-run/react';
import {
  Text,
  Page,
  BlockStack,
  Box,
  InlineError,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getChartById } from "../services/chart.server";
import { getAllChartContent, chartContentFactory } from "../services/chart.content.server";
import { CHART_BASE_URL } from "../services/constants/routes";
import { INTENT, INTENT_UPDATE } from "../services/constants/global";
import ChartDetailsComponent from "../components/chart/chart_details";
import BlockButtonComponent from "../components/template/block_button";
import TemplateContentComponent from "../components/template/template_content";
import TemplateContentBlocks from "../components/template/content_blocks_preview";
import MobilePreview from "../components/template/mobile_preview";
import TemplatePreviewComponent from "../components/template/template_preview";
import { authenticate } from "../shopify.server";
import { safeJsonParse } from "../services/utils/safeJson";
import {
  CONTENT_TYPE_IMAGE,
  CONTENT_TYPE_TABLE,
  INTENT_ADD_BLOCK,
  INTENT_SAVE_BLOCK,
  INTENT_SAVE_IMAGE_BLOCK,
  INTENT_CONTENT_DELETE,
  INTENT_IMAGE_CONTENT_DELETE,
} from "../services/constants/content";

export async function loader({ request, params }) {
  await authenticate.admin(request);

  const id = Number(params.id);
  const chartResponse = await getChartById(id);
  const { chart } = await chartResponse.json();

  if (!chart) {
    throw new Response("Not found", { status: 404 });
  }

  // A chart's content is its own (ChartContent, keyed by chart_id) —
  // independent of whatever template it may have originally been created
  // from. See chart.server.js: creation clones the template's content once,
  // then clears the link entirely.
  const chartContents = await getAllChartContent(id);

  return Response.json({ chart, chartContents });
}

// POST /app/charts/:id — mirrors app.templates.$id.jsx's own action, but for
// a chart's own content blocks (add/save/delete/reorder).
export async function action({ request }) {
  await authenticate.admin(request);
  return await chartContentFactory({ request });
}

function parseSizeList(chart) {
  if (!chart?.available_sizes) return [];
  try {
    const parsed = JSON.parse(chart.available_sizes);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Default content a brand-new block starts with — mirrors the template
// details page, so a pending (unsaved) block looks/behaves the same as a
// persisted one until Save actually creates it.
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

export default function ChartView() {
  const { chart, chartContents } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [titleDraft, setTitleDraft] = useState(chart.title);
  const [sizeListDraft, setSizeListDraft] = useState(() => parseSizeList(chart));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Working copy of THIS chart's own content blocks. Fully independent of
  // any template — editing and saving here only ever touches this chart's
  // ChartContent rows, never the template it may once have been cloned from.
  const [contentItems, setContentItems] = useState(chartContents);
  const [pendingDeletes, setPendingDeletes] = useState([]);
  const [dirtyBlockIds, setDirtyBlockIds] = useState(() => new Set());
  const blockDraftsRef = useRef({});

  // Set right before the post-save `window.location.reload()` so the
  // beforeunload guard below doesn't mistake that intentional reload for
  // someone abandoning unsaved changes and pop the "leave site?" prompt.
  const skipUnloadWarningRef = useRef(false);

  const baselineTitle = (chart.title || '').trim();
  const baselineSizeList = parseSizeList(chart);

  const isDirty = isEditing && (
    titleDraft.trim() !== baselineTitle ||
    JSON.stringify(sizeListDraft) !== JSON.stringify(baselineSizeList) ||
    dirtyBlockIds.size > 0 ||
    pendingDeletes.length > 0 ||
    contentItems.some((item) => isTempId(item.id))
  );

  const resetDraftState = () => {
    setTitleDraft(baselineTitle);
    setSizeListDraft(baselineSizeList);
    setContentItems(chartContents);
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
      chart_id: chart.id,
      content_type: contentType,
      content_obj: defaultContentFor(contentType),
    };
    setContentItems((prev) => [...prev, newItem]);
  }, [chart.id]);

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

  useBeforeUnload(
    useCallback((event) => {
      if (isDirty && !skipUnloadWarningRef.current) {
        event.preventDefault();
        event.returnValue = '';
      }
    }, [isDirty])
  );

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

    setSaving(true);
    setError("");

    const chartContentUrl = "/app/charts/" + chart.id;

    try {
      // Newly added blocks don't exist on the server yet. Create them
      // first, one at a time, so the server's "append to the end" serial
      // logic sees them in the order the user added them.
      const idMap = {};
      for (const item of contentItems) {
        if (!isTempId(item.id)) continue;

        const addFormData = new FormData();
        addFormData.append(INTENT, INTENT_ADD_BLOCK);
        addFormData.append("chart_id", chart.id);
        addFormData.append("content_type", item.content_type);

        const addRes = await fetch(chartContentUrl, {
          method: "POST",
          body: addFormData,
        });
        if (!addRes.ok) {
          throw new Error("Failed to create a new block");
        }
        const { chartContents: created } = await addRes.json();
        idMap[item.id] = created.id;
      }

      const detailsFormData = new FormData();
      detailsFormData.append(INTENT, INTENT_UPDATE);
      detailsFormData.append("id", chart.id);
      detailsFormData.append("title", trimmedTitle);
      detailsFormData.append("sizeList", JSON.stringify(sizeListDraft));

      const requests = [
        fetch(CHART_BASE_URL, { method: "POST", body: detailsFormData }),
      ];

      Object.entries(blockDraftsRef.current).forEach(([contentId, draft]) => {
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
          fetch(chartContentUrl, { method: "POST", body: blockFormData })
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
          fetch(chartContentUrl, { method: "POST", body: deleteFormData })
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
        content: "Charts",
        url: CHART_BASE_URL,
        onAction: isDirty
          ? () => {
              if (window.confirm("You have unsaved changes. Leave this page without saving?")) {
                window.location.href = CHART_BASE_URL;
              }
            }
          : undefined,
      }}
      secondaryActions={
        <div className="asc-editorial">
          <BlockStack gap="150" inlineAlign="end">
            <div className="asc-header-actions">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="asc-pill-btn"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="asc-pill-btn asc-pill-btn--dark"
                    onClick={handleSaveAll}
                    disabled={!isDirty || saving}
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="asc-pill-btn asc-pill-btn--dark"
                  onClick={handleStartEditing}
                >
                  Edit
                </button>
              )}
            </div>
            {error && <InlineError message={error} />}
          </BlockStack>
        </div>
      }
    >
      <TitleBar title={`Size Chart \\ ${chart.title}`} />
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
      <div className="asc-editorial">
        <TemplatePreviewComponent
          template={{ title: chart.title }}
          templateContents={isEditing ? contentItems : chartContents}
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />
        <div className="asc-template-layout">
          <div className="asc-template-layout__details">
            <div className="asc-panel">
              <div className="asc-details-block">
                <p className="asc-eyebrow">Chart Details</p>
                <ChartDetailsComponent
                  chart={chart}
                  isEditing={isEditing}
                  title={titleDraft}
                  sizeList={sizeListDraft}
                  onTitleChange={setTitleDraft}
                  onSizeListChange={setSizeListDraft}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 4 }}>
                <h1 className="asc-editorial-font" style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                  {chart.title} Size Guide
                </h1>
                <button
                  type="button"
                  className="asc-pill-btn asc-pill-btn--dark"
                  onClick={() => setPreviewOpen(true)}
                >
                  Desktop Preview
                </button>
              </div>
              {isEditing ? (
                <BlockStack gap="400">
                  <TemplateContentComponent
                    items={contentItems}
                    setItems={setContentItems}
                    onFieldChange={handleBlockFieldChange}
                    onDeleteBlock={handleDeleteBlock}
                    reorderUrl={"/app/charts/" + chart.id}
                  />
                  <Box>
                    <BlockButtonComponent btnText={'+ Add New Block'} onAddBlock={handleAddBlock} />
                  </Box>
                </BlockStack>
              ) : chartContents.length > 0 ? (
                <TemplateContentBlocks templateContents={chartContents} />
              ) : (
                <Text as="p" tone="subdued">No content blocks added yet.</Text>
              )}
            </div>
          </div>
          <div className="asc-template-layout__preview">
            <MobilePreview
              title={isEditing ? titleDraft : chart.title}
              contentItems={isEditing ? contentItems : chartContents}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
