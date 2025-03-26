/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        vegan:"var(--font-vegan)"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage:{
        "grain":"url('/images/noisy-background.png')"
      },
      animation:{
        "noisy-bg":"noise 1s steps(2) infinite",
        bgZoom: "bgZoom 10s ease-in-out infinite alternate",
        bgMove: "bgMove 15s linear infinite alternate",
        bgFade: "bgFade 5s ease-in-out infinite alternate",
      },
      keyframes:{
        noise: {
          "0%": {
            transform: "translate3d(0, 9rem, 0)",
          },
          "10%": {
            transform: "translate3d(-1rem, -4rem, 0)",
          },
          "20%": {
            transform: "translate3d(-8rem, 2rem, 0)",
          },
          "30%": {
            transform: "translate3d(9rem, -9rem, 0)",
          },
          "40%": {
            transform: "translate3d(-2rem, 7rem, 0)",
          },
          "50%": {
            transform: "translate3d(-9rem, -4rem, 0)",
          },
          "60%": {
            transform: "translate3d(2rem, 6rem, 0)",
          },
          "70%": {
            transform: "translate3d(7rem, -8rem, 0)",
          },
          "80%": {
            transform: "translate3d(-9rem, 1rem, 0)",
          },
          "90%": {
            transform: "translate3d(6rem, -5rem, 0)",
          },
          to: {
            transform: "translate3d(-7rem, 0, 0)",
          },
        },
        bgZoom:{
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        bgMove: {
          "0%": { backgroundPosition: "center" },
          "50%": { backgroundPosition: "left" },
          "100%": { backgroundPosition: "right" },
        },
        bgFade: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      }
    },
  },
  plugins: [],
};

