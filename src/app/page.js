"use client"
import {useSession} from "next-auth/react";
import {notFound} from "next/navigation";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import React from "react";


export default  function Home() {

    const {data,status}=  useSession()

    // if(!data) return null

    // const {email,name}=data?.user

    // if(email&&name){
    //     console.log("DATA ",data)
    //     console.log("Email ",email)
    //     console.log("Name ",name)
    // }

    // if(!data) return notFound()

    return (
        <div className={"basis-1 w-full"}>
            {/*<Logo/>*/}
            <Hero/>
            <Articles/>
        </div>
    );
}





