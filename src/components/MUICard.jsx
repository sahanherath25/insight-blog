"use client"

import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import theme from "@/theme";
import {redirect} from "next/navigation";

function MUICard({data}) {

    const onButtonClick = (id) => {
        console.log("ID RECEIVED IS ", id)
        redirect(`/blogs/${id}`)
    }

    const onClickEdit = (id) => {
        console.log("ID RECEIVED IS ", id)
        redirect(`/edit/${id}`)
    }



    console.log("CARD DATA ", data)


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
                image={data.imageUrl}
                alt="Random Image"
            />
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5">
                    {data.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{__html: data.description}}
                >

                </Typography>
            </CardContent>
            <CardActions sx={{alignSelf: "flex-end"}}>
                <Button
                    onClick={()=>onButtonClick(data.id)}
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
                </Button>                <Button
                    onClick={()=>onClickEdit(data.id)}
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
