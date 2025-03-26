import React from 'react';
import {FormControl, InputLabel, MenuItem, Select,Box} from "@mui/material";
import MUICard from "@/components/MUICard";
import {nanoid} from "nanoid";


function BlogCategories({data,theme}) {

    if(!data) return null;
    return (
        <Box sx={{ width: "100%", bgcolor: "gray.200", p: 3 }}>
            {/* Filter Dropdown */}
            <FormControl sx={{ minWidth: 200, mb: 3 }}>
                <InputLabel sx={{ backgroundColor: "white", px: 1 ,color:"#212121"}} >Category</InputLabel>
                <Select className={""}  >
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