import Productlayout from "@/components/Productlayout";
import prisma from "@/db";

export default async function(){
    const data = await prisma.products.findMany({
        where : {
            Category : {
                CategoryName : 'Groceries'
            }
        },
        include : {
            Category : {
                select : {
                    CategoryName : true
                }
            }
        }
    })
    return (
        <>
        <Productlayout product={data} />
        </>
    )
}