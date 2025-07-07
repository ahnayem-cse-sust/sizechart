import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Layout,
  Page,
  Grid,
  Button,
  Form, FormLayout, ButtonGroup, TextField, Text,
  Select
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateCategoryList } from '../services/template';

import '../assets/style.css';

export default function TemplateCreateForm() {
  const [title, setTitle] = useState('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('');
  const [templateCategories, setTemplateCategories] = useState([]);
  const [titleError, setTitleError] = useState(null);
  const [selectedTemplateCategoryError, setSelectedTemplateCategoryError] = useState();

  useEffect(() => {
    let isMounted = true;

    getTemplateCategoryList()
      .then((data) => {
        console.log(data);
        setTemplateCategories(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return () => {
      isMounted = false; 
    };
  }, []); 

  const handleTitleChange = useCallback((value) => {
    if (value.trim() !== "") {
      setTitleError(null);
    }
    setTitle(value);
  }, []);

  const handleSelectedCategoryChange = useCallback(
    (value) => setSelectedTemplateCategory(value),
    [],
  );


  const handleSubmit = () => {
    if (title.trim() === '') {
      setTitleError('Title is required');
      return;
    }
    if (selectedTemplateCategory.trim() === '') {
      setSelectedTemplateCategoryError('Category is required');
      return;
    }

    setTitleError(null);
    setSelectedTemplateCategoryError(null);
    console.log('Form submitted with title:', title);
  };


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
                      autoComplete="off"
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
                      error={selectedTemplateCategoryError}
                    />
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


