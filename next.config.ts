import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 루트(/) 접속 시 기본 언어(한국어)로 보냅니다.
  async redirects() {
    return [{ source: "/", destination: "/ko", permanent: false }];
  },
};

export default nextConfig;
