const path = require('path');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  output: 'standalone',
  pageExtensions: ['page.tsx'],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
