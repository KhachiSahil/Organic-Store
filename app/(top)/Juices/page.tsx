import Productlayout from "@/components/Productlayout";
import prisma from "@/db";

export default async  function(){
    const data = await prisma.products.findMany({
        where: {
            Category: {
                CategoryName: 'Juices'
            }
        },
        include: {
            Category: {
                select: {
                    CategoryName: true
                }
            }
        } 
    });
    console.log(data)
    return (
        <>
        <Productlayout product={data} />
        </> 
    )
}