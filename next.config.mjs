/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "dl.dropbox.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
