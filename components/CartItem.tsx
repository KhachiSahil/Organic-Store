"use client";

import { useState } from "react";

interface CartItemProps {
    items: {
        CartItemID: number;
        CartID: number;
        ProductID: number;
        Quantity: number;
        Products: {
            ProductName: string;
            Price: number;
            ImageUrl: string;
        };
    };
    onQuantityUpdate: (cartItemId: number, newQuantity: number) => void;
    onRemove: (cartItemId: number) => void;
}

export default function CartItem({ items, onQuantityUpdate, onRemove }: CartItemProps) {
    const { ProductName, Price, ImageUrl } = items.Products;
    const { Quantity, CartItemID } = items;
    const [value, setValue] = useState(Quantity);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue >= 0 ? newValue : 1);
    };

    const handleUpdateClick = () => {
        onQuantityUpdate(CartItemID, value);
    };

    const handleRemoveClick = () => {
        onRemove(CartItemID);
    };

    return (
        <div className="grid gap-4 p-4 border border-lime-200 bg-white">
            <div className="flex gap-3 flex-col sm:hidden">
                <div className="flex justify-between items-center">
                    <span className="font-bold"></span>
                    <div onClick={handleRemoveClick} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-32">
                        <img src={ImageUrl} className="w-full" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Name</span>
                    <div className="text-lime-500 hover:cursor-pointer">{ProductName}</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Price</span>
                    <div>$ {Price}</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Quantity</span>
                    <input onChange={handleQuantityChange} className="w-14" type="number" value={value} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Subtotal</span>
                    <div>${(value * Price).toFixed(2)}</div>
                </div>
                <button onClick={handleUpdateClick} className="mt-2 bg-lime-700 text-white font-bold px-4 py-2 rounded">UPDATE</button>
            </div>

            <div className="hidden sm:grid sm:grid-cols-6 items-center">
                <div className="flex justify-center cursor-pointer" onClick={handleRemoveClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div className="w-16">
                    <img src={ImageUrl} className="w-full" />
                </div>
                <div>{ProductName}</div>
                <div>$ {Price}</div>
                <div>
                    <input onChange={handleQuantityChange} className="w-14" type="number" value={value} />
                </div>
                <div>${(value * Price).toFixed(2)}</div>
                <button onClick={handleUpdateClick} className="mt-2 bg-lime-700 font-bold text-white px-4 py-2 ml-auto rounded w-32">UPDATE</button>
            </div>
        </div>
    );
}
