"use client"

import React, {useEffect, useState} from 'react';
import {Button, TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Image from "next/image";
import {getAllCategories} from "@/app/actions/server/actions";
import {nanoid} from "nanoid";
import draftjsToHtml from "draftjs-to-html"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from "draft-js"

import {useSession} from "next-auth/react";
import toast from 'react-hot-toast';
import axios from "axios";
import {useEditor, EditorContent} from "@tiptap/react";

import {Editor} from '@tiptap/core'
import {StarterKit} from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import TextStyle from "@tiptap/extension-text-style";
import {MenuBar} from "@/components/MenuBar";
// import {revalidatePath} from "next/cache";

// const myEditor=new Editor({
//     element: document.querySelector('.element'),
//     extensions: [Document, Paragraph, Text],
// })


function AddBlogPage() {

    const {data: session} = useSession();

    console.log("USER LOGIN DETAILS ARE ", session);

    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("category");
    const [categoryData, setCategoryData] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [editorState, setEditorState] = useState(null);
    const [content, setContent] = useState('')


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                }
            }),
            Document,
            TextStyle,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2, 3],
            }),], // Add StarterKit for basic features
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
            }
        },
        content: '<p>Start writing your blog post here...</p>',
        onUpdate: ({editor}) => {
            setContent(editor.getHTML()); // Updates content on change
        },
    });


    //
    // const onEditorStateChange = (state) => {
    //     setEditorState(state);
    // };

    // useEffect(() => {
    //
    //     setEditorState(EditorState)
    // }, []);


    // console.log("SET STATE ",editorState);

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

    console.log("CATEGORY   ", categoryData)
    console.log("CATEGORY Selected  ", category)

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
        const contentOnEditor = content;

        console.log("UISER ID ",session.user)

        console.log("EDITOR CONTENT ",contentOnEditor)

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
            toast.loading("Sending Data....", {id: "postData"})

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            toast.success("Blog post submitted successfully ", {id: "postData"})
            // revalidatePath("/")
            // revalidatePath("/blogs")

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

                <div className={"textEditor max-w-3xl mt-4 "}>

                    {/*<Editor*/}
                    {/*    editorStyle={{*/}
                    {/*        minHeight: "50vh",*/}
                    {/*        width: "100",*/}
                    {/*        height: "auto",*/}
                    {/*        border: "2px solid black",*/}
                    {/*    }}*/}
                    {/*    toolbarClassName="toolbarClassName"*/}
                    {/*    wrapperClassName="wrapperClassName"*/}
                    {/*    editorClassName="editorClassName"*/}
                    {/*    // onContentStateChange={onEditorStateChange}*/}
                    {/*    onEditorStateChange={onEditorStateChange}*/}
                    {/*    editorState={editorState}*/}

                    {/*/>*/}
                    {/*<EditorContent editor={editor} />*/}

                    <MenuBar editor={editor}/>
                    {editor && <EditorContent editor={editor} onChange={onEditorStateChange}/>}


                </div>

            </div>


        </section>
    );
}

export default AddBlogPage;