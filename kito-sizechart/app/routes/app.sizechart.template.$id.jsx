import {List, Text, TextField, Button, InlineError} from '@shopify/polaris';
import { useLoaderData, useActionData, Form, Link } from '@remix-run/react';
import { getChartById, updateChart } from "../services/sizecharts.crud";
import { redirect } from '@remix-run/react';
import {useState, useCallback} from 'react';

export async function loader({ params }) {
  const chart = await getChartById(params.id);
  if(!chart){
    throw new Response("Not found", { status:404 });
  }
  return Response.json({chart});
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const title = formData.get("title")?.trim();
  const content = formData.get("content")?.trim();

  const errors = {};
  if (!title) errors.title = "Title is required";
  if (!content) errors.content = "Content is required";

  if (Object.keys(errors).length) {
    return Response.json({ errors, values: { title, content } }, { status: 400 });
  }

  await updateChart(params.id, { title, content });
  return redirect("/app/sizechart/templates");
}

export default function SizeChartsTemplateEdit() {
  const { chart } = useLoaderData();
  const actionData = useActionData();
  const errors = actionData?.errors || {};

  const [title, setTitle] = useState(chart.title);
  const [content, setContent] = useState(chart.content);

  const handleTitleChange = useCallback(
    (newValue) => setTitle(newValue),
    [],
  );

  const handleContentChange = useCallback(
    (newValue) => setContent(newValue),
    [],
  );


  return (
    <div style={{ padding: 20 }}>
      <Text variant="headingLg" as="h5">
        Edit Sizechart
      </Text>
      <div style={{ padding: 30 }}>
        <Form method='post'>
          <div>
            <TextField 
              label="Title:"
              name="title" 
              value={title} 
              onChange={handleTitleChange}
              autoComplete="off"
            />
            {errors.title &&<InlineError message={errors.title} />}
          </div>
          <div>
            <TextField 
              label="Content:"
              name="content" 
              value={content} 
              multiline={5}
              onChange={handleContentChange}
              autoComplete="off"
            />
            {errors.content &&<InlineError message={errors.content} />}
          </div>
          <Button 
          submit={true}
          >
            Update</Button>
        </Form>
      </div>


    </div>
  );
}
