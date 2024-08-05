// serverFunctions.ts
"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import prisma from "@/db";
import signup from "@/actions/signup";

export async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session) {
    const data = {
      username: session.user.name,
      email: session.user.email,
      password: session.user.id
    }
    await signup(data);
  }
}

export async function userInfo() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session) {
    const data = await prisma.users.findFirst({
      where: {
        UserName: session.user.name
      }
    })
    if (data) {
      const cartInfo = await prisma.cart.findFirst({
        where: {
          UserID: data.UserID
        }
      })
      return cartInfo?.CartID
    }
  }
}

export async function createCart() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session) throw new Error("User session not found.");

  const user = await prisma.users.findFirst({
    where: {
      UserName: session.user.name
    }
  });

  if (user) {
    const cart = await prisma.cart.findFirst({
      where: {
        UserID: user.UserID
      }
    });

    if (!cart) {
      await prisma.cart.create({
        data: {
          UserID: user.UserID
        }
      });
    }
  }
}

export async function getReviews() {
  return await prisma.reviews.findMany({
    include: {
      Users: {
        select: {
          UserName: true
        }
      }
    }
  });
}

export async function getProducts() {
  return await prisma.products.findMany({ take: 4 });
}

export async function getItem() {
  const CartID = await userInfo();
  if (CartID) {
    const data = await prisma.cartItems.findMany({
      where: {
        CartID
      },
      include: {
        Products: true
      }
    });
    return data;
  }
  return [];
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    await prisma.cartItems.delete({
      where: { CartItemID: cartItemId },
    });
  } catch (error) {
    throw new Error('Failed to delete item');
  }
};
