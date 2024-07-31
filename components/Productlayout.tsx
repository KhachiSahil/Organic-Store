"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import getProduct from "@/actions/getProduct";
import Loading from "./Loading";

interface Product {
    ProductID: number;
    CategoryID: number;
    ProductName: string;
    Description: string | null;
    Price: number;
    Stock: number;
    ImageUrl: string;
    Category: {
        CategoryName: string;
    };
}

export default function ProductLayout() {
    const param = useSearchParams();
    const category = param.get('category') || '';
    const [range, setRange] = useState<number>(0);
    const [product, setProduct] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    function debounce(func: Function, wait: number) {
        let timeout: any;
        return function (...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleSubmit = useCallback(debounce((newValue: number) => { setRange(newValue); }, 900), []);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const productData = await getProduct(category, page, 9);
            console.log(productData)
            const transformedData = productData.map((item: any) => ({
                ...item,
                Category: item.Category || { CategoryName: '' }
            }));
            setProduct(transformedData);
            setLoading(false);
        };
        getData();
    }, [category, page]);

    return (
        <div className="flex justify-center gap-5 py-10 flex-col md:flex-row bg-gray-100">
            <div className="w-64 flex flex-col ml-12 items-center md:justify-normal gap-6">
                <div>
                    <input className="w-40 border-2 border-slate-600 px-4 py-1 mr-1" type="text" placeholder="Search products..." />
                    <button className="bg-lime-500 text-white font-semibold align-middle p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div>
                    <div className="font-medium text-2xl font-serif">Filter by Price</div>
                    <input
                        onChange={(e) => { handleSubmit(Number(e.target.value)); }}
                        className="w-44 mt-5 font-thin accent-lime-500 bg-inherit"
                        min="0"
                        max="100"
                        step="1"
                        value={range}
                        type="range"
                    />
                </div>
            </div>
            <div className="md:border-l-2">
                {loading ? (
                    <div className="flex pl-96 pr-10 justify-center items-center w-full h-full">
                        <div className="loader"></div> {<Loading/>}
                    </div>
                ) : (
                    <div>
                        <div className="ml-5">
                            <div className="text-slate-500 font-medium mb-2">
                                Home / {category}
                            </div>
                            <div className="text-6xl font-medium text-lime-500">
                                {category}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {product.map((e) => (
                                <ProductCard key={e.ProductID} content={e} />
                            ))}
                        </div>
                        <div className="flex gap-3 ml-5">
                            <div className="border border-lime-500 w-10 h-10 py-2 text-center hover:text-white hover:bg-lime-500 ">
                                {page}
                            </div>
                            <button
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                                className="border border-lime-500 disabled:border-gray-500 disabled:hover:bg-gray-300 w-10 h-10 py-2 align-middle text-center hover:text-white hover:bg-lime-500"
                                disabled={product.length !== 9}
                            >
                                {page + 1}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
