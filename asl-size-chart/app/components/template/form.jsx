import { Modal, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { redirect } from '@remix-run/react';
import { Form } from '@remix-run/react';
import {
    Card,
    Layout,
    Page,
    Grid,
    Button,
    FormLayout, ButtonGroup, TextField, Text,
    Select, InlineError
} from "@shopify/polaris";

export default function TemplateFormComponent(showModal) {
    const [active, setActive] = useState(showModal);
    const [title, setTitle] = useState('');
    const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('');
    const [editId, setEditId] = useState(null);

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

    return (
        <div>
              <Modal
                open={active}
                onClose={toggleModal}
                title="Edit Template"
                primaryAction={{
                  content: "Save",
                  onAction: async () => {
                    const formData = new FormData();
                    formData.append("intent", "UPDATE");
                    formData.append("id", editId);
                    formData.append("title", editTitle);
        
                    const res = await fetch("/app/templates", {
                      method: "POST",
                      body: formData,
                    });
        
                    if (res.ok) {
                      toggleModal();
                      window.location.reload(); // or refetch via fetcher
                    } else {
                      alert("Update failed.");
                    }
                  },
                }}
                secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
              >
                <Modal.Section>
                  <Page>
                    <TitleBar title="Size Chart \ Template \ Create" />
                    <Layout>
                      <Layout.Section>
                        <Card>
                          <Text variant="headingLg" as="h3" alignment='center'>
                            Create Size Chart Template
                          </Text>
                          <br />
                          <br />
                          <Form method='post'>
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
                                  {errors.title && <InlineError message={errors.category} />}
                                </Grid.Cell>
                              </Grid>
        
                              <ButtonGroup>
                                <Button url='/app/templates'>Cancel</Button>
                                <Button variant="primary" submit>Submit</Button>
                              </ButtonGroup>
        
                            </FormLayout>
                          </Form>
                        </Card>
                      </Layout.Section>
        
                    </Layout>
                  </Page>
                </Modal.Section>
              </Modal>
            </div>
    );
}


