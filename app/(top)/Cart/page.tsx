import CartItem from "@/components/CartItem";
import Checkout from "@/components/checkout";
export default function Cart() {
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
                <CartItem/>
                <CartItem/>
                <CartItem/>
            </div>
            <div>
                <Checkout/>
            </div>
        </div>
    )
}
