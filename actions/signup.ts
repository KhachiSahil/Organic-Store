'use server'
import prisma from "@/db"

interface schema  {
    username:string,
    email : string,
    password : string
}

 export default async function({username,email,password}: schema){
    const response  = await prisma.users.findUnique({
        where : {
            Email : email
        }
    })
    if(!response){
       const newUser =  await prisma.users.create({
            data:{
                Email:email,
                PasswordHash:password,
                UserName:username
            }

        })
        await prisma.cart.create({
            data : {
                UserID : newUser.UserID
            }
        })
        return {success:true}
    }else{
        return {success:false}
    }
}