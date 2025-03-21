import {connectToDB} from "@/lib/helpers";
import prisma from "@/prisma";
import {NextResponse} from "next/server";

export const GET =async(req,{params})=>{

    const searchTitle=await new URL(req.url).searchParams.get("title");


    console.log("USr" ,searchTitle)

    try {
        await connectToDB()
        const blog=await prisma.blog.findMany({where:{title:{contains:searchTitle??""}}});

        console.log("BLOG FOUND ",blog)

        if(blog.length > 0){
            return NextResponse.json({message:"success",data:blog},{status:200})
        }else {
            return NextResponse.json({message:"blog does not exists"},{status:404})
        }

    }catch (e) {
        return NextResponse.json({message:"fail",error:e},{status:422})
    }finally {

        prisma.$disconnect();
    }
}
