'use server'

import prisma from "@/db"

export default async function getProduct(id: string | null) {
    const ID = id && id.trim() !== "" ? parseInt(id, 10) : 1;
    const product = await prisma.products.findFirst({
        where: {
            ProductID: ID
        },
        include: {
            Category: {
                select: {
                    CategoryName: true
                }
            }
        }
    });

    return product;
}
