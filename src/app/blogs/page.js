import BlogCategories from "@/components/BlogCategories";
import {getAllBlogs, getAllCategories} from "@/app/actions/server/actions";
import BlogArticles from "@/components/BlogArticles";

export const dynamic = 'force-dynamic';

async function page() {

    // const allCategories= await getAllCategories();

    const [allCategories, allBlogs] = await Promise.all([
        getAllCategories(),
        getAllBlogs()
    ]);

    console.log("DB LOADD ", allCategories);
    // console.log("DB LOADD ", allBlogs);

    return (
        <div className={"grow"}>
            <p>Hello This is my Page Component</p>
            <BlogCategories data={allCategories}/>
            <BlogArticles initialBlogs={allBlogs} />
            {/*<Blogs data={myBlogData}/>*/}
        </div>
    );
}

export default page;

// export const dynamic = 'force-dynamic';