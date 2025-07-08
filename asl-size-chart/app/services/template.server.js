import db from '../db.server';

const template_categories = [
  { label: 'Select an option', value: '', disabled: true },
  { label: 'Mens Fashion', value: 'Mens Fashion' },
  { label: 'Womens Fashion', value: 'Womens Fashion' },
  { label: 'Kids Fashion', value: 'Kids Fashion' }
];

export async function getTemplateCategoryList() {
  return template_categories;
}

export async function getPaginatedTemplates({ request }) {
  const PAGE_SIZE = 3;
  const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
  
      const totalCount = await db.Template.count();
  
      const templates = await db.template.findMany({
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
          orderBy: { createdAt: "desc" },
      });
  
      return Response.json({
          templates,
          pagination: {
              currentPage: page,
              totalPages: Math.ceil(totalCount / PAGE_SIZE),
          },
      });
}

export async function saveTemplate({ title, category }) {
  const response = await db.template.create({
    data: {
      "title": title,
      "category": category,
    }
  });
  return response;
}

export async function deleteTemplate(id) {
    if (isNaN(id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    // delete related contents first if needed
    // await db.templateContent.deleteMany({
    //   where: { template_id: id },
    // });

    await db.template.delete({
      where: { id },
    });

    return Response.json({ success: true });
}