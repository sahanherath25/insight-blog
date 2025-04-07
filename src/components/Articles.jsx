"use client"
import React, {useEffect, useState} from 'react';
import * as actions from "@/app/actions/server/actions";
import {nanoid} from "nanoid";
import { motion } from "framer-motion";

import {Button, CircularProgress, Typography} from "@mui/material";
import MUICard from "@/components/MUICard";
import {getLatestBlogs} from "@/app/actions/server/actions";
import MUICardHome from "@/components/MUICardHome";

function  Articles() {

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Only render at Initial Render")
        async function fetchData() {
            const result = await actions.getLatestBlogs();
            setData(result);
        }
        fetchData();
    }, []);
    //
    console.log("DATA ",data)

    if(!data) {
       return (
           <div className={"w-full h-screen"}>
               <CircularProgress color="success"/>
           </div>
       )
    }

    return (
        <section className={"w-full bg-gray-200 "}>
            <Typography className={"text-center"} variant={"h2"}>Recent Articles </Typography>

            <div className={"blog-container  mt-3.5 w-full "}>

                <div className="grid w-full  sm:grid-cols-2 lg:grid-cols-4  gap-6 px-4" >
                    {data.length > 0 ? (
                        data.map((item) => (
                            <motion.div
                                key={nanoid(5)}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                className="bg-white shadow-lg rounded-lg p-6 w-full "
                            >
                                <MUICardHome data={item}/>

                            </motion.div>
                        ))
                    ) : (
                        <div className=" bg-red-200 col-span-full text-center text-gray-600 p-8"><CircularProgress size={50} color="success"/></div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Articles;