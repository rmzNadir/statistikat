/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
