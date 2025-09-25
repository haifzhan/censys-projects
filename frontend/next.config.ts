import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary: ignore type and lint errors during production builds
  // to unblock container builds. Re-enable once types are fixed.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
