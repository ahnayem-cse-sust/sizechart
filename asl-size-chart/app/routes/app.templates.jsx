import { useLoaderData } from '@remix-run/react';
import { Button, Page, Layout, Card } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { Outlet, useLocation } from '@remix-run/react';
import { TemplateListComponent } from '../components/template/list';
import { getList } from '../services/template.server';


export async function loader({ request }) {
  const response = await getList({ request });
  const listData = await response.json();
  return Response.json({ listData });
}

export default function SizeChartTemplates() {
  const { listData } = useLoaderData();
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
            <TemplateListComponent data={listData} />
          </Layout.Section>
        </Layout>
      </Page>)}
      {!isBaseRoute && (
        <Outlet />
      )}
    </div>
  );
}
