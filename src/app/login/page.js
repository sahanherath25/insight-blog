"use client"
import React from "react";
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Paper,
    Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import {useForm} from "react-hook-form";

import {signIn} from "next-auth/react";

import toast from "react-hot-toast";


function LoginPage() {

    const {register,handleSubmit,formState}=useForm()


    async function signInWithCredentials(data) {
    //     TODO Execute when User Sign In With Credentails
        console.log("DATA HAVE ",data)

        toast.loading("Signing In....",{id:"sign"})
        try {

           await signIn("credentials",{...data})
            toast.success("Signing In....",{id:"sign"})
        }catch (e) {
            toast.error("Error When Sign In",{id:"sign"})
            console.log("Error")
        }

    }

    async function signInWithGoogleOrGithub(type) {

        toast.loading("Signing In....",{id:"sign"})
        try {
           await signIn(type)
            toast.success("Signing In....",{id:"sign"})
        }catch (e) {
            toast.error("Error When Sign In",{id:"sign"})
            console.log("Error")
        }
    }




    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Sign in to your account
                </Typography>

                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    <TextField
                        fullWidth label="Email" variant="outlined" type="email" required  {...register("email")}/>
                    <TextField
                        fullWidth label="Password" variant="outlined" type="password" required {...register("password")} />
                    <Button variant="contained" color="primary" size="large" onClick={handleSubmit(signInWithCredentials)}>
                        Login
                    </Button>
                </Box>
                <Divider sx={{ my: 3 }}>or</Divider>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    sx={{ mb: 2 }}
                    onClick={async()=>signInWithGoogleOrGithub("google")}
                >
                    Continue with Google
                </Button>

                <Button
                    onClick={async()=>signInWithGoogleOrGithub("github")}
                    variant="outlined"
                    fullWidth
                    startIcon={<GitHubIcon />}>
                    Continue with GitHub
                </Button>
            </Paper>
        </Container>
    );

}

export default LoginPage;