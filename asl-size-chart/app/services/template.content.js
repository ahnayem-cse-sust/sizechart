import db from "../db.server";

const content_types = [
  'Text',
  'Advanced Table',
  'Image'
];

export async function getContentTypeList() {
  return Response.json(content_types);
}

