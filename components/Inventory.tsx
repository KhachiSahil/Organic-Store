"use client";
import getProduct from "@/actions/getProduct";
import ProductCard from "./ProductCard";
import { useZoomImageMove } from "@zoom-image/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Reviews from "@/actions/Reviews";
import addCartItem from "@/actions/addCartItem";
import { userInfo } from "@/actions/serverFunction";

interface Product {
    ProductID: number;
    CategoryID: number;
    ProductName: string;
    Description: string | null;
    Price: number;
    Stock: number;
    ImageUrl: string;
    Category?: {
        CategoryName: string;
    };
}

interface InventoryProps {
    product: Product;
}

export default function Inventory({ product }: InventoryProps) {
    const [isDisc, setIsDisc] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [quantity, setQuantity] = useState(1);
    const imageMoveContainerRef = useRef<HTMLDivElement>(null);
    const { createZoomImage: createZoomImageMove } = useZoomImageMove();
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const { data: session, status } = useSession();
    const userID = session?.user?.name;
    
    const addCart = async () => {
        if (userID) {
            const cartID = await userInfo();
            try {
                if(cartID){
                    const message = await addCartItem({ cartID , productID: product.ProductID, quantity });
                    alert(message);
                }
            } catch (error) {
                console.error("Failed to add item to cart:", error);
                alert("Failed to add item to cart. Please try again.");
            }
        } else {
            alert("You need to be logged in to add items to the cart.");
        }
    };

    useEffect(() => {
        const imageContainer = imageMoveContainerRef.current as HTMLDivElement;
        createZoomImageMove(imageContainer, {
            zoomImageSource: product.ImageUrl || "/default-image.jpg",
        });

        const fetchRelatedProducts = async () => {
            const category = product.Category?.CategoryName || '';
            if (category) {
                const data: Product[] = await getProduct(category, 1, 3);
                setRelatedProducts(data);
            }
        };

        fetchRelatedProducts();
    }, [createZoomImageMove, product.ImageUrl]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userID && product.ProductID && rating && comment) {
            const success = await Reviews({
                ProductID: product.ProductID,
                UserID: userID,
                Rating: rating,
                Comment: comment,
            });

            if (success) {
                alert("Review submitted successfully!");
                setRating(0);
                setComment('');
            } else {
                alert("Failed to submit the review. Please try again.");
            }
        } else {
            alert("Please fill in all fields before submitting.");
        }
    };

    return (
        <div className="bg-gray-100 justify-center items-center">
            <div className="flex gap-10 flex-wrap flex-col md:flex-row justify-center items-center pt-10">
                <div className="min-w-3/12 md:w-3/12 w-2/3 h-5/12 md:h-4/12">
                    <div ref={imageMoveContainerRef} className="relative flex justify-center items-center h-full w-full pr-8 cursor-pointer overflow-hidden">
                        <img className="h-full w-full object-contain" alt={product.ProductName} src={product.ImageUrl} />
                    </div>
                </div>
                <div className="flex flex-col gap-9 min:w-3/12 w-2/3 md:w-5/12">
                    <div className="text-2xl md:text-4xl font-semibold mt-5">{product.ProductName}</div>
                    <div className="text-xl font-bold">
                        ${product.Price} <span className="font-normal">+ Free Shipping</span>
                    </div>
                    {/* <div>{product.Description}</div> */}
                    <div>
                        <input className="w-14 md:w-10 mr-7" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                        <button onClick={addCart} className="bg-lime-700 p-2 w-48 md:w-64 hover:bg-lime-500 rounded-md text-white font-bold">ADD TO CART</button>
                    </div>
                    <div className="border-t-2">
                        Categories: <span className="text-lime-500">{product.Category?.CategoryName}</span>
                    </div>
                </div>
            </div>
            <div className="mt-14">
                <div className="flex gap-5 m-4 md:m-14 justify-center items-center pr-10">
                    <div
                        className={`border font-bold bg-slate-300 p-3 rounded-md cursor-pointer hover:bg-slate-200 ${isDisc ? 'active:border-lime-600' : ''}`}
                        onClick={() => setIsDisc(true)}
                    >
                        Description
                    </div>
                    <div
                        className={`border font-bold bg-slate-300 p-3 rounded-md cursor-pointer hover:bg-slate-200 ${!isDisc ? 'active:border-lime-600' : ''}`}
                        onClick={() => setIsDisc(false)}
                    >
                        Reviews
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    {isDisc ? (
                        <div className="m-3 text-xl w-10/12 md:w-2/3 rounded-md bg-slate-200 p-7 font-medium font-serif">
                            {product.Description}
                        </div>
                    ) : (
                        <div className="w-10/12 md:w-1/2 bg-slate-200 flex flex-col justify-center items-center p-5 rounded-md">
                            <div className="w-full md:w-3/4">
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="m-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className="start"
                                                style={{
                                                    cursor: 'pointer',
                                                    color: rating >= star ? 'green' : 'gray',
                                                    fontSize: '25px',
                                                }}
                                                onClick={() => setRating(star)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <textarea
                                            className="border border-black resize rounded-md p-2 pb-10"
                                            placeholder="Review"
                                            required
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                        <input
                                            className="bg-lime-700 hover:bg-lime-600 p-2 text-white font-bold rounded-md"
                                            type="submit"
                                            value="Submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-start mt-14 pb-10">
                <div className="text-2xl md:text-4xl block font-semibold ml-2 md:ml-64">Related Products</div>
                <div className="flex flex-wrap gap-5 mt-3 justify-center">
                    {relatedProducts.map((relatedProduct) => (
                        <ProductCard key={relatedProduct.ProductID} content={relatedProduct} />
                    ))}
                </div>
            </div>
        </div>
    );
}
