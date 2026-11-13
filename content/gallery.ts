import type { LocalizedText } from './i18n';

export type GalleryFormat =
  | 'tiktok-video'
  | 'tiktok-slideshow'
  | 'instagram-reel'
  | 'drive-video';

export type BrandVisualTone =
  | 'accent'
  | 'emerald'
  | 'sky'
  | 'rose';

export interface GalleryItem {
  id: string;
  brandId: string;
  brandName: string;
  title: LocalizedText;
  role?: string;
  featured?: boolean;
  format: GalleryFormat;
  formatLabel: LocalizedText;
  creator?: string;
  poster?: string;
  tone?: BrandVisualTone;
  url: string;
  embedUrl?: string;
  aiFramed: boolean;
}

const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=drive_link`;
const driveEmbed = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

export const galleryBrands = [
  { id: 'featured', label: { id: 'Featured', en: 'Featured' } },
  { id: 'all', label: { id: 'All Works', en: 'All Works' } },
  { id: 'oppo', label: { id: 'OPPO Diologtech', en: 'OPPO Diologtech' } },
  { id: 'cak-ic', label: { id: 'Cak Investment Club', en: 'Cak Investment Club' } },
  { id: 'acekid', label: { id: 'AceKid', en: 'AceKid' } },
  { id: 'rahasia-beauty', label: { id: 'Rahasia Beauty', en: 'Rahasia Beauty' } },
  { id: 'golden-rama', label: { id: 'Golden Rama', en: 'Golden Rama' } },
  { id: 'syailendra', label: { id: 'Syailendra', en: 'Syailendra' } }
];

export const galleryItems: GalleryItem[] = [
  // OPPO Diologtech (4 TikTok videos)
  {
    id: 'oppo-1',
    brandId: 'oppo',
    brandName: 'OPPO Diologtech',
    title: { id: 'Smartphone Comparison Review', en: 'Smartphone Comparison Review' },
    role: 'Content strategy, scripting & execution',
    featured: true,
    format: 'tiktok-video',
    formatLabel: { id: 'Video AI TikTok', en: 'TikTok AI Video' },
    creator: '@diologtech (AI Persona)',
    poster: '/assets/projects/oppo-diologtech/oppo-tile-01.webp',
    url: 'https://www.tiktok.com/@diologtech/video/7522803852924488966',
    embedUrl: 'https://www.tiktok.com/player/v1/7522803852924488966?description=0&music_info=0',
    aiFramed: true
  },
  {
    id: 'oppo-2',
    brandId: 'oppo',
    brandName: 'OPPO Diologtech',
    title: { id: 'Diologtech Tech Review #02', en: 'Diologtech Tech Review #02' },
    format: 'tiktok-video',
    formatLabel: { id: 'Video AI TikTok', en: 'TikTok AI Video' },
    creator: '@diologtech (AI Persona)',
    poster: '/assets/projects/oppo-diologtech/oppo-tile-02.webp',
    url: 'https://www.tiktok.com/@diologtech/video/7521629853540502789',
    embedUrl: 'https://www.tiktok.com/player/v1/7521629853540502789?description=0&music_info=0',
    aiFramed: true
  },
  {
    id: 'oppo-3',
    brandId: 'oppo',
    brandName: 'OPPO Diologtech',
    title: { id: 'Camera & Feature Comparison Hook', en: 'Camera & Feature Comparison Hook' },
    role: 'Content strategy, angle testing & execution',
    format: 'tiktok-video',
    formatLabel: { id: 'Video AI TikTok', en: 'TikTok AI Video' },
    creator: '@diologtech (AI Persona)',
    poster: '/assets/projects/oppo-diologtech/oppo-tile-03.webp',
    url: 'https://www.tiktok.com/@diologtech/video/7516374867965431096',
    embedUrl: 'https://www.tiktok.com/player/v1/7516374867965431096?description=0&music_info=0',
    aiFramed: true
  },
  {
    id: 'oppo-4',
    brandId: 'oppo',
    brandName: 'OPPO Diologtech',
    title: { id: 'Diologtech Comparison Hook #04', en: 'Diologtech Comparison Hook #04' },
    format: 'tiktok-video',
    formatLabel: { id: 'Video AI TikTok', en: 'TikTok AI Video' },
    creator: '@diologtech (AI Persona)',
    poster: '/assets/projects/oppo-diologtech/oppo-tile-04.webp',
    url: 'https://www.tiktok.com/@diologtech/video/7534729029715348742',
    embedUrl: 'https://www.tiktok.com/player/v1/7534729029715348742?description=0&music_info=0',
    aiFramed: true
  },

  // Cak Investment Club (4 TikTok photo slideshows)
  {
    id: 'cakic-1',
    brandId: 'cak-ic',
    brandName: 'Cak Investment Club',
    title: { id: 'Macro Commentary Slideshow · @jo.darsono', en: 'Macro Commentary Slideshow · @jo.darsono' },
    role: 'Persona strategy, planning & AI UGC slides',
    featured: true,
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@jo.darsono (AI Persona)',
    poster: '/assets/projects/cak-investment-club/jo-tile-01.webp',
    url: 'https://www.tiktok.com/@jo.darsono/photo/7562499334382570764',
    aiFramed: true
  },
  {
    id: 'cakic-2',
    brandId: 'cak-ic',
    brandName: 'Cak Investment Club',
    title: { id: 'Slideshow Ekonomi · Jonathan #02', en: 'Macro Slideshow · Jonathan #02' },
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@jo.darsono (AI Persona)',
    poster: '/assets/projects/cak-investment-club/jo-tile-02.webp',
    url: 'https://www.tiktok.com/@jo.darsono/photo/7591006803593301304',
    aiFramed: true
  },
  {
    id: 'cakic-3',
    brandId: 'cak-ic',
    brandName: 'Cak Investment Club',
    title: { id: 'Slideshow Investasi · Leo #01', en: 'Investing Slideshow · Leo #01' },
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@leo_ryansyah (AI Persona)',
    poster: '/assets/projects/cak-investment-club/leo-tile-01.webp',
    url: 'https://www.tiktok.com/@leo_ryansyah/photo/7571034341753605388',
    aiFramed: true
  },
  {
    id: 'cakic-4',
    brandId: 'cak-ic',
    brandName: 'Cak Investment Club',
    title: { id: 'Slideshow Investasi · Leo #02', en: 'Investing Slideshow · Leo #02' },
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@leo_ryansyah (AI Persona)',
    poster: '/assets/projects/cak-investment-club/leo-tile-02.webp',
    url: 'https://www.tiktok.com/@leo_ryansyah/photo/7554336997553229112',
    aiFramed: true
  },

  // AceKid (2 IG + 2 Drive + 2 Drama-Inspired + 1 AI Animation)
  {
    id: 'acekid-dracin-1',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'AceKid — AI Drama-Inspired Ad #01', en: 'AceKid — AI Drama-Inspired Ad #01' },
    role: 'Content strategy, drama scripting & AI video production',
    featured: true,
    format: 'drive-video',
    formatLabel: { id: 'Drama AI Drive', en: 'AI Drama Ad' },
    creator: 'Drama-inspired AI storytelling · Google Drive',
    poster: '/assets/projects/acekid/acekid-dracin-01.webp',
    url: driveView('1JGkn4GCSsaxW8f1S5OafTKZdJYKxkC9N'),
    embedUrl: driveEmbed('1JGkn4GCSsaxW8f1S5OafTKZdJYKxkC9N'),
    aiFramed: true
  },
  {
    id: 'acekid-animasi-1',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'AceKid — AI Animated Promotion', en: 'AceKid — AI Animated Promotion' },
    role: 'Content strategy, animation direction & AI production',
    featured: true,
    format: 'drive-video',
    formatLabel: { id: 'Animasi AI Drive', en: 'AI Animation' },
    creator: 'AI animated campaign · Google Drive',
    poster: '/assets/projects/acekid/acekid-animasi-01.webp',
    url: driveView('1Lz8Ebg7qO1KM6MOSaZUS6BuqYJ3MTSjE'),
    embedUrl: driveEmbed('1Lz8Ebg7qO1KM6MOSaZUS6BuqYJ3MTSjE'),
    aiFramed: true
  },
  {
    id: 'acekid-dracin-2',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'AceKid — AI Drama-Inspired Ad #02', en: 'AceKid — AI Drama-Inspired Ad #02' },
    role: 'Content strategy, drama scripting & AI video production',
    format: 'drive-video',
    formatLabel: { id: 'Drama AI Drive', en: 'AI Drama Ad' },
    creator: 'Drama-inspired AI storytelling · Google Drive',
    poster: '/assets/projects/acekid/acekid-dracin-02.webp',
    url: driveView('1UM_YqUhbscX_J9aJnPJzQGpZlp8Y8-wJ'),
    embedUrl: driveEmbed('1UM_YqUhbscX_J9aJnPJzQGpZlp8Y8-wJ'),
    aiFramed: true
  },
  {
    id: 'acekid-1',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'AI Parenting Persona · Zoe Kalyani', en: 'AI Parenting Persona · Zoe Kalyani' },
    role: 'Persona direction, hook angle & voice',
    format: 'instagram-reel',
    formatLabel: { id: 'Instagram Reel AI', en: 'AI Instagram Reel' },
    creator: '@zoekalyani_ (AI Persona)',
    poster: '/assets/projects/acekid/zoe-tile-02.webp',
    url: 'https://www.instagram.com/p/DafnygGjL-i/',
    embedUrl: 'https://www.instagram.com/p/DafnygGjL-i/embed/',
    aiFramed: true
  },
  {
    id: 'acekid-2',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'IG Reel Parenting · Rendy Kusuma', en: 'Parenting IG Reel · Rendy Kusuma' },
    format: 'instagram-reel',
    formatLabel: { id: 'Instagram Reel AI', en: 'AI Instagram Reel' },
    creator: '@rendykusm (AI Persona)',
    poster: '/assets/projects/acekid/rendy-tile-02.webp',
    url: 'https://www.instagram.com/p/Dauc58vkTPC/',
    embedUrl: 'https://www.instagram.com/p/Dauc58vkTPC/embed/',
    aiFramed: true
  },
  {
    id: 'acekid-3',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'Video Kampanye AceKid #01', en: 'AceKid Campaign Video #01' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: '@zoekalyani_ · Drive Archive',
    poster: '/assets/projects/acekid/zoe-tile-01.webp',
    url: driveView('1IcJEPF1-VdVUfqUoqRDFYQLpcfi_Cusn'),
    embedUrl: driveEmbed('1IcJEPF1-VdVUfqUoqRDFYQLpcfi_Cusn'),
    aiFramed: true
  },
  {
    id: 'acekid-4',
    brandId: 'acekid',
    brandName: 'AceKid',
    title: { id: 'Video Kampanye AceKid #02', en: 'AceKid Campaign Video #02' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: '@rendykusm · Drive Archive',
    poster: '/assets/projects/acekid/rendy-tile-01.webp',
    url: driveView('1KoWRMiMVY1oP3UMI826q_NuNJskzoURq'),
    embedUrl: driveEmbed('1KoWRMiMVY1oP3UMI826q_NuNJskzoURq'),
    aiFramed: true
  },

  // Rahasia Beauty (4 Drive videos - end-to-end AI ad production)
  {
    id: 'rahasia-1',
    brandId: 'rahasia-beauty',
    brandName: 'Rahasia Beauty',
    title: { id: 'Rahasia Beauty — AI UGC Ad #01', en: 'Rahasia Beauty — AI UGC Ad #01' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'End-to-end AI ad production · Google Drive',
    poster: '/assets/thumbnails/rahasia-01.webp',
    tone: 'rose',
    url: driveView('1hMqEd2SIMdOmFU2s7bR70_a4RYNyNirg'),
    embedUrl: driveEmbed('1hMqEd2SIMdOmFU2s7bR70_a4RYNyNirg'),
    aiFramed: true
  },
  {
    id: 'rahasia-2',
    brandId: 'rahasia-beauty',
    brandName: 'Rahasia Beauty',
    title: { id: 'Rahasia Beauty — AI UGC Ad #02', en: 'Rahasia Beauty — AI UGC Ad #02' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'End-to-end AI ad production · Google Drive',
    poster: '/assets/thumbnails/rahasia-02.webp',
    tone: 'rose',
    url: driveView('1A4ADnI11ES5YQ15e72Qqpiqy3m9GrZdH'),
    embedUrl: driveEmbed('1A4ADnI11ES5YQ15e72Qqpiqy3m9GrZdH'),
    aiFramed: true
  },
  {
    id: 'rahasia-3',
    brandId: 'rahasia-beauty',
    brandName: 'Rahasia Beauty',
    title: { id: 'Rahasia Beauty — AI UGC Ad #03', en: 'Rahasia Beauty — AI UGC Ad #03' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'End-to-end AI ad production · Google Drive',
    poster: '/assets/thumbnails/rahasia-03.webp',
    tone: 'rose',
    url: driveView('1Vw9txnpqPDZlhMS3dqhDbKcw-TCmMFNv'),
    embedUrl: driveEmbed('1Vw9txnpqPDZlhMS3dqhDbKcw-TCmMFNv'),
    aiFramed: true
  },
  {
    id: 'rahasia-4',
    brandId: 'rahasia-beauty',
    brandName: 'Rahasia Beauty',
    title: { id: 'Rahasia Beauty — AI UGC Ad #04', en: 'Rahasia Beauty — AI UGC Ad #04' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'End-to-end AI ad production · Google Drive',
    poster: '/assets/thumbnails/rahasia-04.webp',
    tone: 'rose',
    url: driveView('1X2kKbwQ5nU6e6IggRYkLpWaAKMEU5cWT'),
    embedUrl: driveEmbed('1X2kKbwQ5nU6e6IggRYkLpWaAKMEU5cWT'),
    aiFramed: true
  },

  // Golden Rama (4 Drive videos)
  {
    id: 'golden-1',
    brandId: 'golden-rama',
    brandName: 'Golden Rama',
    title: { id: 'Destination Story · AI Travel Persona', en: 'Destination Story · AI Travel Persona' },
    role: 'Brand angle, scripting & AI video direction',
    featured: true,
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'AI Travel Persona · Google Drive',
    poster: '/assets/thumbnails/golden-01.webp',
    tone: 'sky',
    url: driveView('14wC2hQqRvZYM6Y4WTYKCT8SCPnBcIfIF'),
    embedUrl: driveEmbed('14wC2hQqRvZYM6Y4WTYKCT8SCPnBcIfIF'),
    aiFramed: true
  },
  {
    id: 'golden-2',
    brandId: 'golden-rama',
    brandName: 'Golden Rama',
    title: { id: 'Travel AI Video #02', en: 'Travel AI Video #02' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'AI Travel Persona · Google Drive',
    poster: '/assets/thumbnails/golden-02.webp',
    tone: 'sky',
    url: driveView('1ymqFMHkrOhpOQrC4DkZ7FQbEfTCd_DTs'),
    embedUrl: driveEmbed('1ymqFMHkrOhpOQrC4DkZ7FQbEfTCd_DTs'),
    aiFramed: true
  },
  {
    id: 'golden-3',
    brandId: 'golden-rama',
    brandName: 'Golden Rama',
    title: { id: 'Travel AI Video #03', en: 'Travel AI Video #03' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'AI Travel Persona · Google Drive',
    poster: '/assets/thumbnails/golden-03.webp',
    tone: 'sky',
    url: driveView('1PT0JnEThsA7lHgdGEuPy_cI5vCR4yHLg'),
    embedUrl: driveEmbed('1PT0JnEThsA7lHgdGEuPy_cI5vCR4yHLg'),
    aiFramed: true
  },
  {
    id: 'golden-4',
    brandId: 'golden-rama',
    brandName: 'Golden Rama',
    title: { id: 'Travel AI Video #04', en: 'Travel AI Video #04' },
    format: 'drive-video',
    formatLabel: { id: 'Video AI Drive', en: 'Drive AI Video' },
    creator: 'AI Travel Persona · Google Drive',
    poster: '/assets/thumbnails/golden-04.webp',
    tone: 'sky',
    url: driveView('1LcxFutSwwyp9Ytgq6eDnNJFfw1AfaSTk'),
    embedUrl: driveEmbed('1LcxFutSwwyp9Ytgq6eDnNJFfw1AfaSTk'),
    aiFramed: true
  },

  // Syailendra (3 TikTok slideshows)
  {
    id: 'syailendra-1',
    brandId: 'syailendra',
    brandName: 'Syailendra',
    title: { id: 'Slideshow Investasi · @baskaratio', en: 'Investing Slideshow · @baskaratio' },
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@baskaratio (AI Persona)',
    poster: '/assets/thumbnails/syailendra-01.webp',
    tone: 'emerald',
    url: 'https://www.tiktok.com/@baskaratio/photo/7611249983559437575',
    aiFramed: true
  },
  {
    id: 'syailendra-2',
    brandId: 'syailendra',
    brandName: 'Syailendra',
    title: { id: 'Slideshow Investasi · @bagasaryanugrahaa', en: 'Investing Slideshow · @bagasaryanugrahaa' },
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@bagasaryanugrahaa (AI Persona)',
    poster: '/assets/thumbnails/syailendra-02.webp',
    tone: 'emerald',
    url: 'https://www.tiktok.com/@bagasaryanugrahaa/photo/7619424096983584007',
    aiFramed: true
  },
  {
    id: 'syailendra-3',
    brandId: 'syailendra',
    brandName: 'Syailendra',
    title: { id: 'Macro & Bond Commentary · @barra.adib', en: 'Macro & Bond Commentary · @barra.adib' },
    role: 'Persona strategy, tone & AI slideshow',
    featured: true,
    format: 'tiktok-slideshow',
    formatLabel: { id: 'Slideshow TikTok', en: 'TikTok Slideshow' },
    creator: '@barra.adib (AI Persona)',
    poster: '/assets/thumbnails/syailendra-03.webp',
    tone: 'emerald',
    url: 'https://www.tiktok.com/@barra.adib/photo/7617119398788173076?image_index=2',
    aiFramed: true
  }
];
