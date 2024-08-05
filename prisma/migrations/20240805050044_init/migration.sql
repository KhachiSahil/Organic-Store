/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CardID` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_CartID_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "CardID",
ADD COLUMN     "CartID" SERIAL NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("CartID");

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_CartID_fkey" FOREIGN KEY ("CartID") REFERENCES "Cart"("CartID") ON DELETE RESTRICT ON UPDATE CASCADE;
