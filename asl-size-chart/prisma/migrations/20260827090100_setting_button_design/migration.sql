-- AlterTable
-- NOTE: this migration originally added a single "buttonShape" column, but
-- the app code (buttonDesign.js / settings.server.js) was built around four
-- independent per-corner columns instead. Fixed to match what the schema
-- and code actually use.
ALTER TABLE "Setting" ADD COLUMN "buttonShapeTopLeft" TEXT NOT NULL DEFAULT 'pill';
ALTER TABLE "Setting" ADD COLUMN "buttonShapeTopRight" TEXT NOT NULL DEFAULT 'pill';
ALTER TABLE "Setting" ADD COLUMN "buttonShapeBottomRight" TEXT NOT NULL DEFAULT 'pill';
ALTER TABLE "Setting" ADD COLUMN "buttonShapeBottomLeft" TEXT NOT NULL DEFAULT 'pill';
ALTER TABLE "Setting" ADD COLUMN "buttonSize" TEXT NOT NULL DEFAULT 'medium';
ALTER TABLE "Setting" ADD COLUMN "buttonBorderWidth" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Setting" ADD COLUMN "buttonBorderColor" TEXT NOT NULL DEFAULT '#1A1A1A';
ALTER TABLE "Setting" ADD COLUMN "buttonShadow" TEXT NOT NULL DEFAULT 'soft';
ALTER TABLE "Setting" ADD COLUMN "buttonIcon" TEXT NOT NULL DEFAULT 'list';
