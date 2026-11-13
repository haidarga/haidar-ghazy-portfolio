import type { LocalizedText } from './i18n';

export interface CaseMetric {
  value: number;
  prefix?: string;
  suffix: string | LocalizedText;
  decimals?: number;
  label: LocalizedText;
}

export interface CaseVisual {
  src: string;
  shortLabel?: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface CaseStudy {
  id: string;
  index: string;
  shortTabLabel: string;
  brand: string;
  category: LocalizedText;
  period: string;
  framingBadge: LocalizedText;
  roleSummary: string;
  contextNote: string;
  title: LocalizedText;
  problem: LocalizedText;
  action: LocalizedText;
  resultSummary: LocalizedText;
  metrics: CaseMetric[];
  tools: string[];
  brandBreakdown?: {
    brand: string;
    category: string;
    scope: string;
  }[];
  visuals: CaseVisual[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'oppo-diologtech',
    index: '01',
    shortTabLabel: '01 · OPPO',
    brand: 'OPPO Indonesia (via CAK AI)',
    category: {
      id: 'Virtual AI Creator · Smartphone Tech',
      en: 'Virtual AI Creator · Smartphone Tech'
    },
    period: 'Apr 2025 – Mar 2026',
    framingBadge: {
      id: 'AI Persona / Virtual Creator',
      en: 'AI Persona / Virtual Creator'
    },
    roleSummary:
      'CAK AI campaign for OPPO · My role: Content strategy, angle selection, scripting & AI video execution.',
    contextNote:
      'Account analytics period: Apr 2025–Mar 2026 · My involvement at CAK AI began May 2025.',
    title: {
      id: 'Building an AI creator-led content approach for product awareness.',
      en: 'Building an AI creator-led content approach for product awareness.'
    },
    problem: {
      id: 'The project focused on introducing OPPO products through an AI creator account designed for short-form social audiences.',
      en: 'The project focused on introducing OPPO products on TikTok through an AI creator account that felt natural in everyday feeds rather than reading like a corporate ad.'
    },
    action: {
      id: 'Led content strategy and creative execution for @diologtech.',
      en: 'Led content strategy, angle selection, scripting, and short-form AI video execution for @diologtech—developing comparison and review content around OPPO products.'
    },
    resultSummary: {
      id: 'Recorded 7.9M post views, 5.5M viewers, and 3,600+ followers (Apr 2025–Mar 2026).',
      en: 'Recorded 7.9M post views, 5.5M total viewers, and 3,600+ followers during the reported period of Apr 2025–Mar 2026.'
    },
    metrics: [
      {
        value: 7.9,
        decimals: 1,
        suffix: 'M',
        label: { id: 'Post Views', en: 'Post Views' }
      },
      {
        value: 5.5,
        decimals: 1,
        suffix: 'M',
        label: { id: 'Total Viewers', en: 'Total Viewers' }
      },
      {
        value: 3600,
        suffix: '+',
        label: { id: 'Followers (Apr 25–Mar 26)', en: 'Followers (Apr 25–Mar 26)' }
      }
    ],
    tools: ['Generative AI Video', 'TikTok Studio Analytics', 'Hook Engineering', 'CapCut / Premiere'],
    visuals: [
      {
        src: '/assets/projects/oppo-diologtech/diologtech-profile-feed-clean.webp',
        shortLabel: 'Account',
        alt: {
          id: '@diologtech TikTok creator feed showing smartphone comparison videos',
          en: '@diologtech TikTok creator feed showing smartphone comparison videos'
        },
        caption: {
          id: '@diologtech AI creator account built around opinionated smartphone comparisons.',
          en: '1. The @diologtech AI creator account—built around opinionated smartphone debates (678K, 445K, 434K views).'
        }
      },
      {
        src: '/assets/projects/oppo-diologtech/tiktok-studio-7-9m-views.webp',
        shortLabel: '7.9M Views',
        alt: {
          id: 'TikTok Studio overview for @diologtech showing 7.9M post views',
          en: 'TikTok Studio overview for @diologtech showing 7.9M post views'
        },
        caption: {
          id: 'TikTok Studio Overview (Apr 2025 – Mar 2026): 7.9M post views, 167K likes, 11K comments.',
          en: '2. Performance proof (Apr 2025 – Mar 2026): 7.9M post views, 68K profile visits, 167K likes, and 11K comments.'
        }
      },
      {
        src: '/assets/projects/oppo-diologtech/total-viewers-5-5m.webp',
        shortLabel: '5.5M Reach',
        alt: {
          id: '@diologtech audience analytics showing 5.5M total viewers',
          en: '@diologtech audience analytics showing 5.5M total viewers'
        },
        caption: {
          id: 'Audience reach: 5.5M total viewers including 2.2M new viewers.',
          en: '3. Audience reach breakdown: 5.5M total viewers with 2.2M net-new discovery.'
        }
      }
    ]
  },
  {
    id: 'cak-investment-club',
    index: '02',
    shortTabLabel: '02 · CIC',
    brand: 'Cak Investment Club',
    category: {
      id: 'AI UGC Slideshow · Fintech Funnel',
      en: 'AI UGC Slideshow · Fintech Funnel'
    },
    period: '2025 – 2026',
    framingBadge: {
      id: 'AI Persona / UGC Funnel',
      en: 'AI Persona / UGC Funnel'
    },
    roleSummary:
      'My role: Persona strategy, content planning & AI slideshow production · Inbound DMs were routed into membership conversations.',
    contextNote:
      'Based on internal inquiry and membership records across the two persona accounts; DM screenshots show example inquiry flows.',
    title: {
      id: 'Turning AI-led content into audience interest and membership inquiries.',
      en: 'Turning AI-led content into audience interest and membership inquiries.'
    },
    problem: {
      id: 'Cak Investment Club needed content that could build awareness and encourage interested audiences to ask about membership.',
      en: 'Cak Investment Club needed content that could earn trust on finance TikTok, spark investing discussions, and encourage interested viewers to ask about membership.'
    },
    action: {
      id: 'Planned and produced AI UGC slideshow content on two TikTok persona accounts.',
      en: 'Built two distinct AI persona voices—@jo.darsono (macro commentary) and @leo_ryansyah (investing perspectives)—using opinion-led photo slideshows to test angles and prompt inbound DM inquiries.'
    },
    resultSummary: {
      id: 'Generated 1.2M and 1.1M post views, with ~60% of inbound DMs converting into members.',
      en: 'Generated 1.2M and 1.1M post views across the two accounts, with approximately 60% of inbound DMs converting into Cak Investment Club members.'
    },
    metrics: [
      {
        value: 2.3,
        decimals: 1,
        suffix: 'M+',
        label: { id: 'Combined Post Views (1.2M + 1.1M)', en: 'Combined Post Views (1.2M + 1.1M)' }
      },
      {
        value: 60,
        prefix: '~',
        suffix: '%',
        label: { id: 'Inbound DM-to-Member', en: 'Inbound DM-to-Member' }
      },
      {
        value: 2,
        decimals: 0,
        suffix: '',
        label: { id: 'AI Persona Accounts', en: 'AI Persona Accounts' }
      }
    ],
    tools: ['AI UGC Slideshow', 'Hook Copywriting', 'TikTok Analytics', 'DM Funnel Routing'],
    visuals: [
      {
        src: '/assets/projects/cak-investment-club/jonathan-darsono-feed-clean.webp',
        shortLabel: 'Jo Feed',
        alt: {
          id: '@jo.darsono TikTok persona profile feed',
          en: '@jo.darsono TikTok persona profile feed'
        },
        caption: {
          id: '@jo.darsono AI persona profile feed.',
          en: '1. @jo.darsono AI persona account—macro commentary slideshows (143K, 268K, 445K views).'
        }
      },
      {
        src: '/assets/projects/cak-investment-club/jonathan-analytics-1-2m.webp',
        shortLabel: 'Jo Stats',
        alt: {
          id: '@jo.darsono TikTok Studio performance showing 1.2M post views',
          en: '@jo.darsono TikTok Studio performance showing 1.2M post views'
        },
        caption: {
          id: '@jo.darsono performance: 1.2M post views, 22K profile views, 96.2% FYP traffic.',
          en: '2. @jo.darsono performance: 1.2M post views, 22K profile visits, and 43K likes (96.2% organic FYP).'
        }
      },
      {
        src: '/assets/projects/cak-investment-club/jonathan-dm-conversion.webp',
        shortLabel: 'Jo DM',
        alt: {
          id: '@jo.darsono inbound DM inquiry converted to membership link',
          en: '@jo.darsono inbound DM inquiry converted to membership link'
        },
        caption: {
          id: '@jo.darsono DM conversion flow.',
          en: '3. @jo.darsono DM conversion: inbound viewers asking how to join, routed directly to the club signup link.'
        }
      },
      {
        src: '/assets/projects/cak-investment-club/leo-ryansyah-feed-clean.webp',
        shortLabel: 'Leo Feed',
        alt: {
          id: '@leo_ryansyah TikTok persona profile feed',
          en: '@leo_ryansyah TikTok persona profile feed'
        },
        caption: {
          id: '@leo_ryansyah AI persona profile feed.',
          en: '4. @leo_ryansyah AI persona account—analytical finance slideshows (170K, 200K, 112K views).'
        }
      },
      {
        src: '/assets/projects/cak-investment-club/leo-ryansyah-analytics-1-1m.webp',
        shortLabel: 'Leo Stats',
        alt: {
          id: '@leo_ryansyah TikTok Studio performance showing 1.1M post views',
          en: '@leo_ryansyah TikTok Studio performance showing 1.1M post views'
        },
        caption: {
          id: '@leo_ryansyah performance: 1.1M post views, 61K likes.',
          en: '5. @leo_ryansyah performance: 1.1M post views, 10K profile visits, and 61K likes.'
        }
      },
      {
        src: '/assets/projects/cak-investment-club/leo-dm-conversion.webp',
        shortLabel: 'Leo DM',
        alt: {
          id: '@leo_ryansyah inbound DM inquiry converted to membership link',
          en: '@leo_ryansyah inbound DM inquiry converted to membership link'
        },
        caption: {
          id: '@leo_ryansyah DM conversion flow.',
          en: '6. @leo_ryansyah DM conversion: organic audience reaching out to join and converting via direct link.'
        }
      }
    ]
  },
  {
    id: 'multi-persona-brands',
    index: '03',
    shortTabLabel: '03 · Multi-Persona',
    brand: 'AceKid · Syailendra · Golden Rama · Rahasia Beauty & More',
    category: {
      id: 'Scaled Multi-Persona Campaigns',
      en: 'Scaled Multi-Persona Campaigns'
    },
    period: '2025 – 2026',
    framingBadge: {
      id: 'Multi-Persona Systems',
      en: 'Multi-Persona Systems'
    },
    roleSummary:
      'CAK AI · My role: Content strategy, campaign positioning, creative direction, AI personas, and AI ad production.',
    contextNote:
      'Responsibilities varied by brand—spanning strategy and campaign positioning through end-to-end AI ad production. Weekly KPI time (~5 days → ~5 hrs) reflects team prep workflows after adopting CAKETING & CakVisual.',
    title: {
      id: 'Developing content strategies across brands and audiences.',
      en: 'Developing content strategies across brands and audiences.'
    },
    problem: {
      id: 'Different brands needed distinct content strategies and creative angles for their audiences while the team scaled daily output.',
      en: 'Each brand served a completely different audience—from parents and investors to travelers and beauty shoppers—requiring tailored positioning and hooks rather than a one-size-fits-all template.'
    },
    action: {
      id: 'Contributed to content strategy and campaign positioning across AceKid, Syailendra, and Golden Rama, and handled end-to-end AI ad production for Rahasia Beauty.',
      en: 'Contributed to content strategy and campaign positioning for AceKid, Syailendra, and Golden Rama—adapting creative angles, AI personas, hooks, and tone of voice per segment—while handling end-to-end AI ad production for Rahasia Beauty.'
    },
    resultSummary: {
      id: 'Supported multibrand production scaling from 20 to 120 marketing assets per day.',
      en: 'Supported multibrand content production scaling from 20 to 120 marketing assets per day across 20–90 parallel AI personas per client, cutting weekly KPI prep from ~5 days to ~5 hours.'
    },
    brandBreakdown: [
      {
        brand: 'AceKid',
        category: 'Parenting & Nutrition',
        scope: 'Contributed to content strategy and campaign positioning, developing creator personas, hooks, and messaging for parenting audiences. Also created AI promotional content across multiple formats and styles, including animation and drama-inspired storytelling.'
      },
      {
        brand: 'Syailendra',
        category: 'Finance & Investment',
        scope: 'Contributed to content strategy and campaign positioning—shaping investment-focused creator personas, angles, and messaging.'
      },
      {
        brand: 'Golden Rama',
        category: 'Travel & Hospitality',
        scope: 'Contributed to content strategy and campaign positioning—developing creative angles, hooks, and AI video concepts for travel audiences.'
      },
      {
        brand: 'Rahasia Beauty',
        category: 'Beauty & AI UGC Ads',
        scope: 'End-to-end AI ad production—translating campaign needs into AI-generated promotional videos through to final delivery.'
      }
    ],
    metrics: [
      {
        value: 90,
        prefix: '20-',
        suffix: '',
        label: { id: 'AI Personas per Client', en: 'AI Personas per Client' }
      },
      {
        value: 120,
        suffix: '/day',
        label: { id: 'Team Output (from 20)', en: 'Team Output (from 20)' }
      },
      {
        value: 5,
        suffix: ' hrs',
        label: { id: 'Team KPI Prep (from ~5 days)', en: 'Team KPI Prep (from ~5 days)' }
      }
    ],
    tools: ['Multi-Persona Architecture', 'Dual-Pass AI QC', 'fal.ai / Kling / Seedance', 'Hook Testing'],
    visuals: [
      {
        src: '/assets/projects/acekid/acekid-zoe-clean.webp',
        shortLabel: '@zoekalyani_',
        alt: {
          id: 'AceKid AI persona Zoe Kalyani Instagram grid',
          en: 'AceKid AI persona @zoekalyani_ Instagram feed'
        },
        caption: {
          id: 'AI persona @zoekalyani_ (AceKid).',
          en: '1. @zoekalyani_ (AceKid)—mother-focused perspective on infant nutrition. One of many brand personas running in parallel.'
        }
      },
      {
        src: '/assets/projects/acekid/acekid-rendy-clean.webp',
        shortLabel: '@rendykusm',
        alt: {
          id: 'AceKid AI persona Rendy Kusuma Instagram grid',
          en: 'AceKid AI persona @rendykusm Instagram feed'
        },
        caption: {
          id: 'AI persona @rendykusm (AceKid).',
          en: '2. @rendykusm (AceKid)—father-focused perspective on family nutrition choices.'
        }
      },
      {
        src: '/assets/projects/multi-persona/artsusu-acekid.webp',
        shortLabel: '@artsusu._',
        alt: {
          id: 'AceKid AI storytelling Instagram account @artsusu._',
          en: 'AceKid AI storytelling Instagram account @artsusu._'
        },
        caption: {
          id: 'AI brand storytelling @artsusu._ (AceKid).',
          en: '3. @artsusu._ (AceKid)—cinematic AI storytelling reels built for visual brand recall.'
        }
      },
      {
        src: '/assets/projects/multi-persona/lakzura-acekid.webp',
        shortLabel: '@lakzura_',
        alt: {
          id: 'Working mom AI TikTok persona @lakzura_',
          en: 'Working mom AI TikTok persona @lakzura_'
        },
        caption: {
          id: 'AI TikTok persona @lakzura_ (AceKid).',
          en: '4. @lakzura_ (AceKid)—working-mom parenting persona testing daily relatable hooks on TikTok.'
        }
      },
      {
        src: '/assets/projects/multi-persona/barra-adib-syailendra.webp',
        shortLabel: '@barra.adib',
        alt: {
          id: 'Syailendra Capital AI TikTok persona @barra.adib',
          en: 'Syailendra Capital AI TikTok persona @barra.adib'
        },
        caption: {
          id: 'AI finance persona @barra.adib (Syailendra).',
          en: '5. @barra.adib (Syailendra)—macro & bond commentary persona, alongside many more accounts across Golden Rama, Rahasia Beauty & other brands.'
        }
      }
    ]
  }
];
