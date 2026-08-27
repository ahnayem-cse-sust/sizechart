import { useEffect, useState, useCallback } from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Box,
  Divider,
  Badge,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getSettings, saveSettings } from "../services/settings.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const settings = await getSettings(session.shop);
  return Response.json({ settings });
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const form = await request.formData();

  const settings = await saveSettings(session.shop, {
    unit: form.get("unit"),
    buttonLabel: form.get("buttonLabel"),
    buttonColor: form.get("buttonColor"),
    buttonTextColor: form.get("buttonTextColor"),
    buttonPosition: form.get("buttonPosition"),
    showIcon: form.get("showIcon") === "true",
    showOnProductPage: form.get("showOnProductPage") === "true",
  });

  return Response.json({ settings, saved: true });
}

const UNIT_OPTIONS = [
  { label: "Inches (in)", value: "in" },
  { label: "Centimeters (cm)", value: "cm" },
];

const POSITION_OPTIONS = [
  { label: "Top right", value: "top-right" },
  { label: "Top left", value: "top-left" },
  { label: "Middle right", value: "middle-right" },
  { label: "Middle left", value: "middle-left" },
  { label: "Bottom right", value: "bottom-right" },
  { label: "Bottom left", value: "bottom-left" },
];

const FIELDS = [
  "unit",
  "buttonLabel",
  "buttonColor",
  "buttonTextColor",
  "buttonPosition",
  "showIcon",
  "showOnProductPage",
];

function PreviewButton({ label, color, textColor, showIcon, position }) {
  const [vertical, horizontal] = position.split("-");
  const style = {
    position: "absolute",
    [horizontal]: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: color,
    color: textColor,
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: "0.875rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  };

  if (vertical === "top") {
    style.top = 16;
  } else if (vertical === "middle") {
    style.top = "50%";
    style.transform = "translateY(-50%)";
  } else {
    style.bottom = 16;
  }

  return (
    <Box position="relative" minHeight="160px" background="bg-surface-secondary" borderRadius="200">
      <div style={style}>
        {showIcon && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 6H3M21 12H3M21 18H8"></path>
          </svg>
        )}
        <span>{label || "Size Chart"}</span>
      </div>
    </Box>
  );
}

export default function SettingsPage() {
  const { settings } = useLoaderData();
  const fetcher = useFetcher();

  const [unit, setUnit] = useState(settings.unit);
  const [buttonLabel, setButtonLabel] = useState(settings.buttonLabel);
  const [buttonColor, setButtonColor] = useState(settings.buttonColor);
  const [buttonTextColor, setButtonTextColor] = useState(settings.buttonTextColor);
  const [buttonPosition, setButtonPosition] = useState(settings.buttonPosition);
  const [showIcon, setShowIcon] = useState(settings.showIcon);
  const [showOnProductPage, setShowOnProductPage] = useState(settings.showOnProductPage);

  const current = { unit, buttonLabel, buttonColor, buttonTextColor, buttonPosition, showIcon, showOnProductPage };
  const isDirty = FIELDS.some((field) => current[field] !== settings[field]);

  const isSaving = fetcher.state !== "idle";
  const [showSavedBanner, setShowSavedBanner] = useState(false);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.saved) {
      setShowSavedBanner(true);
      const timer = setTimeout(() => setShowSavedBanner(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data]);

  const handleSave = useCallback(() => {
    fetcher.submit(
      {
        unit,
        buttonLabel,
        buttonColor,
        buttonTextColor,
        buttonPosition,
        showIcon: String(showIcon),
        showOnProductPage: String(showOnProductPage),
      },
      { method: "POST" },
    );
  }, [unit, buttonLabel, buttonColor, buttonTextColor, buttonPosition, showIcon, showOnProductPage, fetcher]);

  const handleDiscard = useCallback(() => {
    setUnit(settings.unit);
    setButtonLabel(settings.buttonLabel);
    setButtonColor(settings.buttonColor);
    setButtonTextColor(settings.buttonTextColor);
    setButtonPosition(settings.buttonPosition);
    setShowIcon(settings.showIcon);
    setShowOnProductPage(settings.showOnProductPage);
  }, [settings]);

  return (
    <Page
      primaryAction={{
        content: "Save",
        onAction: handleSave,
        loading: isSaving,
        disabled: !isDirty,
      }}
      secondaryActions={
        isDirty
          ? [{ content: "Discard", onAction: handleDiscard, disabled: isSaving }]
          : []
      }
    >
      <TitleBar title="Settings" />
      <Layout>
        {showSavedBanner && (
          <Layout.Section>
            <Banner tone="success" onDismiss={() => setShowSavedBanner(false)}>
              Settings saved. Changes apply on the storefront immediately — no
              theme editor changes needed.
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Measurement unit
                </Text>
                <Text as="p" tone="subdued" variant="bodySm">
                  Used as the default when you create new measurement tables.
                </Text>
                <Select
                  label="Default unit"
                  labelHidden
                  options={UNIT_OPTIONS}
                  value={unit}
                  onChange={setUnit}
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="start">
                  <BlockStack gap="100">
                    <Text as="h2" variant="headingMd">
                      Storefront button
                    </Text>
                    <Text as="p" tone="subdued" variant="bodySm">
                      Controls the size chart button everywhere it appears on
                      your storefront — including the automatic floating
                      button. No theme editor setup needed for these.
                    </Text>
                  </BlockStack>
                </InlineStack>

                <FormLayout>
                  <Checkbox
                    label="Show the size chart button on product pages with a chart assigned"
                    checked={showOnProductPage}
                    onChange={setShowOnProductPage}
                  />

                  <FormLayout.Group>
                    <TextField
                      label="Button text"
                      value={buttonLabel}
                      onChange={setButtonLabel}
                      autoComplete="off"
                      disabled={!showOnProductPage}
                    />
                    <Select
                      label="Floating button position"
                      options={POSITION_OPTIONS}
                      value={buttonPosition}
                      onChange={setButtonPosition}
                      disabled={!showOnProductPage}
                      helpText="Only applies to the automatic floating button."
                    />
                  </FormLayout.Group>

                  <FormLayout.Group>
                    <TextField
                      label="Button color"
                      value={buttonColor}
                      onChange={setButtonColor}
                      autoComplete="off"
                      disabled={!showOnProductPage}
                      prefix={
                        <Box
                          borderRadius="100"
                          borderWidth="025"
                          borderColor="border"
                          minWidth="20px"
                          minHeight="20px"
                          background={buttonColor}
                        />
                      }
                    />
                    <TextField
                      label="Button text color"
                      value={buttonTextColor}
                      onChange={setButtonTextColor}
                      autoComplete="off"
                      disabled={!showOnProductPage}
                      prefix={
                        <Box
                          borderRadius="100"
                          borderWidth="025"
                          borderColor="border"
                          minWidth="20px"
                          minHeight="20px"
                          background={buttonTextColor}
                        />
                      }
                    />
                  </FormLayout.Group>

                  <Checkbox
                    label="Show icon on the button"
                    checked={showIcon}
                    onChange={setShowIcon}
                    disabled={!showOnProductPage}
                  />
                </FormLayout>

                <Divider />

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    Preview
                  </Text>
                  <PreviewButton
                    label={buttonLabel}
                    color={buttonColor}
                    textColor={buttonTextColor}
                    showIcon={showIcon}
                    position={buttonPosition}
                  />
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Status
                </Text>
                <Badge tone="success">Connected</Badge>
              </InlineStack>
              <Divider />
              <Text as="p" tone="subdued" variant="bodySm">
                Assign a chart to a product from the Products tab, then turn
                on the app embed once in your theme editor:
              </Text>
              <Text as="p" tone="subdued" variant="bodySm">
                Online Store → Themes → Customize → App embeds → enable
                "Size Chart (Auto)".
              </Text>
              <Text as="p" tone="subdued" variant="bodySm">
                After that, every setting above updates the storefront button
                instantly — no need to touch the theme editor again.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
