-- AlterTable
-- This column existed in schema.prisma and throughout the app code
-- (buttonDesign.js, settings.server.js, app.settings.jsx) but was missing
-- a migration entirely, causing:
--   "The column `main.Setting.buttonTextOrientation` does not exist"
ALTER TABLE "Setting" ADD COLUMN "buttonTextOrientation" TEXT NOT NULL DEFAULT 'horizontal';
