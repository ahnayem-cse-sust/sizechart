-- CreateTable
CREATE TABLE "Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'in',
    "buttonLabel" TEXT NOT NULL DEFAULT 'Size Chart',
    "buttonColor" TEXT NOT NULL DEFAULT '#1A1A1A',
    "displayStyle" TEXT NOT NULL DEFAULT 'modal',
    "showOnProductPage" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_shop_key" ON "Setting"("shop");
