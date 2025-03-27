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

export const verifyUserExists=async (user={})=>{
    await connectToDB();
    const userFound=await prisma.user.findFirst({where:{email:user.email}})

    if(userFound){
        return null
    }else {
    //     TODO Create new user
        const newUser=await prisma.user.create({
            data:{
                name:user.name,
                email:user.email
            }
        })
        return newUser
    }

}
