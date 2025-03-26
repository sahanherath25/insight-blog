import prisma from "@/prisma";
import {connectToDB} from "@/lib/helpers";
import {NextResponse} from "next/server";

export const GET = async () => {

    try {
        //     Connect to DB
        await connectToDB();
        //     Get users From Prisma client
        // const users = await prisma.user.findMany({select: {"email":true,"name":true} });
        const users = await prisma.user.findMany();

        // TODO Return data with next Response

        return NextResponse.json({message:"success",...users},{status:200})

    } catch (e) {

        return NextResponse.json({message:"fail",error:e},{status:500})

    } finally {

        prisma.$disconnect()
    }

}