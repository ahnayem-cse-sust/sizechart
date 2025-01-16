import React from 'react';
import {Card, Text} from '@shopify/polaris';
import { useLoaderData } from "@remix-run/react";
import { authenticate } from '../shopify.server';

export async function loader({request}) {
    
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
    const collectionList = useLoaderData();
    console.log(collectionList);
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  )
}

export default collections;