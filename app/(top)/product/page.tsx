"use client";
import { useEffect, useState } from "react";
import singleproduct from "@/actions/singleproduct";
import Inventory from "@/components/Inventory";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

export default function ProductPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            if (id) {
                const data = await singleproduct(id);
                setProductData(data);
            }
        };
        fetchProductData();
    }, [id]);

    if (!productData) return <div><Loading></Loading></div>;

    return <Inventory product={productData} />;
}
