/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_UserName_key" ON "Users"("UserName");
