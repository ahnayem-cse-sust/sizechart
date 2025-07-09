import { Modal, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import {
  Layout,
  Page,
  Grid,
  FormLayout, Text,
  Select,Form
} from "@shopify/polaris";

export default function TemplateFormComponent({templateCategories, templateId}) {
  const [active, setActive] = useState();
  const [modalTitle, setModalTitle] = useState('Create Template');
  const [title, setTitle] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('');

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
        console.log(id);
        return;

        const formData = new FormData();
        formData.append("intent", "CREATE");
        formData.append("id", id);

        const res = await fetch("/app/templates", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.reload(); // Or use `navigate()` to refresh
        } else {
            alert("Failed to delete.");
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
        Create Template
      </Button>
      <Modal
        open={active}
        onClose={toggleModal}
        title={modalTitle}
        primaryAction={{
          content: "Save",
          onAction:() => handleSave(templateId)
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
                          {/* {errors.title && <InlineError message={errors.title} />} */}
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
                          {/* {errors.title && <InlineError message={errors.category} />} */}
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


