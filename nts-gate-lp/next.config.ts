import type { NextConfig } from "next";
import path from "path";

// 親ディレクトリなどに別の package-lock があると、Next が誤ったワークスペースルートを推論するのを防ぐ
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/diagnosis/:path*",
        destination: "/check",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
