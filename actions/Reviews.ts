"use server"
import prisma from "@/db";

interface ReviewData {
    ProductID: number,
    UserID: string,
    Rating: number,
    Comment: string
}

export default async function Reviews({ ProductID, UserID, Rating, Comment }: ReviewData) {
    try {
        const user = await prisma.users.findMany({
            where: {
                UserName: UserID
            }
        });
        if (!user) {
            console.error(`User with username ${UserID} not found.`);
            return false;
        }
        await prisma.reviews.create({
            data: {
                ProductID,
                UserID: user[0].UserID,
                Rating,
                Comment
            }
        });

        return true;
    } catch (err) {
        return false;
    }
}
