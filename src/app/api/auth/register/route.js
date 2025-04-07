import {NextResponse} from "next/server";
import {connectToDB} from "@/lib/helpers";

import prisma from "../../../../../prisma/index";

import bcrypt from "bcryptjs";

export const POST=async (req)=>{
    const {name,email,password}=await req.json()

    console.log("NEW USER GOING TO REGISTER")
    if(!name||!email||!password){
        return NextResponse.json({message:"Please enter a valid email"},{status:422})
    }
    try {
        await connectToDB()

        // TODO Important we dont need to store the plain password
        const hashedPassword=await bcrypt.hash(password,12)
        const user=await prisma.user.create({data:{email,name,password:hashedPassword}});

        return NextResponse.json({message:"Successfully registered",data:user},{status:201})

    }catch (e) {
        return NextResponse.json({message:"Server Error",error:e.message},{status:500})

    }finally {
        await prisma.$disconnect();
    }

}


