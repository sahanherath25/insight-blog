import prisma from "@/prisma";
import {connectToDB} from "@/lib/helpers";
import {NextResponse} from "next/server";
import {notFound} from "next/navigation";
import {ObjectId} from "mongodb";

export const GET = async (req, {params}) => {

    // TODO Get the id parameter from URL
    const {id} = await params;

    // if(!id) notFound();


    try {
        //TODO   Step 1  Connect to DB
        await connectToDB();
        // TODO  Step 2     Get users From Prisma client
        const categoryFound = await prisma.category.findFirst({where: {id:id},

            include:{
                _count:true,
                blogs:true
            }
        })

        // TODO  Step 3 Return data with next Response
        return NextResponse.json({message: "success", ...categoryFound}, {status: 200})

    } catch (e) {

        return NextResponse.json({message: "fail", error: e}, {status: 500})

    } finally {

        prisma.$disconnect()
    }

}
