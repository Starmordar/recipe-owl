import withPWA from 'next-pwa'; 
import withBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/recipe-owl/**',
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};



export default withNextIntl(withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(
  withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  })
    (nextConfig)
))
