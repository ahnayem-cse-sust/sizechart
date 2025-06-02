import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export async function loader( { request} ) {
  
  return null;
}

export default function SizeChartsTemplateCreate() {
  const [title, setTitle] = useState('');
  const [sizeList, setSizeList] = useState([]);

  const handleSubmit = useCallback(() => {
    setTitle('');
    setSizeList([]);
  }, []);

  const handleSizeListChange = useCallback(
    (value) => setSizeList(value),
    [],
  );

  const handleTitleChange = useCallback((value) => setTitle(  value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        
        <TextField
          value={title}
          onChange={handleTitleChange}
          label="Size Title"
          type="text"
          autoComplete="off"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}
