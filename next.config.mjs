/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg', 'via.placeholder.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 60,
  },
  staticPageGenerationTimeout: 120,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuração de headers para cache
  async headers() {
    const headers = [
      {
        source: '/:all*(svg|jpg|png|webp|avif|woff|woff2|ttf|eot)',
        locale: false,
        headers: process.env.NODE_ENV === 'development' 
          ? [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }]
          : [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: process.env.NODE_ENV === 'development'
          ? [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }]
          : [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/image/:path*',
        headers: process.env.NODE_ENV === 'development'
          ? [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }]
          : [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=31536000' }],
      },
    ];

    // Adicionar headers para todas as rotas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      headers.push({
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' }
        ],
      });
    }

    return headers;
  },
};

export default nextConfig;