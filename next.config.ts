
//https://stackoverflow.com/questions/75002714/next-js-can-i-configure-multiple-image-hostnames-in-next-config-js

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
};

module.exports = nextConfig;
