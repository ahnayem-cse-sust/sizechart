-- AlterTable
ALTER TABLE "Setting" ADD COLUMN "buttonTextColor" TEXT NOT NULL DEFAULT '#FFFFFF';
ALTER TABLE "Setting" ADD COLUMN "buttonPosition" TEXT NOT NULL DEFAULT 'bottom-right';
ALTER TABLE "Setting" ADD COLUMN "showIcon" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Setting" DROP COLUMN "displayStyle";
