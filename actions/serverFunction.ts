// serverFunctions.ts
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import prisma from "@/db";
import signup from "@/actions/signup";

export async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(session){
    const data = {
      username: session.user.name,
      email: session.user.email,
      password: session.user.id
    }
    await signup(data);
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
