import db from "../db.server";
import * as content_constants from './constants/content';
import * as upload_util from "./utils/upload";
import { INTENT, INTENT_UPDATE_SERIAL } from './constants/global';

const moduleName = 'Chart-Content';

export async function chartContentFactory({ request }) {
  const form = await request.formData();
  const intent = form.get(INTENT);

  let response;

  switch (intent) {
    case content_constants.INTENT_ADD_BLOCK:
      response = await addBlockByChartId(form.get("content_type"), Number(form.get("chart_id")));
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

    case INTENT_UPDATE_SERIAL:
      response = await updateChartContentSerial(form.get("serial_json"));
      break;

    default:
      response = Response.json({ error: "Invalid intent" }, { status: 400 });
      break;
  }

  return response;
}

export async function getAllChartContent(chart_id) {
  if (isNaN(chart_id)) {
    return [];
  }

  return db.chartContent.findMany({
    where: { chart_id },
    orderBy: [{ serial_no: 'asc' }],
  });
}

/**
 * Copies a template's current content blocks into a chart's own
 * ChartContent rows. Used both when a chart is first created from a
 * template, and as a one-time backfill for charts that existed before
 * charts had their own editable content.
 */
export async function cloneTemplateContentIntoChart(template_id, chart_id) {
  if (isNaN(template_id) || isNaN(chart_id)) return;

  const templateContents = await db.templateContent.findMany({
    where: { template_id: Number(template_id) },
    orderBy: [{ serial_no: 'asc' }],
  });

  if (templateContents.length === 0) return;

  await db.chartContent.createMany({
    data: templateContents.map((content) => ({
      chart_id: Number(chart_id),
      serial_no: content.serial_no,
      content_type: content.content_type,
      // Image blocks share the same uploaded file rather than copying it —
      // both the template and the new chart point at the same filename.
      content_obj: content.content_obj,
    })),
  });
}

async function addBlockByChartId(content_type, chart_id) {
  if (isNaN(chart_id)) {
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

  const lastBlock = await db.chartContent.findFirst({
    where: { chart_id: Number(chart_id) },
    orderBy: { serial_no: 'desc' },
  });
  const nextSerial = (lastBlock?.serial_no ?? 0) + 1;

  const chartContents = await db.chartContent.create({
    data: {
      serial_no: nextSerial,
      chart_id: Number(chart_id),
      content_type: content_type,
      content_obj: content_obj,
    },
  });

  return Response.json({ chartContents });
}

async function saveContent(id, content_obj) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const chartContents = await db.chartContent.update({
    where: { id },
    data: { content_obj },
  });

  return Response.json({ chartContents });
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

  const oldContent = await db.chartContent.findFirst({ where: { id } });

  await upload_util.remove(oldContent.content_obj);

  const chartContents = await db.chartContent.update({
    where: { id },
    data: { content_obj: fileName },
  });

  return Response.json({ chartContents });
}

async function deleteContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.chartContent.deleteMany({ where: { id } });

  return Response.json({ success: true });
}

async function deleteImageContentByContentId(id) {
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const content = await db.chartContent.findFirst({ where: { id } });

  await upload_util.remove(content.content_obj);

  await db.chartContent.deleteMany({ where: { id } });

  return Response.json({ success: true });
}

async function updateChartContentSerial(serial_json) {
  const data = JSON.parse(serial_json);
  await Promise.all(
    data.map((d) =>
      db.chartContent.update({
        where: { id: d.id },
        data: { serial_no: d.serial_no },
      }),
    ),
  );

  return Response.json({ success: true });
}
