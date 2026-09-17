-- AlterTable
-- Custom padding (vertical/horizontal, px) and font size (px) for the
-- storefront button, on top of the existing small/medium/large preset.
ALTER TABLE "Setting" ADD COLUMN "buttonPaddingVertical" INTEGER NOT NULL DEFAULT 10;
ALTER TABLE "Setting" ADD COLUMN "buttonPaddingHorizontal" INTEGER NOT NULL DEFAULT 16;
ALTER TABLE "Setting" ADD COLUMN "buttonFontSize" INTEGER NOT NULL DEFAULT 14;
