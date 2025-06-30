import {useState, useCallback} from 'react';
import {
  PageActions,
  Card,
  Layout,
  Page,
  Grid,
  Button,
  Form, FormLayout, ButtonGroup, TextField,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function TemplateCreateForm() {
  const [title, setTitle] = useState('');
  const [sizeList, setSizeList] = useState([{ value: "" }]);

  const handleTitleChange = useCallback((value) => setTitle(value), []);
  
  const handleChangeSizeList = (index, value) => {
    const newSizes = [...sizeList];
    newSizes[index].value = value;
    setSizeList(newSizes);
  };

  const addSize = () => {
    setSizeList([...sizeList, { value: "" }]);
  };  

  const handleSubmit = useCallback(() => {
    setTitle('');
  }, []);


  return (
    <Page>
      <TitleBar title="Size Chart \ Template \ Create" />

      {/* <PageActions
        primaryAction={{
          content: 'Save',
        }}
        secondaryActions={[
          {
            content: 'Cancel',
          },
        ]}
      /> */}
      <Layout>
        <Layout.Section>
          <Card>
            <Form onSubmit={handleSubmit}>
              <FormLayout>

                <Grid columns={{sm: 3}}>
                  <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
                    <TextField
                      value={title}
                      onChange={handleTitleChange}
                      label="Title"
                      type="text"
                      autoComplete=""
                    />      
                  </Grid.Cell>
                </Grid>
                
                <Grid columns={{sm: 3}}>
                  <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
                    {sizeList.map((row, index) => (
                      <TextField
                        key={index}
                        label={`Input ${index + 1}`}
                        value={row.value}
                        onChange={(val) => handleChange(index, val)}
                        autoComplete="off"
                      />
                    ))} 
                    <Button onClick={addSize}>+</Button>    
                  </Grid.Cell>
                </Grid>
                
                <ButtonGroup>
                  <Button url='/app/templates'>Cancel</Button>
                  <Button variant="primary" submit>Submit</Button>
                </ButtonGroup>

              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
}


