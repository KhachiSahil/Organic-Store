'use server'
import prisma from "@/db"
 export default async function({username,email,password}:any){
    const response  = await prisma.users.findUnique({
        where : {
            Email : email
        }
    })
    if(!response){
        await prisma.users.create({
            data:{
                Email:email,
                PasswordHash:password,
                UserName:username
            }

        })
        return {success:true}
    }else{
        return {success:false}
    }
}