-- AlterTable: add the two new columns with safe defaults
ALTER TABLE "Setting" ADD COLUMN "buttonPositionVertical" TEXT NOT NULL DEFAULT 'bottom';
ALTER TABLE "Setting" ADD COLUMN "buttonPositionHorizontal" TEXT NOT NULL DEFAULT 'right';

-- Backfill from the old combined "top-right" / "bottom-left" style value
-- before it's dropped, so existing shops keep their current placement.
UPDATE "Setting" SET
  "buttonPositionVertical" = CASE
    WHEN "buttonPosition" LIKE 'top-%' THEN 'top'
    WHEN "buttonPosition" LIKE 'middle-%' THEN 'middle'
    WHEN "buttonPosition" LIKE 'bottom-%' THEN 'bottom'
    ELSE 'bottom'
  END,
  "buttonPositionHorizontal" = CASE
    WHEN "buttonPosition" LIKE '%-left' THEN 'left'
    WHEN "buttonPosition" LIKE '%-right' THEN 'right'
    ELSE 'right'
  END;

-- AlterTable: drop the now-superseded combined column
ALTER TABLE "Setting" DROP COLUMN "buttonPosition";
