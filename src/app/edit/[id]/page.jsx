"use client"
import dynamic from "next/dynamic";
import React, {useEffect, useState} from 'react';
import {Button, TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import {getAllCategories} from "@/app/actions/server/actions";
import draftjsToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw,convertFromHTML} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import {useSession} from "next-auth/react";
import toast, {Toaster} from 'react-hot-toast';
import axios from "axios";
import ContentState from "draft-js/lib/ContentState";

// Dynamically import the Editor component and disable SSR
// const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {ssr: false});


const getBlogDataById=async (id)=>{
    const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
    return response.data.data
}

const updateBlogData=async (id,postData)=>{

    try {
        const response=await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, postData)
    }catch(error){
        console.log(error.message)
    }


}

function EditBlog({params}) {

    const [title, setTitle] = useState("");
    const [blogId, setBlogId] = useState("");
    const [blogData, setBlogData] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    // console.log("Params ",params)

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        console.log("CURRENT TITLE IS ",event.target.value);
    };

    const onFormSubmit = async () => {

        const contentOnEditor = convertEditorDataToHTML();
        const titleData=title;

        const myData = {
            title,
            description:contentOnEditor
        }

        console.log("content ",contentOnEditor)
        console.log("currnet title  ",title)

        try {
            toast.loading("Sending your Data to the Database ", {id: "postData"})
            await updateBlogData(blogId,myData)
            toast.success("Blog post submitted successfully ", {id: "postData"})

        } catch (e) {
            // toast.error("Error Occurred when Sending the Data   ",{id:"postData"})
            console.log("ERROR ", e)
        }
    }

    useEffect(() => {
        const getID = async () => {

            const {id}=await params
            setBlogId(id)
            if(id){
                const data=await getBlogDataById(id)
                setBlogData(data)
                console.log("DESCRIPTION IS ",data.description)
                setTitle(data.title)
                const currentContent=convertFromHTML(data.description)
                console.log("Currnet Content  IS ",currentContent)
                const contentState=ContentState.createFromBlockArray(currentContent.contentBlocks)

                const initialState=EditorState.createWithContent(contentState)
                setEditorState(initialState)

                console.log("INITIAL STATE ",initialState)
            }
        }
        getID()

    }, []);


    console.log("BLOG IDE RECEVEID IS ",blogId)
    console.log("BLOG SET DATA  RECEVEID IS ",blogData)
    console.log("Editor State  ",editorState)


    const convertEditorDataToHTML = () => {
        // TODO
        if (!editorState) return ""
        return draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    }

    const onEditorStateChange = (e) => {
        console.log("EDITOR STATE ", e)
        setEditorState(e)
    }

    if(!blogData&& !editorState) return null



    return (
        <section className={"w-full grow-1 my-4"}>


            <h2>Going to Add a New blog</h2>

            <div className={"flex justify-between"}>
                <Button onClick={onFormSubmit} className={"bg-blue-700"}>Publish</Button>
            </div>


            <div className={"flex justify-center flex-col items-center"}>
                <TextField

                    className={"my-5"}
                    placeholder={"Enter Your Blog Title"}
                    variant="outlined"
                    value={title}
                    onChange={handleTitleChange}
                    sx={{marginY: 3}}
                />

                <div className={"textEditor"}>
                    {editorState && blogData.description &&
                        (
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
                                defaultEditorState={editorState}
                                // onContentStateChange={onEditorStateChange}
                                onEditorStateChange={onEditorStateChange}
                                // editorState={editorState}
                            />

                        )
                    }


                </div>

            </div>


        </section>
    );
}

export default EditBlog;