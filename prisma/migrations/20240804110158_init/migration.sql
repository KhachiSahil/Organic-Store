/*
  Warnings:

  - You are about to drop the column `CardID` on the `CartItems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserID]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CartID` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_CardID_fkey";

-- AlterTable
ALTER TABLE "CartItems" DROP COLUMN "CardID",
ADD COLUMN     "CartID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_UserID_key" ON "Cart"("UserID");

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES "Cart"("CardID") ON DELETE RESTRICT ON UPDATE CASCADE;
