
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      'i.imgur.com',
      'uploads.mangadex.org',
      'mangadex.org',
      'comick.app',
      'comick.io',
      'api.comick.fun',
      'meo.comick.pictures',
      't.nhentai.net',
      'i.nhentai.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
