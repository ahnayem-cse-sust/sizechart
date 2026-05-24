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

export default function TemplateFormComponent({ templateCategories, template }) {
  const [active, setActive] = useState();
  const [modalTitle, setModalTitle] = useState(template ? 'Edit Template' : 'Create Template');
  const [title, setTitle] = useState(template ? template.title : '');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState(template ? template.category : '');
  const [errors, setErrors] = useState({});

  const toggleModal = useCallback(() => setActive((prev) => !prev), []);

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
  }, []);

  const handleSelectedCategoryChange = useCallback(
    (value) => {
      setSelectedTemplateCategory(value);
    },
    [],
  );

  const handleSave = async (id) => {

    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!selectedTemplateCategory) errors.category = "Category is required";

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append(INTENT, id ? INTENT_UPDATE : INTENT_CREATE);
    formData.append("id", id);
    formData.append("title", title);
    formData.append("category", selectedTemplateCategory);

    const res = await fetch("/app/templates", {
      method: "POST",
      body: formData,
    });

    console.log(res);

    if (res.ok) {
      window.location.reload(); // Or use `navigate()` to refresh
    } else {
      alert("Failed to create template.");
    }
  };

  return (
    <div>
      <Button
        size="slim"
        variant="primary"
        onClick={() => {
          setActive(true);
        }}
      >
        {!template && "Create Template"}
        {template && "Edit"}
      </Button>
      <Modal
        open={active}
        onClose={toggleModal}
        title={modalTitle}
        primaryAction={{
          content: "Save",
          onAction: () => handleSave(template?.id)
        }}
        secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
      >
        <Modal.Section>
          <Page>
            <Layout>
              <Layout.Section>
                <Form>
                  <FormLayout>

                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                        <Text variant="headingMd" as="h6">
                          Template Title:
                        </Text>
                        <TextField
                          name='title'
                          value={title}
                          onChange={handleTitleChange}
                          autoComplete="off"
                        />
                        {errors.title && <InlineError message={errors.title} />}
                      </Grid.Cell>
                    </Grid>

                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                        <Text variant="headingMd" as="h6">
                          Template Category:
                        </Text>
                        <Select
                          name='category'
                          options={templateCategories}
                          onChange={handleSelectedCategoryChange}
                          value={selectedTemplateCategory}
                        />
                        {errors.category && <InlineError message={errors.category} />}
                      </Grid.Cell>
                    </Grid>
                  </FormLayout>
                </Form>
              </Layout.Section>

            </Layout>
          </Page>
        </Modal.Section>
      </Modal>
    </div>
  );
}


