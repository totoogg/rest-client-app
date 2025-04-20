import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return Promise.resolve([
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Suppress-Resource-Preload-Warning',
            value: 'true',
          },
        ],
      },
    ]);
  },
  experimental: {
    optimizeCss: false,
    disableOptimizedLoading: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
