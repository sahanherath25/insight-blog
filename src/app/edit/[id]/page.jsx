"use client"

import React, {useEffect, useState} from 'react';
import {Button, TextField, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import {getAllCategories} from "@/app/actions/server/actions";
import draftjsToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw,convertFromHTML} from "draft-js"
// import { Editor } from "react-draft-wysiwyg";
import {useSession} from "next-auth/react";
import toast, {Toaster} from 'react-hot-toast';
import axios from "axios";
import ContentState from "draft-js/lib/ContentState";
import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import TextStyle from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import {MenuBar} from "@/components/MenuBar";

// Dynamically import the Editor component and disable SSR
export const dynamic = "force-dynamic"


const getBlogDataById = async (id) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
    return response.data.data
}

const updateBlogData = async (id, postData) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, postData)
    } catch (error) {
        console.log(error.message)
    }
}


function EditBlog({params}) {

    const [title, setTitle] = useState("");
    const [blogId, setBlogId] = useState("");
    const [blogData, setBlogData] = useState("");
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState(blogData.description)

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
        onUpdate: ({editor}) => {
            setContent(editor.getHTML()); // Updates content on change
        },
    });


    // console.log("Params ",params)

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        console.log("CURRENT TITLE IS ", event.target.value);
    };

    const onFormSubmit = async () => {

        const contentOnEditor = content;
        const titleData = title;

        const myData = {
            title,
            description: contentOnEditor
        }

        console.log("content ", contentOnEditor)
        console.log("currnet title  ", title)

        try {
            toast.loading("Sending your Data to the Database ", {id: "postData"})
            await updateBlogData(blogId, myData)
            toast.success("Blog post submitted successfully ", {id: "postData"})

        } catch (e) {
            // toast.error("Error Occurred when Sending the Data   ",{id:"postData"})
            console.log("ERROR ", e)
        }
    }



    useEffect(() => {
        const getID = async () => {

            const {id} = await params
            setBlogId(id)
            if (id) {
                const data = await getBlogDataById(id)
                setBlogData(data)
                console.log("DESCRIPTION IS ", data.description)
                setTitle(data.title)
                const currentContent = convertFromHTML(data.description)
                console.log("Currnet Content  IS ", currentContent)
                const contentState = ContentState.createFromBlockArray(currentContent.contentBlocks)
                setContent(data.description)
                console.log("INITIAL STATE ", content)
            }
        }
        getID()

    }, []);

    // useEffect(()=>{
    //     setContent()
    // },[])


    console.log("BLOG IDE RECEVEID IS ", blogId)
    console.log("BLOG SET DATA  RECEVEID IS ", blogData)
    console.log("Editor text ", content)
    // console.log("Editor State  ", editorState)


    const onEditorStateChange = (e) => {
        console.log("EDITOR STATE ", e)
        setEditorState(e)
    }


    useEffect(() => {
        if (content && editor) {
            editor.commands.setContent(content); // This ensures that the editor content is updated after fetching
        }
    }, [content, editor]);

    if (!blogData) return null


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
                    {blogData.description &&
                        (
                            // <MenuBar editor={editor}/>
                         <div>
                             <MenuBar editor={editor}/>
                             {editor && <EditorContent editor={editor}  onChange={onEditorStateChange}/>}
                         </div>
                        )
                }


            </div>

        </div>


</section>
)
    ;
}

export default EditBlog;