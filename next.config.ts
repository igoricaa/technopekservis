import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME || 'technopekservis.iza.rs',
        port: '',
      },
    ],
  },
};

export default nextConfig;
