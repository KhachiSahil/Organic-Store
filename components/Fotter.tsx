import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-black p-10 bottom-0">
            <div className="flex gap-14 justify-center m-10">
                <div>
                    <div>
                        <img className="bg-white" src="/organic-store-logo5.svg" />
                    </div>
                    <div className="text-white font-semibold">
                        Discover top-quality products and join the organic movement for a healthier, sustainable lifestyle today!
                    </div>
                </div>
                <div className="text-white flex flex-col">
                    <div className="text-xl font-semibold">Quick Links</div>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                    <Link href="/">Groceries</Link>
                    <Link href="/">Juices</Link>
                </div>
            </div>
            <div className="text-gray-300 border-t-2 border-gray-600 mt-4 pt-5 mb-4">
            Copyright © 2024 | Organic Store
            </div>
        </div>
    )
}