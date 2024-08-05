"use client";

import { useEffect, useState } from "react";
import { getItem } from "@/actions/serverFunction";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/checkout";
import Loader from "@/components/Loader";
import { deleteCartItem } from "@/actions/dbFunctions"; // Import the function

interface CartItem {
    CartItemID: number;
    CartID: number;
    ProductID: number;
    Quantity: number;
    Products: {
        ProductName: string;
        Price: number;
        ImageUrl: string;
    };
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data: CartItem[] = await getItem();
                setCartItems(data);
                calculateTotalPrice(data);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleQuantityUpdate = (cartItemId: number, newQuantity: number) => {
        const updatedItems = cartItems.map(item =>
            item.CartItemID === cartItemId ? { ...item, Quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
    };

    const handleRemoveItem = async (cartItemId: number) => {
        try {
            await deleteCartItem(cartItemId); // Call the delete function
            const updatedItems = cartItems.filter(item => item.CartItemID !== cartItemId);
            setCartItems(updatedItems);
            calculateTotalPrice(updatedItems);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const calculateTotalPrice = (items: CartItem[]) => {
        const total = items.reduce((acc, item) => acc + item.Quantity * item.Products.Price, 0);
        setTotalPrice(total);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-100 p-8">
            <div className="font-black text-3xl font-mono mb-8">Cart</div>
            <div>
                <div className="bg-white font-bold md:grid grid-cols-6 gap-4 text-xl p-4 hidden md:visible">
                    <div></div>
                    <div></div>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                </div>
                {cartItems.map((e) => (
                    <CartItem
                        key={e.CartItemID}
                        items={e}
                        onQuantityUpdate={handleQuantityUpdate}
                        onRemove={handleRemoveItem}
                    />
                ))}
            </div>
            <div>
                <Checkout totalPrice={totalPrice} />
            </div>
        </div>
    );
}
