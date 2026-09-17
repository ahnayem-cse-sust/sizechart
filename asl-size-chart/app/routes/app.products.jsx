import { useState, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate, useActionData, useNavigation, Form } from '@remix-run/react';
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
  Box,
  Thumbnail,
  Badge,
  Select,
  TextField,
  Filters,
  ChoiceList,
} from '@shopify/polaris';
import { ImageIcon, ViewIcon } from '@shopify/polaris-icons';

export async function loader( { request} ) {
  
  return await getProducts( { request} );
}

export async function action({ request }) {
  const result = await saveProductSizechart({ request });
  return Response.json(result);
}

// Mirrors how Shopify's own Products list badges a product's status.
const STATUS_BADGE = {
  ACTIVE: { tone: "success", label: "Active" },
  DRAFT: { tone: "info", label: "Draft" },
  ARCHIVED: { tone: "subdued", label: "Archived" },
};

function ProductChartCell({ id, metafield, sizeCharts }) {
  const [selectedId, setSelectedId] = useState(metafield?.value || "0");

  const options = [
    { label: "No size chart", value: "0" },
    ...sizeCharts.map((chart) => ({ label: chart.title, value: String(chart.id) })),
  ];

  return (
    <Form method="post">
      <input type="hidden" name="productId" value={id} />
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


export default function SizeChartsAdmin() {
  
  const { products, sizeCharts, hasNextPage, endCursor, hasPreviousPage, startCursor, filters } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // Covers both the debounced search/filter navigation below and the
  // Previous/Next pagination links, since both go through navigate().
  const isSearching = navigation.state !== "idle";

  const [queryValue, setQueryValue] = useState(filters.search || "");
  const [statusValue, setStatusValue] = useState(filters.status || []);
  const [productTypeValue, setProductTypeValue] = useState(filters.productType || "");
  const [vendorValue, setVendorValue] = useState(filters.vendor || "");

  const buildParams = (values) => {
    const params = new URLSearchParams();
    if (values.search) params.set("search", values.search);
    if (values.status?.length) params.set("status", values.status.join(","));
    if (values.productType) params.set("productType", values.productType);
    if (values.vendor) params.set("vendor", values.vendor);
    return params;
  };

  // No search button — any change to the search box or the column filters
  // (status/type/vendor) re-queries the server automatically. The search
  // box is debounced so it re-queries shortly after typing stops rather
  // than navigating on every keystroke, which would reload the whole page
  // mid-word. A fresh query also drops any pagination cursor, since
  // "after"/"before" only make sense for the query they came from.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      const params = buildParams({
        search: queryValue,
        status: statusValue,
        productType: productTypeValue,
        vendor: vendorValue,
      });
      navigate(`?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [queryValue, statusValue, productTypeValue, vendorValue]);

  const handleStatusRemove = () => setStatusValue([]);
  const handleProductTypeRemove = () => setProductTypeValue("");
  const handleVendorRemove = () => setVendorValue("");
  const handleQueryClear = () => setQueryValue("");
  const handleClearAll = () => {
    setQueryValue("");
    setStatusValue([]);
    setProductTypeValue("");
    setVendorValue("");
  };

  const appliedFilters = [];
  if (statusValue.length) {
    appliedFilters.push({
      key: "status",
      label: `Status: ${statusValue.map((s) => STATUS_BADGE[s]?.label || s).join(", ")}`,
      onRemove: handleStatusRemove,
    });
  }
  if (productTypeValue) {
    appliedFilters.push({
      key: "productType",
      label: `Type: ${productTypeValue}`,
      onRemove: handleProductTypeRemove,
    });
  }
  if (vendorValue) {
    appliedFilters.push({
      key: "vendor",
      label: `Vendor: ${vendorValue}`,
      onRemove: handleVendorRemove,
    });
  }

  const rowMarkup = products.map(
    (
      { id, title, status, totalInventory, productType, featuredImage, onlineStorePreviewUrl, metafield },
      index,
    ) => {
      const statusInfo = STATUS_BADGE[status] || { tone: undefined, label: status };
      return (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
        >
          <IndexTable.Cell>
            <div className="asc-product-cell">
              <InlineStack gap="300" blockAlign="center" wrap={false}>
                <Thumbnail
                  source={featuredImage?.url || ImageIcon}
                  alt={featuredImage?.altText || title}
                  size="small"
                />
                <Text variant="bodyMd" fontWeight="semibold" as="span">
                  {title}
                </Text>
                {onlineStorePreviewUrl && (
                  <span className="asc-view-store-icon">
                    <Button
                      icon={ViewIcon}
                      url={onlineStorePreviewUrl}
                      target="_blank"
                      variant="tertiary"
                      size="slim"
                      accessibilityLabel={`View ${title} in store`}
                    />
                  </span>
                )}
              </InlineStack>
            </div>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Badge tone={statusInfo.tone}>{statusInfo.label}</Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" tone={totalInventory === 0 ? "critical" : undefined}>
              {totalInventory ?? "—"}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" tone="subdued">{productType || "—"}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <ProductChartCell id={id} metafield={metafield} sizeCharts={sizeCharts} />
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    },
  );

   return (
    <Page fullWidth title="Manage charts for products">
      <style>{`
        .asc-view-store-icon {
          opacity: 0;
          transition: opacity 120ms ease;
        }
        .asc-product-cell:hover .asc-view-store-icon,
        .asc-view-store-icon:focus-within {
          opacity: 1;
        }
      `}</style>
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
          <Box padding="300" borderBlockEndWidth="025" borderColor="border">
            <Filters
              queryValue={queryValue}
              queryPlaceholder="Search products"
              onQueryChange={setQueryValue}
              onQueryClear={handleQueryClear}
              onClearAll={handleClearAll}
              appliedFilters={appliedFilters}
              filters={[
                {
                  key: "status",
                  label: "Status",
                  shortcut: true,
                  filter: (
                    <ChoiceList
                      title="Status"
                      titleHidden
                      allowMultiple
                      choices={[
                        { label: "Active", value: "ACTIVE" },
                        { label: "Draft", value: "DRAFT" },
                        { label: "Archived", value: "ARCHIVED" },
                      ]}
                      selected={statusValue}
                      onChange={setStatusValue}
                    />
                  ),
                },
                {
                  key: "productType",
                  label: "Product type",
                  filter: (
                    <TextField
                      label="Product type"
                      labelHidden
                      value={productTypeValue}
                      onChange={setProductTypeValue}
                      autoComplete="off"
                    />
                  ),
                },
                {
                  key: "vendor",
                  label: "Vendor",
                  filter: (
                    <TextField
                      label="Vendor"
                      labelHidden
                      value={vendorValue}
                      onChange={setVendorValue}
                      autoComplete="off"
                    />
                  ),
                },
              ]}
            />
          </Box>
          <IndexTable
            itemCount={products.length}
            selectable={false}
            loading={isSearching}
            headings={[
              { title: 'Product' },
              { title: 'Status' },
              { title: 'Inventory' },
              { title: 'Type' },
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
