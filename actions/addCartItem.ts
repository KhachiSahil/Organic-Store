"use server"
import prisma from "@/db";

interface ItemData {
  cartID: number;
  productID: number;
  quantity: number;
}

export default async function addCartItem({ cartID, productID, quantity }: ItemData): Promise<string> {
  try {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    await prisma.cartItems.create({
      data: {
        CartID: cartID,
        ProductID: productID,
        Quantity: quantity,
      },
    });
    return "Added to cart";
  } catch (error: any) {
    console.error("Failed to add item to cart:", error);
    return `Error: ${error.message || "An error occurred"}`;
  }
}
