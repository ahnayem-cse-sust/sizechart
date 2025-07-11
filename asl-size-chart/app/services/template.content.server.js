import db from "../db.server";
import { CONTENT_TYPE_TABLE, CONTENT_TYPE_DESCRIPTION, CONTENT_TYPE_IMAGE } from "./utils/defines";
import { writeFile,unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

export async function getAllTemplateContent(template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const templateContents = await db.templateContent.findMany({
    where: { template_id },
  });

  return Response.json({ templateContents });
}

export async function addBlockByTemplateId(content_type, template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  let content_obj;
  if (content_type == CONTENT_TYPE_TABLE) {
    content_obj = JSON.stringify([
      ["Size", "Chest", "Waist"],
      ["S", "6", "4"],
      ["M", "6", "6"],
      ["L", "7", "8"],
    ]);
  } else {
    content_obj = '';
  }

  const templateContents = await db.templateContent.create({
    data: {
      serial_no: 1,
      template_id: Number(template_id),
      content_type: content_type,
      content_obj: content_obj,
    },
  })

  return Response.json({ templateContents });
}

export async function saveContent(id, content_obj) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const templateContents = await db.templateContent.update({
    where: { id },
    data: {
      content_obj: content_obj,
    },
  });

  return Response.json({ templateContents });
}

export async function saveImageContent(id, content_obj) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  const image = content_obj;

  if (!image || typeof image === 'string') {
    return Response.json({ error: 'Invalid file' }, { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = 'template-content-'+id+'-'+`${uuid()}-${image.name}`;
  const filepath = path.resolve('public/uploads', filename);

  await writeFile(filepath, buffer);

  const content = await db.templateContent.findFirst({
    where: { id },
  });
  
  const templateContents = await db.templateContent.update({
    where: { id },
    data: {
      content_obj: filename,
    },
  });

  if (content.content_obj) {
    const unlink_filepath = path.resolve('public/uploads', content.content_obj);
    await unlink(unlink_filepath);
  }

  return Response.json({ templateContents });
}

export async function deleteContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.templateContent.deleteMany({
    where: { id },
  });

  return Response.json({ success: true });
}

export async function deleteImageContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const content = await db.templateContent.findFirst({
    where: { id },
  });
  
  if (content.content_obj) {
    const unlink_filepath = path.resolve('public/uploads', content.content_obj);
    await unlink(unlink_filepath);
  }

  await db.templateContent.deleteMany({
    where: { id },
  });

  return Response.json({ success: true });
}

