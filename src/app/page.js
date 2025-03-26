"use client"
import {useSession} from "next-auth/react";
import {notFound} from "next/navigation";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import React from "react";


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
        <div className={"basis-1"}>
            {/*<Logo/>*/}
            <Hero/>
            <Articles/>
            {/*<h1>My Main Page Hello</h1>*/}
            {/*<h2>User Email     {email?email:null}</h2>*/}
            {/*<h2>User Logged In {name?name:null}</h2>*/}
        </div>
    );
}





