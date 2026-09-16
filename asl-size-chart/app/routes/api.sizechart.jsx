import db from "../db.server";
import { cors } from "remix-utils/cors";
import { renderContentBlocksHtml, renderAvailableSizesHtml, parseAvailableSizes } from "../services/utils/render";
import { getSettings, toStorefrontSettings } from "../services/settings.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const chartId = url.searchParams.get("chartId");
  const shop = url.searchParams.get("shop");

  const settings = shop ? toStorefrontSettings(await getSettings(shop)) : null;

  let returnResponse;

  if (!chartId || isNaN(Number(chartId))) {
    returnResponse = Response.json({
      status: 400,
      success: false,
      message: "Missing or invalid chartId",
      data: { title: "", html: "", sizes: [], settings },
    });
    return cors(request, returnResponse);
  }

  const chart = await db.chart.findFirst({
    where: { id: Number(chartId) },
  });

  if (!chart) {
    returnResponse = Response.json({
      status: 404,
      success: false,
      message: "No size chart found with this id.",
      data: { title: "", html: "", sizes: [], settings },
    });
    return cors(request, returnResponse);
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

  returnResponse = Response.json({
    status: 200,
    success: true,
    message: "",
    data: {
      title: chart.title,
      html,
      sizes: parseAvailableSizes(chart.available_sizes),
      settings,
    },
  });

  return cors(request, returnResponse);
}
