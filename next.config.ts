import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLPzET0_I7APmMEbI4_kMsAH20amfm0DqPASe_tmPekPIVj6tiJ4POZvCx&s=10')],
  },
};

export default nextConfig;
