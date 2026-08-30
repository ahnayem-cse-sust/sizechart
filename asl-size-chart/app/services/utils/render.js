import {
  CONTENT_TYPE_DESCRIPTION,
  CONTENT_TYPE_TABLE,
  CONTENT_TYPE_IMAGE,
} from "../constants/content";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderDescriptionBlock(content_obj) {
  if (!content_obj) return "";
  let html;
  try {
    html = JSON.parse(content_obj);
  } catch {
    html = content_obj;
  }
  // Quill stores an HTML string; we trust it since it only ever comes from
  // the merchant's own editor, but we still strip <script> tags defensively.
  return `<div class="asc-block asc-block--description">${String(html).replace(
    /<script[\s\S]*?<\/script>/gi,
    "",
  )}</div>`;
}

function renderTableBlock(content_obj) {
  if (!content_obj) return "";
  let rows;
  try {
    rows = JSON.parse(content_obj);
  } catch {
    return "";
  }
  if (!Array.isArray(rows) || rows.length === 0) return "";

  const [headerRow, ...bodyRows] = rows;
  const thead = `<thead><tr>${headerRow
    .map((cell) => `<th>${escapeHtml(cell)}</th>`)
    .join("")}</tr></thead>`;
  const tbody = `<tbody>${bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`,
    )
    .join("")}</tbody>`;

  return `<div class="asc-block asc-block--table"><table class="asc-table">${thead}${tbody}</table></div>`;
}

function renderImageBlock(content_obj) {
  if (!content_obj) return "";
  return `<div class="asc-block asc-block--image"><img src="/uploads/${escapeHtml(
    content_obj,
  )}" alt="Size chart" loading="lazy" /></div>`;
}

/**
 * Renders an ordered list of content blocks (from Template/Chart content
 * tables) into a single HTML string that is safe to inject into the
 * storefront via the theme extension.
 */
export function renderContentBlocksHtml(contents = []) {
  return contents
    .map((block) => {
      switch (block.content_type) {
        case CONTENT_TYPE_DESCRIPTION:
          return renderDescriptionBlock(block.content_obj);
        case CONTENT_TYPE_TABLE:
          return renderTableBlock(block.content_obj);
        case CONTENT_TYPE_IMAGE:
          return renderImageBlock(block.content_obj);
        default:
          return "";
      }
    })
    .join("\n");
}

/**
 * Parses a chart's `available_sizes` JSON column into a plain array of
 * size label strings, regardless of whether entries are stored as plain
 * strings or `{ value }` objects.
 */
export function parseAvailableSizes(available_sizes) {
  if (!available_sizes) return [];
  let sizes;
  try {
    sizes = JSON.parse(available_sizes);
  } catch {
    return [];
  }
  if (!Array.isArray(sizes)) return [];
  return sizes.map((s) => String(s?.value ?? s));
}

/**
 * Renders the "Available sizes" pill list for a chart, if any sizes were
 * configured on it.
 */
export function renderAvailableSizesHtml(available_sizes) {
  const sizes = parseAvailableSizes(available_sizes);
  if (sizes.length === 0) return "";

  const items = sizes
    .map((s) => `<li class="asc-size-pill">${escapeHtml(s)}</li>`)
    .join("");
  return `<div class="asc-block asc-block--sizes"><h3 class="asc-sizes-heading">Available sizes</h3><ul class="asc-size-list">${items}</ul></div>`;
}
