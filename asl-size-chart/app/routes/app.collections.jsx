import { useState, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate, useActionData, useNavigation, Form } from '@remix-run/react';
import { getCollections, saveCollectionSizechart } from "../services/sizecharts.server";
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
  Box,
  Thumbnail,
  Select,
  Filters,
} from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';

export async function loader({ request }) {
  return await getCollections({ request });
}

export async function action({ request }) {
  const result = await saveCollectionSizechart({ request });
  return Response.json(result);
}

// Same "no chart / pick a chart" selector used on the Products page, just
// pointed at a collection's own size_chart_id metafield instead of a
// product's.
function CollectionChartCell({ id, metafield, sizeCharts }) {
  const [selectedId, setSelectedId] = useState(metafield?.value || "0");

  const options = [
    { label: "No size chart", value: "0" },
    ...sizeCharts.map((chart) => ({ label: chart.title, value: String(chart.id) })),
  ];

  return (
    <Form method="post">
      <input type="hidden" name="collectionId" value={id} />
      <InlineStack gap="200" blockAlign="center" wrap={false}>
        <div style={{ minWidth: 180 }}>
          <Select
            labelHidden
            label="Size chart"
            name="sizeChartId"
            options={options}
            value={selectedId}
            onChange={setSelectedId}
          />
        </div>
        <Button submit size="slim">Save</Button>
      </InlineStack>
    </Form>
  );
}

export default function CollectionsAdmin() {
  const { collections, sizeCharts, hasNextPage, endCursor, hasPreviousPage, startCursor, filters } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSearching = navigation.state !== "idle";

  const [queryValue, setQueryValue] = useState(filters.search || "");
  const [sortValue, setSortValue] = useState(filters.sort || "TITLE_ASC");

  const buildParams = (values) => {
    const params = new URLSearchParams();
    if (values.search) params.set("search", values.search);
    if (values.sort && values.sort !== "TITLE_ASC") params.set("sort", values.sort);
    return params;
  };

  // Same debounced-search / auto-requery behaviour as the Products page:
  // no search button, typing (or changing sort) just re-queries after a
  // short pause, and a fresh query drops any pagination cursor.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      const params = buildParams({ search: queryValue, sort: sortValue });
      navigate(`?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [queryValue, sortValue]);

  const handleQueryClear = () => setQueryValue("");
  const handleClearAll = () => {
    setQueryValue("");
    setSortValue("TITLE_ASC");
  };

  const rowMarkup = collections.map(
    ({ id, title, image, productsCount, metafield }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <InlineStack gap="300" blockAlign="center" wrap={false}>
            <Thumbnail
              source={image?.url || ImageIcon}
              alt={image?.altText || title}
              size="small"
            />
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              {title}
            </Text>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" tone="subdued">
            {productsCount?.count ?? 0} {productsCount?.count === 1 ? "product" : "products"}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <CollectionChartCell id={id} metafield={metafield} sizeCharts={sizeCharts} />
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page fullWidth title="Collections">
      <BlockStack gap="400">
        {actionData && !actionData.success && (
          <Banner tone="critical" title="Couldn't save size chart">
            <p>{actionData.userErrors?.[0]?.message || "Something went wrong."}</p>
            {actionData.totalProductCount > 0 && (
              <p>
                Updated {actionData.updatedProductCount} of {actionData.totalProductCount} products
                before running into this — you can try saving again.
              </p>
            )}
          </Banner>
        )}
        {actionData?.success && (
          <Banner tone="success">
            {actionData.totalProductCount > 0
              ? `Size chart saved and applied to ${actionData.updatedProductCount} product${actionData.updatedProductCount === 1 ? "" : "s"} in this collection.`
              : "Size chart saved. This collection has no products yet — new ones will pick it up automatically."}
          </Banner>
        )}
        <Card padding="0">
          <Box padding="300" borderBlockEndWidth="025" borderColor="border">
            <Filters
              queryValue={queryValue}
              queryPlaceholder="Search collections"
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryClear}
              onClearAll={handleClearAll}
              appliedFilters={[]}
              filters={[]}
            >
              <Select
                labelHidden
                label="Sort by"
                options={[
                  { label: "Title A-Z", value: "TITLE_ASC" },
                  { label: "Title Z-A", value: "TITLE_DESC" },
                ]}
                value={sortValue}
                onChange={setSortValue}
              />
            </Filters>
          </Box>
          <IndexTable
            itemCount={collections.length}
            selectable={false}
            loading={isSearching}
            headings={[
              { title: 'Collection' },
              { title: 'Products' },
              { title: 'Size chart' },
            ]}
          >
            {rowMarkup}
          </IndexTable>

          <Box padding="400" borderBlockStartWidth="025" borderColor="border">
            <InlineStack align="center">
              <Pagination
                onPrevious={() => {
                  const params = buildParams({ ...filters, before: startCursor });
                  params.set("before", startCursor);
                  navigate(`?${params.toString()}`);
                }}
                onNext={() => {
                  const params = buildParams({ ...filters, after: endCursor });
                  params.set("after", endCursor);
                  navigate(`?${params.toString()}`);
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
