import type { LocalizedText } from './i18n';

export interface HeroMetric {
  id: string;
  target: number;
  prefix?: string;
  suffix: string | LocalizedText;
  decimals?: number;
  label: LocalizedText;
  detail: LocalizedText;
  isTransform?: boolean;
  displayEnd?: string | LocalizedText;
}

export interface ProofBrand {
  id: string;
  name: string;
  metric: LocalizedText;
  category: LocalizedText;
}

export const siteIdentity = {
  name: 'Haidar Ghazy Arkan',
  shortName: 'Haidar G. A.',
  title: {
    id: 'AI-Native Growth Marketer & Content Strategist',
    en: 'AI-Native Growth Marketer & Content Strategist'
  } satisfies LocalizedText,
  currentRole: {
    id: 'Head of Creator & AI Marketing Strategist di CAK AI (Jakarta Selatan, sejak Maret 2026)',
    en: 'Head of Creator & AI Marketing Strategist at CAK AI (South Jakarta, since March 2026)'
  } satisfies LocalizedText,
  location: 'Tangerang, Greater Jakarta, Indonesia',
  email: 'haidar.hga@gmail.com',
  phone: '+62 819-3004-2004',
  linkedin: 'https://www.linkedin.com/in/haidarghazyarkan',
  linkedinHandle: 'linkedin.com/in/haidarghazyarkan',
  instagram: 'https://www.instagram.com/haidarghazyarkan_/',
  instagramHandle: '@haidarghazyarkan_',
  cvPath: '/assets/resume/Haidar_Ghazy_Arkan_CV.pdf',
  heroPortrait: '/assets/profile/haidar-portrait-ai-studio.webp',
  aboutPhoto: '/assets/profile/haidar-directing-cameraman.webp',
  aboutCrewPhoto: '/assets/profile/haidar-directing-crew.webp'
};

export const heroCopy = {
  eyebrow: {
    id: 'AI-Native Growth Marketer & Content Strategist',
    en: 'AI-Native Growth Marketer & Content Strategist'
  },
  headline: {
    id: 'Creative thinking that drives growth. Systems that help teams move faster.',
    en: 'Creative thinking that drives growth. Systems that help teams move faster.'
  },
  subheadline: {
    id: 'A growth marketer and content strategist combining audience insight, creative execution, and AI-powered tools to solve marketing and production challenges.',
    en: 'A growth marketer and content strategist combining audience insight, creative execution, and AI-powered tools to solve marketing and production challenges.'
  },
  primaryCta: {
    id: 'Explore My Work',
    en: 'Explore My Work'
  },
  secondaryCta: {
    id: 'Download CV',
    en: 'Download CV'
  },
  portraitCaption: {
    id: 'Haidar Ghazy Arkan · Film & TV ISI Surakarta (Cum Laude) · Co-Founder Luminara Visual Works',
    en: 'Haidar Ghazy Arkan · Film & TV ISI Surakarta (Cum Laude) · Co-Founder Luminara Visual Works'
  }
};

export const heroMetrics: HeroMetric[] = [
  {
    id: 'views',
    target: 7.9,
    decimals: 1,
    suffix: 'M',
    label: {
      id: "Post views on OPPO's Diologtech AI account (Apr 2025–Mar 2026)",
      en: "Post views on OPPO's Diologtech AI account (Apr 2025–Mar 2026)"
    },
    detail: {
      id: '5.5M viewers, 3,600+ followers (Apr 2025 – Mar 2026)',
      en: '5.5M viewers, 3,600+ followers (Apr 2025 – Mar 2026)'
    }
  },
  {
    id: 'conversion',
    target: 60,
    prefix: '~',
    suffix: '%',
    label: {
      id: 'Inbound DM-to-member conversion for Cak Investment Club',
      en: 'Inbound DM-to-member conversion for Cak Investment Club'
    },
    detail: {
      id: '1.1M & 1.2M post views across two AI persona accounts',
      en: '1.1M & 1.2M post views across two AI persona accounts'
    }
  },
  {
    id: 'speed',
    target: 5,
    suffix: { id: ' hrs', en: ' hrs' },
    isTransform: true,
    displayEnd: {
      id: '~5 days → ~5 hrs',
      en: '~5 days → ~5 hrs'
    },
    label: {
      id: 'Weekly KPI production time via CAKETING & CakVisual',
      en: 'Weekly KPI production time via CAKETING & CakVisual'
    },
    detail: {
      id: 'Daily output scaled from 20 to 120 marketing assets',
      en: 'Daily output scaled from 20 to 120 marketing assets'
    }
  }
];

export const proofBrands: ProofBrand[] = [
  {
    id: 'oppo',
    name: 'OPPO',
    metric: { id: '7.9M views · Diologtech AI', en: '7.9M views · Diologtech AI' },
    category: { id: 'Teknologi', en: 'Consumer Tech' }
  },
  {
    id: 'cak-ic',
    name: 'Cak Investment Club',
    metric: { id: '2.3M views · ~60% DM-to-member', en: '2.3M views · ~60% DM-to-member' },
    category: { id: 'Fintech & Komunitas', en: 'Fintech Community' }
  },
  {
    id: 'acekid',
    name: 'AceKid',
    metric: { id: '20–90 persona AI UGC', en: '20–90 AI UGC personas' },
    category: { id: 'Parenting & Nutrisi', en: 'Parenting & Nutrition' }
  },
  {
    id: 'syailendra',
    name: 'Syailendra',
    metric: { id: 'Slideshow persona fintech', en: 'Fintech persona slideshows' },
    category: { id: 'Manajemen Investasi', en: 'Asset Management' }
  },
  {
    id: 'golden-rama',
    name: 'Golden Rama',
    metric: { id: 'Strategi & video AI travel', en: 'Travel AI video & strategy' },
    category: { id: 'Travel', en: 'Travel' }
  },
  {
    id: 'rahasia-beauty',
    name: 'Rahasia Beauty',
    metric: { id: 'Video promosi AI UGC', en: 'AI UGC promo videos' },
    category: { id: 'Kecantikan', en: 'Beauty' }
  }
];

export const aboutContent = {
  indexLabel: '07',
  heading: {
    id: 'Dari set film ke sistem AI marketing',
    en: 'From film sets to AI marketing systems'
  },
  lead: {
    id: 'I started in film and visual production, where I learned how to turn an idea into a story people actually connect with.',
    en: 'I started in film and visual production, where I learned how to turn an idea into a story people actually connect with.'
  },
  paragraphs: [
    {
      id: 'At CAK AI, I contributed to content strategy and campaign positioning across multiple brands—including OPPO, AceKid, Syailendra, Golden Rama, and Cak Investment Club—while also handling end-to-end AI ad production for Rahasia Beauty and building internal tools to address workflow bottlenecks.',
      en: 'At CAK AI, I contributed to content strategy and campaign positioning across multiple brands—including OPPO, AceKid, Syailendra, Golden Rama, and Cak Investment Club—while also handling end-to-end AI ad production for Rahasia Beauty and building internal tools to address workflow bottlenecks.'
    },
    {
      id: "Today, I focus on work that sits between creative thinking, marketing, and technology: understanding what a business needs, building content that resonates with its audience, and helping teams execute faster. I graduated Cum Laude in Film & Television from ISI Surakarta (GPA 3.86, 3.5 years) and co-founded Luminara Visual Works.",
      en: "Today, I focus on work that sits between creative thinking, marketing, and technology: understanding what a business needs, building content that resonates with its audience, and helping teams execute faster. I graduated Cum Laude in Film & Television from ISI Surakarta (GPA 3.86, 3.5 years) and co-founded Luminara Visual Works."
    }
  ],
  education: [
    {
      school: 'ISI Surakarta (Institut Seni Indonesia Surakarta)',
      degree: {
        id: 'S1 Film & Television (Cum Laude, lulus 3,5 tahun)',
        en: 'B.A. in Film & Television (Cum Laude, graduated in 3.5 years)'
      },
      period: '2022 - 2026',
      gpa: 'GPA 3.86 / 4.00 (Cum Laude)'
    },
    {
      school: 'SMK Negeri 1 Tangerang',
      degree: {
        id: 'Multimedia',
        en: 'Vocational Degree in Multimedia'
      },
      period: '2019 - 2022',
      gpa: ''
    }
  ]
};

export const contactContent = {
  eyebrow: {
    id: 'Kontak & Kolaborasi',
    en: 'Contact & Hiring'
  },
  heading: {
    id: 'Mari bangun sesuatu bersama.',
    en: "Let's work together."
  },
  sub: {
    id: 'Terbuka untuk peran Growth Marketing, Creative Tech Lead, maupun kolaborasi pengembangan sistem produksi konten berbasis AI.',
    en: 'Open to Growth Marketing, Creative Tech Lead roles, or building custom AI content production pipelines.'
  },
  copyEmailLabel: {
    id: 'Salin Email',
    en: 'Copy Email'
  },
  copiedEmailLabel: {
    id: 'Email Tersalin',
    en: 'Email Copied'
  },
  downloadCvLabel: {
    id: 'Unduh CV (PDF)',
    en: 'Download CV (PDF)'
  }
};
