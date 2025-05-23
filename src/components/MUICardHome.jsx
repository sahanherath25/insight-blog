import React from 'react';
import { redirect } from "next/navigation";
import theme from "@/theme";
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Grid,Box } from "@mui/material";

function MUICardHome({ data }) {

    const onButtonClick = (id) => {
        console.log("ID RECEIVED IS ", id);
        redirect(`/blogs/${id}`);
    }

    console.log("CARD DATA ", data);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}> {/* Responsive grid layout */}
            <Card sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "450px", // Ensure the cards have the same height
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                    }}
                    image={data.imageUrl}
                    alt="Random Image"
                />
                <CardContent sx={{ flexGrow: 1 ,overflow: "hidden"}}>
                    <Typography gutterBottom variant="h5" sx={{ fontSize: "1.2rem" }}>
                        {data.title}
                    </Typography>
                    <Box
                        className="clamp-box"
                        component="div"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Show only 3 lines
                            WebkitBoxOrient: 'vertical',
                            maxWidth:"100%",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                    }} // Ensures text doesn't overflow
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", padding: "16px" }}>
                    <Button
                        onClick={() => onButtonClick(data.id)}
                        size="small"
                        sx={{
                            color: theme.palette.secondary.main,
                            padding: '10px 20px',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default MUICardHome;
