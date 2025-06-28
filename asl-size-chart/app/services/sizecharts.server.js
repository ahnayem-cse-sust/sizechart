import { authenticate } from "../shopify.server";
import { getCharts } from "./sizecharts.crud";

async function getNext({admin},after,first){
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($first: Int!, $after: String) {
          products(first: $first, after: $after) {
            edges {
              cursor
              node {
                id
                title
                onlineStorePreviewUrl
                metafield(namespace: "custom", key: "size_chart_id") {
                  value
                }
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
        },
      }
    ); 

    return await queryRequest.json();
}

async function getPrevious({admin},before,last){
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($last: Int!, $before: String) {
          products(last: $last, before: $before) {
            edges {
              cursor
              node {
                id
                title 
                onlineStorePreviewUrl
                metafield(namespace: "custom", key: "size_chart_id") {
                  value
                }
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
        },
      }
    ); 

    return await queryRequest.json();
}

async function getFirst({admin},first){
  const queryRequest = await admin.graphql(
      `#graphql
        query getProducts($first: Int!) {
          products(first: $first) {
            edges {
              cursor
              node {
                id
                title 
                onlineStorePreviewUrl
                metafield(namespace: "custom", key: "size_chart_id") {
                  value
                }
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
          first
        },
      }
    ); 

    return await queryRequest.json();
}


export async function getProducts({ request }) {
  const url = new URL(request.url);
  const after = url.searchParams.get('after'); // Cursor for pagination
  const first = 5;

  const { admin } = await authenticate.admin(request);
  let response;

  if(after){
    response = await getNext({admin}, after, first);
  } else{
    const before = url.searchParams.get('before');
    if(before){
      response = await getPrevious({admin}, before, first);
    } else{
      response = await getFirst({admin},first);
    }
  }  
    

  
  const { edges, pageInfo } = response.data.products;
  const products = edges.map(edge => edge.node);
  console.log(products);
  const sizeCharts = await getCharts();
  const endCursor = pageInfo.endCursor;
  const hasNextPage = pageInfo.hasNextPage;
  const startCursor = pageInfo.startCursor;
  const hasPreviousPage = pageInfo.hasPreviousPage;

  return Response.json({ products, sizeCharts, hasNextPage, endCursor, hasPreviousPage, startCursor });
}

export async function saveProductSizechart({ request }) {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const sizeChartId = formData.get("sizeChartId");
  
    const { admin } = await authenticate.admin(request);
  
    const response = await admin.graphql(`
      mutation SetMetafield {
        metafieldsSet(metafields: [
          {
            ownerId: "${productId}",
            namespace: "custom",
            key: "size_chart_id",
            type: "single_line_text_field",
            value: "${sizeChartId}"
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
      }
    `);
    console.log(response);
    return response;
}