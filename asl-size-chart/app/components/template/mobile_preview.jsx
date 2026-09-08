import { Text } from "@shopify/polaris";
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
    <div className="asc-editorial" style={{ display: "flex", justifyContent: "center" }}>
      <div className="asc-phone-edge">
        <div className="asc-phone-notch" />
        <div className="asc-phone-screen">
          <div className="asc-phone-storefront-header">
            <p className="asc-editorial-font" style={{ fontSize: 11, fontWeight: 600, margin: 0 }}>
              Store
            </p>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>≡</span>
          </div>
          <div className="asc-phone-body">
            <h2 className="asc-editorial-font" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25, margin: "0 0 8px" }}>
              {title || "Untitled"} Size Guide
            </h2>
            {contentItems.length > 0 ? (
              <div style={{ fontSize: 11 }}>
                <TemplateContentBlocks templateContents={contentItems} />
              </div>
            ) : (
              <Text as="p" tone="subdued">
                No content blocks added yet.
              </Text>
            )}
          </div>
        </div>
        <div className="asc-phone-scrollbar" />
      </div>
    </div>
  );
}
