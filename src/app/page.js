"use client"
import LogoutButton from "@/components/LogOutButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

import {useSession} from "next-auth/react";
import {notFound} from "next/navigation";


export default  function Home() {

    const {data,status}=  useSession()


    if(!data) return null

    const {email,name}=data?.user

    if(email&&name){
        console.log("DATA ",data)
        console.log("Email ",email)
        console.log("Name ",name)
    }

    if(!data) return notFound()

    return (
        <div>
            <h1>My Main Page Hello</h1>
            <h2>User Email     {email?email:null}</h2>
            <h2>User Logged In {name?name:null}</h2>
        </div>
    );
}





