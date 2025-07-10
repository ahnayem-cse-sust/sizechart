import { useState, useEffect } from 'react';
import {
  Grid,
  Text,ButtonGroup,Button,
  InlineStack
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";

import 'react-quill/dist/quill.snow.css';



export default function DescriptionComponent({ content }) {
  const [ReactQuill, setReactQuill] = useState(null);
  const [description, setDescription] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);


  useEffect(() => {
    // Dynamically load Quill client-side
    import('react-quill').then((mod) => {
      setReactQuill(() => mod.default);
      import('react-quill/dist/quill.snow.css'); // optionally import styles
    });
  }, []);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleBlockDelete = async (content_id) => {
        if (!confirm("Are you sure you want to delete this table?")) return;

        const formData = new FormData();
        formData.append("intent", "CONTENT_DELETE");
        formData.append("content_id", content_id);

        const res = await fetch("/app/templates/"+content.template_id, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.reload(); // Or use `navigate()` to refresh
        } else {
            alert("Failed to delete.");
        }
    };


  return (
    <div>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingLg">
              Description:
            </Text>
            <ButtonGroup>
              <Button disabled={isSaveDisabled} variant="primary">Save</Button>
              <Button
                tone="critical"
                icon={DeleteIcon}
                onClick={() => handleBlockDelete(content.id)}
              ></Button>
            </ButtonGroup>

          </InlineStack>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>

          <div>
            {ReactQuill ? (
              <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
                theme="snow"
                style={{ height: '300px', marginBottom: '10px' }}
              />
            ) : (
              <p>Loading editor...</p>
            )}
          </div>
        </Grid.Cell>
      </Grid>
      <br />
      <br />
    </div>
  );
}


