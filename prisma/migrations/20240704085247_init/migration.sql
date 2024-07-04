/*
  Warnings:

  - You are about to drop the column `FirstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `LasttName` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "FirstName",
DROP COLUMN "LasttName";

-- CreateTable
CREATE TABLE "Admin" (
    "AdminID" SERIAL NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Email_key" ON "Admin"("Email");
