// Home.tsx
import React from "react";
import Blackcard from "@/components/Blackcard";
import Homepage from "@/components/Homepage";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewsCard";  // Import updated ReviewCard
import Image from 'next/image'
import Leaf from "@/public/logo-leaf-new.png"
import { getServerSession } from "next-auth"
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import signup from "@/actions/signup";
import prisma from "@/db";

async function getUser() {
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

async function getReviews() {
  return await prisma.reviews.findMany({
    include : {
      Users : {
        select : {
          UserName : true
        }
      }
    },
  });
}

const Home: React.FC = async () => {
  await getUser();
  const reviewsData = await getReviews();
  const productsData = await prisma.products.findMany({ take: 4 });

  return (
    <>
      <Homepage />
      <div className="bg-black flex flex-row flex-wrap justify-center p-5">
        <Blackcard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          }
          title="Free Shipping"
          description="Above $5 only."
        />
        <Blackcard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>

          }
          title="Certified Organic"
          description="100% Guarantee."
        />
        <Blackcard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H21m0 0h-.75a.75.75 0 0 1-.75-.75v-.75m1.5 0V6m-1.5 12.75V18a.75.75 0 0 1 .75-.75H21m0 0h1.5m-3.75 0h1.5" />
            </svg>
          }
          title="Huge Savings"
          description="At lowest price."
        />
        <Blackcard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.875v4.5m0 0v4.5m0-4.5h-4.5m4.5 0h4.5m-18-1.5a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z" />
            </svg>
          }
          title="Easy Returns"
          description="No questions asked."
        />
      </div>
      <div className="flex flex-col justify-center items-center p-5 mt-20">
        <div className="text-4xl font-bold flex justify-center items-center">
          New Products
        </div>
        <div className="mt-12">
          <Image src={Leaf} alt="missing" />
        </div>
        <div className=" flex flex-wrap gap-5 mt-10 justify-center">
          {productsData.map((e) => <ProductCard key={e.CategoryID} content={e} />)}
        </div>
      </div>
      <div className="bg-gradient-to-r from-white to-red-50 items-center">
        <div className="p-5 flex justify-center items-center mt-20 flex-col">
          <div className="text-3xl md:text-5xl font-semibold mt-9 text-center">Customers Reviews</div>
          <div className="mt-12">
            <Image src={Leaf} alt="Failed" className="mx-auto" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-8">
          {reviewsData.map((review) => (
            <ReviewCard 
              key={review.ReviewID} 
              rating={review.Rating} 
              review={review.Comment} 
              reviewer={review.Users.UserName} 
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
