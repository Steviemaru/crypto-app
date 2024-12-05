// next.config.mjs



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
      config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
      });

      return config;
  },
  images: {
    remotePatterns: [
      {hostname:'coin-images.coingecko.com'}
    ],
  },
};

export default nextConfig;