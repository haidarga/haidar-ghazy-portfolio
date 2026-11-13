import type { LocalizedText } from './i18n';

export interface FlowNode {
  label: LocalizedText;
  sub: LocalizedText;
}

export interface SystemArchitectureSpec {
  badge: LocalizedText;
  title: LocalizedText;
  rows: {
    key: LocalizedText;
    value: LocalizedText;
    highlight?: boolean;
  }[];
}

export interface SystemItem {
  id: string;
  name: string;
  tag: LocalizedText;
  headline: LocalizedText;
  description: LocalizedText;
  bigNumber: number;
  bigPrefix?: string;
  bigSuffix: string | LocalizedText;
  bigLabel: LocalizedText;
  secondaryStat: LocalizedText;
  flowNodes: FlowNode[];
  stack: string[];
  screenshot?: string;
  screenshotAlt?: LocalizedText;
  architecture?: SystemArchitectureSpec;
}

export const systemsData: SystemItem[] = [
  {
    id: 'caketing',
    name: 'CAKETING',
    tag: {
      id: 'Bulk Scriptwriting Platform',
      en: 'Bulk Scriptwriting Platform'
    },
    headline: {
      id: 'Research, strategy, KOL briefs, and multi-persona scripts in one workflow.',
      en: 'From brand brief to 200 persona-ready scripts in one unified workflow.'
    },
    description: {
      id: 'Unifies research, strategy, KOL, and scriptwriting teams inside brand-isolated workspaces.',
      en: 'Unifies research, strategy, KOL briefs, and scriptwriting inside brand-isolated workspaces—complete with shared knowledge bases, inline QC checks, and multi-persona script generation.'
    },
    bigNumber: 200,
    bigSuffix: ' scripts',
    bigLabel: {
      id: 'From research to script drafts in 3 hours',
      en: 'From research to script drafts in 3 hours'
    },
    secondaryStat: {
      id: 'Saves ~70% of research and scriptwriting time',
      en: 'Cuts ~70% of manual research and scriptwriting time'
    },
    flowNodes: [
      {
        label: { id: 'Research & Brief', en: 'Research & Brief' },
        sub: { id: 'Sheets / Hook Bank', en: 'Briefs / Hook Bank' }
      },
      {
        label: { id: 'Knowledge Base', en: 'Knowledge Base' },
        sub: { id: 'Brand Context & Tone', en: 'Brand Context & Tone' }
      },
      {
        label: { id: 'Persona Splitter', en: 'Persona Splitter' },
        sub: { id: '20–90 Account Angles', en: '20–90 Account Angles' }
      },
      {
        label: { id: 'Draft & Inline QC', en: 'Draft & Inline QC' },
        sub: { id: '200 Scripts / 3 Hrs', en: '200 Scripts / 3 Hrs' }
      }
    ],
    stack: ['Python', 'FastAPI', 'Prompt Chaining', 'Brand Knowledge Base'],
    screenshot: '/assets/projects/caketing/caketing-studio-showcase.webp',
    screenshotAlt: {
      id: 'CAKETING Script OS interface showing brief-to-script studio workflow',
      en: 'CAKETING Script OS interface showing brief-to-script studio workflow'
    }
  },
  {
    id: 'cakvisual',
    name: 'CakVisual',
    tag: {
      id: 'Bulk AI Video Platform',
      en: 'Bulk AI Video Studio'
    },
    headline: {
      id: '20+ distinct persona videos per run, up to 2,000 videos/month capacity.',
      en: '20+ distinct persona videos per batch—up to 2,000 videos/month capacity.'
    },
    description: {
      id: 'Each brand runs inside an isolated workspace to lock character continuity.',
      en: 'Built so each client runs in a dedicated workspace with locked persona references, multi-model AI video generation (Kling, Seedance, ElevenLabs), and dual-pass AI quality control before client delivery.'
    },
    bigNumber: 2000,
    bigSuffix: '/mo',
    bigLabel: {
      id: 'Cross-brand video production capacity',
      en: 'Cross-brand video production capacity'
    },
    secondaryStat: {
      id: '20+ different personas per batch run · Dual-Pass AI QC',
      en: '20+ unique personas per batch run · Dual-Pass AI QC'
    },
    flowNodes: [
      {
        label: { id: 'Brand Workspace', en: 'Brand Workspace' },
        sub: { id: 'Locked Personas & Refs', en: 'Locked Personas & Refs' }
      },
      {
        label: { id: 'Batch Queue', en: 'Batch Queue' },
        sub: { id: '20+ Personas / Run', en: '20+ Personas / Run' }
      },
      {
        label: { id: 'Dual-Pass AI QC', en: 'Dual-Pass AI QC' },
        sub: { id: 'Brand-Safety Gate', en: 'Brand-Safety Gate' }
      },
      {
        label: { id: 'Client Delivery', en: 'Client Delivery' },
        sub: { id: '2,000/mo Capacity', en: '2,000/mo Capacity' }
      }
    ],
    stack: ['Python', 'fal.ai', 'Kling', 'Seedance', 'Dual-Pass AI QC'],
    screenshot: '/assets/projects/cakvisual/cakvisual-studio-showcase.webp',
    screenshotAlt: {
      id: 'CAK Visual v3.0 studio interface showcasing AI UGC video ads',
      en: 'CAK Visual v3.0 studio interface showcasing AI UGC video ads'
    }
  },
  {
    id: 'cakai-pro',
    name: 'CakAI Pro',
    tag: {
      id: 'Bulk AI Slideshow Platform',
      en: 'Bulk AI Slideshow Platform'
    },
    headline: {
      id: 'Built solo in 2 weeks to keep slideshow production running.',
      en: 'Built solo in 2 weeks to keep slideshow production running.'
    },
    description: {
      id: 'When legacy slideshow capacity faced disruption, this replacement platform was built solo in two weeks.',
      en: 'When legacy slideshow production tools faced disruption, I built a replacement solo in 14 days—helping keep multi-account slideshow output running without interruption.'
    },
    bigNumber: 2,
    bigSuffix: ' wks',
    bigLabel: {
      id: 'Built solo to maintain slideshow output',
      en: 'Built solo to maintain slideshow output'
    },
    secondaryStat: {
      id: 'Kept multi-account slideshow publishing running uninterrupted',
      en: 'Kept multi-account slideshow publishing running uninterrupted'
    },
    flowNodes: [
      {
        label: { id: 'Capacity Gap', en: 'Capacity Gap' },
        sub: { id: 'Urgent Replacement', en: 'Urgent Replacement' }
      },
      {
        label: { id: '2-Week Solo Build', en: '2-Week Solo Build' },
        sub: { id: 'FastAPI + Auto Pipeline', en: 'FastAPI + Auto Pipeline' }
      },
      {
        label: { id: 'Bulk Slideshow', en: 'Bulk Slideshow' },
        sub: { id: 'Multi-Slide AI Render', en: 'Multi-Slide AI Render' }
      },
      {
        label: { id: 'Output Continuity', en: 'Output Continuity' },
        sub: { id: 'Uninterrupted Publishing', en: 'Uninterrupted Publishing' }
      }
    ],
    stack: ['Python', 'FastAPI', 'Alpine.js', 'Playwright', 'GitHub Actions'],
    architecture: {
      badge: { id: 'Pipeline Architecture', en: 'Pipeline Architecture' },
      title: { id: 'CakAI Pro · Rapid Solo Replacement', en: 'CakAI Pro · Rapid Solo Replacement' },
      rows: [
        {
          key: { id: 'Trigger', en: 'Trigger' },
          value: { id: 'Disruption in slideshow production stack', en: 'Disruption in slideshow production stack' }
        },
        {
          key: { id: 'Build Cycle', en: 'Build Cycle' },
          value: { id: '14 days solo build', en: '14 days solo build' },
          highlight: true
        },
        {
          key: { id: 'Core Stack', en: 'Core Stack' },
          value: { id: 'FastAPI + Playwright + Multi-Slide AI', en: 'FastAPI + Playwright + Multi-Slide AI' }
        },
        {
          key: { id: 'Result', en: 'Result' },
          value: { id: 'Kept slideshow output running uninterrupted', en: 'Kept slideshow output running uninterrupted' },
          highlight: true
        }
      ]
    }
  }
];
