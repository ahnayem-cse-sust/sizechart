import { useState, useCallback } from 'react';
import {
  List,
  Card,
  Layout,
  Page,
  Grid,
  Button,
  Form, FormLayout, ButtonGroup, TextField,Text
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { XIcon } from "@shopify/polaris-icons";
import '../assets/style.css';

export default function TemplateCreateForm() {
  const [title, setTitle] = useState('');
  const [sizeList, setSizeList] = useState([{ value: "XL" }, { value: "L" }]);
  const [newSize, setNewSize] = useState('');

  const handleTitleChange = useCallback((value) => setTitle(value), []);

  const handleNewSize = (value) => {
    setNewSize(value);
  };

  const addSize = () => {
    setSizeList([...sizeList, { value: newSize }]);
  };

  const removeSize = (index) => {
    const newList = [...sizeList];
    newList.splice(index, 1);
    setSizeList(newList);
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

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Text variant="headingXl" as="h4">
                      Title:
                    </Text>
                    <TextField
                      value={title}
                      onChange={handleTitleChange}
                      type="text"
                      autoComplete=""
                    />
                  </Grid.Cell>
                </Grid>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                    <span>Available Sizes:</span>
                    <List type="number">
                      {sizeList.map((row, index) => (
                        <div>
                          <List.Item key={index}>
                            {row.value}
                            <span className="list-rm">
                              <Button
                                icon={XIcon}
                                onClick={() => removeSize(index)}
                                plain
                              />
                            </span>

                          </List.Item>
                        </div>

                      ))}
                    </List>
                    <br />
                    <ButtonGroup>
                      <TextField
                        value={newSize}
                        onChange={(val) => handleNewSize(val)}
                        autoComplete="off"
                      />
                      <Button onClick={addSize}>+ Add Size</Button>
                    </ButtonGroup>
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


