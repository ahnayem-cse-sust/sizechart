import { useLoaderData, Form } from '@remix-run/react';
import { Layout } from '@shopify/polaris';
import React from 'react'
import { authenticate } from '../shopify.server';


export async function loader({ request }) {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
        `#graphql
  query ProductMetafield($namespace: String!, $key: String!, $ownerId: ID!) {
    product(id: $ownerId) {
      linerMaterial: metafield(namespace: $namespace, key: $key) {
        value
      }
    }
  }`,
        {
            variables: {
                "namespace": "my_fields",
                "key": "liner_material",
                "ownerId": "gid://shopify/Product/7486879563845"
            },
        },
    );

    const data = await response.json();

    return Response.json(data);

}

// export async function action({ request }) {
//     const formData = await request.formData();
//     // const user = await getUser(request);

//     // await updateUser(user.id, {
//     //   description: formData.get("description"),
//     //   displayName: formData.get("displayName"),
//     // });

//     return Response.json({ ok: true, displayName: formData.get("displayName"), description: formData.get("description") });
// }


const Test = () => {
    const user = useLoaderData();
    console.log(user);
    return (

        <Layout>
            <ui-title-bar title="Products">
                <button >Secondary action</button>
                <button variant="primary" >
                    Primary action
                </button>
            </ui-title-bar>
            <Form method="post">
                <h1>Settings for {user.displayName}</h1>

                <input
                    name="displayName"
                    defaultValue={user.displayName}
                />
                <input name="description" defaultValue={user.description} />

                <button type="submit">Save</button>
            </Form>

        </Layout>

    )
}

export default Test
