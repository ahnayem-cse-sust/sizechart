import { List, Text, Button } from '@shopify/polaris';
import { useLoaderData, Link } from '@remix-run/react';
import { getList } from '../services/template';


export async function loader() {
  const templates = await getList();
  return Response.json({ templates });
}


export default function SizeChartTemplates() {
  const { templates } = useLoaderData();


  return (
    <div style={{ padding: 20 }}>
      
      <Button>
        Create New Template
      </Button>
      <br/>

      <Text variant="headingLg" as="h5" alignment="center">
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
  );
}
