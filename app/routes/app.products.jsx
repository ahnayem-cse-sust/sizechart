import { useLoaderData, Form } from '@remix-run/react';
import { Card,Layout, Text} from '@shopify/polaris';
import React from 'react'
import { authenticate } from '../shopify.server';


export async function loader({ request }) {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
        `#graphql
  query GetProducts {
    products(first: 10) {
      nodes {
        id
        title
      }
    }
  }`,
    );

    const data = await response.json();

    return data;

}


const collections = () => {
    const loaderData = useLoaderData();
    const productList = loaderData.data.products.nodes;

    console.log(productList);
    return (

        <Layout>
            {productList.map((product) => {
                return (
                    <Card key={product.id}>
                        <Text as="h2" variant="bodyMd">
                            {product.title}
                        </Text>
                    </Card>
                )
            })}

        </Layout>

    )
}

export default collections;
