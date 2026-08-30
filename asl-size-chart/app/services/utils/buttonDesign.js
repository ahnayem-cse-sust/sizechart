// Single source of truth for the storefront button's "design" options.
// Used by:
//  - settings.server.js (validation + defaults)
//  - routes/app.settings.jsx (admin UI + live preview)
//  - extensions/size-chart-block/blocks/size-chart-embed.liquid (mirrors
//    the SHAPE_RADIUS / SIZE_STYLES / SHADOW_STYLES values below by hand,
//    since the theme extension can't import JS from the app — keep both
//    in sync if you change values here)
//
// Position is split into buttonPositionVertical (top/middle/bottom) and
// buttonPositionHorizontal (left/center/right) so they can be set
// independently, e.g. "bottom" + "center".

export const BUTTON_SHAPES = ["pill", "rounded", "square"];
export const BUTTON_SIZES = ["small", "medium", "large"];
export const BUTTON_SHADOWS = ["none", "soft", "strong"];
export const BUTTON_ICONS = ["list", "ruler", "tag", "info"];
export const POSITION_VERTICALS = ["top", "middle", "bottom"];
export const POSITION_HORIZONTALS = ["left", "center", "right"];
export const BUTTON_TEXT_ORIENTATIONS = ["horizontal", "vertical-ttb", "vertical-btt"];

// Each corner is set independently, reusing the same Pill/Rounded/Square
// vocabulary as before (stored as buttonShape<Corner>, e.g.
// buttonShapeTopLeft). CSS field order for `border-radius` shorthand is
// top-left, top-right, bottom-right, bottom-left — BUTTON_CORNERS follows
// that order so it can be mapped straight into the shorthand string.
export const BUTTON_CORNERS = ["topLeft", "topRight", "bottomRight", "bottomLeft"];
export const CORNER_FIELD_NAMES = BUTTON_CORNERS.map(
  (corner) => `buttonShape${corner.charAt(0).toUpperCase()}${corner.slice(1)}`,
);
export const CORNER_LABELS = {
  topLeft: "Top left",
  topRight: "Top right",
  bottomRight: "Bottom right",
  bottomLeft: "Bottom left",
};

export const SHAPE_OPTIONS = [
  { label: "Pill", value: "pill" },
  { label: "Rounded", value: "rounded" },
  { label: "Square", value: "square" },
];

export const SIZE_OPTIONS = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

export const SHADOW_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Soft", value: "soft" },
  { label: "Strong", value: "strong" },
];

export const ICON_OPTIONS = [
  { label: "List", value: "list" },
  { label: "Ruler", value: "ruler" },
  { label: "Tag", value: "tag" },
  { label: "Info", value: "info" },
];

export const POSITION_VERTICAL_OPTIONS = [
  { label: "Top", value: "top" },
  { label: "Middle", value: "middle" },
  { label: "Bottom", value: "bottom" },
];

export const POSITION_HORIZONTAL_OPTIONS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

// Combined vertical+horizontal picker for the admin UI. Value is
// "<vertical>-<horizontal>" (e.g. "bottom-right"); split it back into the
// two stored fields on save. Kept as one control since the two axes are
// always set together in practice, but stored as separate columns so the
// storefront CSS classes (.asc-embed--top-right etc.) don't need to change.
export const POSITION_OPTIONS = POSITION_VERTICALS.flatMap((vertical) =>
  POSITION_HORIZONTALS.map((horizontal) => ({
    label: `${capitalize(vertical)} ${horizontal}`,
    value: `${vertical}-${horizontal}`,
  })),
);

export const TEXT_ORIENTATION_OPTIONS = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical (top to bottom)", value: "vertical-ttb" },
  { label: "Vertical (bottom to top)", value: "vertical-btt" },
];

// CSS for each non-horizontal orientation. `vertical-rl` + `text-orientation:
// mixed` reads top-to-bottom by default; a 180deg flip on top of that is the
// standard cross-browser trick for a bottom-to-top reading (the more
// "obvious" writing-mode: sideways-lr isn't reliably supported in Chrome/
// Safari). Mirrored by hand in the liquid embed below.
export const TEXT_ORIENTATION_STYLES = {
  "vertical-ttb": "writing-mode:vertical-rl;text-orientation:mixed;",
  "vertical-btt":
    "writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);",
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const SHAPE_RADIUS = {
  pill: 999,
  rounded: 10,
  square: 4,
};

export const SIZE_STYLES = {
  small: { padding: "6px 12px", fontSize: "0.75rem", iconSize: 14 },
  medium: { padding: "10px 16px", fontSize: "0.875rem", iconSize: 16 },
  large: { padding: "14px 22px", fontSize: "1rem", iconSize: 18 },
};

export const SHADOW_STYLES = {
  none: "none",
  soft: "0 2px 8px rgba(0,0,0,0.12)",
  strong: "0 8px 24px rgba(0,0,0,0.25)",
};

// Inner <path>/<circle> markup for each icon, kept minimal (24x24 viewBox,
// stroke-based) so the same string works both in JSX (dangerouslySetInnerHTML
// isn't needed since we build the <svg> directly) and in the plain-JS
// template string inside the liquid embed.
export const ICON_PATHS = {
  list: '<path d="M21 6H3M21 12H3M21 18H8"></path>',
  ruler:
    '<path d="M3 17 17 3l4 4L7 21l-4-4Z"></path><path d="m14.5 5.5 2 2"></path><path d="m11.5 8.5 2 2"></path><path d="m8.5 11.5 2 2"></path><path d="m5.5 14.5 2 2"></path>',
  tag: '<path d="M12 2H4a2 2 0 0 0-2 2v8l10.29 10.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42L12 2Z"></path><circle cx="7.5" cy="7.5" r="1.25"></circle>',
  info: '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-5"></path><path d="M12 8h.01"></path>',
};

export function normalizeButtonDesign(data = {}, DEFAULTS) {
  const cornerShapes = {};
  for (const field of CORNER_FIELD_NAMES) {
    cornerShapes[field] = BUTTON_SHAPES.includes(data[field]) ? data[field] : DEFAULTS[field];
  }

  return {
    ...cornerShapes,
    buttonSize: BUTTON_SIZES.includes(data.buttonSize)
      ? data.buttonSize
      : DEFAULTS.buttonSize,
    buttonBorderWidth: clampBorderWidth(data.buttonBorderWidth, DEFAULTS.buttonBorderWidth),
    buttonBorderColor: data.buttonBorderColor || DEFAULTS.buttonBorderColor,
    buttonShadow: BUTTON_SHADOWS.includes(data.buttonShadow)
      ? data.buttonShadow
      : DEFAULTS.buttonShadow,
    buttonIcon: BUTTON_ICONS.includes(data.buttonIcon)
      ? data.buttonIcon
      : DEFAULTS.buttonIcon,
    buttonPositionVertical: POSITION_VERTICALS.includes(data.buttonPositionVertical)
      ? data.buttonPositionVertical
      : DEFAULTS.buttonPositionVertical,
    buttonPositionHorizontal: POSITION_HORIZONTALS.includes(data.buttonPositionHorizontal)
      ? data.buttonPositionHorizontal
      : DEFAULTS.buttonPositionHorizontal,
    buttonTextOrientation: BUTTON_TEXT_ORIENTATIONS.includes(data.buttonTextOrientation)
      ? data.buttonTextOrientation
      : DEFAULTS.buttonTextOrientation,
  };
}

function clampBorderWidth(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(6, Math.max(0, Math.round(n)));
}
