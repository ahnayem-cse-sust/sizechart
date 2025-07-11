import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
  Card,
  Layout,
  Page,
  Grid,
  Button,
   FormLayout, ButtonGroup, TextField, Text,
  Select, InlineError
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { redirect } from '@remix-run/react';
import { getTemplateCategoryList, saveTemplate } from '../services/template.server';


export async function loader() {
  const templateCategories = await getTemplateCategoryList();

  return Response.json({ templateCategories });
}

export async function action({ request }) {
  console.log("GGGGGFDFF");
  console.log(request);
  const formData = await request.formData();
  const title = formData.get("title")?.trim();
  const category = formData.get("category")?.trim();

  const errors = {};
  if (!title) errors.title = "Title is required";
  if (!category) errors.content = "Content is required";

  if (Object.keys(errors).length) {
    return Response.json({ errors, values: { title, category } }, { status: 400 });
  }

  await saveTemplate({ title, category });
  return redirect("/app/templates");
}


export default function TemplateCreateForm() {
  const { templateCategories } = useLoaderData();
  const actionData = useActionData();
  const errors = actionData?.errors || {};

  const [title, setTitle] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('');



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
  );
}


