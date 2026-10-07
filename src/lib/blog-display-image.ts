import illustrations from './whop-illustrations.json';
import editorialIllustrations from './editorial-illustrations.json';

const vectorImages = new Set([...illustrations.map(slug => `/images/whop/${slug}.png`), ...editorialIllustrations]);

// Use the small original vector on the page; retain PNG metadata for social
// crawlers. Only checked-in SVG/PNG pairs are eligible. Photographs still use
// Next's responsive optimization.
export function getBlogDisplayImage(src: string): string {
  return vectorImages.has(src) ? src.replace(/\.png$/, '.svg') : src;
}
