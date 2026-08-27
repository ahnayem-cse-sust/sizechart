import db from "../db.server";

export const BUTTON_POSITIONS = [
  "top-right",
  "top-left",
  "middle-right",
  "middle-left",
  "bottom-right",
  "bottom-left",
];

const DEFAULTS = {
  unit: "in",
  buttonLabel: "Size Chart",
  buttonColor: "#1A1A1A",
  buttonTextColor: "#FFFFFF",
  buttonPosition: "bottom-right",
  showIcon: true,
  showOnProductPage: true,
};

export async function getSettings(shop) {
  const setting = await db.setting.findUnique({ where: { shop } });
  if (setting) return setting;
  return { shop, ...DEFAULTS };
}

export async function saveSettings(shop, data) {
  const payload = {
    unit: data.unit ?? DEFAULTS.unit,
    buttonLabel: data.buttonLabel?.trim() || DEFAULTS.buttonLabel,
    buttonColor: data.buttonColor || DEFAULTS.buttonColor,
    buttonTextColor: data.buttonTextColor || DEFAULTS.buttonTextColor,
    buttonPosition: BUTTON_POSITIONS.includes(data.buttonPosition)
      ? data.buttonPosition
      : DEFAULTS.buttonPosition,
    showIcon: Boolean(data.showIcon),
    showOnProductPage: Boolean(data.showOnProductPage),
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
    buttonPosition: setting.buttonPosition,
    showIcon: setting.showIcon,
    showOnProductPage: setting.showOnProductPage,
  };
}
