/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/jlpt-path',
  assetPrefix: '/jlpt-path',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
