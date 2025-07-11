import { useLoaderData } from '@remix-run/react';
import {
  Page, Layout,
  Text,
  InlineStack
} from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { Outlet, useLocation } from '@remix-run/react';
import { TemplateListComponent } from '../components/template/list';
import TemplateFormComponent from '../components/template/form';
import { getPaginatedTemplates, deleteTemplate } from '../services/template.server';
import { TEMPLATE_CATEGORIES } from '../services/utils/defines';
import { TEMPLATE_BASE_URL } from '../services/constants/routes';
import { INTENT_DELETE } from '../services/constants/global';


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
    case INTENT_DELETE:
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
  const isBaseRoute = location.pathname === TEMPLATE_BASE_URL;
  // const isCreateRoute = location.pathname === "/app/templates";
  // const isBaseRoute = location.pathname === "/app/templates";


  return (
    <div>
      {isBaseRoute && (<Page>
        <TitleBar title="Size Chart \ Templates" />
        <Layout>
          <Layout.Section>
            <InlineStack align="space-between" blockAlign="center">
              <div>
                <Text as="h2" variant="headingLg">
                  Manage Templates
                </Text>
                <Text as="p" tone="subdued" variant="bodyXs">
                  Save templates to create multiple sizecharts in short time.
                </Text>
              </div>
              <TemplateFormComponent templateCategories={TEMPLATE_CATEGORIES} template={null} />
            </InlineStack>
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
