import { Box, Text, BlockStack } from "@shopify/polaris";
import TemplateContentBlocks from "./content_blocks_preview";

/**
 * Renders a phone-frame mockup showing how a template's content will look
 * to a customer on mobile. Reflects the current content list immediately
 * (including blocks just added, removed, or reordered), but a block's own
 * in-progress text/table edits only show up here after Save — those are
 * held in a ref inside the parent page rather than reactive state, so they
 * don't reliably trigger a re-render on every keystroke.
 */
export default function MobilePreview({ title, contentItems }) {
  return (
    <BlockStack gap="300" inlineAlign="center">
      <Text as="h3" variant="headingSm" tone="subdued">
        Mobile preview
      </Text>
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          border: "10px solid #1a1a1a",
          borderRadius: 32,
          background: "#1a1a1a",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            overflow: "hidden",
          }}
        >
          {/* Status bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 18px 4px",
              fontSize: 11,
              fontWeight: 600,
              color: "#1a1a1a",
            }}
          >
            <span>9:41</span>
            <span>●●●●</span>
          </div>

          {/* Scrollable "screen" content */}
          <div
            style={{
              height: 480,
              overflowY: "auto",
              padding: "12px 16px 24px",
            }}
          >
            <Box paddingBlockEnd="300">
              <Text as="h2" variant="headingMd">
                {title || "Untitled"} Size Guide
              </Text>
            </Box>

            {contentItems.length > 0 ? (
              <div style={{ fontSize: 13 }}>
                <TemplateContentBlocks templateContents={contentItems} />
              </div>
            ) : (
              <Text as="p" tone="subdued">
                No content blocks added yet.
              </Text>
            )}
          </div>
        </div>
      </div>
    </BlockStack>
  );
}
