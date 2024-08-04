
export default function CartItem() {
    return (
        <div className="grid gap-4 p-4 border border-lime-200 bg-white">
            <div className="flex gap-3 flex-col sm:hidden">
            <div className="flex justify-between items-center">
                    <span className="font-bold"></span>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-32">
                        <img src="/cashew butter.jpg" className="w-full" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Name</span>
                    <div className="text-lime-500 hover:cursor-pointer">Assorted Coffee</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Price</span>
                    <div>£35.00</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Quantity</span>
                    <input className="w-14" type="number" defaultValue="1" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">Subtotal</span>
                    <div>£35.00</div>
                </div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-6 items-center">
                <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div className="w-16">
                    <img src="/cashew butter.jpg" className="w-full" />
                </div>
                <div>Assorted Coffee</div>
                <div>£35.00</div>
                <div>
                    <input className="w-14" type="number" defaultValue="1" />
                </div>
                <div>£35.00</div>
            </div>
        </div>
    );
}
