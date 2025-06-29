import { List, Text, Button, Page, Layout, Card } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { useLoaderData, Link } from '@remix-run/react';
import { getList } from '../services/template';


export async function loader() {
  const templates = await getList();
  return Response.json({ templates });
}


export default function SizeChartTemplates() {
  const { templates } = useLoaderData();


  return (
    <Page>
      <TitleBar title="Size Chart \ Templates" />
      <Layout>
        <Layout.Section>
          <Card>
          <div style={{ padding: 20 }}>

            <Button size='large' url='/app/template/create'>
              Create New Template
            </Button>
            <br />
            <br />

            <Text variant="headingLg" as="h5" alignment="left">
              All Existing Templates
            </Text>
            <br />
            <List type='number'>
              {templates.map(template => (
                <List.Item key={template.id}>
                  <strong>{template.title}</strong>
                  &nbsp;
                  {/* <Link to={`/app/chart/${template.id}`}>Edit</Link> */}
                </List.Item>
              ))}
            </List>


          </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
