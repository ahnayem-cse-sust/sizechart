-- CreateTable
CREATE TABLE "TemplateContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serial_no" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,
    "content_type" TEXT NOT NULL,
    "content_obj" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
