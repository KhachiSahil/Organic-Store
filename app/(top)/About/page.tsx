"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];

export default function About() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='mb-10'>
            <div className='text-3xl md:text-7xl font-serif text-center p-10 bg-gray-100 font-bold'>About Us</div>
            <div className='flex flex-wrap p-6 md:p-24 mt-10 justify-center items-center'>
                <div className='w-full md:w-1/2 px-5'>
                    <div className='text-2xl md:text-4xl font-bold mb-5'>We Are Your Favourite Store.</div>
                    <div className='w-full md:w-8/12'>Welcome to your favorite store! We pride ourselves on offering top-quality products and exceptional customer service. Our wide selection of items ensures you find exactly what you need, whether it&apos;s the latest trends or timeless classics.</div>
                </div>
                <img className='w-10/12 md:w-3/12 min-w-80 mt-5 md:mt-0' src="banner-01.jpg" />
            </div>
            <div className='flex flex-wrap justify-center gap-6 md:gap-36 m-5'>
                <img className='w-full md:w-auto rounded-md' src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                <div className='w-full md:w-auto'>
                    <div className='flex flex-wrap gap-4 items-center'>
                        <img className='w-20 md:w-32' src="organic-badge-freeimg.png" />
                        <div className='text-2xl md:text-3xl font-semibold'>Certified products</div>
                    </div>
                    <div className='mt-5'>
                        <div className='text-xl md:text-2xl font-semibold'>We Deal With Various Quality Organic Products!</div>
                        <div className='grid grid-cols-2 mt-5 gap-3'>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Fresh fruits</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Dry fruits</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Fresh vegetables</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Dried vegetables</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Organic honey</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Organic tea</div>
                            <div className="flex items-center"><div className="inline-block bg-lime-600 w-2 h-2 border rounded-full border-lime-600 mr-2"></div>Beauty products</div>
                        </div>
                        <button onClick={()=>{router.push(`/Shop?category=Shop`)}} className="bg-mint flex items-center gap-1 p-3 mt-7 hover:bg-lime-900 font-semibold border rounded-md text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
