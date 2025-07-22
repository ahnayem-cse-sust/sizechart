import { Modal, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import {
  Layout,
  Page,
  Grid,
  FormLayout, Text,
  Select, Form
} from "@shopify/polaris";
import { CONTENT_TYPE_DESCRIPTION, CONTENT_TYPE_IMAGE, CONTENT_TYPE_TABLE } from "../../services/constants/content";


const DescriptionPreview = ({ content }) => {
  let description = content.content_obj;
  description = description.slice(1);
  description = description.slice(0, -1);
  return (
    <div>
      <br />
      <div
        dangerouslySetInnerHTML={{ __html: description }}
      >
        {/* {description} */}
        {/* {content.content_obj} */}
      </div>
      <br />
    </div>
  );
};

const MeasurementPreview = ({ content }) => {
  const content_array = JSON.parse(content.content_obj);
  const [sizeTable, setSizeTable] = useState(content_array);
  return (
    <div>
      <div className='measurement-table'>
        <table style={{ width: '100%' }}>
          {sizeTable.map((row, rIdx) => (
            <tr key={rIdx} gap="2">
              {row.map((cell, cIdx) => (
                <td>
                  {cell}
                  {/* <TextField
                    key={cIdx}
                    labelHidden
                    readOnly
                    value={cell}
                    onChange={(val) => updateSizeTableCell(rIdx, cIdx, val)}
                  /> */}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

const ImagePreview = ({ content }) => {
  return (
    <div>
      Image
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
          <Page>
            <Layout>
              <Layout.Section>
                {templateContents.map((content, index) => (
                  <div>
                    {content.content_type === CONTENT_TYPE_DESCRIPTION && (<DescriptionPreview content={content} />)}
                    {content.content_type === CONTENT_TYPE_IMAGE && (<ImagePreview content={content} />)}
                    {content.content_type === CONTENT_TYPE_TABLE && (<MeasurementPreview content={content} />)}
                  </div>
                ))}

              </Layout.Section>
            </Layout>
          </Page>
        </Modal.Section>
      </Modal>
    </div>
  );
}


