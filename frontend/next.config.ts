import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "example.com", "via.placeholder.com"], // Додаємо randomuser.me до дозволених хостів
  },
  eslint: {
    ignoreDuringBuilds: true, // Вимкне ESLint під час збірки
  },
};

export default nextConfig;
