// Handles storefront requests made through the Shopify App Proxy at
// /apps/sizechart (configured in shopify.app.toml under [app_proxy]).
// Using the proxy means the theme extension never needs a hardcoded
// tunnel/production domain and avoids CORS entirely, since the request
// is served from the shop's own domain.
import db from "../db.server";
import { authenticate } from "../shopify.server";
import { renderContentBlocksHtml, renderAvailableSizesHtml, parseAvailableSizes } from "../services/utils/render";
import { getSettings, toStorefrontSettings } from "../services/settings.server";

// The theme extension resolves a chart id itself when it can — the
// product's own metafield, or (for collections Liquid can see) a
// collection's metafield — and sends that as chartId. Liquid's
// `product.collections` only includes collections published to the
// Online Store channel though, so when the extension comes up empty it
// sends productId instead and asks us to check via the Admin API, which
// isn't restricted that way: this is what makes a chart assigned to an
// unpublished or POS-only collection still show up on the product page.
async function resolveChartIdFromProduct(admin, productId) {
  const gid = productId.startsWith("gid://")
    ? productId
    : `gid://shopify/Product/${productId}`;

  const response = await admin.graphql(
    `#graphql
      query ResolveProductChart($id: ID!) {
        product(id: $id) {
          metafield(namespace: "custom", key: "size_chart_id") {
            value
          }
          collections(first: 250) {
            nodes {
              metafield(namespace: "custom", key: "size_chart_id") {
                value
              }
            }
          }
        }
      }`,
    { variables: { id: gid } },
  );

  const result = await response.json();
  const product = result?.data?.product;
  if (!product) return null;

  if (product.metafield?.value) return product.metafield.value;

  const collectionWithChart = (product.collections?.nodes || []).find(
    (collection) => collection.metafield?.value,
  );
  return collectionWithChart?.metafield?.value || null;
}

export async function loader({ request }) {
  const { session, admin } = await authenticate.public.appProxy(request);

  const url = new URL(request.url);
  let chartId = url.searchParams.get("chartId");
  const productId = url.searchParams.get("productId");
  const shop = session?.shop || url.searchParams.get("shop");

  const settings = shop ? toStorefrontSettings(await getSettings(shop)) : null;

  if (!chartId && productId && admin) {
    chartId = await resolveChartIdFromProduct(admin, productId);
  }

  if (!chartId || isNaN(Number(chartId))) {
    return Response.json(
      { success: false, message: "Missing or invalid chartId", data: { title: "", html: "", sizes: [], settings } },
      { status: 400 },
    );
  }

  const chart = await db.chart.findFirst({
    where: { id: Number(chartId) },
  });

  if (!chart) {
    return Response.json(
      { success: false, message: "No size chart found with this id.", data: { title: "", html: "", sizes: [], settings } },
      { status: 404 },
    );
  }

  // A chart's displayed content is its own (ChartContent) — independent of
  // whatever template it may originally have been created from.
  const chartContents = await db.chartContent.findMany({
    where: { chart_id: chart.id },
    orderBy: { serial_no: "asc" },
  });

  const html =
    renderAvailableSizesHtml(chart.available_sizes) +
    renderContentBlocksHtml(chartContents);

  return Response.json({
    success: true,
    message: "",
    data: { title: chart.title, html, sizes: parseAvailableSizes(chart.available_sizes), settings },
  });
}
