import {connectToDB} from "@/lib/helpers";
import prisma from "@/prisma";
import {NextResponse} from "next/server";

export const GET =async(req,{params})=>{

    const {id}=await params;
    try {
        await connectToDB()
        const blog=await prisma.blog.findFirst({where:{id:id}});

        console.log("BLOG FOUND ",blog)

        if(blog){
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

export const PUT =async(req,{params})=>{

    const {id}=await params

    const {title,description}=await req.json()

    console.log("TITLE ",title)
    console.log("Description ",description)
    if(!title||!description){
        return NextResponse.json({message:"Please Provide title and Description to update"},{status:404})
    }

    try {
        await connectToDB()
        const blog=await prisma.blog.update(
            {
                where:{id:id},
                data:{
                    title,
                    description
                }
            });

        console.log("BLOG FOUND ",blog)

        if(blog){
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

export const DELETE =async(req,{params})=>{

    const {id}=await params

    console.log("BLOG RECEVE TO MIDDLE WARE GOING TO DELETE ",id)

    if(!id){
        return NextResponse.json({message:"Please Provide ID of the Blog"},{status:404})
    }

    try {
        await connectToDB()
        const blog=await prisma.blog.delete(
            {
                where:{id:id},
            });

        console.log("BLOG Deleted FOUND ",blog)

        if(blog){
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

