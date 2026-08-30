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
import { getPaginatedTemplates, deleteTemplate, saveTemplate, updateTemplate, updateTemplateContentSerial } from '../services/template.server';
import { TEMPLATE_CATEGORIES } from '../services/utils/defines';
import { TEMPLATE_BASE_URL } from '../services/constants/routes';
import { INTENT,INTENT_DELETE,INTENT_CREATE,INTENT_UPDATE,INTENT_UPDATE_SERIAL } from '../services/constants/global';
import { authenticate } from '../shopify.server';

export async function loader({ request }) {
  await authenticate.admin(request);

  const response = await getPaginatedTemplates({ request });
  const listData = await response.json();
  const templates = listData.templates;
  const pagination = listData.pagination;
  return Response.json({ templates, pagination });
}


export async function action({ request }) {
  await authenticate.admin(request);

  const form = await request.formData();
  const intent = form.get(INTENT);

  let response;

  switch (intent) {
    case INTENT_DELETE:
      response = await deleteTemplate(Number(form.get("id")));
      break;
    case INTENT_CREATE:
      response = await saveTemplate({ title: form.get("title"), category: form.get("category") });
      break;
    case INTENT_UPDATE:
      response = await updateTemplate(Number(form.get("id")), { title: form.get("title"), category: form.get("category") });
      break;
    case INTENT_UPDATE_SERIAL:
      response = await updateTemplateContentSerial(form.get("serial_json"));
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

  if (!isBaseRoute) {
    return <Outlet />;
  }

  return (
    <Page>
      <TitleBar title="Size Chart \ Templates" />
      <Layout>
        <Layout.Section>
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                Manage Templates
              </Text>
              <Text as="p" tone="subdued" variant="bodySm">
                Save templates to create multiple size charts in a short time.
              </Text>
            </div>
            <TemplateFormComponent templateCategories={TEMPLATE_CATEGORIES} template={null} />
          </InlineStack>
        </Layout.Section>

        <Layout.Section>
          <TemplateListComponent templates={templates} pagination={pagination} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
