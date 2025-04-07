"use client"
import React, {useEffect, useState} from 'react';
import * as actions from "@/app/actions/server/actions";
import {Typography} from "@mui/material";
import {motion} from "framer-motion";
import {nanoid} from "nanoid";
import MUICard from "@/components/MUICard";
import {log} from "next/dist/server/typescript/utils";

function BlogArticles({initialBlogs}) {

    const [blogs, setBlogs] = useState(initialBlogs || []);



}




// export default BlogArticles;