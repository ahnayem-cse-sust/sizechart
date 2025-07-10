import db from "../db.server";
import { CONTENT_TYPE_TABLE,CONTENT_TYPE_DESCRIPTION,CONTENT_TYPE_IMAGE } from "./utils/defines";

export async function getAllTemplateContent(template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const templateContents = await db.templateContent.findMany({
    where: { template_id },
  });

  return Response.json({ templateContents });
}

export async function addTableByTemplateId(template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const content_obj = [
      ["Size", "Chest", "Waist"],
      ["S", "6", "4"],
      ["M", "6", "6"],
      ["L", "7", "8"],
    ];

  const templateContents = await db.templateContent.create({
    data: {
      serial_no: 1,
      template_id: Number(template_id),
      content_type: CONTENT_TYPE_TABLE,
      content_obj: JSON.stringify(content_obj),
    },
  })

  return Response.json({ templateContents });
}

