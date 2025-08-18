/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'randomuser.me'
    ],
  },
}

module.exports = nextConfig
