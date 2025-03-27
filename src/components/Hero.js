"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Articles from "@/components/Articles";
import {Typography} from "@mui/material";

const Hero = () => {

    return (
        <>
            <section className="hero relative w-full h-[90vh] border-b border-gray-300 overflow-hidden">

                {/* Hero Image */}
                <motion.div
                    className="hero-image w-full h-full absolute top-0 left-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <Image
                        layout="fill"
                        style={{ objectFit: "cover" }}
                        objectPosition="center"
                        loading="lazy"
                        src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Hero Image"
                        className="hero-img absolute top-0 left-0 right-0 bottom-0"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </motion.div>

                {/* Hero Content */}
                <motion.div
                    className="hero-content absolute top-[50%] left-[10%] z-2 text-white text-center md:text-left"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                        Welcome to My Blog
                    </h1>
                    <p className="text-lg md:text-xl mb-5 opacity-80">
                        Stay updated with the latest posts, tips, and insights from experts
                    </p>
                    <Link href="#latest-posts" className={" cta bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out"}>
                            Read Latest Posts
                    </Link>
                </motion.div>

                {/* Additional Content (Right Side) */}
                <motion.div
                    className="hero-content absolute top-[50%] right-[10%] z-2 text-white text-center md:text-left"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                        Explore the World of Blogging
                    </h1>
                    <p className="text-lg md:text-xl mb-5 opacity-80">
                        Get inspired and learn more about blogging, tech, and lifestyle
                    </p>
                    <Link href="#latest-posts" className={" cta bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out"}>
                            Explore Now
                    </Link>
                </motion.div>

            </section>

            {/* Latest Articles Section */}
            <section id="latest-posts" className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <Typography variant="h3" className="font-bold mb-8">
                        Latest Blog Posts
                    </Typography>
                    <Articles />
                </div>
            </section>

            <hr className="my-8" />
        </>
    );
};

export default Hero;
