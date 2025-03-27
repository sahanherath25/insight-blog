"use client"
import React, {useState} from 'react';
import axios from "axios";
import BlogItem from "@/components/BlogItem";
import {nanoid} from "nanoid";
import toast from "react-hot-toast";
import {Button, CircularProgress, TextField, Typography,Container,Grid} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";


const searchBlog = async (searchTerm = "") => {
    return response.data.data
//     inside url we cdannot provide spaces
}


function page() {

    const [searchTerm, setSearchTerm] = useState("")
    const [blogs, setBlogItems] = useState([])
    const [loading, setLoading] = useState(false);

    const handleSearch=async ()=>{
        // const data= await searchBlog(searchTerm)

        let str=searchTerm
        if(searchTerm.includes(" ")){
            // TODO Replace  "" with &
            str=searchTerm.split(" ").join("%20")
        }
        console.log("We going to search ",str);
        setLoading(true);
        toast.loading("Searching ....",{id:"search"})
        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/search`,{
                params:{
                    title:str
                }
            });

            setBlogItems(response.data.data)
            toast.success(`Success We have  Found ${response.data.data.length} Matching Blogs   `,{id:"search"})
            console.log("FOUND BLOGS ",response.data.data)
        }catch (e) {
            toast.error("Error Occured ",{id:"search"})
        }
        setLoading(false);

    }
    //
    // const onChangeText = (e) => {
    //     console.log(e.target.value)
    //     setSearchTerm(e.target.value);
    // }



    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Search a Blog
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search Blogs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
                    </Button>
                </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 3 }}>
                {blogs.length > 0 ? `We found ${blogs.length} blogs` : "No blogs found"}
            </Typography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={nanoid(5)}>
                        <BlogItem blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default page;