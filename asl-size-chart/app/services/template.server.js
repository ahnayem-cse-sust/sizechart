import db from '../db.server';

export async function getTemplateList() { 

  const templateList = await db.template.findMany({
      select: {
      id: true,
      title: true,
    },
  });

  return Response.json({
    templateList
  });
}

export async function getPaginatedTemplates({ request }) {
  const PAGE_SIZE = 10;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const totalCount = await db.template.count();

  const templates = await db.template.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
  });

  return Response.json({
    templates,
    pagination: {
      currentPage: page,
      totalPages: Math.max(1, Math.ceil(totalCount / PAGE_SIZE)),
    },
  });
}

export async function saveTemplate({ title, category }) {
  if (!title || !category) {
    return Response.json(
      { error: "Title and category are required" },
      { status: 400 },
    );
  }

  const response = await db.template.create({
    data: {
      "title": title,
      "category": category,
    }
  });
  return Response.json({ template: response });
}

export async function updateTemplate(id, { title, category }) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  if (!title || !category) {
    return Response.json(
      { error: "Title and category are required" },
      { status: 400 },
    );
  }

  const response = await db.template.update({
    where: { id },
    data: {
      "title": title,
      "category": category,
    }
  });
  return Response.json({ template: response });
}

export async function deleteTemplate(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.templateContent.deleteMany({
    where: { template_id: id },
  });

  await db.template.delete({
    where: { id },
  });

  return Response.json({ success: true });
}

export async function getTemplateById(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const template = await db.template.findFirst({
    where: { id },
  });

  return Response.json({ template });
}

export async function updateTemplateContentSerial(serial_json) {

  const data = JSON.parse(serial_json);
  await Promise.all(
    data.map((d) =>
      db.templateContent.update({
        where: { id: d.id },
        data: { serial_no: d.serial_no },
      }),
    ),
  );

  return Response.json({ success: true });
}
