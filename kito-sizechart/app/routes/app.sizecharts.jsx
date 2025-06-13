import { useLoaderData, useNavigate, Form } from '@remix-run/react';
import { getProducts } from "../services/sizecharts.server";
import {
  IndexTable,
  Card,
  Text,
  Page,
  useIndexResourceState,
  Pagination,
  Button
} from '@shopify/polaris';

export async function loader( { request} ) {
  
  return await getProducts( { request} );
}



export default function SizeChartsAdmin() {
  
  const { products, sizeCharts, hasNextPage, endCursor, hasPreviousPage, startCursor } = useLoaderData();
  const navigate = useNavigate();

  console.log(sizeCharts);

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    (
      {id, title, onlineStorePreviewUrl,metafield},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>
          <Form method="post">
              <input type="hidden" name="productId" value={id} />
              <select name="sizeChartId" defaultValue={metafield || ""}>
                <option value="">Select Size Chart</option>
                {sizeCharts.map(chart => (
                  <option key={chart.id} value={chart.id}>{chart.title}</option>
                ))}
              </select>
              <button type="submit" style={{ marginLeft: 10 }}>Save</button>
            </Form>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button
          url={onlineStorePreviewUrl}
          target="_blank"
          >
            View in store
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

   return (
    <Page fullWidth title="Sales by product">
      <Card>
        <IndexTable
        itemCount={products.length}
        selectable={false}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Product ID'},
          {title: 'Product Title'},
          {title: 'Size Chart'},
          {title: 'Store Preview'},
        ]}
      >
        {rowMarkup}
      </IndexTable>

      <div
        style={{
          maxWidth: '700px',
          margin: 'auto',
          border: '1px solid var(--p-color-border)'
        }}
      >
        <Pagination
          onPrevious={() => {
            navigate(`?before=${startCursor}`);
          }}
          onNext={() => {
            navigate(`?after=${endCursor}`);
          }}
          type="table"
          hasNext={hasNextPage}
          hasPrevious={hasPreviousPage}
          label="1-50 of 8,450 orders"
        />
      </div>

      </Card>
    </Page>

  );
}
