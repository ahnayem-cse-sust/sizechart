import {
  PageActions,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function TemplateCreate() {
  return (
    <Page>
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
      <TitleBar title="Size Chart \ Template \ Create" />
      <Layout>
        <Layout.Section>
          <Card>
            <Button url='/app/templates'>
              Back
            </Button>
            <p>FFFFFFF</p>
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
}


