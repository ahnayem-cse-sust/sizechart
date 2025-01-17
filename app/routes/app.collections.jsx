import React from 'react';
import { Card, Layout, Text } from '@shopify/polaris';
import { useLoaderData } from "@remix-run/react";
import { authenticate } from '../shopify.server';

export async function loader({ request }) {

  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
        query {
          collections(first: 5) {
            edges {
              node {
                id
                title
                handle
                updatedAt
                sortOrder
              }
            }
          }
        }`,
  );

  const data = await response.json();

  return data;
}


const collections = () => {
  const loaderData = useLoaderData();
  const collectionList = loaderData.data.collections.edges;

  console.log(collectionList);

  return (
    
  <Layout>
    <div style={{margin:"100px"}}> 
    <br />
    {
      collectionList.map((collection) => {
        return (
          <Card key={collection.node.id}>
            <Text as="h2" variant="bodyMd">
              {collection.node.title}
            </Text>
          </Card>
        );
      })
    }
    </div>
    </Layout>
  )

}

export default collections;