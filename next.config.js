/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // ❌ Comment this out or remove it
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
