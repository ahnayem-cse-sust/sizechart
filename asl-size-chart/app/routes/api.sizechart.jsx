import db from "../db.server";
import { cors } from "remix-utils/cors";
import { renderContentBlocksHtml, renderAvailableSizesHtml } from "../services/utils/render";
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
      data: { title: "", html: "", settings },
    });
    return cors(request, returnResponse);
  }

  const chart = await db.chart.findFirst({
    where: { id: Number(chartId) },
    include: { template: true },
  });

  if (!chart) {
    returnResponse = Response.json({
      status: 404,
      success: false,
      message: "No size chart found with this id.",
      data: { title: "", html: "", settings },
    });
    return cors(request, returnResponse);
  }

  const templateContents = chart.template_id
    ? await db.templateContent.findMany({
        where: { template_id: chart.template_id },
        orderBy: { serial_no: "asc" },
      })
    : [];

  const html =
    renderAvailableSizesHtml(chart.available_sizes) +
    renderContentBlocksHtml(templateContents);

  returnResponse = Response.json({
    status: 200,
    success: true,
    message: "",
    data: {
      title: chart.title,
      html,
      settings,
    },
  });

  return cors(request, returnResponse);
}
