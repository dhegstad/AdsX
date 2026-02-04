import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AdsX - AI Search Advertising Agency',
    short_name: 'AdsX',
    description: 'The first advertising agency built for AI search. Get your brand recommended by ChatGPT, Claude, Perplexity & more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon-48',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon-96',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-144',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
