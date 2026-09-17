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
  collections(first: 50) {
    nodes {
      title
      metafield(namespace: "custom", key: "size_chart_id") {
        value
      }
    }
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
  const products = edges.map((edge) => {
    const product = edge.node;
    // The product's own metafield always wins. If it's not set, fall back
    // to the first collection (of the ones fetched above) that has its
    // own chart assigned, so a chart set on a collection shows up here
    // too, not just on the storefront. `inheritedFrom` lets the UI show
    // where the value is coming from, since it isn't the product's own.
    let inheritedFrom = null;
    if (!product.metafield?.value) {
      const source = (product.collections?.nodes || []).find(
        (collection) => collection.metafield?.value,
      );
      if (source) {
        inheritedFrom = { title: source.title, value: source.metafield.value };
      }
    }
    return { ...product, inheritedFrom };
  });
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

// Fields mirroring what Shopify's own Collections list shows: thumbnail,
// title, and product count — plus the metafield this app uses to track
// which size chart a collection has assigned.
const COLLECTION_FIELDS = `
  id
  title
  handle
  productsCount {
    count
  }
  image {
    url
    altText
  }
  metafield(namespace: "custom", key: "size_chart_id") {
    value
  }
`;

async function getCollectionsNext({ admin }, after, first, query, sortKey, reverse) {
  const queryRequest = await admin.graphql(
    `#graphql
      query getCollections($first: Int!, $after: String, $query: String, $sortKey: CollectionSortKeys, $reverse: Boolean) {
        collections(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges {
            cursor
            node {
              ${COLLECTION_FIELDS}
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
    { variables: { first, after, query, sortKey, reverse } },
  );

  return await queryRequest.json();
}

async function getCollectionsPrevious({ admin }, before, last, query, sortKey, reverse) {
  const queryRequest = await admin.graphql(
    `#graphql
      query getCollections($last: Int!, $before: String, $query: String, $sortKey: CollectionSortKeys, $reverse: Boolean) {
        collections(last: $last, before: $before, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges {
            cursor
            node {
              ${COLLECTION_FIELDS}
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
    { variables: { last, before, query, sortKey, reverse } },
  );

  return await queryRequest.json();
}

async function getCollectionsFirst({ admin }, first, query, sortKey, reverse) {
  const queryRequest = await admin.graphql(
    `#graphql
      query getCollections($first: Int!, $query: String, $sortKey: CollectionSortKeys, $reverse: Boolean) {
        collections(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
          edges {
            cursor
            node {
              ${COLLECTION_FIELDS}
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
    { variables: { first, query, sortKey, reverse } },
  );

  return await queryRequest.json();
}

export async function getCollections({ request }) {
  const url = new URL(request.url);
  const after = url.searchParams.get('after');
  const before = url.searchParams.get('before');
  const search = url.searchParams.get('search') || '';
  // Mirrors Shopify's own Collections list sort options (Title A-Z/Z-A,
  // Product count high-low/low-high). TITLE ascending is the default,
  // same as the admin's own list.
  const sort = url.searchParams.get('sort') || 'TITLE_ASC';
  const SORT_MAP = {
    TITLE_ASC: { sortKey: 'TITLE', reverse: false },
    TITLE_DESC: { sortKey: 'TITLE', reverse: true },
  };
  const { sortKey, reverse } = SORT_MAP[sort] || SORT_MAP.TITLE_ASC;

  const query = search ? `title:*${search}*` : null;
  const first = 10;

  const { admin } = await authenticate.admin(request);
  let response;

  if (after) {
    response = await getCollectionsNext({ admin }, after, first, query, sortKey, reverse);
  } else if (before) {
    response = await getCollectionsPrevious({ admin }, before, first, query, sortKey, reverse);
  } else {
    response = await getCollectionsFirst({ admin }, first, query, sortKey, reverse);
  }

  const { edges, pageInfo } = response.data.collections;
  const collections = edges.map((edge) => edge.node);
  const sizeCharts = await getCharts();

  return Response.json({
    collections,
    sizeCharts,
    hasNextPage: pageInfo.hasNextPage,
    endCursor: pageInfo.endCursor,
    hasPreviousPage: pageInfo.hasPreviousPage,
    startCursor: pageInfo.startCursor,
    filters: { search, sort },
  });
}

// Fetches every product currently in a collection (paginated — a
// collection can hold more than one page's worth), used to push a
// collection's chart down to each product's own metafield.
async function getAllProductIdsInCollection(admin, collectionId) {
  const productIds = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await admin.graphql(
      `#graphql
        query CollectionProductIds($id: ID!, $after: String) {
          collection(id: $id) {
            products(first: 250, after: $after) {
              nodes {
                id
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }`,
      { variables: { id: collectionId, after } },
    );
    const result = await response.json();
    const products = result?.data?.collection?.products;
    if (!products) break;

    productIds.push(...products.nodes.map((node) => node.id));
    hasNextPage = products.pageInfo.hasNextPage;
    after = products.pageInfo.endCursor;
  }

  return productIds;
}

function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Pushes (or clears) the custom.size_chart_id metafield on every given
// product, in batches — metafieldsSet/metafieldsDelete each accept a
// limited number of entries per call. Returns any errors encountered
// across all batches (an empty array means every batch succeeded).
async function applyChartToProducts(admin, productIds, sizeChartId) {
  const errors = [];
  const batches = chunk(productIds, 25);
  const clearing = !sizeChartId || sizeChartId === "0";

  for (const batch of batches) {
    if (clearing) {
      const response = await admin.graphql(
        `#graphql
          mutation ClearProductCharts($metafields: [MetafieldIdentifierInput!]!) {
            metafieldsDelete(metafields: $metafields) {
              userErrors {
                field
                message
              }
            }
          }`,
        {
          variables: {
            metafields: batch.map((ownerId) => ({
              ownerId,
              namespace: "custom",
              key: "size_chart_id",
            })),
          },
        },
      );
      const result = await response.json();
      errors.push(...(result?.data?.metafieldsDelete?.userErrors || []), ...(result?.errors || []));
    } else {
      const response = await admin.graphql(
        `#graphql
          mutation SetProductCharts($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              userErrors {
                field
                message
              }
            }
          }`,
        {
          variables: {
            metafields: batch.map((ownerId) => ({
              ownerId,
              namespace: "custom",
              key: "size_chart_id",
              type: "single_line_text_field",
              value: sizeChartId,
            })),
          },
        },
      );
      const result = await response.json();
      errors.push(...(result?.data?.metafieldsSet?.userErrors || []), ...(result?.errors || []));
    }
  }

  return errors;
}

export async function saveCollectionSizechart({ request }) {
  const formData = await request.formData();
  const collectionId = formData.get("collectionId");
  const sizeChartId = formData.get("sizeChartId");
  const clearing = !sizeChartId || sizeChartId === "0";

  const { admin } = await authenticate.admin(request);

  // Clearing the assignment: delete the metafield instead of writing an
  // empty/invalid value to it. metafieldDelete was removed as of API
  // version 2025-01 — metafieldsDelete (plural, takes a list) is its
  // replacement. The collection's own metafield is kept as the "default"
  // for any product added to the collection later; every product
  // currently in the collection also gets its own copy written below so
  // the change is immediate and visible on the Products page too.
  let collectionErrors;
  if (clearing) {
    const response = await admin.graphql(
      `#graphql
      mutation DeleteMetafield($metafields: [MetafieldIdentifierInput!]!) {
        metafieldsDelete(metafields: $metafields) {
          deletedMetafields {
            key
            namespace
            ownerId
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          metafields: [
            {
              ownerId: collectionId,
              namespace: "custom",
              key: "size_chart_id",
            },
          ],
        },
      },
    );
    const result = await response.json();
    collectionErrors = [...(result?.data?.metafieldsDelete?.userErrors || []), ...(result?.errors || [])];
  } else {
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
          ownerId: collectionId,
          value: sizeChartId,
        },
      },
    );
    const result = await response.json();
    collectionErrors = [...(result?.data?.metafieldsSet?.userErrors || []), ...(result?.errors || [])];
  }

  if (collectionErrors.length) {
    return { success: false, userErrors: collectionErrors, updatedProductCount: 0 };
  }

  const productIds = await getAllProductIdsInCollection(admin, collectionId);
  const productErrors = productIds.length
    ? await applyChartToProducts(admin, productIds, sizeChartId)
    : [];

  return {
    success: productErrors.length === 0,
    userErrors: productErrors,
    updatedProductCount: productIds.length - productErrors.length,
    totalProductCount: productIds.length,
  };
}

export async function saveProductSizechart({ request }) {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const sizeChartId = formData.get("sizeChartId");

    const { admin } = await authenticate.admin(request);

    // Clearing the assignment: delete the metafield instead of writing an
    // empty/invalid value to it. metafieldDelete was removed as of API
    // version 2025-01 — metafieldsDelete (plural, takes a list) is its
    // replacement.
    if (!sizeChartId || sizeChartId === "0") {
      const response = await admin.graphql(
        `#graphql
        mutation DeleteMetafield($metafields: [MetafieldIdentifierInput!]!) {
          metafieldsDelete(metafields: $metafields) {
            deletedMetafields {
              key
              namespace
              ownerId
            }
            userErrors {
              field
              message
            }
          }
        }`,
        {
          variables: {
            metafields: [
              {
                ownerId: productId,
                namespace: "custom",
                key: "size_chart_id",
              },
            ],
          },
        },
      );
      const result = await response.json();
      const userErrors = result?.data?.metafieldsDelete?.userErrors || [];
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
