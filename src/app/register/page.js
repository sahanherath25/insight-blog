"use client"
import React from 'react';
import {Button, Divider, Paper, TextField, Typography,Container,Box} from "@mui/material";
import {useForm} from "react-hook-form";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import axios from "axios";
import {signIn} from "next-auth/react";

function RegisterUserPage(props) {

    const { register, handleSubmit, formState } = useForm();

    async function handleRegister(data) {

        console.log("User Data:", data);
        toast.loading("Creating account...", { id: "register" });

        try {
            // TODO: Implement register logic
            await axios.post(`${NEXT_PUBLIC_API_URL}/api/auth/register`,{
                name:data.name,
                email:data.email,
                password:data.password
            } )
            toast.success("Account created successfully!", { id: "register" });
        } catch (e) {
            toast.error("Error creating account", { id: "register" });
            console.error("Register Error", e);
        }
    }

    async function signInWithGoogleOrGithub(type) {
        toast.loading("Signing In...", { id: "sign" });
        try {
            await signIn(type);
            toast.success("Signed In", { id: "sign" });
        } catch (e) {
            toast.error("Sign In Failed", { id: "sign" });
            console.error("Sign In Error", e);
        }
    }


 return (
  <section className={" w-full grow"}>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
              <Typography variant="h4" gutterBottom>
                  Register
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  Create a new account
              </Typography>

              <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                  <TextField fullWidth label="Full Name" variant="outlined" required {...register("name")} />
                  <TextField fullWidth label="Email" variant="outlined" type="email" required {...register("email")} />
                  <TextField fullWidth label="Password" variant="outlined" type="password" required {...register("password")} />
                  <Button variant="contained" color="primary" size="large" onClick={handleSubmit(handleRegister)}>
                      Register
                  </Button>
              </Box>
              <Divider sx={{ my: 3 }}>or</Divider>
              <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  sx={{ mb: 2 }}
                  onClick={() => signInWithGoogleOrGithub("google")}
              >
                  Continue with Google
              </Button>
              <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GitHubIcon />}
                  onClick={() => signInWithGoogleOrGithub("github")}
              >
                  Continue with GitHub
              </Button>
          </Paper>
      </Container>

  </section>
 );}

export default RegisterUserPage;