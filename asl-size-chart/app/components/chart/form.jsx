import { Modal, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import {
  Text,
  FormLayout, Form
} from "@shopify/polaris";
import { ArrowLeftIcon } from "@shopify/polaris-icons";
import { INTENT,INTENT_UPDATE,INTENT_CREATE } from "../../services/constants/global";
import TemplatePickerComponent from "./template_picker";
import TemplateContentBlocks from "../template/content_blocks_preview";

export default function ChartFormComponent({ templates, categories, chart }) {
  const [active, setActive] = useState();
  const [saving, setSaving] = useState(false);
  const modalTitle = chart ? 'Edit Chart' : 'Create Chart';
  const [title, setTitle] = useState(chart ? chart.title : '');
  const [selectedTemplate, setSelectedTemplate] = useState(
    chart ? String(chart.template_id ?? '') : ''
  );
  const [errors, setErrors] = useState({});

  // Previewing a template takes over the whole modal (its own header/footer
  // actions) rather than sitting inline in the form — see below.
  const [previewLoadingId, setPreviewLoadingId] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const toggleModal = useCallback(() => {
    setActive((prev) => !prev);
    setPreviewData(null);
  }, []);

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handlePreview = async (template) => {
    setPreviewLoadingId(template.id);
    try {
      const res = await fetch(`/app/template-preview/${template.id}`);
      if (!res.ok) throw new Error("Failed to load preview");
      const data = await res.json();
      setPreviewData(data);
    } catch {
      alert("Couldn't load a preview for this template.");
    } finally {
      setPreviewLoadingId(null);
    }
  };

  const backFromPreview = () => setPreviewData(null);

  const chooseFromPreview = () => {
    if (previewData) setSelectedTemplate(String(previewData.template.id));
    setPreviewData(null);
  };

  const handleSave = async (id) => {

    const validationErrors = {};
    if (!title) validationErrors.title = "Title is required";
    if (!selectedTemplate) validationErrors.template = "Template is required";

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSaving(true);

    const formData = new FormData();
    formData.append(INTENT, id ? INTENT_UPDATE : INTENT_CREATE);
    if (id) formData.append("id", id);
    formData.append("title", title);
    formData.append("templateId", selectedTemplate);
    // Available sizes aren't collected here — they're added afterwards from
    // the chart's own edit page, once the chart exists.
    formData.append("sizeList", JSON.stringify([]));

    try {
      const res = await fetch("/app/charts", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.reload();
      } else {
        setSaving(false);
        alert("Failed to save chart.");
      }
    } catch (e) {
      setSaving(false);
      alert("Failed to save chart.");
    }
  };

  return (
    <div>
      <Button
        size="slim"
        variant={chart ? "secondary" : "primary"}
        onClick={() => {
          setActive(true);
        }}
      >
        {!chart && "+ Create Chart"}
        {chart && "Edit chart"}
      </Button>
      <Modal
        open={active}
        onClose={toggleModal}
        title={previewData ? previewData.template.title : modalTitle}
        primaryAction={
          previewData
            ? { content: "Use this template", onAction: chooseFromPreview }
            : { content: "Save", loading: saving, onAction: () => handleSave(chart?.id) }
        }
        secondaryActions={previewData ? [] : [{ content: "Cancel", onAction: toggleModal }]}
      >
        {previewData ? (
          <Modal.Section>
            <div style={{ marginBottom: 12 }}>
              <Button variant="plain" icon={ArrowLeftIcon} onClick={backFromPreview}>
                Back
              </Button>
            </div>
            <div className="asc-editorial">
              <div className="asc-desktop-chrome">
                <div style={{ padding: 24, background: "#fff" }}>
                  <TemplateContentBlocks templateContents={previewData.templateContents} />
                </div>
              </div>
            </div>
          </Modal.Section>
        ) : (
          <Modal.Section>
            <Form onSubmit={(event) => event.preventDefault()}>
              <FormLayout>
                <TextField
                  label="Chart title"
                  name='title'
                  value={title}
                  onChange={handleTitleChange}
                  autoComplete="off"
                  placeholder="e.g. Women's Tops"
                  error={errors.title}
                />

                <TemplatePickerComponent
                  categories={categories}
                  value={selectedTemplate}
                  onChange={setSelectedTemplate}
                  onPreview={handlePreview}
                  previewLoadingId={previewLoadingId}
                  error={errors.template}
                />
                <Text as="p" tone="subdued">
                  Available sizes can be added once the chart is created, from its edit page.
                </Text>
              </FormLayout>
            </Form>
          </Modal.Section>
        )}
      </Modal>
    </div>
  );
}
