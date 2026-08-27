import { useState } from 'react';
import {
  Grid,
  Text,
  List,
  ButtonGroup,
  Button,
  TextField
} from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";


export default function AvailableSizeComponent({ sizeList, setSizeList }) {
  // const [sizeList, setSizeList] = useState([{ value: "XL" }, { value: "L" }]);
  const [newSize, setNewSize] = useState('');
  const [errorNewSize, setErrorNewSize] = useState(null);


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


  return (

    <Grid>
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
        <Text variant="headingMd" as="h6">
          Available Sizes:
        </Text>
        <List type="number">
          {sizeList.map((row, index) => (
            <div key={index}>
              <List.Item>
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

  );
}


