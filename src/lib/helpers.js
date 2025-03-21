import prisma from "../../prisma";


export const connectToDB=async ()=>{

    try {
        await prisma.$connect();
        console.log("Connected to DB");
    }catch (e) {
        console.error("Error connecting to DB",e);
        throw new Error("Failed to connect to DB");
    }

}