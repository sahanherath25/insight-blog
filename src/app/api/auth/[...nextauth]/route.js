import NextAuth from "next-auth"

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDB} from "@/lib/helpers";
import prisma from "../../../../../prisma/index";
import bcrypt from "bcryptjs";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({clientId: "", clientSecret: ""}),
        GoogleProvider({clientId: "", clientSecret: ""}),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {type: "text"},
                password: {type: "password"}
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }
                try {
                    await connectToDB()
                    const user = await prisma.user.findFirst({where: {email: credentials.email}})

                    if (!user) return null
                    if (!user.password) return null

                    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)

                    console.log("PASSWORD MATCH ", isPasswordMatch)

                    if (!isPasswordMatch) {
                        return null
                    }

                    return {...user, id: user.id}

                } catch (e) {

                    console.error("ERROR ", e)
                } finally {
                    await prisma.$disconnect();
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // TODO params=== {session,user,token}
         session({session, user, token}) {
            if (session.user && token) {
                session.user.id = token.sub
            }
             // console.log("TOKEN ",token)
            // TODO Returning modified session

            // console.log("MODIFIED SESSION:", session); // Debugging session data
            return session
        }
    }

}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}


