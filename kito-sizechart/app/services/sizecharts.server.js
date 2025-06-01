import { authenticate } from "../shopify.server";


export async function getCharts({ request}) {
  
    const { admin } = await authenticate.admin(request);
  
    const queryRequest = await admin.graphql(
      `#graphql
      query getProducts {
        products ( first: 5 ) {
          edges {
            node {
              id
              title
              handle
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`
    );
  
    const response = await queryRequest.json();
    const products = response.data.products.edges;
  
    let result = [];
  
    products.forEach(({ node }) => {
      result.push(node);
    });
    
    console.log(result);

  return result;
}

export async function createChart({ title, handle }) {
  sizeCharts.push({ id: String(Date.now()), title, handle });
}