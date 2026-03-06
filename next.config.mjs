/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    output: "export",
    basePath: "/blog",
    assetPrefix: "/blog/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
