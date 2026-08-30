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
  ButtonGroup,
  Button,
  RangeSlider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { getSettings, saveSettings } from "../services/settings.server";
import {
  SHAPE_OPTIONS,
  SIZE_OPTIONS,
  SHADOW_OPTIONS,
  ICON_OPTIONS,
  POSITION_OPTIONS,
  TEXT_ORIENTATION_OPTIONS,
  TEXT_ORIENTATION_STYLES,
  BUTTON_CORNERS,
  CORNER_FIELD_NAMES,
  CORNER_LABELS,
  SHAPE_RADIUS,
  SIZE_STYLES,
  SHADOW_STYLES,
  ICON_PATHS,
} from "../services/utils/buttonDesign";

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
    buttonPositionVertical: form.get("buttonPositionVertical"),
    buttonPositionHorizontal: form.get("buttonPositionHorizontal"),
    buttonTextOrientation: form.get("buttonTextOrientation"),
    ...Object.fromEntries(CORNER_FIELD_NAMES.map((field) => [field, form.get(field)])),
    buttonSize: form.get("buttonSize"),
    buttonBorderWidth: form.get("buttonBorderWidth"),
    buttonBorderColor: form.get("buttonBorderColor"),
    buttonShadow: form.get("buttonShadow"),
    buttonIcon: form.get("buttonIcon"),
    showIcon: form.get("showIcon") === "true",
    showOnProductPage: form.get("showOnProductPage") === "true",
    sizeSelectorMode: form.get("sizeSelectorMode"),
  });

  return Response.json({ settings, saved: true });
}

const UNIT_OPTIONS = [
  { label: "Inches (in)", value: "in" },
  { label: "Centimeters (cm)", value: "cm" },
];

const FIELDS = [
  "unit",
  "buttonLabel",
  "buttonColor",
  "buttonTextColor",
  "buttonPositionVertical",
  "buttonPositionHorizontal",
  "buttonTextOrientation",
  ...CORNER_FIELD_NAMES,
  "buttonSize",
  "buttonBorderWidth",
  "buttonBorderColor",
  "buttonShadow",
  "buttonIcon",
  "showIcon",
  "showOnProductPage",
  "sizeSelectorMode",
];

function PreviewButton({
  label,
  color,
  textColor,
  showIcon,
  icon,
  verticalPosition,
  horizontalPosition,
  textOrientation,
  shapeTopLeft,
  shapeTopRight,
  shapeBottomRight,
  shapeBottomLeft,
  size,
  borderWidth,
  borderColor,
  shadow,
}) {
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.medium;

  const isVerticalText = textOrientation !== "horizontal";

  // CSS border-radius shorthand order: top-left, top-right, bottom-right,
  // bottom-left — matches BUTTON_CORNERS in buttonDesign.js.
  const cornerRadius = [shapeTopLeft, shapeTopRight, shapeBottomRight, shapeBottomLeft]
    .map((shape) => `${SHAPE_RADIUS[shape] ?? SHAPE_RADIUS.pill}px`)
    .join(" ");

  const style = {
    position: "absolute",
    display: "inline-flex",
    flexDirection: isVerticalText ? "column" : "row",
    alignItems: "center",
    gap: 6,
    background: color,
    color: textColor,
    borderRadius: cornerRadius,
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    boxShadow: SHADOW_STYLES[shadow] ?? SHADOW_STYLES.soft,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
  };

  const transforms = [];

  if (verticalPosition === "top") {
    style.top = 16;
  } else if (verticalPosition === "middle") {
    style.top = "50%";
    transforms.push("translateY(-50%)");
  } else {
    style.bottom = 16;
  }

  if (horizontalPosition === "left") {
    style.left = 16;
  } else if (horizontalPosition === "center") {
    style.left = "50%";
    transforms.push("translateX(-50%)");
  } else {
    style.right = 16;
  }

  if (transforms.length) {
    style.transform = transforms.join(" ");
  }

  return (
    <Box position="relative" minHeight="160px" background="bg-surface-secondary" borderRadius="200">
      <div style={style}>
        {showIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={sizeStyle.iconSize}
            height={sizeStyle.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: ICON_PATHS[icon] || ICON_PATHS.list }}
          />
        )}
        <span
          style={
            textOrientation === "vertical-ttb"
              ? { writingMode: "vertical-rl", textOrientation: "mixed" }
              : textOrientation === "vertical-btt"
                ? {
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }
                : undefined
          }
        >
          {label || "Size Chart"}
        </span>
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
  const [buttonPositionVertical, setButtonPositionVertical] = useState(settings.buttonPositionVertical);
  const [buttonPositionHorizontal, setButtonPositionHorizontal] = useState(settings.buttonPositionHorizontal);
  const [buttonTextOrientation, setButtonTextOrientation] = useState(settings.buttonTextOrientation);
  const [buttonShapeTopLeft, setButtonShapeTopLeft] = useState(settings.buttonShapeTopLeft);
  const [buttonShapeTopRight, setButtonShapeTopRight] = useState(settings.buttonShapeTopRight);
  const [buttonShapeBottomRight, setButtonShapeBottomRight] = useState(settings.buttonShapeBottomRight);
  const [buttonShapeBottomLeft, setButtonShapeBottomLeft] = useState(settings.buttonShapeBottomLeft);
  const [buttonSize, setButtonSize] = useState(settings.buttonSize);
  const [buttonBorderWidth, setButtonBorderWidth] = useState(settings.buttonBorderWidth);
  const [buttonBorderColor, setButtonBorderColor] = useState(settings.buttonBorderColor);
  const [buttonShadow, setButtonShadow] = useState(settings.buttonShadow);
  const [buttonIcon, setButtonIcon] = useState(settings.buttonIcon);
  const [showIcon, setShowIcon] = useState(settings.showIcon);
  const [showOnProductPage, setShowOnProductPage] = useState(settings.showOnProductPage);
  const [sizeSelectorMode, setSizeSelectorMode] = useState(settings.sizeSelectorMode);

  // Single combined value for the position Select, e.g. "bottom-right".
  // Still stored/saved as two separate fields — see handlePositionChange.
  const buttonPosition = `${buttonPositionVertical}-${buttonPositionHorizontal}`;

  const handlePositionChange = useCallback((value) => {
    const [vertical, horizontal] = value.split("-");
    setButtonPositionVertical(vertical);
    setButtonPositionHorizontal(horizontal);
  }, []);

  const current = {
    unit,
    buttonLabel,
    buttonColor,
    buttonTextColor,
    buttonPositionVertical,
    buttonPositionHorizontal,
    buttonTextOrientation,
    buttonShapeTopLeft,
    buttonShapeTopRight,
    buttonShapeBottomRight,
    buttonShapeBottomLeft,
    buttonSize,
    buttonBorderWidth,
    buttonBorderColor,
    buttonShadow,
    buttonIcon,
    showIcon,
    showOnProductPage,
    sizeSelectorMode,
  };
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
        buttonPositionVertical,
        buttonPositionHorizontal,
        buttonTextOrientation,
        buttonShapeTopLeft,
        buttonShapeTopRight,
        buttonShapeBottomRight,
        buttonShapeBottomLeft,
        buttonSize,
        buttonBorderWidth: String(buttonBorderWidth),
        buttonBorderColor,
        buttonShadow,
        buttonIcon,
        showIcon: String(showIcon),
        showOnProductPage: String(showOnProductPage),
        sizeSelectorMode,
      },
      { method: "POST" },
    );
  }, [
    unit,
    buttonLabel,
    buttonColor,
    buttonTextColor,
    buttonPositionVertical,
    buttonPositionHorizontal,
    buttonTextOrientation,
    buttonShapeTopLeft,
    buttonShapeTopRight,
    buttonShapeBottomRight,
    buttonShapeBottomLeft,
    buttonSize,
    buttonBorderWidth,
    buttonBorderColor,
    buttonShadow,
    buttonIcon,
    showIcon,
    showOnProductPage,
    sizeSelectorMode,
    fetcher,
  ]);

  const handleDiscard = useCallback(() => {
    setUnit(settings.unit);
    setButtonLabel(settings.buttonLabel);
    setButtonColor(settings.buttonColor);
    setButtonTextColor(settings.buttonTextColor);
    setButtonPositionVertical(settings.buttonPositionVertical);
    setButtonPositionHorizontal(settings.buttonPositionHorizontal);
    setButtonTextOrientation(settings.buttonTextOrientation);
    setButtonShapeTopLeft(settings.buttonShapeTopLeft);
    setButtonShapeTopRight(settings.buttonShapeTopRight);
    setButtonShapeBottomRight(settings.buttonShapeBottomRight);
    setButtonShapeBottomLeft(settings.buttonShapeBottomLeft);
    setButtonSize(settings.buttonSize);
    setButtonBorderWidth(settings.buttonBorderWidth);
    setButtonBorderColor(settings.buttonBorderColor);
    setButtonShadow(settings.buttonShadow);
    setButtonIcon(settings.buttonIcon);
    setShowIcon(settings.showIcon);
    setShowOnProductPage(settings.showOnProductPage);
    setSizeSelectorMode(settings.sizeSelectorMode);
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
                      Design the size chart button everywhere it appears on
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
                      onChange={handlePositionChange}
                      disabled={!showOnProductPage}
                    />
                  </FormLayout.Group>
                  <Text as="p" tone="subdued" variant="bodySm">
                    Position only applies to the automatic floating button.
                  </Text>

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

                  <Divider />

                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">
                      Shape &amp; size
                    </Text>
                    <BlockStack gap="150">
                      <Text as="p" variant="bodySm">
                        Corner shape
                      </Text>
                      <BlockStack gap="150">
                        <FormLayout.Group>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued" variant="bodySm">
                              {CORNER_LABELS.topLeft}
                            </Text>
                            <ButtonGroup variant="segmented">
                              {SHAPE_OPTIONS.map((option) => (
                                <Button
                                  key={option.value}
                                  pressed={buttonShapeTopLeft === option.value}
                                  disabled={!showOnProductPage}
                                  onClick={() => setButtonShapeTopLeft(option.value)}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </ButtonGroup>
                          </BlockStack>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued" variant="bodySm">
                              {CORNER_LABELS.topRight}
                            </Text>
                            <ButtonGroup variant="segmented">
                              {SHAPE_OPTIONS.map((option) => (
                                <Button
                                  key={option.value}
                                  pressed={buttonShapeTopRight === option.value}
                                  disabled={!showOnProductPage}
                                  onClick={() => setButtonShapeTopRight(option.value)}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </ButtonGroup>
                          </BlockStack>
                        </FormLayout.Group>
                        <FormLayout.Group>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued" variant="bodySm">
                              {CORNER_LABELS.bottomLeft}
                            </Text>
                            <ButtonGroup variant="segmented">
                              {SHAPE_OPTIONS.map((option) => (
                                <Button
                                  key={option.value}
                                  pressed={buttonShapeBottomLeft === option.value}
                                  disabled={!showOnProductPage}
                                  onClick={() => setButtonShapeBottomLeft(option.value)}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </ButtonGroup>
                          </BlockStack>
                          <BlockStack gap="100">
                            <Text as="p" tone="subdued" variant="bodySm">
                              {CORNER_LABELS.bottomRight}
                            </Text>
                            <ButtonGroup variant="segmented">
                              {SHAPE_OPTIONS.map((option) => (
                                <Button
                                  key={option.value}
                                  pressed={buttonShapeBottomRight === option.value}
                                  disabled={!showOnProductPage}
                                  onClick={() => setButtonShapeBottomRight(option.value)}
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </ButtonGroup>
                          </BlockStack>
                        </FormLayout.Group>
                      </BlockStack>
                    </BlockStack>

                    <FormLayout.Group>
                      <BlockStack gap="150">
                        <Text as="p" variant="bodySm">
                          Button size
                        </Text>
                        <ButtonGroup variant="segmented">
                          {SIZE_OPTIONS.map((option) => (
                            <Button
                              key={option.value}
                              pressed={buttonSize === option.value}
                              disabled={!showOnProductPage}
                              onClick={() => setButtonSize(option.value)}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </BlockStack>
                      <BlockStack gap="150">
                        <Text as="p" variant="bodySm">
                          Text orientation
                        </Text>
                        <ButtonGroup variant="segmented">
                          {TEXT_ORIENTATION_OPTIONS.map((option) => (
                            <Button
                              key={option.value}
                              pressed={buttonTextOrientation === option.value}
                              disabled={!showOnProductPage}
                              onClick={() => setButtonTextOrientation(option.value)}
                            >
                              {option.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </BlockStack>
                    </FormLayout.Group>
                  </BlockStack>

                  <Divider />

                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">
                      Border &amp; shadow
                    </Text>
                    <FormLayout.Group>
                      <RangeSlider
                        label={`Border width: ${buttonBorderWidth}px`}
                        min={0}
                        max={6}
                        value={buttonBorderWidth}
                        onChange={setButtonBorderWidth}
                        disabled={!showOnProductPage}
                        output
                      />
                      <TextField
                        label="Border color"
                        value={buttonBorderColor}
                        onChange={setButtonBorderColor}
                        autoComplete="off"
                        disabled={!showOnProductPage || buttonBorderWidth === 0}
                        prefix={
                          <Box
                            borderRadius="100"
                            borderWidth="025"
                            borderColor="border"
                            minWidth="20px"
                            minHeight="20px"
                            background={buttonBorderColor}
                          />
                        }
                      />
                    </FormLayout.Group>
                    <BlockStack gap="150">
                      <Text as="p" variant="bodySm">
                        Shadow
                      </Text>
                      <ButtonGroup variant="segmented">
                        {SHADOW_OPTIONS.map((option) => (
                          <Button
                            key={option.value}
                            pressed={buttonShadow === option.value}
                            disabled={!showOnProductPage}
                            onClick={() => setButtonShadow(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </BlockStack>
                  </BlockStack>

                  <Divider />

                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">
                      Icon
                    </Text>
                    <Checkbox
                      label="Show icon on the button"
                      checked={showIcon}
                      onChange={setShowIcon}
                      disabled={!showOnProductPage}
                    />
                    {showIcon && (
                      <ButtonGroup variant="segmented">
                        {ICON_OPTIONS.map((option) => (
                          <Button
                            key={option.value}
                            pressed={buttonIcon === option.value}
                            disabled={!showOnProductPage}
                            onClick={() => setButtonIcon(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </ButtonGroup>
                    )}
                  </BlockStack>
                </FormLayout>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <BlockStack gap="100">
                  <Text as="h2" variant="headingMd">
                    Size selection at Add to Cart
                  </Text>
                  <Text as="p" tone="subdued" variant="bodySm">
                    Decide whether customers pick a size using your theme's
                    own product options, or using a size selector this app
                    renders from the assigned chart's available sizes.
                  </Text>
                </BlockStack>

                <Select
                  label="Size selector"
                  labelHidden
                  options={[
                    {
                      label: "Use the theme's own size selector (recommended if sizes are already a product option)",
                      value: "theme",
                    },
                    {
                      label: "Use the app's size selector",
                      value: "app",
                    },
                  ]}
                  value={sizeSelectorMode}
                  onChange={setSizeSelectorMode}
                />

                {sizeSelectorMode === "app" ? (
                  <Banner tone="info">
                    <BlockStack gap="150">
                      <Text as="p">
                        The app will render clickable size options and record
                        the customer's choice as a "Size" property on the
                        cart line item, so it shows on the cart, checkout,
                        and order.
                      </Text>
                      <Text as="p" fontWeight="medium">
                        For this to work, place the "Size Chart Block" inside
                        your product form — ideally right above the Buy
                        Buttons block — in the theme editor. If it's placed
                        outside the product form, the selection won't be
                        captured with Add to Cart.
                      </Text>
                      <Text as="p" tone="subdued">
                        Note: this doesn't change inventory or pricing per
                        size — it's a label attached to the order, not a
                        product variant.
                      </Text>
                    </BlockStack>
                  </Banner>
                ) : (
                  <Banner tone="subdued">
                    The app won't render its own size selector. Make sure
                    your product has a "Size" option configured so customers
                    can still choose a size normally.
                  </Banner>
                )}
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

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Preview
              </Text>
              <PreviewButton
                label={buttonLabel}
                color={buttonColor}
                textColor={buttonTextColor}
                showIcon={showIcon}
                icon={buttonIcon}
                verticalPosition={buttonPositionVertical}
                horizontalPosition={buttonPositionHorizontal}
                textOrientation={buttonTextOrientation}
                shapeTopLeft={buttonShapeTopLeft}
                shapeTopRight={buttonShapeTopRight}
                shapeBottomRight={buttonShapeBottomRight}
                shapeBottomLeft={buttonShapeBottomLeft}
                size={buttonSize}
                borderWidth={buttonBorderWidth}
                borderColor={buttonBorderColor}
                shadow={buttonShadow}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
