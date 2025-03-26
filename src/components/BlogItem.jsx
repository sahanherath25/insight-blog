"use client"
import React from 'react';
import Image from "next/image";
import {Button} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const dummyImage="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const deleteBlog=async (id)=>{

    console.log("WE have the blog id t o delete",id)
    try {
        const response=await axios.delete(`http://localhost:3000/api/blogs/${id}`)
    }catch (e) {
        console.log("ERROR DELETED ",e)

    }

}

function BlogItem({blog}) {

    const onClickDelete =async (id) => {

        try{
            toast.loading("Data is Going to Delete ....",{id:"delete"})
            const response= await deleteBlog(id)
            toast.success("Blog Deleted Successfully",{id:"delete"})

        }catch (e) {

            toast.error("Deletion Failed ",{id:"delete"})

        }
        console.log("BLOG ID DELETING IS ",id)


    }

    return (
        <div>
            <div key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Image
                    src={blog.imageUrl ? blog.imageUrl : dummyImage}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="w-full h-60 object-cover"
                />
                <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                    <div className="text-gray-600 text-sm"
                         dangerouslySetInnerHTML={{__html: blog.description}}/>
                    <p className="mt-3 text-gray-500 text-sm">📍 {blog.location}</p>
                    <p className="text-gray-400 text-xs mt-1">🕒 {new Date(blog.createdAt).toLocaleDateString()}</p>
                    <Button onClick={()=>onClickDelete(blog.id)}> Delete Blog</Button>
                </div>
            </div>
        </div>
    )
}

export default BlogItem;