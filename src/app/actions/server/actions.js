import axios from "axios";

export const getAllBlogs = async () => {

    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`, {
        cache: 'no-cache',


    });

    console.log("resposne data all blogs", response.data)
    return response.data.data
}

export const getLatestBlogs = async () => {

    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs`, {
        cache: 'no-cache'
    });

    console.log("resposne data", response.data.data)

    const latestBlogs = response.data.data.sort((a, b) => {
        new Date(a.createdAt) - new Date(b.createdAt)
    }).slice(0, 6)

    // const latestBlogs=latestBlogs.map(()=>{
    //
    //
    // })

    console.log("EXTRACTED ITEMS ", latestBlogs.length)

    return latestBlogs
}


export const getAllCategories = async () => {

    console.log("CAlling Get Methods for CAtegory")

    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/category`, {
        cache: 'no-cache'
    });

    console.log("resposne data", response.data)
    return response.data.data

}

// export const getAllBlogs=async ()=>{
//
//     console.log("CAlling Get Methods for CAtegory")
//
//     const response=await axios.get('http://localhost:3000/api/blogs',{
//         cache: 'no-cache'
//     });
//
//     console.log("resposne data",response.data)
//     return response.data.data
//
// }

export const getUserById = async (id) => {

    try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/users/${id}`, {
            cache: 'no-cache'
        });

        console.log("resposne data", response.data)
        return response.data.data
    }catch (e) {

        console.log("ERROR ",e)
    }

}

export const getBlogDetailById = async (id) => {

    try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
            cache: 'no-cache'
        });

        console.log("resposne data", response.data)
        return response.data.data
    }catch (e) {

        console.log("ERROR ",e)
    }

}

