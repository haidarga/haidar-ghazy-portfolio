import type { LocalizedText } from './i18n';

export interface CraftWork {
  id: string;
  year: string;
  title: string;
  role: LocalizedText;
  medium: LocalizedText;
  image: string;
  url: string;
  highlight?: LocalizedText;
}

export const craftWorks: CraftWork[] = [
  {
    id: 'luminara-mapping',
    year: '2024',
    title: 'Luminara Visual Works',
    role: {
      id: 'Co-Founder, Mapper, VJ, Motion & 3D Artist',
      en: 'Co-Founder, Mapper, VJ, Motion & 3D Artist'
    },
    medium: { id: 'Visual Mapping & VJ', en: 'Visual Mapping & VJ' },
    image: '/assets/projects/luminara/surakartea-photobooth-mapping.webp',
    url: 'https://drive.google.com/file/d/1NpJpPSvIMyYtnbN_yeWk8YELNF2SZWii/view?usp=drive_link',
    highlight: { id: '10+ proyek komersial & naratif', en: '10+ commercial & narrative projects' }
  },
  {
    id: 'qris-bi',
    year: '2023',
    title: 'BI Digital: QRIS Crossborder',
    role: { id: 'Director, Editor', en: 'Director, Editor' },
    medium: { id: 'Promo & Short Movie', en: 'Promo & Short Movie' },
    image: '/assets/projects/qris-crossborder/still-01.webp',
    url: 'https://www.instagram.com/p/CzRYgVRs88q/'
  },
  {
    id: 'hayo-loh',
    year: '2023',
    title: 'Short Film: Hayo Loh!',
    role: { id: 'Cameraman, Editor, VFX, 3D Artist', en: 'Cameraman, Editor, VFX, 3D Artist' },
    medium: { id: 'Film Pendek Naratif', en: 'Narrative Short Film' },
    image: '/assets/projects/hayo-loh/still-04.webp',
    url: 'https://youtu.be/bWt-URj8x2c'
  },
  {
    id: 'isi-promosi',
    year: '2025',
    title: 'Sosialisasi Promosi ISI Surakarta',
    role: { id: 'Cameraman, Editor', en: 'Cameraman, Editor' },
    medium: { id: 'Video Promosi Kampus', en: 'Campus Promo Film' },
    image: '/assets/projects/isi-surakarta/still-03.webp',
    url: 'https://www.instagram.com/reel/DFwlWAfsu8O/'
  },
  {
    id: 'volvo-connect',
    year: '2024',
    title: 'UPGRADE-INC Volvo Connect Launch',
    role: { id: 'Cameraman', en: 'Cameraman' },
    medium: { id: 'Event & Brand Activation', en: 'Event & Brand Activation' },
    image: '/assets/projects/volvo-connect/still-01.webp',
    url: 'https://www.instagram.com/reel/C-aC8rKSYUu/'
  },
  {
    id: 'leap-of-faith',
    year: '2025',
    title: 'Short Animated: Leap Of Faith',
    role: { id: 'Creator, 3D Animation', en: 'Creator, 3D Animation' },
    medium: { id: 'Animasi 3D', en: '3D Animation' },
    image: '/assets/projects/3d-animation-archive/leap-of-faith-01.webp',
    url: 'https://www.instagram.com/reel/DKNpHc6v_2n/'
  },
  {
    id: 'ayo-baca-buku',
    year: '2024',
    title: 'Video Clip: Ayo Baca Buku!',
    role: { id: 'Director, Cameraman, Editor', en: 'Director, Cameraman, Editor' },
    medium: { id: 'Video Klip', en: 'Music Video' },
    image: '/assets/projects/ayo-baca-buku/still-01.webp',
    url: 'https://youtu.be/F-GJ6jPagjA'
  },
  {
    id: 'tv-broadcast',
    year: '2024',
    title: 'Warna Warni & Mozaik Nusantara',
    role: { id: 'Switcher, Editor, Motion Graphics', en: 'Switcher, Editor, Motion Graphics' },
    medium: { id: 'Program TV Broadcast', en: 'Broadcast TV Program' },
    image: '/assets/projects/tv-broadcast-archive/mozaik-01.webp',
    url: 'https://www.youtube.com/watch?v=gnLtNJWA1Fk'
  },
  {
    id: 'tv-stage-3d',
    year: '2024',
    title: 'Showcase TV Stage 3D',
    role: { id: '3D Animation, 3D Artist', en: '3D Animation, 3D Artist' },
    medium: { id: '3D Set Design', en: '3D Set Design' },
    image: '/assets/projects/3d-animation-archive/tv-stage-01-clean.webp',
    url: 'https://youtu.be/9YTqZZQ9Zbg'
  },
  {
    id: 'unreal-env',
    year: '2024',
    title: 'Unreal Engine Environments',
    role: { id: '3D Environment & Lighting', en: '3D Environment & Lighting' },
    medium: { id: 'Real-Time 3D', en: 'Real-Time 3D' },
    image: '/assets/projects/luminara/unreal-3d-environment.webp',
    url: 'https://drive.google.com/file/d/1kAg9YTkt4C8T_28EiAF8OLKCGaC5xEBE/view?usp=drive_link'
  },
  {
    id: 'found-love',
    year: '2024',
    title: 'Found Love In The Hope(less) Place',
    role: { id: 'Director, Cameraman, Editor', en: 'Director, Cameraman, Editor' },
    medium: { id: 'Short Movie', en: 'Short Movie' },
    image: '/assets/projects/found-love/still-01.webp',
    url: 'https://youtu.be/mk8xMC1uufA'
  },
  {
    id: 'speedmonster',
    year: '2023',
    title: 'Short Video: Speed(mon)Ster',
    role: { id: 'Director, Editor, VFX', en: 'Director, Editor, VFX' },
    medium: { id: 'VFX Action Short', en: 'VFX Action Short' },
    image: '/assets/projects/speedmonster/still-01.webp',
    url: 'https://www.instagram.com/reel/CtFLFfAOwSU/'
  },
  {
    id: 'studenverse',
    year: '2022',
    title: 'Short Video: StudenVerse',
    role: { id: 'Director, Cameraman, Editor, 3D Artist', en: 'Director, Cameraman, Editor, 3D Artist' },
    medium: { id: '3D & Short Film', en: '3D & Short Film' },
    image: '/assets/projects/studenverse/still-01.webp',
    url: 'https://www.instagram.com/reel/CaOb-Z6Fpy_/'
  },
  {
    id: 'last-time',
    year: '2022',
    title: 'Short Movie: Last Time',
    role: { id: 'Director, Cameraman, Editor, VFX', en: 'Director, Cameraman, Editor, VFX' },
    medium: { id: 'Sci-Fi Short Film', en: 'Sci-Fi Short Film' },
    image: '/assets/projects/last-time/still-01.webp',
    url: 'https://www.youtube.com/watch?v=5HtrqUGvCuw&t=1s'
  }
];

export const craftAwards: LocalizedText[] = [
  {
    id: 'Juara 3 Digital Arts Competition, Nitrafest (2021)',
    en: '3rd Place, Digital Arts Competition, Nitrafest (2021)'
  },
  {
    id: 'Nominee Best Student Film, UCIFEST 12 (2022)',
    en: 'Nominee, Best Student Film, UCIFEST 12 (2022)'
  },
  {
    id: 'Nominee Bogor Film Festival (2022)',
    en: 'Nominee, Bogor Film Festival (2022)'
  }
];
