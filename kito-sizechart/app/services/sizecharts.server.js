// import { authenticate } from "../shopify.server";


// export async function getCharts({ request}) {
  
//     const { admin } = await authenticate.admin(request);
  
//     const queryRequest = await admin.graphql(
//       `#graphql
//       query getProducts {
//         products ( first: 5 ) {
//           edges {
//             node {
//               id
//               title
//               handle
//             }
//           }
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//         }
//       }`
//     );
  
//     const response = await queryRequest.json();
//     const products = response.data.products.edges;
  
//     let result = [];
  
//     products.forEach(({ node }) => {
//       result.push(node);
//     });
    
//     console.log(result);

//   return result;
// }

// export async function createChart({ title, handle }) {
//   sizeCharts.push({ id: String(Date.now()), title, handle });
// }


// app/routes/products.jsx

import { authenticate } from "../shopify.server";

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
    response = await getPrevious({admin}, before, first);
  }

  // const queryRequest = await admin.graphql(
  //     `#graphql
  //       query getProducts($first: Int!, $after: String) {
  //         products(first: $first, after: $after) {
  //           edges {
  //             cursor
  //             node {
  //               id
  //               title
  //             }
  //           }
  //           pageInfo {
  //             hasNextPage
  //             endCursor
  //             hasPreviousPage
  //             startCursor
  //           }
  //         }
  //       }`,
  //     {
  //       variables: {
  //         first,
  //         after,
  //       },
  //     }
  //   );  
    

  
  const { edges, pageInfo } = response.data.products;
  const products = edges.map(edge => edge.node);
  const endCursor = pageInfo.endCursor;
  const hasNextPage = pageInfo.hasNextPage;
  const startCursor = pageInfo.startCursor;
  const hasPreviousPage = pageInfo.hasPreviousPage;

  return Response.json({ products, hasNextPage, endCursor, hasPreviousPage, startCursor });
}