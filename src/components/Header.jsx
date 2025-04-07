"use client"

import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {motion} from "framer-motion";
import {nanoid} from "nanoid";

const authLinks = [
    {name: "Blogs", url: "/blogs"},
    {name: "Add", url: "/blogs/add"},
    {name: "Profile", url: "/profile"},
    {name: "Find", url: "/search"},
]

const nonAuthLinks = [
    {name: "Blogs", url: "/blogs"},
    {name: "Login", url: "/login"},
    {name: "Register", url: "/register"},
]

function Header() {

    const {status} = useSession();

    console.log("YOur Are Currnetly ", status)


    return (
        <motion.header
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.6, ease: "easeOut"}}
            className={"sticky top-0 z-50 w-full border-b border-gray-300 bg-white/80 backdrop-blur-lg shadow-md"}>
            <nav className={"flex items-center justify-between px-8 py-4"}>
                <Logo/>
                <div className={"flex items-center gap-6"}>
                    {(status === "authenticated" ? authLinks : nonAuthLinks).map((item) => {
                        return (
                            <Link
                                key={nanoid(4)}
                                className={"text-gray-800 hover:text-violet-600 transition"}
                                href={item.url}>
                                {item.name}
                            </Link>
                        )
                    })}
                    {
                        status === "authenticated" && <button onClick={() => signOut()}>Logout</button>
                    }

                </div>

            </nav>
        </motion.header>
    );
}

export default Header;