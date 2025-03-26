import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";

function Logo(props) {
 return (
  <Link href={"/"} className={"text-gray-900 text-lg font-extrabold"}>
   <motion.span
       initial={{ opacity: 0, x: -10 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.5, ease: "easeOut" }}
       className={"text-violet-600 font-bold text-2xl"}>
    I</motion.span>nsight
  </Link>
 );}

export default Logo;