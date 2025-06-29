import {useState, useCallback} from 'react';
import {
  PageActions,
  Card,
  Layout,
  Page,
  Text,
  Button,
  Form, FormLayout, Checkbox, TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function TemplateCreateForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = useCallback(() => {
    setTitle('');
  }, []);

  const handleTitleChange = useCallback((value) => setEmail(value), []);

  return (
    <Page>
      <TitleBar title="Size Chart \ Template \ Create" />

      <PageActions
        primaryAction={{
          content: 'Save',
        }}
        secondaryActions={[
          {
            content: 'Cancel',
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card>
            <Button url='/app/templates'>
              Back
            </Button>
            <Form onSubmit={handleSubmit}>
              <FormLayout>

                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  label="Title"
                  type="text"
                  autoComplete=""
                  helpText={
                    <span>
                      This title will help to find desired template on chart creation.
                    </span>
                  }
                />

                <Button submit>Submit</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
}


