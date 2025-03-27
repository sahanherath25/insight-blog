import React from 'react';
import {getBlogDetailById} from "@/app/actions/server/actions";
import { Container, Typography, Card, CardMedia, CardContent, Box } from "@mui/material";


async function BlogDetailPage({req, params}) {

    const {id}=await params;
    const blogDetails=await getBlogDetailById(id)

    console.log("OBJECT IS ",blogDetails)

    // if (!blogDetails) {
    //     return (
    //         <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
    //             <Typography variant="h4" color="error">
    //                 Blog Not Found
    //             </Typography>
    //         </Container>
    //     );
    // }


    return (
        <section className={"w-full "}>

            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    {/* Blog Image */}
                    <CardMedia
                        component="img"
                        height="400"
                        image={blogDetails.imageUrl}
                        alt={blogDetails.title}
                        sx={{ objectFit: "cover" }}
                    />

                    <CardContent>
                        {/* Blog Title */}
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {blogDetails.title}
                        </Typography>

                        {/* Blog Metadata */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", color: "gray", mb: 2 }}>
                            <Typography variant="body2">Published on {new Date(blogDetails.createdAt).toDateString()}</Typography>
                            <Typography variant="body2">Location: {blogDetails.location}</Typography>
                        </Box>

                        {/* Blog Content */}
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: blogDetails.description }}
                            sx={{ mt: 2, lineHeight: 1.7 }}
                        />
                    </CardContent>
                </Card>
            </Container>


        </section>
    );
}

export default BlogDetailPage;