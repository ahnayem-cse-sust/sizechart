import { useLoaderData } from '@remix-run/react';
import {
  Page, Layout,
  Text,
  InlineStack
} from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { Outlet, useLocation } from '@remix-run/react';
import { ChartListComponent } from '../components/chart/list';
import ChartFormComponent from '../components/chart/form';
import { getPaginatedCharts, deleteChart, saveChart, updateChart } from '../services/chart.server';
import { CHART_BASE_URL } from '../services/constants/routes';
import { INTENT,INTENT_DELETE,INTENT_CREATE,INTENT_UPDATE } from '../services/constants/global';
import { getTemplateList} from '../services/template.server';
import { authenticate } from '../shopify.server';

export async function loader({ request }) {
  await authenticate.admin(request);

  const response = await getPaginatedCharts({ request });
  const listData = await response.json();
  const charts = listData.charts; 
  const pagination = listData.pagination;
  const templatesResponse = await getTemplateList();
  const templates = await templatesResponse.json();
  const templateList = templates.templateList;

  return Response.json({ charts, pagination, templateList });
}


export async function action({ request }) {
  await authenticate.admin(request);

  const form = await request.formData();
  const intent = form.get(INTENT);

  let response;

  switch (intent) {
    case INTENT_DELETE:
      response = await deleteChart(Number(form.get("id")));
      break;
    case INTENT_CREATE:
      response = await saveChart({ title: form.get("title"), templateId: form.get("templateId")
                 , sizeList: form.get("sizeList") });
      break;
    case INTENT_UPDATE:
      response = await updateChart(Number(form.get("id")), { title: form.get("title"), templateId: form.get("templateId"), sizeList: form.get("sizeList") });
      break;

    default:
      response = Response.json({ error: "Invalid intent" }, { status: 400 });
      break;
  }

  return response;
}

export default function Charts() {
  const { charts, pagination, templateList } = useLoaderData();
  const location = useLocation();
  const isBaseRoute = location.pathname === CHART_BASE_URL;

  if (!isBaseRoute) {
    return <Outlet />;
  }

  return (
    <Page>
      <TitleBar title="Size Chart \ Charts" />
      <Layout>
        <Layout.Section>
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingLg">
                Manage Charts
              </Text>
              <Text as="p" tone="subdued" variant="bodySm">
                Combine a template with a set of available sizes, then attach
                the chart to a product from the Products tab.
              </Text>
            </div>
            <ChartFormComponent templates={templateList} chart={null} />
          </InlineStack>
        </Layout.Section>

        <Layout.Section>
          <ChartListComponent charts={charts} pagination={pagination} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
