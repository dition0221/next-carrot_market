/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/kk4YLvIogqMNHpBdH1Y55w/**",
      },
    ],
  },
};

module.exports = nextConfig;
