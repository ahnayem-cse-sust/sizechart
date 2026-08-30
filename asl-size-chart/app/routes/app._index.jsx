import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  InlineStack,
  Box,
  Badge,
  Icon,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { getSettings } from "../services/settings.server";
import {
  TEMPLATE_BASE_URL,
  CHART_BASE_URL,
} from "../services/constants/routes";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const [templateCount, chartCount, settings] = await Promise.all([
    db.template.count(),
    db.chart.count(),
    getSettings(session.shop),
  ]);

  return Response.json({ templateCount, chartCount, settings });
};

function StatCard({ label, value, url, actionLabel }) {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="span" tone="subdued" variant="bodySm">
          {label}
        </Text>
        <Text as="span" variant="heading2xl">
          {value}
        </Text>
        <Box>
          <Button url={url} size="slim">
            {actionLabel}
          </Button>
        </Box>
      </BlockStack>
    </Card>
  );
}

function ChecklistItem({ children }) {
  return (
    <InlineStack gap="200" blockAlign="start" wrap={false}>
      <Box paddingBlockStart="050">
        <Icon source={CheckIcon} tone="success" />
      </Box>
      <Text as="span">{children}</Text>
    </InlineStack>
  );
}

export default function Index() {
  const { templateCount, chartCount, settings } = useLoaderData();

  return (
    <Page>
      <TitleBar title="Home" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingLg">
                      Welcome to Size Chart
                    </Text>
                    <Badge tone="success">Connected</Badge>
                  </InlineStack>
                  <Text as="p" tone="subdued">
                    Build size chart templates, turn them into charts, and
                    attach them to your products. Customers see a size guide
                    (and optionally a size selector) right on the product
                    page.
                  </Text>
                </BlockStack>
              </Card>

              <InlineStack gap="400" wrap={false}>
                <Box width="50%">
                  <StatCard
                    label="Templates"
                    value={templateCount}
                    url={TEMPLATE_BASE_URL}
                    actionLabel="Manage templates"
                  />
                </Box>
                <Box width="50%">
                  <StatCard
                    label="Charts"
                    value={chartCount}
                    url={CHART_BASE_URL}
                    actionLabel="Manage charts"
                  />
                </Box>
              </InlineStack>

              <Card>
                <BlockStack gap="300">
                  <Text as="h2" variant="headingMd">
                    Get set up
                  </Text>
                  <BlockStack gap="200">
                    <ChecklistItem>
                      Review or edit a template under{" "}
                      <Button variant="plain" url={TEMPLATE_BASE_URL}>
                        Templates
                      </Button>{" "}
                      — {templateCount} are ready to use out of the box.
                    </ChecklistItem>
                    <ChecklistItem>
                      Assign a chart to a product from the{" "}
                      <Button variant="plain" url="/app/products">
                        Products
                      </Button>{" "}
                      tab.
                    </ChecklistItem>
                    <ChecklistItem>
                      In your theme editor, turn on the{" "}
                      <Text as="span" fontWeight="medium">
                        "Size Chart (Auto)"
                      </Text>{" "}
                      app embed once (Online Store → Themes → Customize →
                      App embeds) so the button shows automatically.
                    </ChecklistItem>
                    <ChecklistItem>
                      Fine-tune the button's look and cart behavior from{" "}
                      <Button variant="plain" url="/app/settings">
                        Settings
                      </Button>
                      .
                    </ChecklistItem>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Current configuration
                  </Text>
                  <BlockStack gap="150">
                    <InlineStack align="space-between">
                      <Text as="span" tone="subdued">
                        Storefront button
                      </Text>
                      <Badge tone={settings.showOnProductPage ? "success" : "critical"}>
                        {settings.showOnProductPage ? "Enabled" : "Hidden"}
                      </Badge>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" tone="subdued">
                        Size selector
                      </Text>
                      <Badge>
                        {settings.sizeSelectorMode === "app" ? "App-managed" : "Theme-managed"}
                      </Badge>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" tone="subdued">
                        Measurement unit
                      </Text>
                      <Badge>{settings.unit === "cm" ? "Centimeters" : "Inches"}</Badge>
                    </InlineStack>
                  </BlockStack>
                  <Box paddingBlockStart="200">
                    <Button url="/app/settings" fullWidth>
                      Open Settings
                    </Button>
                  </Box>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Need more charts?
                  </Text>
                  <Text as="p" tone="subdued" variant="bodySm">
                    See what's available on your current plan, or explore
                    higher tiers for more templates and customization.
                  </Text>
                  <Box>
                    <Button url="/app/pricing" size="slim">
                      View pricing
                    </Button>
                  </Box>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
