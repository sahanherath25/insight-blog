"use client"
import React, {useEffect, useState} from 'react';
import * as actions from "@/app/actions/server/actions";
import {Typography} from "@mui/material";
import {motion} from "framer-motion";
import {nanoid} from "nanoid";
import MUICard from "@/components/MUICard";
import {log} from "next/dist/server/typescript/utils";

function BlogArticles({data}) {

    const [blogs, setBlogs] = useState(initialBlogs || []);

    // Only fetch on client if no initial data
    useEffect(() => {
        if (initialBlogs && initialBlogs.length > 0) return;

        const fetchData = async () => {
            try {
                const result = await getAllBlogs();
                setBlogs(result);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };
        fetchData();
    }, [initialBlogs]);

    // const [data, setData] = useState(data || []);

    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     getAllBlogs().then(setData);
    // }, []);

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     console.log("Only render at Initial Render")
    //     async function fetchData() {
    //         const result = await actions.getAllBlogs();
    //         setData(result);
    //     }
    //
    //     fetchData();
    //
    // }, []);



    return (
        <section className={"w-full bg-gray-200"}>
            <Typography className={"text-center"} variant={"h2"}>All Blog Articles {data.length} </Typography>

            <div className={"blog-container grid justify-stretch justify-items-center  mt-3.5 "}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6" >
                    {blogs.length > 0 ? (
                        blogs.map((item) => (

                            <motion.div
                                key={nanoid(5)}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                            >
                                <MUICard data={item}/>

                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">No articles available</div>
                    )}
                </div>

            </div>
        </section>
    );

}




export default BlogArticles;