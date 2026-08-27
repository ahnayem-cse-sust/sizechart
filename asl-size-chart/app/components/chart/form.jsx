import { Modal, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import {
  Layout,
  Page,
  Grid, InlineError,
  FormLayout, Text,
  Select, Form
} from "@shopify/polaris";
import { INTENT,INTENT_UPDATE,INTENT_CREATE } from "../../services/constants/global";
import AvailableSizeComponent from "./available_size";

function parseSizeList(chart) {
  if (!chart?.available_sizes) return [{ value: "XL" }, { value: "L" }];
  try {
    const parsed = JSON.parse(chart.available_sizes);
    return Array.isArray(parsed) && parsed.length ? parsed : [{ value: "XL" }, { value: "L" }];
  } catch {
    return [{ value: "XL" }, { value: "L" }];
  }
}

export default function ChartFormComponent({ templates, chart }) {
  const [active, setActive] = useState();
  const [saving, setSaving] = useState(false);
  const modalTitle = chart ? 'Edit Chart' : 'Create Chart';
  const [title, setTitle] = useState(chart ? chart.title : '');
  const [selectedTemplate, setSelectedTemplate] = useState(
    chart ? String(chart.template_id ?? '') : ''
  );
  const [errors, setErrors] = useState({});
  const [sizeList, setSizeList] = useState(parseSizeList(chart));
  const templateList = templates.map((template) => ({
    label: template.title,
    value: String(template.id),
  }));

  const toggleModal = useCallback(() => setActive((prev) => !prev), []);

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleSelectedTemplateChange = useCallback(
    (value) => {
      setSelectedTemplate(value);
    },
    [],
  );

  const handleSave = async (id) => {

    const validationErrors = {};
    if (!title) validationErrors.title = "Title is required";
    if (!selectedTemplate) validationErrors.template = "Template is required";
    if (!sizeList.length) validationErrors.sizes = "Add at least one available size";

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
    formData.append("sizeList", JSON.stringify(sizeList));

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
        title={modalTitle}
        primaryAction={{
          content: "Save",
          loading: saving,
          onAction: () => handleSave(chart?.id)
        }}
        secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
      >
        <Modal.Section>
          <Form>
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

              <Select
                label="Template"
                name='template'
                options={[{ label: 'Select a template', value: '', disabled: true }, ...templateList]}
                onChange={handleSelectedTemplateChange}
                value={selectedTemplate}
                error={errors.template}
                helpText="The content shown on the storefront comes from this template."
              />

              <AvailableSizeComponent sizeList={sizeList} setSizeList={setSizeList} />
              {errors.sizes && <InlineError message={errors.sizes} />}
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
}
