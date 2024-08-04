export default function CartTotals() {
    return (
        <div className="flex flex-col md:w-96 ml-auto mt-10 bg-white p-5 rounded-lg border-2 border-lime-300">
            <div className="font-bold text-xl mb-4">Cart Totals</div>
            <div className="flex justify-between mb-2">
                <span className="font-semibold">Subtotal</span>
                <div>£50.00</div>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <div>£50.00</div>
            </div>
            <input
                type="submit"
                value="PROCEED TO CHECKOUT"
                className="bg-lime-700 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-600 cursor-pointer"
            />
        </div>
    );
}
