import { LocalizedText } from './i18n';

export interface SignatureSkill {
  id: string;
  badge: string;
  title: string;
  proof: string;
  summary: string;
}

export interface SkillTag {
  name: string;
  description: string;
  usedIn: string[];
}

export interface SkillGroup {
  id: string;
  title: LocalizedText;
  subtitle: string;
  items: SkillTag[];
}

export const signatureSkills: SignatureSkill[] = [
  {
    id: 'content-growth',
    badge: 'Core Strength 01',
    title: 'Content Strategy & Audience Growth',
    proof: '7.9M post views · OPPO Diologtech (Apr 2025–Mar 2026)',
    summary:
      'Developing short-form content angles, creative hooks, and platform-native formats that attract organic audiences at scale.'
  },
  {
    id: 'ai-personas',
    badge: 'Core Strength 02',
    title: 'AI Persona & UGC Campaigns',
    proof: '~60% inbound DM-to-member · Cak Investment Club',
    summary:
      'Building brand-aligned AI creator personas and slideshow funnels that turn audience attention into inquiries and sign-ups.'
  },
  {
    id: 'production-systems',
    badge: 'Core Strength 03',
    title: 'AI Production Systems & Automation',
    proof: '~5 days → ~5 hrs weekly KPI · CAKETING & CakVisual',
    summary:
      'Designing internal workflows and tools that connect research, scripting, and batch video production so teams execute faster.'
  },
  {
    id: 'creative-direction',
    badge: 'Core Strength 04',
    title: 'Creative Direction & Video Production',
    proof: '10+ commercial & narrative projects · Luminara Visual Works',
    summary:
      'Combining film directing, visual pacing, and quality control so high-volume AI campaigns still feel human and on-brand.'
  }
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'growth-strategy',
    title: {
      id: 'Content Strategy & Growth',
      en: 'Content Strategy & Growth'
    },
    subtitle: 'Planning content angles and funnels that build reach and drive action.',
    items: [
      {
        name: 'Audience & Platform Strategy',
        description:
          'Studying TikTok and Instagram content patterns to turn platform behavior into repeatable brand frameworks.',
        usedIn: ['OPPO Diologtech', 'Cak Investment Club']
      },
      {
        name: 'Short-Form Hooks & Creative Testing',
        description:
          'Testing multiple opening hooks, angles, and formats across creator accounts to see what holds attention.',
        usedIn: ['OPPO Diologtech (7.9M post views)', 'AceKid']
      },
      {
        name: 'Inbound DM & Lead Funnels',
        description:
          'Structuring educational and opinion-led content that prompts viewers to reach out via DM for membership or inquiries.',
        usedIn: ['Cak Investment Club (~60% DM-to-member)']
      },
      {
        name: 'Persona-Based Scriptwriting',
        description:
          'Writing tailored scripts in distinct creator voices—supported by CAKETING to draft 200 scripts from research in 3 hours.',
        usedIn: ['CAKETING', 'Golden Rama', 'Rahasia Beauty']
      }
    ]
  },
  {
    id: 'ai-creative',
    title: {
      id: 'AI Personas & Video Production',
      en: 'AI Personas & Video Production'
    },
    subtitle: 'Running consistent, brand-aligned AI creator campaigns across accounts.',
    items: [
      {
        name: 'Brand-Aligned AI Personas',
        description:
          'Developing distinct persona identities, visual styles, and tone-of-voice guidelines across 20–90 accounts per client.',
        usedIn: ['AceKid', 'Syailendra', 'OPPO Diologtech']
      },
      {
        name: 'AI Video & Slideshow Production',
        description:
          'Directing generative video and AI UGC photo slideshows designed to read naturally in social feeds.',
        usedIn: ['Cak Investment Club', 'Golden Rama', 'Rahasia Beauty']
      },
      {
        name: 'Multi-Account Campaign Scaling',
        description:
          'Raising daily marketing output from 20 to 120 assets to support parallel audience testing across brands.',
        usedIn: ['CAK AI (20 → 120 marketing assets/day)']
      },
      {
        name: 'Quality Control & Brand Consistency',
        description:
          'Reviewing visuals, pacing, and messaging with structured quality-control checks before assets go to clients.',
        usedIn: ['CAK AI Client Campaigns']
      }
    ]
  },
  {
    id: 'production-systems',
    title: {
      id: 'Production Systems & Efficiency',
      en: 'Production Systems & Efficiency'
    },
    subtitle: 'Building practical internal tools to eliminate manual production bottlenecks.',
    items: [
      {
        name: 'CAKETING — Research-to-Script Workflow',
        description:
          'Built an internal platform connecting research, strategy, and scriptwriting—saving ~70% of scripting time.',
        usedIn: ['200 script drafts in 3 hours']
      },
      {
        name: 'CakVisual — Batch AI Video Workspace',
        description:
          'Built a multi-brand video workspace generating 20+ persona videos per run, with capacity up to 2,000 videos/month.',
        usedIn: ['~5 days → ~5 hrs weekly KPI production']
      },
      {
        name: 'CakAI Pro — Rapid System Replacement',
        description:
          'Built a bulk AI slideshow platform solo in two weeks to keep production output running without interruption.',
        usedIn: ['CAK AI Emergency Replacement']
      },
      {
        name: 'Team Mentoring & Workflow Design',
        description:
          'Guiding distributed creators with visual direction, feedback, and clear production playbooks.',
        usedIn: ['CAK AI Creator Team']
      }
    ]
  },
  {
    id: 'directing-craft',
    title: {
      id: 'Film, 3D & Creative Direction',
      en: 'Film, 3D & Creative Direction'
    },
    subtitle: 'Hands-on directing and post-production craft since 2021.',
    items: [
      {
        name: 'Commercial & Narrative Directing',
        description:
          'Directing brand commercials and narrative short films from concept and storyboarding to final cut.',
        usedIn: ['Luminara Visual Works (10+ projects)']
      },
      {
        name: 'Cinematography & Visual Pacing',
        description:
          'Applying real camera framing, lighting, and storytelling rhythm to both live shoots and AI visuals.',
        usedIn: ['ISI Surakarta', 'Luminara Visual Works']
      },
      {
        name: 'Video Editing & Post-Production',
        description:
          'Editing, sound design, and color finishing for fast-turnaround brand deliverables and narrative work.',
        usedIn: ['UPGRADE-INC', 'Luminara Visual Works']
      },
      {
        name: '2D/3D Motion & Compositing',
        description:
          'Producing 2D/3D animation, motion graphics, and visual compositing for promotional campaigns.',
        usedIn: ['Luminara Visual Works', 'Universitas Dian Nusantara']
      }
    ]
  }
];
