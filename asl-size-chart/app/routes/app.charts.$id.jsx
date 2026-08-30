import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Box,
  Divider,
  EmptyState,
} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { TitleBar } from "@shopify/app-bridge-react";
import { getChartById } from "../services/chart.server";
import { getAllTemplateContent } from "../services/template.content.server";
import { getTemplateList } from "../services/template.server";
import { CHART_BASE_URL } from "../services/constants/routes";
import { CONTENT_TYPE_DESCRIPTION, CONTENT_TYPE_TABLE, CONTENT_TYPE_IMAGE } from "../services/constants/content";
import ChartFormComponent from "../components/chart/form";
import { authenticate } from "../shopify.server";

export async function loader({ request, params }) {
  await authenticate.admin(request);

  const id = Number(params.id);
  const chartResponse = await getChartById(id);
  const { chart } = await chartResponse.json();

  if (!chart) {
    throw new Response("Not found", { status: 404 });
  }

  const templatesResponse = await getTemplateList();
  const { templateList } = await templatesResponse.json();

  let templateContents = [];
  if (chart.template_id) {
    const contentResponse = await getAllTemplateContent(chart.template_id);
    const contentData = await contentResponse.json();
    templateContents = contentData.templateContents || [];
  }

  return Response.json({ chart, templateList, templateContents });
}

function DescriptionPreview({ content }) {
  let description = content.content_obj || "";
  try {
    description = JSON.parse(description);
  } catch {
    // already a plain string
  }
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
}

function TablePreview({ content }) {
  let rows = [];
  try {
    rows = JSON.parse(content.content_obj);
  } catch {
    rows = [];
  }
  if (!rows.length) return null;
  const [header, ...body] = rows;
  return (
    <Box overflowX="scroll">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid var(--p-color-border)" }}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "8px", borderBottom: "1px solid var(--p-color-border-subdued)" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

function ImagePreview({ content }) {
  if (!content.content_obj) return null;
  return (
    <img
      src={`/uploads/${content.content_obj}`}
      alt="Size chart"
      style={{ maxWidth: "100%", borderRadius: 8 }}
    />
  );
}

export default function ChartView() {
  const { chart, templateList, templateContents } = useLoaderData();

  return (
    <Page
      backAction={{ content: "Charts", url: CHART_BASE_URL }}
      title={chart.title}
      titleMetadata={<Badge tone="success">Active</Badge>}
    >
      <TitleBar title={`Size Chart \\ ${chart.title}`} />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Chart details
                </Text>
                <ChartFormComponent templates={templateList} chart={chart} />
              </InlineStack>
              <Divider />
              <InlineStack gap="600">
                <BlockStack gap="100">
                  <Text as="span" tone="subdued" variant="bodySm">
                    Template
                  </Text>
                  <Text as="span" variant="bodyMd" fontWeight="medium">
                    {chart.template?.title || "No template linked"}
                  </Text>
                </BlockStack>
                <BlockStack gap="100">
                  <Text as="span" tone="subdued" variant="bodySm">
                    Available sizes
                  </Text>
                  <InlineStack gap="100">
                    {(() => {
                      let sizes = [];
                      try {
                        sizes = JSON.parse(chart.available_sizes || "[]");
                      } catch {
                        sizes = [];
                      }
                      return sizes.length ? (
                        sizes.map((s, i) => <Badge key={i}>{s.value ?? s}</Badge>)
                      ) : (
                        <Text as="span" tone="subdued">
                          None set
                        </Text>
                      );
                    })()}
                  </InlineStack>
                </BlockStack>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Storefront preview
              </Text>
              <Text as="p" tone="subdued" variant="bodySm">
                This is the content merchants will see on the product page,
                pulled live from the "{chart.template?.title}" template. To
                change the content itself, edit the template.
              </Text>
              {templateContents.length === 0 ? (
                <EmptyState
                  heading="This template has no content yet"
                  image=""
                >
                  <Text as="p" tone="subdued">
                    Add blocks to the linked template to see a preview here.
                  </Text>
                </EmptyState>
              ) : (
                <BlockStack gap="400">
                  {templateContents.map((content) => (
                    <div key={content.id}>
                      {content.content_type === CONTENT_TYPE_DESCRIPTION && (
                        <DescriptionPreview content={content} />
                      )}
                      {content.content_type === CONTENT_TYPE_TABLE && (
                        <TablePreview content={content} />
                      )}
                      {content.content_type === CONTENT_TYPE_IMAGE && (
                        <ImagePreview content={content} />
                      )}
                    </div>
                  ))}
                </BlockStack>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
