import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
   const data = await req.json();
   try{
   const result = await prisma.categories.findFirst({
      where: {
         CategoryName: data.CategoryName
      },
   });

   if (!result) {
      const newCategory = await prisma.categories.create({
         data: {
            CategoryName: data.CategoryName
         }
      })
      var ProductData = await prisma.products.create({
         data: {
            CategoryID: newCategory.CategoryID,
            ProductName: data.ProductName,
            Description: data.Description,
            Price: data.Price,
            Stock: data.Stock,
            ImageUrl: data.ImageUrl
         }
      })
      return NextResponse.json({ProductData})
   } else {
      ProductData = await prisma.products.create({
         data: {
            CategoryID: result.CategoryID,
            ProductName: data.ProductName,
            Description: data.Description,
            Price: data.Price,
            Stock: data.Stock,
            ImageUrl: data.ImageUrl
         }
      })
      return NextResponse.json({ProductData})
   }}catch(err){
      return NextResponse.json({err})
   }

}