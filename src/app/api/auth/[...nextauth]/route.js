import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDB, verifyUserExists} from "@/lib/helpers";
import prisma from "../../../../../prisma/index";
import bcrypt from "bcryptjs";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET}),
        GoogleProvider({clientId: process.env.GOOLGE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET}),
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
                    console.log("USER  FOUND LOGIN ",user)

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
        },
        async signIn({account,user,profile}){

        // TODO Check if user logged in fro mGoogle/Github
            if(account?.provider==="github"|| account?.provider==="google"){
                // TODO  Check if user saved in DB or not
                const newUser=await verifyUserExists(user)

                // TODO Exist get the userID from DB and Assign
                if(newUser!==null){
                    user.id=newUser?.id;
                    if(profile&& profile.sub){
                        profile.sub=newUser.id
                        console.log("PROFILE SUB", profile.sub)
                    }
                }
            }

            // TODO Must return true
            // Otherwise we get Permission Error
            return true
        },
        async redirect({}){
        // TODO  Once we SIgnIn with next auth redirect to this page
            return "/"
        },
        pages:{
             signIn:"/login"
        }
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}


