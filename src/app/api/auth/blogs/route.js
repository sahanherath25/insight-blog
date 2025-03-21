import {connectToDB} from "@/lib/helpers";
import prisma from "@/prisma";
import {NextResponse} from "next/server";

import cloudinary from "cloudinary"


// TODO Upload image to Cloud

 async function uploadImage(file) {
    return new Promise(async (resolve, reject) => {

        // TODO convert Image to buffer Array
        const buffer = Buffer.from(await file.arrayBuffer());
        cloudinary.v2.uploader.upload_stream({
            resource_type: "auto",
            folder: "insight-blogs-images"
        }, (err, results) => {
            console.log("IN PROMISE ")

            if (err) {
                console.log("ERROR  ")
                return reject(err)

            } else if(results){
                console.log("IN SUCCESS ")
                return resolve(results)
            }
        }).end(buffer)
    })
}


export const POST = async (req) => {

    cloudinary.v2.config(
        {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        }
    )
    try {
        // TODO Get Form Data
        const formData = await req.formData();

        console.log("FORM DATA ",formData)

        // TODO Convert form Data to JS
        const {title, userId, description, location, categoryId} = JSON.parse(formData.get("postData"));

        if (!title || !userId || !description || !location || !categoryId) {
            return NextResponse.json({message: "fail", error: "Invalid Data"}, {status: 422})
        }

        const file = formData.get("image") || null
        console.log("File ",file)

        let blobFile
        if (file) {
            blobFile = file instanceof Blob ? file : new Blob([file]);
        } else {
            blobFile = null;
        }

        let uploadedFile;

        if (blobFile) {
            uploadedFile = await uploadImage(blobFile)
        } else {
            uploadedFile = null;
        }

        console.log("Blob ",uploadedFile)

        await connectToDB();

        const user = await prisma.user.findFirst({where: {id: userId}})
        const category = await prisma.category.findFirst({where: {id: categoryId}})

        if (!user || !category) return NextResponse.json({
            message: "fail",
            error: "Invalid Category or User"
        }, {status: 422})

        console.log("SER FOUND ",user)
        console.log("Categort FOUND ",category)

        const blog = await prisma.blog.create({
            data: {
                title,
                description,
                location,
                categoryId,
                userId,
                imageUrl:uploadedFile?.url??null
            }
        });

        return NextResponse.json({message: "success", ...blog}, {status: 200})
        // return NextResponse.json({message:"success",...categories},{status:200});


    } catch (e) {
        return NextResponse.json({message: "fail", error:e.message}, {status: 422})
    } finally {

        prisma.$disconnect()

    }
}

export const GET =async()=>{
    try {
        await connectToDB()
        const blogs=await prisma.blog.findMany();

        if(blogs.length > 0){
            return NextResponse.json({message:"success",data:blogs},{status:200})
        }

    }catch (e) {
        return NextResponse.json({message:"fail",error:e},{status:422})
    }finally {

        prisma.$disconnect();
    }
}

export const GET =async()=>{
    try {
        await connectToDB()
        const blogs=await prisma.blog.findMany();

        if(blogs.length > 0){
            return NextResponse.json({message:"success",data:blogs},{status:200})
        }

    }catch (e) {
        return NextResponse.json({message:"fail",error:e},{status:422})
    }finally {

        prisma.$disconnect();
    }
}