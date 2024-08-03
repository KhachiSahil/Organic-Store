"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SidebarProps = {
  closeBar: () => void
}

type UserProps = {
  userToggle: () => void,
  data : string | null | undefined
}

export default function Appbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [uOpen, setUOpen] = useState<boolean>(false);

  const sideBarToggle = () => {
    setIsOpen(!isOpen);
  };

  const userBarToggle = () => {
    setUOpen(!uOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex w-full">
        <Link href="/Dashboard">
          <img className="m-5 w-40 cursor-pointer" src="organic-store-logo5.svg" alt="logo" />
        </Link>
        <div className="flex w-full">
          <div className="hidden md:flex gap-10 mt-10 ml-10 font-medium">
            <Link href={{ pathname: 'Shop', query: { category: 'Shop' } }}>Everything</Link>
            <Link href={{ pathname: 'Shop', query: { category: 'Groceries' } }}>Groceries</Link>
            <Link href={{ pathname: 'Shop', query: { category: 'Juices' } }}>Juices</Link>
            <Link href="/About">About</Link>
            <Link href="/">Contact</Link>
          </div>
          <div className="flex absolute top-10 right-10 gap-5 md:right-3 lg:right-10">
            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
            </svg>
            </div>
            <div onClick={userBarToggle}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            </div>
            <div onClick={sideBarToggle} className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <Sidebar closeBar={sideBarToggle} />}
      {uOpen && <User userToggle={userBarToggle} data = {session?.user?.name} />}
    </div>
  )
}

function Sidebar({ closeBar }: SidebarProps) {
  return (
    <>
      <div className="absolute h-screen bg-white top-0 right-0 z-50 w-4/5">
        <div onClick={closeBar} className="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex flex-col gap-1 mt-14 font-medium">
            <Link className="bg-white hover:bg-slate-300 pl-3 pt-3 pb-3 border-t-2 border-blue-900" href={{pathname : 'Shop', query : {category : 'Shop'}}}>Everything</Link>
            <Link className="bg-white hover:bg-slate-300 pl-3 pt-3 pb-3 border-t-2 border-slate-300" href={{pathname : 'Shop' , query : {category : 'Groceries'}}}>Groceries</Link>
            <Link className="bg-white hover:bg-slate-300 pl-3 pt-3 pb-3 border-t-2 border-slate-300" href={{pathname : 'Shop' , query : {category : 'Juices'}}}>Juices</Link>
            <Link className="bg-white hover:bg-slate-300 pl-3 pt-3 pb-3 border-t-2 border-slate-300" href="/About">About</Link>
            <Link className="bg-white hover:bg-slate-300 pl-3 pt-3 pb-3 border-t-2 border-slate-300" href="/">Contact</Link>
          </div>
      </div>
    </>
  )
}

function User({ userToggle ,data }: UserProps) {
  const userRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (userRef.current && !userRef.current.contains(event.target as Node)) {
      userToggle();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={userRef}
      className="absolute h-32 bg-lime-100 top-16 rounded-md right-5 z-50 w-56 shadow-lg border border-lime-300"
    >
      <div className="font-black text-center py-4 text-lg">
        Hi there! {data}
      </div>
      <button
        className="bg-red-500 text-white rounded-md shadow-lg py-2 px-4 mx-5 font-bold hover:bg-red-600 transition duration-200"
        onClick={() => {
          signOut({ callbackUrl: process.env.HOST_URL });
        }}
      >
        Sign out
      </button>
    </div>
  );
}
