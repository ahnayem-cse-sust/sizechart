import { Modal, Button, Spinner, Text, BlockStack } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import TemplateContentBlocks from "./content_blocks_preview";
import { TEMPLATE_CONTENTS_URL } from "../../services/constants/routes";

export default function TemplateListPreviewButton({ templateId, templateTitle }) {
  const [active, setActive] = useState(false);
  const fetcher = useFetcher();

  const openModal = useCallback(
    (event) => {
      event.stopPropagation();
      setActive(true);
      fetcher.load(TEMPLATE_CONTENTS_URL + templateId);
    },
    [fetcher, templateId],
  );

  const closeModal = useCallback(() => setActive(false), []);

  const isLoading = fetcher.state !== "idle" || !fetcher.data;
  const templateContents = fetcher.data?.templateContents || [];

  return (
    <div>
      <Button size="slim" onClick={openModal}>
        Preview
      </Button>
      <Modal open={active} onClose={closeModal} title={templateTitle || "Size Guide"}>
        <Modal.Section>
          {isLoading ? (
            <BlockStack gap="200" inlineAlign="center">
              <Spinner accessibilityLabel="Loading preview" size="small" />
              <Text as="span" tone="subdued">Loading preview…</Text>
            </BlockStack>
          ) : templateContents.length === 0 ? (
            <Text as="p" tone="subdued">This template has no content yet.</Text>
          ) : (
            <TemplateContentBlocks templateContents={templateContents} />
          )}
        </Modal.Section>
      </Modal>
    </div>
  );
}
