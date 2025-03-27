"use client"
import dynamic from "next/dynamic";
import React, {useEffect, useState} from 'react';
import {Button, TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import {getAllCategories} from "@/app/actions/server/actions";
import {nanoid} from "nanoid";
import draftjsToHtml from "draftjs-to-html"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import {useSession} from "next-auth/react";
import toast from 'react-hot-toast';
import axios from "axios";


// const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {ssr: false});

// const Editor = dynamic(
//     () => import("react-draft-wysiwyg")
//     { ssr: false }
// );


function AddBlogPage() {

    const {data: session} = useSession();

    console.log("USER LOGIN DETAILS ARE ", session);

    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("category");
    const [categoryData, setCategoryData] = useState("");

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    // const [editorState, setEditorState] = useState(()=>{
    //     console.log("ty",typeof window)
    //    return  typeof window !== 'undefined' ? EditorState.createEmpty() :
    // });

    //
    // const onEditorStateChange = (state) => {
    //     setEditorState(state);
    // };

    // useEffect(() => {
    //
    //     setEditorState(EditorState)
    // }, []);


    console.log("SET STATE ",editorState);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        console.log("File is ", file)

        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }


    }

    const handleChangeCategory = (event) => {
        console.log("current slected value category is ", event.target.value)
        setCategory(event.target.value);
    };

    useEffect(() => {
        const getCategories = async () => {
            const response = await getAllCategories();

            if (response) {
                console.log("data", response)
                setCategoryData(response)
            }
        }

        getCategories();

    }, []);

    // console.log("CATEGORY Selected  ", category)

    console.log(imageUrl);

    const convertEditorDataToHTML = () => {
        // TODO
        if (!editorState) return ""
        return draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    }


    const onFormSubmit = async () => {

        const selectedCategory = categoryData.find((item) => {
            return item.name === category;
        })
        const contentOnEditor = convertEditorDataToHTML();

        const myData = {
            userId: session.user.id,
            title,
            location,
            description: contentOnEditor,
            categoryId: selectedCategory.id
        }

        const formData = new FormData();

        // TODO Need to convert to HTML FORM element Type
        // TODO For that we need to Convert to JSON
        const postData = JSON.stringify(myData);
        formData.append("postData", postData);
        formData.append("image", file);

        console.log("MY CURRENT FORM DATA ", formData.get("postData"))
        console.log("MY CURRENTK Image Data ", formData.get("image"))


        try {
            toast.loading("Sending your Data to the Database ", {id: "postData"})

            await axios.post("http://localhost:3000/api/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            toast.success("Blog post submitted successfully ", {id: "postData"})
            revalidatePath("/")
            revalidatePath("/blogs")

        } catch (e) {
            // toast.error("Error Occurred when Sending the Data   ",{id:"postData"})
            console.log("ERROR ", e)
        }
    }


    const onEditorStateChange = (e) => {
        console.log("EDITOR STATE ", e)
        setEditorState(e)
    }



    return (
        <section className={"w-full grow-1 my-4"}>

            {/*<Toaster position={"top-center"}/>*/}
            <h2>Going to Add a New blog</h2>

            <div className={"flex justify-between"}>
                <h2>Author : {session?.user?.name} </h2>
                <Button onClick={onFormSubmit} className={"bg-blue-700"}>Publish</Button>
            </div>

            {imageUrl && (
                <div className={"flex items-center justify-center"}>
                    <Image
                        className={"text-center"}
                        alt={"selected Image "}
                        src={imageUrl}
                        width={800}
                        height={800}/>
                </div>

            )}


            <div className={"flex justify-center flex-col items-center"}>
                <TextField
                    className={"my-5"}
                    placeholder={"Enter Your Blog Title"}
                    variant="outlined"
                    value={title}
                    onChange={handleTitleChange}
                    sx={{marginY: 3}}
                />
                <Button

                    sx={{
                        background: (theme) => {
                            return theme.palette.primary.dark;
                        }
                    }}
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon/>}
                >
                    Choose Image
                    <input
                        onChange={onImageChange}
                        type={"file"}
                        hidden/>
                </Button>

                <TextField
                    placeholder={"Enter Locaation"}
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={onChangeLocation}
                    sx={{
                        color: (theme) => theme.palette.secondary.dark,
                        marginY: 2, // vertical margin
                        '& .MuiInputBase-root': {// Background color for input field
                            borderRadius: '8px', // Rounded corners
                        },
                        '& .MuiOutlinedInput-root': {
                            borderColor: (theme) => theme.palette.primary.dark, // Border color (using primary color from theme)
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: (theme) => theme.palette.primary.lightDark, // Darker border on hover
                            },
                        },
                    }}
                />

                <div>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel
                            className={"bg-transparent px-1"}
                            sx={{
                                color: (theme) => theme.palette.primary.dark
                            }}
                            id="location-label">Category</InputLabel>
                        <Select
                            value={category}
                            labelId="location-label"
                            onChange={handleChangeCategory}
                            label="category"
                            sx={{
                                minWidth: 200,
                                backgroundColor: "transparent", // Set background to transparent
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "red", // Border color when not focused
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "red", // Border color when hovered
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#f465ff", // Border color when focused
                                    },
                                },
                                "& .MuiSelect-icon": {
                                    color: "black", // Custom dropdown icon color
                                },
                                "& .MuiSelect-select": {
                                    padding: "10px", // Adjust padding for better spacing
                                },
                            }}

                        >
                            {categoryData.length > 0 ? (
                                categoryData.map((item, index) => {
                                    return (
                                        <MenuItem className={"text-amber-500"} key={nanoid(4)}
                                                  value={item.name}>{item.name}</MenuItem>
                                    )
                                })
                            ) : <MenuItem disabled>No categories available</MenuItem>}
                        </Select>
                    </FormControl>

                </div>

                <div className={"textEditor"}>

                        <Editor
                            editorStyle={{
                                minHeight: "50vh",
                                width: "100",
                                height: "auto",
                                border: "2px solid black",
                            }}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            // onContentStateChange={onEditorStateChange}
                            onEditorStateChange={onEditorStateChange}
                            editorState={editorState}

                        />



                </div>

            </div>


        </section>
    );
}

export default AddBlogPage;