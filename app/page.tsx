"use client"
import Signup from "@/components/Signup";
import { signIn, signOut } from "next-auth/react";

export default function(){
  return (
    <div>
      <Signup/>
    </div>
  )
}