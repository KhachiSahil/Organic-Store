"use server"
import prisma from "@/db";

interface reviewData {
    ProductID: number,
    UserID: number,
    Rating: number,
    Comment: string
}

export default async function Reviews({ ProductID, UserID, Rating, Comment }: reviewData) {
    try {
        await prisma.reviews.create({
            data: {
                ProductID,
                UserID,
                Rating,
                Comment
            }
        })
        return true;
    } catch (err) {
        return false
    }
}