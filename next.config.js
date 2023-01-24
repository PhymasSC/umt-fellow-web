/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		formats: ["image/avif", "image/webp"],
		domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
	},
	env: {
		APOLLO_SERVER: process.env.APOLLO_SERVER,
	},
};

module.exports = nextConfig;
