import db from "../db.server";
import { normalizeButtonDesign } from "./utils/buttonDesign";

export const SIZE_SELECTOR_MODES = ["theme", "app"];

const DEFAULTS = {
  unit: "in",
  buttonLabel: "Size Chart",
  buttonColor: "#1A1A1A",
  buttonTextColor: "#FFFFFF",
  buttonPositionVertical: "bottom",
  buttonPositionHorizontal: "right",
  buttonTextOrientation: "horizontal",
  buttonShapeTopLeft: "pill",
  buttonShapeTopRight: "pill",
  buttonShapeBottomRight: "pill",
  buttonShapeBottomLeft: "pill",
  buttonSize: "medium",
  buttonBorderWidth: 0,
  buttonBorderColor: "#1A1A1A",
  buttonShadow: "soft",
  buttonIcon: "list",
  showIcon: true,
  showOnProductPage: true,
  sizeSelectorMode: "theme",
};

export async function getSettings(shop) {
  const setting = await db.setting.findUnique({ where: { shop } });
  if (!setting) return { shop, ...DEFAULTS };
  // Defensively fill in any field the DB/client doesn't have yet (e.g. a
  // migration was applied but the Prisma Client wasn't regenerated, or an
  // older row predates a newer column) so callers never see `undefined`.
  return { ...DEFAULTS, ...setting };
}

export async function saveSettings(shop, data) {
  const payload = {
    unit: data.unit ?? DEFAULTS.unit,
    buttonLabel: data.buttonLabel?.trim() || DEFAULTS.buttonLabel,
    buttonColor: data.buttonColor || DEFAULTS.buttonColor,
    buttonTextColor: data.buttonTextColor || DEFAULTS.buttonTextColor,
    ...normalizeButtonDesign(data, DEFAULTS),
    showIcon: Boolean(data.showIcon),
    showOnProductPage: Boolean(data.showOnProductPage),
    sizeSelectorMode: SIZE_SELECTOR_MODES.includes(data.sizeSelectorMode)
      ? data.sizeSelectorMode
      : DEFAULTS.sizeSelectorMode,
  };

  const setting = await db.setting.upsert({
    where: { shop },
    create: { shop, ...payload },
    update: payload,
  });

  return setting;
}

/**
 * The subset of settings that's safe to expose to the storefront (public,
 * unauthenticated) via the app proxy. Excludes internal fields like `unit`,
 * which only affects the admin template-authoring experience.
 */
export function toStorefrontSettings(setting) {
  return {
    buttonLabel: setting.buttonLabel,
    buttonColor: setting.buttonColor,
    buttonTextColor: setting.buttonTextColor,
    buttonPositionVertical: setting.buttonPositionVertical,
    buttonPositionHorizontal: setting.buttonPositionHorizontal,
    buttonTextOrientation: setting.buttonTextOrientation,
    buttonShapeTopLeft: setting.buttonShapeTopLeft,
    buttonShapeTopRight: setting.buttonShapeTopRight,
    buttonShapeBottomRight: setting.buttonShapeBottomRight,
    buttonShapeBottomLeft: setting.buttonShapeBottomLeft,
    buttonSize: setting.buttonSize,
    buttonBorderWidth: setting.buttonBorderWidth,
    buttonBorderColor: setting.buttonBorderColor,
    buttonShadow: setting.buttonShadow,
    buttonIcon: setting.buttonIcon,
    showIcon: setting.showIcon,
    showOnProductPage: setting.showOnProductPage,
    sizeSelectorMode: setting.sizeSelectorMode,
  };
}
