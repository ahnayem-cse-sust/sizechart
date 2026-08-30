import { Modal, Button, BlockStack } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CONTENT_TYPE_DESCRIPTION, CONTENT_TYPE_IMAGE, CONTENT_TYPE_TABLE } from "../../services/constants/content";
import { safeJsonParse } from "../../services/utils/safeJson";


const DescriptionPreview = ({ content }) => {
  const description = safeJsonParse(content.content_obj, content.content_obj || "");
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};

const MeasurementPreview = ({ content }) => {
  const sizeTable = safeJsonParse(content.content_obj, []);
  if (sizeTable.length === 0) return null;
  return (
    <div className='measurement-table'>
      <table style={{ width: '100%' }}>
        <tbody>
          {sizeTable.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ImagePreview = ({ content }) => {
  if (!content.content_obj) return null;
  return (
    <div style={{ padding: '12px 0' }}>
      <img
        src={'/uploads/' + content.content_obj}
        alt="Size chart"
        style={{ maxWidth: '100%', borderRadius: 8 }}
      />
    </div>
  );
};


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
          <BlockStack gap="400">
            {templateContents.map((content) => (
              <div key={content.id}>
                {content.content_type === CONTENT_TYPE_DESCRIPTION && (<DescriptionPreview content={content} />)}
                {content.content_type === CONTENT_TYPE_IMAGE && (<ImagePreview content={content} />)}
                {content.content_type === CONTENT_TYPE_TABLE && (<MeasurementPreview content={content} />)}
              </div>
            ))}
          </BlockStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
