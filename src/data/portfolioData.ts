export interface AccentTheme {
  id: string;
  name: string;
  color: string;
  onColor: string;
}

export const LINKEDIN_URL = "https://www.linkedin.com/in/aditya-neil-banerjee-9567b9381/?trk=public-profile-join-page";

export const ACCENT_THEMES: AccentTheme[] = [
  { id: 'cobalt', name: 'Royal Cobalt', color: '#2f3fe0', onColor: '#ffffff' },
  { id: 'pine', name: 'Atlantic Pine', color: '#186242', onColor: '#ffffff' },
  { id: 'terracotta', name: 'Warm Terracotta', color: '#b94827', onColor: '#ffffff' },
  { id: 'indigo', name: 'Midnight Indigo', color: '#312e81', onColor: '#ffffff' },
  { id: 'espresso', name: 'Espresso Umber', color: '#3f2d21', onColor: '#ffffff' },
  { id: 'teal', name: 'Deep Teal', color: '#0f6167', onColor: '#ffffff' },
  { id: 'crimson', name: 'Bordeaux Crimson', color: '#881337', onColor: '#ffffff' },
];

export interface Project {
  id: string;
  title: string;
  meta: string;
  link?: string;
  linkText?: string;
  image: string;
  imageAlt?: string;
  badges?: string[];
  role: string;
  highlights: string[];
  desc: string[];
}

export interface OtherItem {
  id: string;
  when: string;
  title: string;
  where?: string;
  link?: string;
  desc: string;
  tags?: string[];
}

export interface WritingItem {
  id: string;
  when: string;
  title: string;
  where: string;
  link?: string;
  desc?: string;
  category: 'Research' | 'Essays' | 'Creative';
  tags?: string[];
}

export interface ExperienceItem {
  id: string;
  when: string;
  title: string;
  where: string;
  link?: string;
  desc: string;
}

export interface RecognitionItem {
  id: string;
  when: string;
  title: string;
  where: string;
  link?: string;
}

export interface EducationItem {
  id: string;
  when: string;
  title: string;
  where: string;
}

export interface SkillCategory {
  category: string;
  items: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
  link?: string;
}

export interface ArtworkItem {
  id: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    "id": "leve",
    "title": "Leve",
    "meta": "Founder · 2023 – now",
    "link": "https://www.deleve.eu",
    "linkText": "deleve.eu",
    "image": "/src/assets/images/leve_community.jpg",
    "imageAlt": "Leve community composting workshop in Caldas da Rainha",
    "badges": [
      "Diana Award 2026",
      "8 Schools",
      "500+ Participants",
      "1,000+ Meals Saved"
    ],
    "role": "Founder & Initiative Director",
    "highlights": [
      "Operates three dedicated sub-projects: BioRainha (urban composting), Art Caldas (intergenerational arts), and Me Leve (food redistribution).",
      "Officially adopted by Caldas da Rainha Town Council with an allocated dedicated community land plot.",
      "Recipient of the prestigious international Diana Award (2026) for youth humanitarian and community action."
    ],
    "desc": [
      "A youth-led initiative in Caldas da Rainha working on food waste and on bringing younger and older people in town together. It runs three projects: BioRainha (composting), Art Caldas and Me Leve.",
      "So far we've worked with 8 schools and around 500 people, and saved over 1,000 meals. The town council adopted BioRainha and gave us a community plot for it. Leve received the Diana Award in 2026."
    ]
  },
  {
    "id": "rowbot",
    "title": "Rowbot",
    "meta": "Founder · 2024 – now",
    "link": "https://www.rowbots.eu",
    "linkText": "rowbots.eu",
    "image": "/src/assets/images/rowbot_buoy.jpg",
    "imageAlt": "Rowbot semi-autonomous water quality buoy",
    "badges": [
      "CREST Gold Award",
      "Bright Future Global Prize Finalist",
      "Real-time IoT"
    ],
    "role": "Founder & Hardware/Firmware Lead",
    "highlights": [
      "Multi-parameter telemetry array: temperature, turbidity, conductivity, pH, and water elevation level.",
      "Solar-powered autonomous telemetry for continuous real-time water quality monitoring in estuaries and rivers.",
      "Recognized with the CREST Gold Award from the British Science Association."
    ],
    "desc": [
      "A small semi-autonomous buoy that measures temperature, turbidity, conductivity, pH and water level in rivers and lakes, so local water quality can be tracked in real time.",
      "It was a finalist for the Bright Future Global Prize and received a CREST Gold Award from the British Science Association."
    ]
  }
];

export const OTHER_ITEMS: OtherItem[] = [
  {
    id: 'composting-workshops',
    when: '2024 – now',
    title: 'Composting workshops',
    where: 'Caldas da Rainha',
    desc: '14 workshops so far, with about 80 neighbors, on turning kitchen waste into compost.',
    tags: ['Community', 'Sustainability', 'Workshops']
  },
  {
    id: 'un-redd',
    when: '2026',
    title: 'UN-REDD Programme',
    where: 'Project leader',
    desc: 'Leading a team of students in Brazil writing a paper on the Brazil–Norway partnership behind the Amazon Fund.',
    tags: ['Policy', 'Amazon Fund', 'Brazil-Norway']
  },
  {
    id: 'junior-academy-nyas',
    when: '2025',
    title: 'Junior Academy, New York Academy of Sciences',
    where: 'Team leader',
    desc: 'Worked with a mentor on a design for distributing solar power more efficiently.',
    tags: ['Renewable Energy', 'STEM', 'Mentorship']
  },
  {
    id: 'lala',
    when: '2024',
    title: 'Latin American Leadership Academy',
    where: 'São Paulo',
    desc: "Designed a plan to connect local restaurants with shelters so surplus meals don't go to waste.",
    tags: ['Food Relief', 'Social Innovation', 'Leadership']
  },
  {
    id: 'math-tutoring',
    when: '2021 – now',
    title: 'Math tutoring',
    where: 'Crescer Sempre · ETAPA · Schoolhouse',
    link: 'https://schoolhouse.world/portfolio/adbbd6a5-244f-4736-815d-67c501364fb2',
    desc: 'Teaching arithmetic to kids in Paraisópolis, AP Calculus AB to students in São Paulo, and algebra online.',
    tags: ['Education', 'Mathematics', 'Tutoring']
  },
  {
    id: 'plogging',
    when: '2024 – now',
    title: 'Plogging Challenge Portugal',
    where: 'Portugal',
    desc: 'Community runs where we pick up litter along the way.',
    tags: ['Environment', 'Community Running', 'Civic Action']
  }
];

export const RESEARCH_ITEMS: WritingItem[] = [
  {
    id: 'res-gmu-ai-trading',
    when: '2026',
    title: 'The Impact of Artificial Intelligence Discourse on Short-Term Trading Volume: Evidence from S&P 500 Earnings Calls',
    where: 'George Mason University, with Dr. Mariia Petryk',
    link: 'https://doi.org/10.13021/jssr2026.5682',
    desc: 'I looked at 4,892 earnings calls to see whether mentions of AI move short-term trading volume. They do (p < 0.05). Published in the Journal of Students-Scientists’ Research.',
    category: 'Research',
    tags: ['Financial Econometrics', 'NLP', 'Empirical Finance', 'Published']
  },
  {
    id: 'res-iit-matching',
    when: '2025 – 26',
    title: 'Estimating Promotional Response from Statistical Twins with Coarsened Exact Matching and Self-Organizing Maps',
    where: 'IIT Madras, with Dr. Vamanie Perumal',
    desc: 'Using matching methods on retail data, we found that raw promotional uplift overstates the true effect by 58%. Accepted to IEEE ICPIC 2026.',
    category: 'Research',
    tags: ['Causal Inference', 'Machine Learning', 'Matching Methods', 'IEEE ICPIC']
  }
];

export const ESSAY_ITEMS: WritingItem[] = [
  {
    id: 'ess-amartya-sen',
    when: '2026',
    title: "Evaluating Affirmative Action Through Amartya Sen's Capabilities Approach",
    where: 'Critical Debates HSGJ',
    link: 'https://criticaldebateshsgj.scholasticahq.com/post/4062-evaluating-affirmative-action-through-amartya-sen-s-capabilities-approach-by-aditya-neil-banerjee',
    desc: 'An evaluation of equity and social policy assessing opportunity, functioning vectors, and substantive agency.',
    category: 'Essays',
    tags: ['Development Economics', 'Philosophy', 'Amartya Sen']
  },
  {
    id: 'ess-public-policy-locke',
    when: '2026',
    title: 'Public Policy Without Substantive Freedoms is a Failed Theory of Justice',
    where: 'John Locke Essay Prize, Commendation',
    link: 'https://www.johnlockeinstitute.com/',
    desc: 'Commended essay examining Rawlsian vs. Senian frameworks of capability in state distribution of welfare.',
    category: 'Essays',
    tags: ['Public Policy', 'John Locke Prize', 'Political Philosophy']
  },
  {
    id: 'ess-novartis-glivec',
    when: '2025',
    title: 'Beyond the Profit Motive: Market Design and Marxist Critique in the Novartis Glivec Case',
    where: 'Zenodo',
    link: 'https://doi.org/10.5281/zenodo.20804377',
    desc: 'A market design and political economy inquiry into intellectual property, generic drug access, and patents in India.',
    category: 'Essays',
    tags: ['Market Design', 'Intellectual Property', 'Zenodo DOI']
  },
  {
    id: 'ess-hope-of-profit',
    when: '2025',
    title: 'Behaviors Engendered by the Hope of Profit',
    where: 'John Locke Essay Prize, Very High Commendation',
    link: 'https://www.johnlockeinstitute.com/',
    desc: 'Awarded Very High Commendation in Economics examining incentive structures, behavioral economics, and entrepreneurial capital.',
    category: 'Essays',
    tags: ['Economics', 'John Locke Prize', 'Behavioral Economics']
  }
];

export const CREATIVE_ITEMS: WritingItem[] = [
  {
    id: 'cre-alge-bros',
    when: '2026',
    title: 'Alge-Bros and Haiku Flows',
    where: 'A book of math poetry',
    desc: 'Numbers have personalities, variables have identity crises, and the quadratic formula might write you a love letter.',
    category: 'Creative',
    tags: ['Poetry Book', 'Mathematics', 'Humor']
  },
  {
    id: 'cre-weight-cloud',
    when: '2025',
    title: 'The Weight of a Cloud and Other Poems',
    where: 'Shared with the COP30 committee, Belém',
    link: 'https://www.amazon.com/Weight-Cloud-Other-Poems-ebook/dp/B0FXGLB1W7',
    desc: 'Three illustrated poems about young people living through climate disasters in Brazil and India.',
    category: 'Creative',
    tags: ['Climate Poetry', 'COP30', 'Brazil & India']
  },
  {
    id: 'cre-stargazer',
    when: '2025',
    title: 'How to Be a StarGazer',
    where: 'New York Times student writing contest',
    link: 'https://www.nytimes.com/2025/05/15/learning/how-to-be-a-stargazer.html',
    desc: 'Winner entry exploring perspective, astronomy, and reflective observation.',
    category: 'Creative',
    tags: ['New York Times', 'Winner', 'Creative Nonfiction']
  },
  {
    id: 'cre-archive-soft-things',
    when: '2025 – 26',
    title: 'Archive of Soft Things',
    where: 'Poetry Society UK',
    link: 'https://poems.poetrysociety.org.uk/poems/archive-of-soft-things/',
    desc: 'Award-winning poem published with the Poetry Society UK Young Poets Network exploring memory and preservation.',
    category: 'Creative',
    tags: ['Poetry Society UK', 'Young Poets Network', 'Poetry']
  },
  {
    id: 'cre-poincare-miso',
    when: '2025 – 26',
    title: 'Poincaré Recurrence in My Bowl of Miso',
    where: 'American Mathematical Society',
    link: 'https://www.ams.org/learning-careers/students/poincare-recurrence-banerjee',
    desc: 'Winner poem in the AMS Math Poetry Contest synthesizing ergodic theory, topology, and morning soup.',
    category: 'Creative',
    tags: ['AMS Math Poetry', 'Topology', 'Ergodic Theory']
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-observer',
    when: '2024 – now',
    title: 'The Observer, Stanford OHS',
    where: 'Editor-in-Chief, previously Associate Editor and Staff Writer',
    link: 'https://ohsobserver.com/staff_name/aditya-banerjee/',
    desc: 'I started by writing about campus life, then edited pieces on economics, social media and academic stress. Now I work with the whole team to present current issues and topics relevant to our school.'
  },
  {
    id: 'exp-econ-society',
    when: '2025 – 26',
    title: 'Economics Society, Stanford OHS',
    where: 'Founder',
    desc: 'A club of about 26+ students. We discussed markets and policy, and hosted a talk by an economist from the D.E. Shaw Group.'
  },
  {
    id: 'exp-cogsci-society',
    when: '2025 – 26',
    title: 'Cognitive Science Society, Stanford OHS',
    where: 'Founder',
    desc: 'A small group of 16 exploring psychology, linguistics and decision-making through discussions and mini-projects.'
  },
  {
    id: 'exp-cubehq',
    when: '2025 – now',
    title: 'Cubehq.ai',
    where: 'Content writing intern',
    link: 'https://cubehq.ai/',
    desc: 'Writing and designing marketing posts for small brands, and building a Squarespace site for one of them.'
  },
  {
    id: 'exp-youngink',
    when: '2024 – now',
    title: 'YoungInk',
    where: 'Assistant Editor, previously Assistant Coordinator',
    link: 'https://www.youngink.eu/',
    desc: 'Giving feedback to young writers. I also helped redesign the website.'
  },
  {
    id: 'exp-summer-jobs',
    when: '2024 – 25',
    title: 'Summer jobs in Portugal',
    where: 'Lavrador · Museu do Ciclismo · Private tutoring',
    desc: 'Inventory and customer service, welcoming museum visitors, and teaching algebra to middle schoolers.'
  }
];

export const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    id: 'hon-diana',
    when: '2026',
    title: 'The Diana Award',
    where: 'For Leve',
    link: 'https://diana-award.org.uk/our-programmes-and-initiatives/award-and-development/roll-of-honour/roll-of-honour-2026'
  },
  {
    id: 'hon-bright',
    when: '2026',
    title: 'Bright Future Global Prize, finalist',
    where: 'For Rowbot',
    link: 'https://www.ardonaghtrust.org/our-news/meet-bright-future-prizes-2026-finalists'
  },
  {
    id: 'hon-crest',
    when: '2026',
    title: 'CREST Gold Award',
    where: 'British Science Association',
    link: 'https://www.crestawards.org/'
  },
  {
    id: 'hon-locke-2026',
    when: '2026',
    title: 'John Locke Essay Prize, Commendation',
    where: 'Public Policy',
    link: 'https://www.johnlockeinstitute.com/'
  },
  {
    id: 'hon-ams',
    when: '2026',
    title: 'AMS Math Poetry Contest',
    where: 'American Mathematical Society',
    link: 'https://www.ams.org/learning-careers/students/poincare-recurrence-banerjee'
  },
  {
    id: 'hon-rpi',
    when: '2026',
    title: 'Raspberry Pi Foundation Coding Challenge',
    where: 'Gold Merit',
    link: 'https://www.raspberrypi.org/'
  },
  {
    id: 'hon-locke-2025',
    when: '2025',
    title: 'John Locke Essay Prize, Very High Commendation',
    where: 'Economics',
    link: 'https://www.johnlockeinstitute.com/'
  },
  {
    id: 'hon-nyt',
    when: '2025',
    title: 'New York Times Writing Contest',
    where: 'Winner',
    link: 'https://www.nytimes.com/2025/05/15/learning/how-to-be-a-stargazer.html'
  },
  {
    id: 'hon-ypn',
    when: '2025',
    title: 'Young Poets Network',
    where: 'Poetry Society UK',
    link: 'https://poems.poetrysociety.org.uk/poems/archive-of-soft-things/'
  },
  {
    id: 'hon-bebras',
    when: '2025',
    title: 'Bebras Computational Thinking Challenge',
    where: 'Gold Merit',
    link: 'https://www.bebras.uk/'
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'edu-sohs',
    when: '2022 – now',
    title: 'Stanford Online High School',
    where: 'Economics, Multivariable Calculus, Physics C, Statistics, Computer Science, Logic, Number Theory'
  },
  {
    id: 'edu-ucscout',
    when: '2023 – now',
    title: 'UC Scout, University of California',
    where: 'Macroeconomics, Comparative Government, Chemistry, Psychology, Art History, German'
  },
  {
    id: 'edu-summer',
    when: '2026',
    title: 'Summer courses',
    where: 'Game Theory (Johns Hopkins CTY) · Logic & Proofs (Carnegie Mellon) · Journalism (The Stanford Daily)'
  },
  {
    id: 'edu-graded',
    when: '2011 – 22',
    title: 'Graded, The American School of São Paulo',
    where: 'Lower and Middle School'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { category: 'Code', items: 'Python, Java, C++, Django' },
  { category: 'Research', items: 'Statistics, causal inference, Excel' },
  { category: 'Making', items: 'Arduino, CAD, Blender, Figma' },
  { category: 'Languages', items: 'English, Portuguese, a little German' },
  { category: 'Also', items: 'Western horseback riding, theater' }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'The Diana Award',
    issuer: 'The Diana Award Roll of Honour',
    year: '2026',
    description: undefined,
    link: 'https://diana-award.org.uk/our-programmes-and-initiatives/award-and-development/roll-of-honour/roll-of-honour-2026'
  },
  {
    id: 'cert-2',
    title: 'CREST Gold Award',
    issuer: 'British Science Association',
    year: '2026',
    description: 'Gold-level scientific research credential for autonomous IoT water quality buoy engineering (Rowbot).',
    link: 'https://www.crestawards.org/'
  },
  {
    id: 'cert-3',
    title: 'Bright Future Global Prize Finalist',
    issuer: 'Ardonagh Community Trust',
    year: '2026',
    description: 'Global environmental innovation finalist for youth-led sustainability technology.',
    link: 'https://www.ardonaghtrust.org/our-news/meet-bright-future-prizes-2026-finalists'
  },
  {
    id: 'cert-4',
    title: 'John Locke Essay Prize',
    issuer: 'John Locke Institute, Oxford & Princeton',
    year: '2025 / 2026',
    description: 'Very High Commendation (Economics) & Commendation (Public Policy) for philosophical and economic inquiry.',
    link: 'https://www.johnlockeinstitute.com/'
  },
  {
    id: 'cert-6',
    title: 'Raspberry Pi Coding Challenge',
    issuer: 'Raspberry Pi Foundation',
    year: '2026',
    description: 'Gold Merit certificate for computational engineering, sensor integration, and firmware programming.',
    link: 'https://www.raspberrypi.org/'
  },
  {
    id: 'cert-8',
    title: 'Bebras Computational Thinking Challenge',
    issuer: 'Bebras International Community & Oxford University',
    year: '2025',
    description: 'Gold Merit award for logic, algorithmic thinking, and computational problem solving.',
    link: 'https://www.bebras.uk/'
  }
];

export const ARTWORKS: ArtworkItem[] = [
  {
    "id": "art-1",
    "title": "Study of the Tornada River Basin",
    "medium": "Watercolor & India ink on cold-press paper",
    "year": "2025",
    "dimensions": "42 × 59 cm",
    "description": "Topographic contour and sedimentation study mapping wetland river hydrology and organic runoff near Caldas da Rainha."
  },
  {
    "id": "art-2",
    "title": "Thermal Inversion at Óbidos Lagoon",
    "medium": "Oil and cold wax on linen canvas",
    "year": "2025",
    "dimensions": "60 × 80 cm",
    "description": "Atmospheric light study capturing dusk temperature differentials and brackish water reflections at the coastal inlet."
  },
  {
    "id": "art-3",
    "title": "Decompositions & Microbial Growth",
    "medium": "Charcoal, iron oxide wash & organic sediment",
    "year": "2024",
    "dimensions": "30 × 40 cm",
    "description": "Organic texture and decay gradient study created during early soil composting trials in Caldas da Rainha."
  },
  {
    "id": "art-4",
    "title": "Ergodic Flow (Poincaré Recurrence)",
    "medium": "Digital computational visualization & ink print",
    "year": "2026",
    "dimensions": "50 × 70 cm",
    "description": "Mathematical visual inquiry inspired by dynamical systems theory, phase space trajectories, and thermodynamic entropy."
  },
  {
    "id": "art-5",
    "title": "Caldas Ceramic Kiln Shards & Earth",
    "medium": "Clay slip, natural terracotta pigment & mineral glaze",
    "year": "2024",
    "dimensions": "35 × 50 cm",
    "description": "Homage to the ceramic heritage of Caldas da Rainha (Bordallo Pinheiro tradition) fused with modern geological stratification."
  },
  {
    "id": "art-6",
    "title": "Atlantic Mist over Foz do Arelho",
    "medium": "Acrylic, soft pastel & pumice paste",
    "year": "2025",
    "dimensions": "50 × 65 cm",
    "description": "Expressive coastal weather study examining sea spray density, cliffs, and twilight atmospheric light."
  },
  {
    "id": "art-7",
    "title": "Mangrove Roots & Flood Hydrology",
    "medium": "Sumi ink & salt crystallization on washi",
    "year": "2024",
    "dimensions": "38 × 52 cm",
    "description": "Estuarine root architecture study recalling coastal São Paulo tidal ecosystems and wetland flood mitigation."
  },
  {
    "id": "art-8",
    "title": "Sensory Topography: Sound of Water",
    "medium": "Cyanotype photogram & silver leaf on handmade paper",
    "year": "2026",
    "dimensions": "40 × 60 cm",
    "description": "Sun-exposed chemical print overlaid with acoustic frequency recordings taken during sensor buoy field testing."
  }
];

export const PORTFOLIO_CONTENT = {
  "hero": {
    "greeting": "Hi, I'm Aditya.",
    "locationBadge": "Caldas da Rainha, Portugal · Stanford OHS",
    "description": "I'm a student in Caldas da Rainha, Portugal. I start community projects, build small things for the environment, study economics, and write.",
    "ctaText": "A bit more about me"
  },
  "about": {
    "p1": "I like figuring out how things work — markets, rivers, sentences — and then trying to make something useful with what I learn.",
    "p2": "I grew up in São Paulo, Brazil, and now live in Caldas da Rainha, a small town in Portugal, where I study at Stanford Online High School. Most of what I do started close to home: a composting project, a buoy that checks the water in local rivers, tutoring kids in math.",
    "p3": "At school I'm drawn to economics, math and computer science. Outside of it, I write. I edit our school newspaper and write poetry, sometimes about math.",
    "originsTitle": "Origins",
    "originsDesc": "São Paulo, Brazil → Caldas da Rainha, Portugal",
    "educationTitle": "Education",
    "educationDesc": "Stanford Online High School · Senior",
    "interestsTitle": "Interests",
    "interestsDesc": "Causal Inference, Policy & Creative Writing"
  },
  "contact": {
    "heading": "Say hello.",
    "subheading": "I'm always glad to hear from people working on similar things, or just curious about them."
  }
};
