import { useState, useEffect, useRef } from 'react';
import {
  Text,
  Button,
  TextField,
  InlineStack,
  BlockStack,
} from "@shopify/polaris";
import { PlusIcon, MinusIcon, DeleteIcon } from "@shopify/polaris-icons";
import * as content_constants from '../../services/constants/content';
import { safeJsonParse } from '../../services/utils/safeJson';


export default function MeasurementComponent({ content, onFieldChange, onDeleteBlock }) {
  const content_array = safeJsonParse(content.content_obj, []);
  const [sizeTable, setSizeTable] = useState(
    content_array.length > 0 ? content_array : [[""]],
  );
  const isFirstRender = useRef(true);

  // Report the current draft up to the page whenever it changes, so the
  // single top-level Save button can persist it. Skip the initial mount so
  // we don't mark this block dirty before the user has touched it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onFieldChange?.(content.id, content_constants.CONTENT_TYPE_TABLE, sizeTable);
  }, [sizeTable]);

  const addSizeTableRow = () => {
    setSizeTable([...sizeTable, new Array(sizeTable[0].length).fill("")]);
  }

  const addSizeTableColumn = () => {
    setSizeTable(sizeTable.map(row => [...row, ""]));
  }

  const updateSizeTableCell = (rIdx, cIdx, val) => {
    setSizeTable(sizeTable.map((row, rowIndex) =>
      rowIndex === rIdx
        ? row.map((cell, colIndex) => (colIndex === cIdx ? val : cell))
        : row
    ));
  }

  const removeSizeTableRow = (i) => {
    setSizeTable(sizeTable.filter((_, idx) => idx !== i));
  }

  const removeSizeTableColumn = (i) => {
    setSizeTable(sizeTable.map(row => row.filter((_, idx) => idx !== i)));
  }

  // The actual delete request is deferred until the page-level Save button
  // is pressed — here we just remove it from the working draft.
  const handleBlockDelete = (content_id) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    onDeleteBlock?.(content_id, content_constants.CONTENT_TYPE_TABLE);
  };

  const columnCount = sizeTable[0].length;

  return (
    <BlockStack gap="300">
      <InlineStack align="space-between" blockAlign="center">
        <Text as="h2" variant="headingSm">
          Size measurement
        </Text>
        <Button
          tone="critical"
          icon={DeleteIcon}
          variant="tertiary"
          accessibilityLabel="Delete table block"
          onClick={() => handleBlockDelete(content.id)}
        />
      </InlineStack>

      <div className="asc-table-editor">
        <div className="asc-table-editor__row">
          <div className="asc-measurement-table">
            <table>
              <tbody>
                {sizeTable.map((row, rIdx) => (
                  <tr key={`row-${rIdx}`}>
                    {row.map((cell, cIdx) => (
                      <td key={`cell-${rIdx}-${cIdx}`}>
                        <TextField
                          labelHidden
                          label={`Row ${rIdx + 1}, column ${cIdx + 1}`}
                          value={cell}
                          onChange={(val) => updateSizeTableCell(rIdx, cIdx, val)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="asc-table-editor__col-controls">
            <Button icon={PlusIcon} accessibilityLabel="Add column" onClick={addSizeTableColumn} />
            {columnCount > 1 && (
              <Button
                tone="critical"
                icon={MinusIcon}
                accessibilityLabel="Remove column"
                onClick={() => removeSizeTableColumn(columnCount - 1)}
              />
            )}
          </div>
        </div>

        <div className="asc-table-editor__row-controls">
          <Button icon={PlusIcon} accessibilityLabel="Add row" onClick={addSizeTableRow} />
          {sizeTable.length > 1 && (
            <Button
              tone="critical"
              icon={MinusIcon}
              accessibilityLabel="Remove row"
              onClick={() => removeSizeTableRow(sizeTable.length - 1)}
            />
          )}
        </div>
      </div>
    </BlockStack>
  );
}
