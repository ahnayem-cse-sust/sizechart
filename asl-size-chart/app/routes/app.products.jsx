import { useState } from 'react';
import { useLoaderData, useNavigate, useActionData, Form } from '@remix-run/react';
import { getProducts, saveProductSizechart } from "../services/sizecharts.server";
import {
  IndexTable,
  Card,
  Text,
  Page,
  Pagination,
  Button,
  Banner,
  BlockStack,
  InlineStack,
  Badge,
  Box,
} from '@shopify/polaris';

export async function loader( { request} ) {
  
  return await getProducts( { request} );
}

export async function action({ request }) {
  const result = await saveProductSizechart({ request });
  return Response.json(result);
}

function parseSizes(available_sizes) {
  if (!available_sizes) return [];
  try {
    const parsed = JSON.parse(available_sizes);
    return Array.isArray(parsed) ? parsed.map((s) => s.value ?? s) : [];
  } catch {
    return [];
  }
}

function ProductChartCell({ id, metafield, sizeCharts }) {
  const [selectedId, setSelectedId] = useState(metafield?.value || "0");
  const selectedChart = sizeCharts.find((chart) => String(chart.id) === String(selectedId));
  const sizes = selectedChart ? parseSizes(selectedChart.available_sizes) : [];

  return (
    <Form method="post">
      <input type="hidden" name="productId" value={id} />
      <BlockStack gap="150">
        <InlineStack gap="200" blockAlign="center">
          <select
            name="sizeChartId"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option key="0" value="0">Select Size Chart</option>
            {sizeCharts.map(chart => (
              <option key={chart.id} value={chart.id}>{chart.title}</option>
            ))}
          </select>
          <button type="submit">Save</button>
        </InlineStack>
        {selectedChart && (
          <InlineStack gap="100">
            {sizes.length > 0 ? (
              sizes.map((size, i) => <Badge key={i}>{size}</Badge>)
            ) : (
              <Text as="span" tone="subdued" variant="bodySm">
                This chart has no available sizes set.
              </Text>
            )}
          </InlineStack>
        )}
      </BlockStack>
    </Form>
  );
}


export default function SizeChartsAdmin() {
  
  const { products, sizeCharts, hasNextPage, endCursor, hasPreviousPage, startCursor } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  const rowMarkup = products.map(
    (
      {id, title, onlineStorePreviewUrl,metafield},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>
          <ProductChartCell id={id} metafield={metafield} sizeCharts={sizeCharts} />
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
    <Page fullWidth title="Products">
      <BlockStack gap="400">
        {actionData && !actionData.success && (
          <Banner tone="critical" title="Couldn't save size chart">
            <p>{actionData.userErrors?.[0]?.message || "Something went wrong."}</p>
          </Banner>
        )}
        {actionData?.success && (
          <Banner tone="success">Size chart saved. Add the "Size Chart Block" to your product page template in the theme editor if you haven't already.</Banner>
        )}
        <Card padding="0">
        <IndexTable
        itemCount={products.length}
        selectable={false}
        headings={[
          {title: 'Product ID'},
          {title: 'Product Title'},
          {title: 'Size Chart'},
          {title: 'Store Preview'},
        ]}
      >
        {rowMarkup}
      </IndexTable>

      <Box padding="400" borderBlockStartWidth="025" borderColor="border">
        <InlineStack align="center">
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
          />
        </InlineStack>
      </Box>

      </Card>
      </BlockStack>
    </Page>

  );
}
