import { useLoaderData, Form } from "@remix-run/react";
import { getCharts, createChart } from "../services/sizecharts.server";
import {useState, useCallback} from 'react';
import {FormLayout, TextField,
  Button,
  List,
  Text,
  Page,

} from '@shopify/polaris';

export async function loader() {
  const charts = await getCharts();
  return Response.json({ charts });
}

export async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  await createChart({ title, body });
  return null;
}

export default function SizeChartsAdmin() {
  const { charts } = useLoaderData();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const handleTitleChange = useCallback(
    (newValue) => setTitle(newValue),
    [],
  );
  
  const handleBodyChange = useCallback(
    (newValue) => setBody(newValue),
    [],
  );

  const handleSubmit = useCallback(
    (form) => {
      setBody('');
      setTitle('');
    },
    [],
  );


  return (
    <Page>
      <Text variant="heading2xl" as="h3">
        Size Charts
      </Text>
        <Form onSubmit={handleSubmit} method="POST">
          <FormLayout>
            {/* <InlineGrid gap="400" columns={2}> */}

            <div>
                <TextField
                  name="title"
                  value={title}
                  label="Title:"
                  onChange={handleTitleChange}
                  autoComplete="off"
                />
                <TextField
                  name="body"
                  value={body}
                  label="Chart content..."
                  onChange={handleBodyChange}
                  autoComplete="off"
                />
            </div>
            {/* </InlineGrid> */}
            <Button submit>Create Chart</Button>
          </FormLayout>
        </Form>
        <br />
        <br />
      <Text variant="headingLg" as="h5">
        Existing Sizecharts
      </Text>
        <br />
      <List type="number">
        {charts.map(chart => (
          <List.Item key={chart.id}>
            <strong>{chart.title}</strong>: {chart.body}
          </List.Item>
        ))}
      </List>
    </Page>
  );
}
