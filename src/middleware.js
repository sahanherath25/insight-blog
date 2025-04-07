import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export const middleware = async(req)=>{

//     TODO Step 1 Get session details
//     TODO if session null user not logged in

    console.log("Middleware Request ",req)
    console.log('Middleware is executing!', req.nextUrl.pathname);
    // return NextResponse.next();

//     decrypt the id from  token
    const session=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET}
    );

    console.log("MIDDLEWARE SESSION CHECKING ",session)

    if(!session){
        // return NextResponse.redirect("/blogs",req.url)
        return NextResponse.redirect(new URL("/blogs", req.url));
    }

    return NextResponse.next();


}


// TODO only executes this middleware on this routes
export const config={

    matcher:["/blogs/add","/blogs/edit/:id","/profile"]
}