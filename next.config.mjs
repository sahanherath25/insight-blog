/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        turbopack: false,
    },
    images: {
        domains: ['plus.unsplash.com',"images.unsplash.com","res.cloudinary.com"]
    }
};

export default nextConfig;
