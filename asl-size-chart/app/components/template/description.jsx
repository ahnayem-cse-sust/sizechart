import { useState, useEffect } from 'react';
import {
  Grid,
  Text
} from "@shopify/polaris";

import 'react-quill/dist/quill.snow.css';



export default function DescriptionComponent() {
  const [ReactQuill, setReactQuill] = useState(null);
  const [description, setDescription] = useState(null);


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


  return (
<div>
    <Grid>
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
        <Text variant="headingMd" as="h6">
          Description:
        </Text>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>

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


