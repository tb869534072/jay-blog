import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cifufmgtjgcjvzxfekaa.supabase.co",
        pathname: "/storage/v1/object/public/blog-files/**",
      },
    ],
  },
};

export default nextConfig;
