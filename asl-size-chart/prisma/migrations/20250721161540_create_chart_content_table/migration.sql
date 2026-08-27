-- CreateTable
CREATE TABLE "ChartContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial_no" INTEGER NOT NULL,
    "chart_id" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_obj" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
