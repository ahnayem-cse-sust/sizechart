import { useState, useRef, useCallback, useEffect } from 'react';
import { useLoaderData, useBeforeUnload, useBlocker } from '@remix-run/react';
import {
  Text,
  Page,
  BlockStack,
  InlineError,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getChartById } from "../services/chart.server";
import { getAllTemplateContent } from "../services/template.content.server";
import { getTemplateList } from "../services/template.server";
import { CHART_BASE_URL } from "../services/constants/routes";
import { INTENT, INTENT_UPDATE } from "../services/constants/global";
import ChartDetailsComponent from "../components/chart/chart_details";
import TemplateContentBlocks from "../components/template/content_blocks_preview";
import MobilePreview from "../components/template/mobile_preview";
import TemplatePreviewComponent from "../components/template/template_preview";
import { authenticate } from "../shopify.server";

export async function loader({ request, params }) {
  await authenticate.admin(request);

  const id = Number(params.id);
  const chartResponse = await getChartById(id);
  const { chart } = await chartResponse.json();

  if (!chart) {
    throw new Response("Not found", { status: 404 });
  }

  const templatesResponse = await getTemplateList();
  const { templateList } = await templatesResponse.json();

  let templateContents = [];
  if (chart.template_id) {
    const contentResponse = await getAllTemplateContent(chart.template_id);
    const contentData = await contentResponse.json();
    templateContents = contentData.templateContents || [];
  }

  return Response.json({ chart, templateList, templateContents });
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

export default function ChartView() {
  const { chart, templateList, templateContents } = useLoaderData();
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [titleDraft, setTitleDraft] = useState(chart.title);
  const [templateIdDraft, setTemplateIdDraft] = useState(String(chart.template_id ?? ''));
  const [sizeListDraft, setSizeListDraft] = useState(() => parseSizeList(chart));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Set right before the post-save `window.location.reload()` so the
  // beforeunload guard below doesn't mistake that intentional reload for
  // someone abandoning unsaved changes and pop the "leave site?" prompt.
  const skipUnloadWarningRef = useRef(false);

  const baselineTitle = (chart.title || '').trim();
  const baselineTemplateId = String(chart.template_id ?? '');
  const baselineSizeList = parseSizeList(chart);

  const isDirty = isEditing && (
    titleDraft.trim() !== baselineTitle ||
    templateIdDraft !== baselineTemplateId ||
    JSON.stringify(sizeListDraft) !== JSON.stringify(baselineSizeList)
  );

  const resetDraftState = () => {
    setTitleDraft(baselineTitle);
    setTemplateIdDraft(baselineTemplateId);
    setSizeListDraft(baselineSizeList);
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

  // Warn on hard navigations: refresh, closing the tab, typing a new URL,
  // or any link that causes a full page load.
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
    if (!templateIdDraft) {
      setError("Template is required");
      return;
    }
    if (!sizeListDraft.length) {
      setError("Add at least one available size");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append(INTENT, INTENT_UPDATE);
      formData.append("id", chart.id);
      formData.append("title", trimmedTitle);
      formData.append("templateId", templateIdDraft);
      formData.append("sizeList", JSON.stringify(sizeListDraft));

      const res = await fetch(CHART_BASE_URL, { method: "POST", body: formData });

      if (res.ok) {
        skipUnloadWarningRef.current = true;
        window.location.reload();
      } else {
        setSaving(false);
        setError("Failed to save chart. Please try again.");
      }
    } catch (err) {
      setSaving(false);
      setError("Failed to save chart. Please try again.");
    }
  };

  const templateOptions = templateList.map((template) => ({
    label: template.title,
    value: String(template.id),
  }));

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
          templateContents={templateContents}
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
                  templateOptions={templateOptions}
                  isEditing={isEditing}
                  title={titleDraft}
                  templateId={templateIdDraft}
                  sizeList={sizeListDraft}
                  onTitleChange={setTitleDraft}
                  onTemplateChange={setTemplateIdDraft}
                  onSizeListChange={setSizeListDraft}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
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
              {templateContents.length > 0 ? (
                <TemplateContentBlocks templateContents={templateContents} />
              ) : (
                <Text as="p" tone="subdued">
                  {chart.template?.title
                    ? "This template has no content yet."
                    : "No template linked yet."}
                </Text>
              )}
            </div>
          </div>
          <div className="asc-template-layout__preview">
            <MobilePreview title={chart.title} contentItems={templateContents} />
          </div>
        </div>
      </div>
    </Page>
  );
}
