import db from '../db.server';
import { CONTENT_TYPE_IMAGE } from './constants/content';

export async function getTemplateList() {

  const templateList = await db.template.findMany({
    select: {
      id: true,
      title: true,
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const templateIds = templateList.map((t) => t.id);

  // One representative image per template (its first image block, by
  // display order) so the create-chart picker can show a real thumbnail
  // instead of a generic placeholder.
  const imageContents = templateIds.length
    ? await db.templateContent.findMany({
        where: { template_id: { in: templateIds }, content_type: CONTENT_TYPE_IMAGE },
        orderBy: [{ template_id: 'asc' }, { serial_no: 'asc' }],
        select: { template_id: true, content_obj: true },
      })
    : [];

  const firstImageByTemplateId = {};
  for (const content of imageContents) {
    if (!(content.template_id in firstImageByTemplateId) && content.content_obj) {
      firstImageByTemplateId[content.template_id] = content.content_obj;
    }
  }

  const templateListWithThumbnail = templateList.map((template) => ({
    ...template,
    thumbnail: firstImageByTemplateId[template.id] || null,
  }));

  // Group by category so the create-chart picker can lead with a
  // category-level thumbnail (borrowed from any template in that category
  // that has an image) before drilling into individual templates.
  const categoriesByName = {};
  for (const template of templateListWithThumbnail) {
    if (!categoriesByName[template.category]) {
      categoriesByName[template.category] = {
        category: template.category,
        thumbnail: null,
        templates: [],
      };
    }
    const bucket = categoriesByName[template.category];
    bucket.templates.push(template);
    if (!bucket.thumbnail && template.thumbnail) {
      bucket.thumbnail = template.thumbnail;
    }
  }

  return Response.json({
    templateList: templateListWithThumbnail,
    categories: Object.values(categoriesByName),
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
