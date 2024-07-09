"use client"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()
    return (
        <div className="bg-gradient-to-r from-white to-red-50">
            <div className="flex bg-leaf gap-5 backdrop-opacity-10 bg-no-repeat bg-right-bottom bg-16 flex-wrap-reverse md:flex-nowrap md:flex-row mt-9 pb-14 justify-center place-items-center">
                <div className=" w-auto m-10 md:mt-9 md:mb-14">
                    <img src="organic-products-hero.png" />
                </div>
                <div>
                    <div className=" flex  flex-col text-center place-items-center justify-center md:text-left md:place-items-start md:justify-start">
                        <img src="logo-leaf-new.png" />
                        <div className="font-medium text-xl md:text-2xl mt-4">Best Quality Products</div>
                        <div className="font-bold text-5xl md:text-7xl mt-7">Join The Organic <br></br> Movement!</div>
                        <div className="flex text-xl mt-7">Discover top-quality products and join the organic movement for a healthier, sustainable lifestyle today!</div>
                        <button onClick={()=>{router.push("/Shop")}} className="bg-mint flex gap-1 p-3 mt-7 hover:bg-lime-900 font-semibold border rounded-md text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="font-medium size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}