import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Text, ButtonGroup, Button,
  InlineStack
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { CONTENT_TYPE_DESCRIPTION } from '../../services/constants/content';
import { safeJsonParse } from '../../services/utils/safeJson';

import 'react-quill/dist/quill.snow.css';



export default function DescriptionComponent({ content, onFieldChange, onDeleteBlock }) {
  const [ReactQuill, setReactQuill] = useState(null);
  const content_obj = safeJsonParse(content.content_obj, '');
  const [description, setDescription] = useState(content_obj);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Dynamically load Quill client-side
    import('react-quill').then((mod) => {
      setReactQuill(() => mod.default);
    });
  }, []);

  // Report the current draft up to the page whenever it changes, so the
  // single top-level Save button can persist it. Skip the initial mount so
  // we don't mark this block dirty before the user has touched it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onFieldChange?.(content.id, CONTENT_TYPE_DESCRIPTION, description);
  }, [description]);

  // ReactQuill also calls onChange once on mount as it normalizes the
  // initial HTML (e.g. '' becomes '<p><br></p>') — that's Quill itself, not
  // the user, and `source` is 'api'/'silent' for it (only 'user' for real
  // typing). Ignoring non-user sources stops the block — and therefore the
  // page's Save button — from being marked dirty before anything was typed.
  const handleDescriptionChange = (value, _delta, source) => {
    if (source !== 'user') return;
    setDescription(value);
  };

  // The actual delete request is deferred until the page-level Save button
  // is pressed — here we just remove it from the working draft.
  const handleBlockDelete = (content_id) => {
    if (!confirm("Are you sure you want to delete this description block?")) return;
    onDeleteBlock?.(content_id, CONTENT_TYPE_DESCRIPTION);
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
