import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Badge,
  List,
  Icon,
  Box,
  Divider,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    description: "Try out size charts on a small catalog.",
    cta: "Current plan",
    isCurrent: true,
    features: [
      "Up to 3 size charts",
      "1 template",
      "Storefront size chart block",
      "Community support",
    ],
  },
  {
    name: "Growth",
    price: "$9.99",
    cadence: "/month",
    description: "For growing stores that need more charts and templates.",
    cta: "Upgrade to Growth",
    isCurrent: false,
    highlighted: true,
    features: [
      "Unlimited size charts",
      "Unlimited templates",
      "Image & table size guides",
      "Priority email support",
    ],
  },
  {
    name: "Pro",
    price: "$24.99",
    cadence: "/month",
    description: "For high-volume stores with advanced needs.",
    cta: "Upgrade to Pro",
    isCurrent: false,
    features: [
      "Everything in Growth",
      "Custom CSS for the storefront block",
      "Multi-language size guides",
      "Live chat support",
    ],
  },
];

function PlanCard({ plan }) {
  return (
    <Card
      background={plan.highlighted ? "bg-surface-secondary" : undefined}
    >
      <BlockStack gap="400">
        <BlockStack gap="100">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h3" variant="headingMd">
              {plan.name}
            </Text>
            {plan.highlighted && <Badge tone="info">Most popular</Badge>}
            {plan.isCurrent && <Badge tone="success">Current plan</Badge>}
          </InlineStack>
          <Text as="p" tone="subdued" variant="bodySm">
            {plan.description}
          </Text>
        </BlockStack>

        <InlineStack blockAlign="baseline" gap="100">
          <Text as="span" variant="heading2xl">
            {plan.price}
          </Text>
          <Text as="span" tone="subdued">
            {plan.cadence}
          </Text>
        </InlineStack>

        <Button
          variant={plan.highlighted ? "primary" : "secondary"}
          disabled={plan.isCurrent}
          fullWidth
        >
          {plan.cta}
        </Button>

        <Divider />

        <List type="bullet" gap="loose">
          {plan.features.map((feature) => (
            <List.Item key={feature}>
              <InlineStack gap="150" blockAlign="start" wrap={false}>
                <Box paddingBlockStart="050">
                  <Icon source={CheckIcon} tone="success" />
                </Box>
                <Text as="span">{feature}</Text>
              </InlineStack>
            </List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}

export default function PricingPage() {
  return (
    <Page title="Pricing plan" subtitle="Choose the plan that fits your store">
      <TitleBar title="Pricing Plan" />
      <Layout>
        <Layout.Section>
          <InlineStack gap="400" align="start" wrap>
            {PLANS.map((plan) => (
              <Box key={plan.name} minWidth="260px" width="32%">
                <PlanCard plan={plan} />
              </Box>
            ))}
          </InlineStack>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm">
                Need something custom?
              </Text>
              <Text as="p" tone="subdued">
                If you're running a large catalog or need a custom
                integration, reach out and we'll help you find the right
                plan.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
