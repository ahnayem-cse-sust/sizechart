import db from "../db.server";

export async function getAllTemplateContent(template_id) {
  if (isNaN(template_id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const templateContents = await db.templateContent.findMany({
      where: { template_id },
    });

    return Response.json({ templateContents });
}

