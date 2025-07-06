import { useState } from 'react';
import {
  Grid,
  Text,
  Button,
  TextField
} from "@shopify/polaris";
import { PlusIcon, MinusIcon } from "@shopify/polaris-icons";


export default function MeasurementComponent() {
  const [sizeTable, setSizeTable] = useState([
    ["Size", "Chest", "Waist"],
    ["S", "6", "4"],
    ["M", "6", "6"],
    ["L", "7", "8"],
  ]);

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


  return (


    <Grid>
      <input type="hidden" name="sizeTableData" value={JSON.stringify(sizeTable)} />
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
        <Text variant="headingMd" as="h6">
          Size Measurement:
        </Text>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
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
          </table>
        </div>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
        <table  className='sz-chart-col-btn'>
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
      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
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


