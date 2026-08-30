import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'node:crypto';
import { PUBLIC_UPLOAD_PATH } from '../constants/global';

// Only these types are accepted, and the extension used on disk is derived
// from this map — never from the client-supplied filename. This closes off
// path traversal entirely (no user-controlled string ever reaches the path)
// and prevents uploading arbitrary file types (e.g. .html, .js, .php).
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

export async function upload(module_name, obj) {
  try {
    if (!obj || typeof obj.arrayBuffer !== 'function') {
      return false;
    }

    const extension = ALLOWED_TYPES[obj.type];
    if (!extension) {
      return false;
    }

    if (typeof obj.size === 'number' && obj.size > MAX_UPLOAD_BYTES) {
      return false;
    }

    const buffer = Buffer.from(await obj.arrayBuffer());
    if (buffer.byteLength > MAX_UPLOAD_BYTES) {
      return false;
    }

    // The filename is entirely server-generated — no part of it comes from
    // the client, so there's no path-traversal surface here.
    const filename = `${module_name}-${randomUUID()}.${extension}`;
    const uploadDir = path.resolve(PUBLIC_UPLOAD_PATH);
    const filepath = path.resolve(uploadDir, filename);

    // Defense in depth: confirm the resolved path is still inside the
    // upload directory before writing anything to disk.
    if (!filepath.startsWith(uploadDir + path.sep)) {
      return false;
    }

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);
    return filename;
  } catch (error) {
    return false;
  }
}

export async function remove(filename) {
  if (!filename) return true;

  try {
    const uploadDir = path.resolve(PUBLIC_UPLOAD_PATH);
    const filepath = path.resolve(uploadDir, filename);

    // Same guard on delete — never unlink outside the upload directory,
    // even if a stale/corrupted filename ever made it into the database.
    if (!filepath.startsWith(uploadDir + path.sep)) {
      return true;
    }

    await unlink(filepath);
  } catch (error) {
    // Fine if the file was already gone.
  }
  return true;
}
