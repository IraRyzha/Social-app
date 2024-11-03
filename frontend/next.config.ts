import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"], // Додаємо randomuser.me до дозволених хостів
  },
};

export default nextConfig;
