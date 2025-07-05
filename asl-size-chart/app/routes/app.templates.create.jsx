import { useState, useCallback, useEffect } from 'react';
import {
  List,
  Card,
  Layout,
  Page,
  Grid,
  Button,
  Form, FormLayout, ButtonGroup, TextField, Text,
  DropZone, Icon
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { XIcon, PlusIcon, MinusIcon } from "@shopify/polaris-icons";
// import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import '../assets/style.css';


export default function TemplateCreateForm() {
  const [ReactQuill, setReactQuill] = useState(null);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(null);
  const [sizeList, setSizeList] = useState([{ value: "XL" }, { value: "L" }]);
  const [newSize, setNewSize] = useState('');
  const [errorNewSize, setErrorNewSize] = useState(null);
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const [sizeTable, setSizeTable] = useState([
    ["Size", "Chest", "Waist"],
    ["S", "6", "4"],
    ["M", "6", "6"],
    ["L", "7", "8"],
  ]);

  useEffect(() => {
    // Dynamically load Quill client-side
    import('react-quill').then((mod) => {
      setReactQuill(() => mod.default);
      import('react-quill/dist/quill.snow.css'); // optionally import styles
    });
  }, []);


  const handleTitleChange = useCallback((value) => {
    setTitle(value);
    if (value.trim() !== "") {
      setTitleError(null);
    }
  }, []);

  const handleNewSize = (value) => {
    if (value.trim() !== "") {
      setErrorNewSize(null);
    }
    setNewSize(value);
  };

  const addSize = () => {
    if (newSize.trim() === "") {
      setErrorNewSize("Size cannot be empty");
    } else {
      setErrorNewSize(null);
      setSizeList([...sizeList, { value: newSize }]);
      setNewSize('');
    }
  };

  const removeSize = (index) => {
    const newList = [...sizeList];
    newList.splice(index, 1);
    setSizeList(newList);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]); // Only accept first file
      }
    },
    []
  );

  const addSizeTableRow = () => setSizeTable([...sizeTable, new Array(sizeTable[0].length).fill("")]);
  const addSizeTableColumn = () => setSizeTable(sizeTable.map(row => [...row, ""]));

  const updateSizeTableCell = (rIdx, cIdx, val) =>
    setSizeTable(sizeTable.map((row, rowIndex) =>
      rowIndex === rIdx
        ? row.map((cell, colIndex) => (colIndex === cIdx ? val : cell))
        : row
    ));

  const removeSizeTableRow = (i) => setSizeTable(sizeTable.filter((_, idx) => idx !== i));
  const removeSizeTableColumn = (i) =>
    setSizeTable(sizeTable.map(row => row.filter((_, idx) => idx !== i)));


  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !file && <DropZone.FileUpload actionTitle="Upload" actionHint="Accepts .gif, .jpeg, and .png" />;

  const uploadedFiles = file && (
    <div style={{ padding: '25px' }}>
      {validImageTypes.includes(file.type) ? (
        <div style={{ width: '30%', height: '150px', overflow: 'hidden', margin: 'auto' }}>
          <img
            src={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
            alt="Uploaded preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--p-border-radius-base)',
            }}
          />
        </div>
      ) : (
        <div>
          <Text alignment='center' tone="critical" variant="headingMd" as="h6">Uploaded file format not supported.</Text>
        </div>
      )}
      <DropZone.FileUpload actionTitle="Change" actionHint="Accepts .gif, .jpeg, and .png" />
    </div>
  );

  const handleInputClick = () => {
    setIsDisabled(false);
  };

  const handleBlur = () => {
    setIsDisabled(true);
  };

  const handleSubmit = useCallback(() => {
    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
    }
  }, []);


  return (
    <Page>
      <TitleBar title="Size Chart \ Template \ Create" />
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingLg" as="h3" alignment='center'>
              Create Size Chart Template
            </Text>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
              <FormLayout>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Text variant="headingMd" as="h6">
                      Template Title:
                    </Text>
                    <TextField
                      value={title}
                      onChange={handleTitleChange}
                      type="text"
                      autoComplete=""
                      error={titleError}
                    />
                  </Grid.Cell>
                </Grid>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                    <Text variant="headingMd" as="h6">
                      Available Sizes:
                    </Text>
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
                        error={errorNewSize}
                      />
                      <Button onClick={addSize}>+ Add Size</Button>
                    </ButtonGroup>
                  </Grid.Cell>
                </Grid>

                <input type="hidden" name="sizeTableData" value={JSON.stringify(sizeTable)} />

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                    <Text variant="headingMd" as="h6">
                      Size Measurement:
                    </Text>
                    <div className='measurement-table'>
                      <table style={{ width: '100%' }}> 
                        {sizeTable.map((row, rIdx) => (
                          <tr key={rIdx} wrap={false} gap="2">
                            {row.map((cell, cIdx) => (
                              <td>
                                <TextField
                                  key={cIdx}
                                  labelHidden
                                  value={cell}
                                  onChange={(val) => updateSizeTableCell(rIdx, cIdx, val)}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr>
                          <th colSpan={sizeTable[0].length}>
                            <Button icon={PlusIcon} onClick={addSizeTableRow}></Button>
                            {sizeTable.length > 1 && (
                              <Button
                                tone="critical"
                                icon={MinusIcon}
                                onClick={() => removeSizeTableRow(sizeTable.length - 1)}
                              >

                              </Button>
                            )}
                          </th>

                        </tr>
                      </table>
                    </div>
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                    <table style={{ height: '100%' }}>
                      <tr>
                        <td className='mid-el'>
                          <div className='sz-chart-col-btn'>
                            <Button icon={PlusIcon} onClick={addSizeTableColumn}>

                            </Button>
                            {sizeTable[0].length > 1 && (
                              <Button
                                tone="critical"
                                icon={MinusIcon}
                                onClick={() => removeSizeTableColumn(sizeTable[0].length - 1)}
                              >

                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    </table>

                  </Grid.Cell>
                </Grid>

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                    <Text variant="headingMd" as="h6">
                      Description:
                    </Text>
                    {/* <TextField
                      value={description}
                      onChange={handleDescriptionChange}
                      type="text"
                      autoComplete=""
                    /> */}
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

                      {/* {error && <p style={{ color: 'red', marginTop: '-10px' }}>{error}</p>} */}
                    </div>
                  </Grid.Cell>
                </Grid>

                <br />

                <Grid>
                  <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                    <Text variant="headingMd" as="h6">
                      Upload Image:
                    </Text>
                    <DropZone
                      allowMultiple={false}
                      onDrop={handleDropZoneDrop}>
                      {uploadedFiles}
                      {fileUpload}
                    </DropZone>
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


