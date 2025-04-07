"use client"

import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography,Box} from "@mui/material";
import theme from "@/theme";
import {redirect} from "next/navigation";

function MUICard({blogs}) {

    const [isClient, setIsClient] = useState(false);

    const onButtonClick = (id) => {
        console.log("ID RECEIVED IS ", id)
        redirect(`/blogs/${id}`)
    }

    const onClickEdit = (id) => {
        console.log("ID RECEIVED IS ", id)
        redirect(`/edit/${id}`)
    }

    useEffect(() => {
        setIsClient(true);
    }, []);


    // console.log("CARD DATA ", blogs)

    if (!blogs || !blogs.description) return null;

    return (
        <Card sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1"
        }}>
            <CardMedia
                component="img"
                sx={{height: 300, objectFit: "cover"}}
                image={blogs.imageUrl}
                alt="Random Image"
            />
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5">
                    {blogs.title}
                </Typography>
                {isClient && (

                    <Box
                        component="div"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4, // Show only 3 lines
                            WebkitBoxOrient: 'vertical',
                            maxWidth: "100%",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                        }}
                        color="text.secondary"
                        dangerouslySetInnerHTML={{__html: blogs.description}}
                    >

                    </Box>
                )}

            </CardContent>
            <CardActions sx={{alignSelf: "flex-end"}}>
                <Button
                    onClick={() => onButtonClick(blogs.id)}
                    size="small"
                    sx={{
                        color: theme.palette.secondary.main,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }
                    }
                >
                    Read More
                </Button> <Button
                onClick={() => onClickEdit(blogs.id)}
                size="small"
                sx={{
                    color: theme.palette.secondary.main,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }
                }
            >
                Edit Blog</Button>
            </CardActions>
        </Card>
    );
}

export default MUICard;
