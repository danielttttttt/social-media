/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Update the 'images' configuration block
  images: {
    // Add the new domain to this array
    domains: ['i.pravatar.cc', 'images.unsplash.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:4000/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;