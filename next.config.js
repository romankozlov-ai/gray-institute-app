const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
module.exports = withNextIntl(nextConfig);