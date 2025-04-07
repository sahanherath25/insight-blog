"use client"
import BlogCategories from "@/components/BlogCategories";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {CircularProgress, Typography} from "@mui/material";
import {nanoid} from "nanoid";
import MUICard from "@/components/MUICard";
import loading from "@/app/blogs/loading";


const getBlogs = async () => {
    const response = await axios.get(`http://localhost:3000/api/blogs`, {
        cache: 'no-cache',
    });
    return response.data.data
}



function BlogsPage() {

    const [blogs,setBlogs] = useState([])
    const [filters,setFilters] = useState([])
    const [allCategories,setAllCategories] = useState("")
    const [selectedCategory,setSelectedCategory] = useState("")

    useEffect(() => {
       const getBlogsData=async () => {
           const data=await getBlogs();
           setBlogs(data)
       }
       getBlogsData()

    }, []);


    // console.log("DB LOADD ", allCategories);
    // console.log("DB BLOGS ", blogs);
    console.log("Selected CAtegory is ", selectedCategory);
    console.log("Selected Blogs is ", blogs);

    // if(blogs.length>0) return null

    return (
        <div className={"grow"}>
            {/*<p>Hello This is my Page Component</p>*/}
            <BlogCategories data={allCategories} blogs={blogs} setBlogs={setBlogs} setCategory={setSelectedCategory} />

            <section className={"w-full bg-gray-200"}>
                <Typography className={"text-center"} variant={"h2"}>All Blog Articles {blogs.length} </Typography>

                <div className={"blog-container grid justify-stretch justify-items-center  mt-3.5 "}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6">
                        {blogs.length > 0 ? (
                            blogs.map((item) => (

                                <div
                                    key={nanoid(45)}
                                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                                >
                                    <MUICard   blogs={item}/>

                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-600"> <CircularProgress color="success" /></div>
                        )}
                    </div>

                </div>
            </section>


            {/*<BlogArticles initialBlogs={allBlogs} />*/}
            {/*<Blogs data={myBlogData}/>*/}
        </div>
    );
}

export default BlogsPage;

// export const dynamic = 'force-dynamic';