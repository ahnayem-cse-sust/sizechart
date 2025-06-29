import {
  Box,
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
      <TitleBar title="Size Chart \ Template \ Edit" />
      <Layout>
        <Layout.Section>
          <Card>
            <Button url='/app/templates'>
              Back
            </Button>
            <p>GGGGGG</p>
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
}


