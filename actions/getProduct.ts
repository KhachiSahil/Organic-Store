"use server"

import prisma from "@/db"

export default async function (category: string, page: number, size: number) {
    let skip;
    if(page > 0){
        skip = (page-1)*size
    }else{
        skip = (page-1)*size-1
    }
    if (category == 'Shop') {
        const data = await prisma.products.findMany({
            skip : skip,
            take : size
        })
        return data
    } else {
        const data = await prisma.products.findMany({
            where: {
                Category: {
                    CategoryName: category
                }
            },
            include: {
                Category: {
                    select: {
                        CategoryName: true
                    }
                }
            },
            skip: (page - 1) * size,
            take: size
        })

        return data
    }
}