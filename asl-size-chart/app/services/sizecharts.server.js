import { authenticate } from "../shopify.server";
import { getCharts } from "./sizecharts.crud";

// Fields mirroring what Shopify's own Products list shows: thumbnail,
// status, inventory, type, and vendor — plus the metafield this app uses to
// track which size chart a product has assigned.
const PRODUCT_FIELDS = `
  id
  title
  status
  totalInventory
  productType
  vendor
  onlineStorePreviewUrl
  featuredImage {
    url
    altText
  }
  metafield(namespace: "custom", key: "size_chart_id") {
    value
  }
`;

async function getNext({ admin }, after, first, query) {
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($first: Int!, $after: String, $query: String) {
          products(first: $first, after: $after, query: $query) {
            edges {
              cursor
              node {
                ${PRODUCT_FIELDS}
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
            }
          }
        }`,
      {
        variables: {
          first,
          after,
          query,
        },
      }
    ); 

    return await queryRequest.json();
}

async function getPrevious({ admin }, before, last, query) {
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($last: Int!, $before: String, $query: String) {
          products(last: $last, before: $before, query: $query) {
            edges {
              cursor
              node {
                ${PRODUCT_FIELDS}
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
            }
          }
        }`,
      {
        variables: {
          last,
          before,
          query,
        },
      }
    ); 

    return await queryRequest.json();
}

async function getFirst({ admin }, first, query) {
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($first: Int!, $query: String) {
          products(first: $first, query: $query) {
            edges {
              cursor
              node {
                ${PRODUCT_FIELDS}
              }
            }
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
            }
          }
        }`,
      {
        variables: {
          first,
          query,
        },
      }
    ); 

    return await queryRequest.json();
}


export async function getProducts({ request }) {
  const url = new URL(request.url);
  const after = url.searchParams.get('after'); // Cursor for pagination
  const before = url.searchParams.get('before');
  const search = url.searchParams.get('search') || '';
  const status = (url.searchParams.get('status') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const productType = url.searchParams.get('productType') || '';
  const vendor = url.searchParams.get('vendor') || '';

  // Shopify's search syntax: unqualified terms already match title (among
  // other fields); the rest are field-qualified clauses, ANDed together by
  // just separating them with spaces. Multiple statuses are ORed within
  // their own clause.
  const clauses = [];
  if (search) clauses.push(`title:*${search}*`);
  if (status.length) clauses.push(`(${status.map((s) => `status:${s.toLowerCase()}`).join(' OR ')})`);
  if (productType) clauses.push(`product_type:*${productType}*`);
  if (vendor) clauses.push(`vendor:*${vendor}*`);
  const query = clauses.length ? clauses.join(' ') : null;

  const first = 10;

  const { admin } = await authenticate.admin(request);
  let response;

  if(after){
    response = await getNext({admin}, after, first, query);
  } else{
    if(before){
      response = await getPrevious({admin}, before, first, query);
    } else{
      response = await getFirst({admin}, first, query);
    }
  }  
    

  
  const { edges, pageInfo } = response.data.products;
  const products = edges.map(edge => edge.node);
  const sizeCharts = await getCharts();
  const endCursor = pageInfo.endCursor;
  const hasNextPage = pageInfo.hasNextPage;
  const startCursor = pageInfo.startCursor;
  const hasPreviousPage = pageInfo.hasPreviousPage;

  return Response.json({
    products,
    sizeCharts,
    hasNextPage,
    endCursor,
    hasPreviousPage,
    startCursor,
    filters: { search, status, productType, vendor },
  });
}

export async function saveProductSizechart({ request }) {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const sizeChartId = formData.get("sizeChartId");

    const { admin } = await authenticate.admin(request);

    // Clearing the assignment: delete the metafield instead of writing an
    // empty/invalid value to it.
    if (!sizeChartId || sizeChartId === "0") {
      const response = await admin.graphql(
        `#graphql
        mutation DeleteMetafield($input: MetafieldIdentifierInput!) {
          metafieldDelete(input: $input) {
            deletedId
            userErrors {
              field
              message
            }
          }
        }`,
        {
          variables: {
            input: {
              ownerId: productId,
              namespace: "custom",
              key: "size_chart_id",
            },
          },
        },
      );
      const result = await response.json();
      const userErrors = result?.data?.metafieldDelete?.userErrors || [];
      const graphqlErrors = result?.errors || [];
      return {
        success: userErrors.length === 0 && graphqlErrors.length === 0,
        userErrors: userErrors.length ? userErrors : graphqlErrors,
      };
    }

    const response = await admin.graphql(
      `#graphql
      mutation SetMetafield($ownerId: ID!, $value: String!) {
        metafieldsSet(metafields: [
          {
            ownerId: $ownerId,
            namespace: "custom",
            key: "size_chart_id",
            type: "single_line_text_field",
            value: $value
          }
        ]) {
          metafields {
            id
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          ownerId: productId,
          value: sizeChartId,
        },
      },
    );

    const result = await response.json();
    const userErrors = result?.data?.metafieldsSet?.userErrors || [];
    const graphqlErrors = result?.errors || [];
    return {
      success: userErrors.length === 0 && graphqlErrors.length === 0,
      userErrors: userErrors.length ? userErrors : graphqlErrors,
    };
}
