import {connectToDB} from "@/lib/helpers";
import prisma from "@/prisma";
import {NextResponse} from "next/server";

export const GET=async()=>{

   try {
       await connectToDB()

       const categories=await prisma.category.findMany();

       console.log("CAREGORIES FOUND ",categories)

       if(categories.length>0){
           return NextResponse.json({message:"success",data:categories},{status:200});
       }

       return NextResponse.json({message:"success",data:"No data"},{status:200});

   }catch (error) {
       return NextResponse.json({message:"fail",error:error},{status:401});
   }
   finally {
       prisma.$disconnect()
   }

}





export const POST =async(req)=>{

    const {name}=await req.json()

    console.log("Category name is ",name)

   try {
       await connectToDB()

       const categories=await prisma.category.create({data:{name}} );
       return NextResponse.json({message:"success",data:categories},{status:200});

   }catch (error) {
       return NextResponse.json({message:"fail",error:error.message},{status:401});
   }
   finally {
       prisma.$disconnect()
   }

}

