import React from 'react';
import {CircularProgress} from "@mui/material";

function loading(props) {
 return (
  <div className={"w-full h-screen"} >
      <CircularProgress color="success" />
  </div>
 );}

export default loading;