"use client"
import React, {useEffect, useState} from 'react';
import * as actions from "@/app/actions/server/actions";
import {nanoid} from "nanoid";
import { motion } from "framer-motion";

import {Button, Typography} from "@mui/material";
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

    return (
        <section className={"w-full bg-gray-200"}>
            <Typography className={"text-center"} variant={"h2"}>Recent Articles </Typography>

            <div className={"blog-container flex mt-3.5 "}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-end gap-6" >
                    {data.length > 0 ? (
                        data.map((item) => (
                            <motion.div
                                key={nanoid(5)}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                            >
                                <MUICardHome data={item}/>

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

export default Articles;