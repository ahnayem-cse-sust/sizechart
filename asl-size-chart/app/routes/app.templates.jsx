import { useLoaderData } from '@remix-run/react';
import { Button, Page, Layout, Card } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { Outlet, useLocation } from '@remix-run/react';
import { TemplateListComponent } from '../components/template/list';
import { getPaginatedTemplates,deleteTemplate } from '../services/template.server';


export async function loader({ request }) {
  const response = await getPaginatedTemplates({ request });
  const listData = await response.json();
  const templates = listData.templates;
  const pagination = listData.pagination;
  return Response.json({ templates, pagination });
}

export async function action({ request }) {
  const form = await request.formData();
  const intent = form.get("intent");

  let response;

  switch (intent) {
    case "DELETE":
      response = await deleteTemplate(Number(form.get("id")));
      break;
  
    default:
      response = Response.json({ error: "Invalid intent" }, { status: 400 });
      break;
  }

  return response;

}

export default function SizeChartTemplates() {
  const { templates, pagination } = useLoaderData();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/app/templates";
  // const isCreateRoute = location.pathname === "/app/templates";
  // const isBaseRoute = location.pathname === "/app/templates";


  return (
    <div>
      {isBaseRoute && (<Page>
        <TitleBar title="Size Chart \ Templates" />
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{ padding: 20 }}>

                <Button size='large' url='/app/templates/create'>
                  Create Template
                </Button>
                <br />
                <br />

              </div>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <TemplateListComponent templates={templates} pagination={pagination} />
          </Layout.Section>
        </Layout>
      </Page>)}
      {!isBaseRoute && (
        <Outlet />
      )}
    </div>
  );
}
