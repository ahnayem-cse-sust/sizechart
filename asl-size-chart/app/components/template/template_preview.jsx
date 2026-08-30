import { Modal, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import TemplateContentBlocks from "./content_blocks_preview";


export default function TemplatePreviewComponent({ template, templateContents }) {
  const [active, setActive] = useState();

  const toggleModal = useCallback(() => setActive((prev) => !prev), []);

  return (
    <div>
      <Button
        size="slim"
        variant="primary"
        onClick={() => {
          setActive(true);
        }}
      >
        Preview
      </Button>
      <Modal
        open={active}
        onClose={toggleModal}
        title="Size Guides"
      >
        <Modal.Section>
          <TemplateContentBlocks templateContents={templateContents} />
        </Modal.Section>
      </Modal>
    </div>
  );
}
