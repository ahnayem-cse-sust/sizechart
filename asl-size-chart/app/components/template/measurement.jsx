import { useState } from 'react';
import {
  Grid,
  Text,
  Button,
  TextField, ButtonGroup, InlineStack
} from "@shopify/polaris";
import { PlusIcon, MinusIcon, DeleteIcon } from "@shopify/polaris-icons";
import * as content_constants from '../../services/constants/content';


export default function MeasurementComponent({ content }) {
  const content_array = JSON.parse(content.content_obj);
  const [sizeTable, setSizeTable] = useState(content_array);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const addSizeTableRow = () => {
    setSizeTable([...sizeTable, new Array(sizeTable[0].length).fill("")]);
    setIsSaveDisabled(false);
  }

  const addSizeTableColumn = () => {
    setIsSaveDisabled(false);
    setSizeTable(sizeTable.map(row => [...row, ""]));
  }

  const updateSizeTableCell = (rIdx, cIdx, val) => {
    setIsSaveDisabled(false);
    setSizeTable(sizeTable.map((row, rowIndex) =>
      rowIndex === rIdx
        ? row.map((cell, colIndex) => (colIndex === cIdx ? val : cell))
        : row
    ));
  }

  const removeSizeTableRow = (i) => {
    setSizeTable(sizeTable.filter((_, idx) => idx !== i));
    setIsSaveDisabled(false);
  }

  const removeSizeTableColumn = (i) => {
    setSizeTable(sizeTable.map(row => row.filter((_, idx) => idx !== i)));
    setIsSaveDisabled(false);
  }

  const handleBlockSave = async (content_id) => {

    const formData = new FormData();
    formData.append("intent", content_constants.INTENT_SAVE_BLOCK);
    formData.append("content_id", content_id);
    formData.append("content_obj", JSON.stringify(sizeTable));

    const res = await fetch("/app/templates/" + content.template_id, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Successfully saved.");
      setIsSaveDisabled(true);
    } else {
      alert("Failed to save.");
    }
  };
  
  const handleBlockDelete = async (content_id) => {
    if (!confirm("Are you sure you want to delete this table?")) return;

    const formData = new FormData();
    formData.append("intent", content_constants.INTENT_CONTENT_DELETE);
    formData.append("content_id", content_id);

    const res = await fetch("/app/templates/" + content.template_id, {
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


    <Grid>
      <input type="hidden" name="sizeTableData" value={JSON.stringify(sizeTable)} />
      <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingLg">
            Size Measurement:
          </Text>
          <ButtonGroup>
            <Button 
            disabled={isSaveDisabled} 
            variant="primary"
            onClick={() => handleBlockSave(content.id)}
            >
            Save
            </Button>
            <Button
              tone="critical"
              icon={DeleteIcon}
              onClick={() => handleBlockDelete(content.id)}
            ></Button>
          </ButtonGroup>

        </InlineStack>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
        <div className='measurement-table'>
          <table style={{ width: '100%' }}>
            {sizeTable.map((row, rIdx) => (
              <tr key={rIdx} gap="2">
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
          </table>
        </div>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
        <table className='sz-chart-col-btn'>
          <tr>
            <td>
              <div>
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
      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
        <table className='sz-chart-row-btn'>
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
      </Grid.Cell>
    </Grid>

  );
}


