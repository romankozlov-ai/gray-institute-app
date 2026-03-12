/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Для GitHub Pages/Vercel
  ,
};

module.exports = nextConfig;
