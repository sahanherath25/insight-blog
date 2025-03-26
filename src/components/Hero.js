"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Articles from "@/components/Articles";



const Hero = () => {

    return (
        <>
            <hr/>
            <section className="hero relative z-4 w-full h-[90vh] boder border-red-500 overflow-hidden">

                <motion.div
                    className="hero-image w-full h-screen absolute top-0 left-0  "
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.5}}
                >
                    <Image
                        layout="fill"
                        style={{objectFit: "cover"}}
                        objectPosition={"top "}
                        loading={"lazy"}
                        src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Hero Image"
                        className="hero-img absolute top-0 left-0 right-0 bottom-0 "
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-1"
                         style={{zIndex: 1}}></div>
                    {/* Tailwind Overlay */}

                </motion.div>

                <motion.div
                    className="hero-content absolute top-[50%] left-[20%] z-2 bg-white p-4  text-black "
                    initial={{y: 50, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 1.5, delay: 0.5}}
                >
                    <h1 className={"text-4xl md:text-5xl font-bold leading-tight my-2"}>Welcome to My Blog</h1>
                    <p className={"text-lg md:text-xl  my-2  opacity-80"}>Stay updated with the latest posts and
                        insights</p>
                    <a href="#latest-posts"
                       className="cta- bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out ">Read
                        Latest Posts</a>
                </motion.div>

                <motion.div
                    className="hero-content absolute top-[50%] right-[20%] z-2 bg-white p-4  text-black "
                    initial={{y: -50, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 1.5, delay: 0.5}}
                >
                    <h1 className={"text-4xl md:text-5xl font-bold leading-tight my-2"}>Welcome to My Blog</h1>
                    <p className={"text-lg md:text-xl  my-2  opacity-80"}>Stay updated with the latest posts and
                        insights</p>
                    <a href="#latest-posts"
                       className="cta- bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out ">Read
                        Latest Posts</a>
                </motion.div>

            </section>
            <hr/>
        </>

    );
};


export default Hero;