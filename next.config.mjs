import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  cacheMaxMemorySize: 0,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recipe-owl-s3.cloud',
        port: '9000',
        pathname: '/test/**',
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
