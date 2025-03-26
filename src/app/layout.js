import {Geist, Geist_Mono, Roboto, Montserrat} from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "../theme";
import {ThemeProvider} from "@mui/material/styles";
import {Toaster} from "react-hot-toast";
import React from "react";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Insight blog",
    description: "Blog application",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">

        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme} options={{ enableCssLayer: true }}>

                <Provider>
                    <Toaster position={"top-center"}/>
                    <main className={"w-full h-screen border border-gray-200  flex flex-col"}>
                        <Header/>
                        {children}
                        <Footer/>
                    </main>
                </Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
