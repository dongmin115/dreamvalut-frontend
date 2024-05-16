/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'dreamvault-s3.s3.ap-northeast-2.amazonaws.com'],
  },
  output: 'standalone',
};

export default nextConfig;
