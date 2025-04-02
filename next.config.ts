import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cifufmgtjgcjvzxfekaa.supabase.co",
        pathname: "/storage/v1/object/public/blog-files/**",
      },
    ],
  },
};

export default nextConfig;
