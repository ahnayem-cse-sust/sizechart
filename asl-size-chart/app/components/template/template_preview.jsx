import { Modal } from "@shopify/polaris";
import TemplateContentBlocks from "./content_blocks_preview";


export default function TemplatePreviewComponent({ template, templateContents, open, onClose, primaryAction }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Size Guides"
      primaryAction={primaryAction}
    >
      <Modal.Section>
        <div className="asc-editorial">
          <div className="asc-desktop-chrome">
            <div style={{ padding: 24, background: "#fff" }}>
              <h2 className="asc-editorial-font" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px" }}>
                {template.title} Size Guide
              </h2>
              <TemplateContentBlocks templateContents={templateContents} />
            </div>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
}
