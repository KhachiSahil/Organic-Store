-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "UserName" VARCHAR(50) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "PasswordHash" VARCHAR(255) NOT NULL,
    "FirstName" VARCHAR(50) NOT NULL,
    "LasttName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Categories" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" VARCHAR(50) NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductID" SERIAL NOT NULL,
    "CategoryID" INTEGER NOT NULL,
    "ProductName" VARCHAR(100) NOT NULL,
    "Description" TEXT,
    "Price" DOUBLE PRECISION NOT NULL,
    "Stock" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "OrderID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "OrderItemId" SERIAL NOT NULL,
    "OrderID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("OrderItemId")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "ReviewID" SERIAL NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Rating" INTEGER NOT NULL,
    "Comment" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "Cart" (
    "CardID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("CardID")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "CartItemID" SERIAL NOT NULL,
    "CardID" INTEGER NOT NULL,
    "ProductID" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("CartItemID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Categories"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_CardID_fkey" FOREIGN KEY ("CardID") REFERENCES "Cart"("CardID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;
