import db from "../db.server";
import * as content_constants from './constants/content';
import * as upload_util from "./utils/upload";

const moduleName = 'Template-Content';

export async function contentFactory({ request }) {
  const form = await request.formData();
  const intent = form.get(content_constants.INTENT);

  let response;

  switch (intent) {
    case content_constants.INTENT_ADD_BLOCK:
      response = await addBlockByTemplateId(form.get("content_type"), Number(form.get("template_id")));
      break;

    case content_constants.INTENT_SAVE_BLOCK:
      response = await saveContent(Number(form.get("content_id")), form.get("content_obj"));
      break;

    case content_constants.INTENT_SAVE_IMAGE_BLOCK:
      response = await saveImageContent(Number(form.get("content_id")), form.get("content_obj"));
      break;

    case content_constants.INTENT_CONTENT_DELETE:
      response = await deleteContentByContentId(Number(form.get("content_id")));
      break;

    case content_constants.INTENT_IMAGE_CONTENT_DELETE:
      response = await deleteImageContentByContentId(Number(form.get("content_id")));
      break;

    default:
      response = Response.json({ error: "Invalid intent" }, { status: 400 });
      break;
  }

  return response;
}

export async function getAllTemplateContent(template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const templateContents = await db.templateContent.findMany({
    where: { template_id },
    orderBy: [
      {
        serial_no: 'asc',
      },
    ],
  });

  return Response.json({ templateContents });
}

async function addBlockByTemplateId(content_type, template_id) {
  if (isNaN(template_id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  let content_obj;
  if (content_type == content_constants.CONTENT_TYPE_TABLE) {
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

async function saveContent(id, content_obj) {
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

async function saveImageContent(id, content_obj) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  const image = content_obj;

  if (!image || typeof image === 'string') {
    return Response.json({ error: 'Invalid file' }, { status: 400 });
  }

  const fileName = await upload_util.upload(moduleName, image);

  if (!fileName)
    return Response.json({ error: 'Upload error' }, { status: 400 });

  const oldContent = await db.templateContent.findFirst({
    where: { id },
  });

  await upload_util.remove(oldContent.content_obj);

  const templateContents = await db.templateContent.update({
    where: { id },
    data: {
      content_obj: fileName,
    },
  });

  return Response.json({ templateContents });
}

async function deleteContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.templateContent.deleteMany({
    where: { id },
  });

  return Response.json({ success: true });
}

async function deleteImageContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const content = await db.templateContent.findFirst({
    where: { id },
  });

  await upload_util.remove(content.content_obj);

  await db.templateContent.deleteMany({
    where: { id },
  });

  return Response.json({ success: true });
}

