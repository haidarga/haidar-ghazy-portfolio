import { LocalizedText } from './i18n';

export interface ExperienceRole {
  id: string;
  role: LocalizedText;
  company: string;
  location: string;
  period: LocalizedText;
  headlineImpact: string;
  jobDescription: string[];
  problemSolved: string;
  valueBrought: string;
  highlights: string[];
}

export const experienceTimeline: ExperienceRole[] = [
  {
    id: 'cak-ai-head',
    role: {
      id: 'Head of Creator & AI Marketing Strategist',
      en: 'Head of Creator & AI Marketing Strategist'
    },
    company: 'CAK AI',
    location: 'Cilandak, South Jakarta',
    period: {
      id: 'Mar 2026 – Present',
      en: 'Mar 2026 – Present'
    },
    headlineImpact:
      'Cut weekly KPI production time from ~5 days to ~5 hours via CAKETING and CakVisual, and built CakAI Pro solo in two weeks to keep slideshow output uninterrupted.',
    jobDescription: [
      'Developed content strategy and campaign positioning for AceKid, Syailendra, and Golden Rama—adapting creative angles, AI personas, hooks, and tone of voice per audience.',
      'Created AI promotional content for AceKid across multiple creative formats and styles, including animation and drama-inspired storytelling.',
      'Handled end-to-end AI ad production for Rahasia Beauty, translating campaign needs into final AI-generated promotional video assets.',
      'Directed a multi-persona content system spanning 20 to 90 unique AI personas per client and mentored creators through visual direction and quality-control checks.',
      'Produced AI-generated pitch materials and concept videos to support new business and enterprise client presentations.'
    ],
    problemSolved:
      'Disconnected research, scripting, and production workflows led to ~5-day weekly KPI cycles, while a sudden platform capacity gap threatened slideshow output.',
    valueBrought:
      'Built CAKETING (200 persona-based script drafts in 3 hours, ~70% time saved), CakVisual (20+ videos/run, up to 2,000 videos/month capacity), and CakAI Pro solo in two weeks—maintaining production output without interruption.',
    highlights: [
      '~5 days → ~5 hrs weekly KPI',
      '200 script drafts in 3 hrs (~70% saved)',
      'Up to 2,000 videos/mo capacity',
      'CakAI Pro solo in 2 weeks'
    ]
  },
  {
    id: 'cak-ai-parttime',
    role: {
      id: 'AI Content Creator & Marketing Strategist (Part-Time)',
      en: 'AI Content Creator & Marketing Strategist (Part-Time)'
    },
    company: 'CAK AI',
    location: 'Cilandak, South Jakarta',
    period: {
      id: 'May 2025 – Mar 2026',
      en: 'May 2025 – Mar 2026'
    },
    headlineImpact:
      'Drove 7.9M post views for OPPO (@diologtech), 1.1M & 1.2M post views with ~60% DM-to-member conversion for Cak Investment Club, and scaled daily output from 20 to 120 marketing assets.',
    jobDescription: [
      'Led OPPO’s "Diolog" (@diologtech) AI creator campaign, developing content angles, scripting, and short-form production.',
      'Planned and produced AI UGC slideshow funnels on @jo.darsono and @leo_ryansyah to build awareness and drive membership inquiries.',
      'Analyzed TikTok and Instagram algorithm patterns daily and codified visual and tone-of-voice guidelines for AI personas.'
    ],
    problemSolved:
      'Manual creative workflows capped daily production at ~20 assets, limiting how fast campaigns could test angles and respond to audience interest.',
    valueBrought:
      'Built an end-to-end AI content supply chain raising daily output from 20 to 120 marketing assets and proving persona-led content could drive 7.9M post views and ~60% inbound DM-to-member conversion.',
    highlights: [
      '7.9M post views · 5.5M viewers (OPPO)',
      '~60% DM-to-member conversion',
      '1.2M & 1.1M views (2 accounts)',
      '20 → 120 marketing assets/day'
    ]
  },
  {
    id: 'luminara',
    role: {
      id: 'Co-Founder & Creative Lead (Freelance)',
      en: 'Co-Founder & Creative Lead (Freelance)'
    },
    company: 'Luminara Visual Works',
    location: 'Tangerang',
    period: {
      id: 'Sep 2024 – Present',
      en: 'Sep 2024 – Present'
    },
    headlineImpact:
      'Directed 10+ commercial and narrative projects end-to-end—from storyboarding and 2D/3D animation to final compositing.',
    jobDescription: [
      'Co-founded a multimedia production studio handling commercial campaigns and narrative film projects.',
      'Translated client branding goals into 2D/3D animation, motion visuals, and promotional video assets.',
      'Managed the full production pipeline from concept, storyboarding, and on-set direction through compositing and final render.'
    ],
    problemSolved:
      'Clients needed cohesive narrative direction and 2D/3D visual polish without fragmented handoffs between separate vendors.',
    valueBrought:
      'Delivered 10+ end-to-end commercial and narrative productions under one unified creative pipeline.',
    highlights: [
      '10+ commercial & narrative projects',
      '2D/3D animation & compositing',
      'Full concept-to-render pipeline',
      'Festival-selected craft'
    ]
  },
  {
    id: 'upgrade-inc',
    role: {
      id: 'Multimedia Intern',
      en: 'Multimedia Intern'
    },
    company: 'UPGRADE-INC Event Organizer',
    location: 'West Jakarta',
    period: {
      id: 'Sep – Oct 2025',
      en: 'Sep – Oct 2025'
    },
    headlineImpact:
      'Shipped motion graphics, key visuals, event documentation videos, and pitch deck visuals on 24–48 hour turnaround deadlines.',
    jobDescription: [
      'Produced motion graphics, key visuals, and rapid-turnaround event documentation videos under tight 24–48 hour event schedules.',
      'Designed client-facing pitch deck visuals supporting live event proposals.'
    ],
    problemSolved:
      'Live event operations required fast, broadcast-ready visual recaps and pitch materials within 24–48 hours.',
    valueBrought:
      'Delivered reliable, on-deadline motion and deck assets that kept event recaps and client pitches moving smoothly.',
    highlights: [
      '24–48h deadline turnaround',
      'Motion graphics & key visuals',
      'Event documentation edits',
      'Pitch deck visual design'
    ]
  },
  {
    id: 'undira',
    role: {
      id: 'Multimedia and Marketing Intern',
      en: 'Multimedia and Marketing Intern'
    },
    company: 'Universitas Dian Nusantara',
    location: 'Jakarta',
    period: {
      id: 'Sep – Dec 2021',
      en: 'Sep – Dec 2021'
    },
    headlineImpact:
      'Supported institutional marketing campaigns with 3D motion graphics, storyboarding, and video post-production.',
    jobDescription: [
      'Produced 3D motion graphics, visual media assets, and institutional campaign videos from storyboard to final cut.',
      'Supported marketing deliverables, visual identity, and editing timelines across campus campaigns.'
    ],
    problemSolved:
      'Campus marketing materials needed more cohesive motion visuals and structured pre-to-post production delivery.',
    valueBrought:
      'Delivered clean 3D motion and video assets that strengthened campaign presentation and laid the foundation for my later commercial and AI work.',
    highlights: [
      '3D & motion graphics',
      'Marketing visual assets',
      'Storyboarding & editing',
      'GPA 3.86 Cum Laude track'
    ]
  }
];
