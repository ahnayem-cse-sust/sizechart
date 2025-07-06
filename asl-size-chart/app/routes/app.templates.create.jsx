import { useState, useCallback } from 'react';
import {
  Card,
  Layout,
  Page,
  Grid,
  Button,
  Form, FormLayout, ButtonGroup, TextField, Text,
  DropZone, Select
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateCategoryList } from '../services/template';
import DescriptionComponent from '../components/template/description';
import MeasurementComponent from '../components/template/measurement';
import ImageUploadComponent from '../components/template/image_upload';

import '../assets/style.css';

export default function TemplateCreateForm() {
  const [title, setTitle] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState();
  const [templateCategories, setTemplateCategories] = useState([]);
  const [titleError, setTitleError] = useState(null);

  getTemplateCategoryList()
  .then((data) => {
    console.log(data);
    setTemplateCategories(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  const handleTitleChange = useCallback((value) => {
    setTitle(value);
    if (value.trim() !== "") {
      setTitleError(null);
    }
  }, []);

  const handleSelectedCategoryChange = useCallback(
    (value) => setSelectedTemplateCategory(value),
    [],
  );


  const handleSubmit = useCallback(() => {
    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
    }
  }, []);


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
            <Form onSubmit={handleSubmit}>
              <FormLayout>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Text variant="headingMd" as="h6">
                      Template Title:
                    </Text>
                    <TextField
                      value={title}
                      onChange={handleTitleChange}
                      type="text"
                      autoComplete=""
                      error={titleError}
                    />
                  </Grid.Cell>
                </Grid>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Text variant="headingMd" as="h6">
                      Template Category:
                    </Text>
                    <Select
                      options={templateCategories}
                      onChange={handleSelectedCategoryChange}
                      value={selectedTemplateCategory}
                    />
                  </Grid.Cell>
                </Grid>

                <DescriptionComponent />

                <br />
                <MeasurementComponent />

                <ImageUploadComponent />

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


