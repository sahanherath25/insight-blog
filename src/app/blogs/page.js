import BlogCategories from "@/components/BlogCategories";
import {getAllBlogs, getAllCategories} from "@/app/actions/server/actions";
import BlogArticles from "@/components/BlogArticles";


async function page() {

    const allCategories= await getAllCategories();


    console.log("DB LOADD ", allCategories);
    // console.log("DB LOADD ", allBlogs);

    return (
        <div className={"grow"}>
            <p>Hello This is my Page Component</p>
            <BlogCategories data={allCategories}/>
            <BlogArticles />
            {/*<Blogs data={myBlogData}/>*/}
        </div>
    );
}

export default page;