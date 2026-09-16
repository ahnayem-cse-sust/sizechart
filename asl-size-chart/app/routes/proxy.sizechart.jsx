// Handles storefront requests made through the Shopify App Proxy at
// /apps/sizechart (configured in shopify.app.toml under [app_proxy]).
// Using the proxy means the theme extension never needs a hardcoded
// tunnel/production domain and avoids CORS entirely, since the request
// is served from the shop's own domain.
import db from "../db.server";
import { authenticate } from "../shopify.server";
import { renderContentBlocksHtml, renderAvailableSizesHtml, parseAvailableSizes } from "../services/utils/render";
import { getSettings, toStorefrontSettings } from "../services/settings.server";

export async function loader({ request }) {
  const { session } = await authenticate.public.appProxy(request);

  const url = new URL(request.url);
  const chartId = url.searchParams.get("chartId");
  const shop = session?.shop || url.searchParams.get("shop");

  const settings = shop ? toStorefrontSettings(await getSettings(shop)) : null;

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
