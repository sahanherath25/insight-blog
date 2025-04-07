import React from 'react';
import {FormControl, InputLabel, MenuItem, Select,Box} from "@mui/material";
import MUICard from "@/components/MUICard";
import {nanoid} from "nanoid";


function BlogCategories({data,theme,setCategory,setBlogs,blogs}) {


    const onChangeSelect=(e)=>{

        setCategory(e.target.value.id)
        console.log("SELECTED IS ", e.target.value.id)

        // setBlogs(()=>{
        //     return blogs.filter((currentBlog)=>{
        //         return  currentBlog.categoryId===e.target.value.id;
        //     })
        // })

    }

    if(!data) return null;
    return (
        <Box sx={{ width: "100%", bgcolor: "gray.200", p: 3 }}>
            {/* Filter Dropdown */}
            <FormControl sx={{ minWidth: 200, mb: 3 }}>
                <InputLabel sx={{ backgroundColor: "white", px: 1 ,color:"#212121"}} >Category</InputLabel>
                <Select className={""} onChange={onChangeSelect}  >
                    {data.map((category) => (
                        <MenuItem key={nanoid(5)} value={category}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* Articles Grid */}
        </Box>


 );}

export default BlogCategories;