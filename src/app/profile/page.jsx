import React from 'react';
import Image from "next/image";
import {getServerSession} from "next-auth";

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getUserById} from "@/app/actions/server/actions";
import axios from "axios";
import {Button} from "@mui/material";
import BlogItem from "@/components/BlogItem";
import {nanoid} from "nanoid";
import {redirect} from "next/navigation";




// TODO Use as Server component
async function ProfilePage(props) {

    // const {data: session, status} = useSession();
    const sessionData=await getServerSession(authOptions);
    console.log("SESSION DATA ",sessionData);

    // Additional protection in case middleware fails
    // if (!sessionData) {
    //     redirect('/blogs');
    // }

    const userData=await getUserById(sessionData?.user?.id)

    if(!userData && !sessionData) return
    const blogs=userData?.blogs

    console.log("session",sessionData);
    console.log("User Data ",blogs);


    return (

        <section className={" grid  grid-cols-1 w-full grow "}>
            {/*<h2>You are in the Profile Page</h2>*/}
            {/*<h2>You are Logged In As {sessionData.user.name}</h2>*/}
            {/*<div className={"image-container"}>*/}
            {/*    <Image*/}
            {/*        src={"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}*/}
            {/*        alt={"Profile Image of User"} width={200} height={200}/>*/}
            {/*    /!*<h3>You are Logged in As :{session?.user?.name}</h3>*!/*/}
            {/*    /!*<h3>You are Logged in As :{session?.user?.name}</h3>*!/*/}

            {/*</div>*/}

            <div className="flex justify-center items-center py-6">
                <div
                    className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ring-blue-400 transition-transform hover:scale-105 duration-300">
                    <Image
                        src={"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={"Profile Image of User"}
                        fill
                        className="object-cover"
                    />

                </div>
            </div>


            {blogs && (
                <div className=" grid w-full ">
                    <h3 className={"text-center"}>My Blogs</h3>
                    <div
                        className={"blog-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 "}>
                        {blogs.map((blog) => {
                            return <BlogItem blog={blog} key={nanoid(5)}/>
                        })}
                    </div>
                </div>
            )}


        </section>
    )
        ;
}

export default ProfilePage;