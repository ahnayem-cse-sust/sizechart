import db from '../db.server';

export async function getPaginatedCharts({ request }) {
  const PAGE_SIZE = 10;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const totalCount = await db.chart.count();

  const charts = await db.chart.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
    include: { template: { select: { id: true, title: true } } },
  });

  return Response.json({
    charts,
    pagination: {
      currentPage: page,
      totalPages: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
    },
  });
}

export async function getChartById(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const chart = await db.chart.findFirst({
    where: { id },
    include: { template: true },
  });

  return Response.json({ chart });
}

export async function saveChart({ title, templateId, sizeList }) {
  if (!title || !templateId) {
    return Response.json(
      { error: "Title and template are required" },
      { status: 400 },
    );
  }

  const response = await db.chart.create({
    data: {
      title,
      template_id: Number(templateId),
      available_sizes: normalizeSizeList(sizeList),
    },
  });

  return Response.json({ chart: response });
}

export async function updateChart(id, { title, templateId, sizeList }) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = {};
  if (title !== undefined) data.title = title;
  if (templateId !== undefined && templateId !== null && templateId !== "") {
    data.template_id = Number(templateId);
  }
  if (sizeList !== undefined) data.available_sizes = normalizeSizeList(sizeList);

  const response = await db.chart.update({
    where: { id },
    data,
  });

  return Response.json({ chart: response });
}

export async function deleteChart(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.chart.delete({
    where: { id },
  });

  return Response.json({ success: true });
}

function normalizeSizeList(sizeList) {
  // The chart form already sends a JSON-stringified array; fall back to
  // stringifying it ourselves if a raw array/string slipped through.
  if (typeof sizeList === "string") {
    try {
      JSON.parse(sizeList);
      return sizeList;
    } catch {
      return JSON.stringify([]);
    }
  }
  return JSON.stringify(sizeList ?? []);
}
