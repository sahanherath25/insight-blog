// TODO Client created by  Prisma is not secured completely
import {PrismaClient}  from "@prisma/client"


//Creating customized Prisma Client



// User regular client for dev

let prisma;

// console.log("ENV ",process.env.NODE_ENV);

if(process.env.NODE_ENV === "production") {
    // TODO Create brand new Client
    prisma = new PrismaClient();
}else {

    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma=global.prisma
}


export default prisma

