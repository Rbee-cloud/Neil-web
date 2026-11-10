export interface Influence {
  author: string;
  work: string;
  theme: string;
  note: string;
}

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  image: string;
  description: string;
}

export interface Milestone {
  period: string;
  role: string;
  institution: string;
  description: string;
}

export const BIO_DATA = {
  fullName: 'Aditya Neil Banerjee',
  byline: 'Aditya N. Banerjee',
  title: 'Writer, Editor-in-Chief & Political Economy Researcher',
  school: 'Stanford Online High School',
  currentRole: 'Editor-in-Chief, The OHS Observer',
  location: 'Coastal Portugal · Formerly São Paulo, Brazil',
  email: 'contact@aditya-neil-banerjee.ai.studio',
  aboutLong: `Aditya Neil Banerjee is a writer, researcher, and editor currently serving as Editor-in-Chief of the OHS Observer, the student-run news site of Stanford Online High School. His scholarship interrogates political economy, distributive justice, and institutional design—most notably through the capabilities approach pioneered by Amartya Sen and Martha Nussbaum.

Born and raised in the bustling metropolis of São Paulo, Brazil, Aditya later relocated with his family to a tranquil coastal town in Portugal. That geographic transition—from the dense, tropical velocity of South America's largest financial capital to the contemplative horizons of the Atlantic shore—deeply influences his worldview, artistic sensibilities, and prose.

Beyond journalism and political philosophy, Aditya is a committed digital artist who sketches on his tablet, an open-water and competitive swimmer, a music enthusiast known for eclectic playlist curation, an avid home cook testing new culinary traditions, and an equestrian. He views writing and art not as isolated disciplines, but as complementary ways to explore human agency and freedom.`,
  
  editorialVision: {
    title: 'Leading The OHS Observer',
    roleTitle: 'Editor-in-Chief (2025–2027 Staff)',
    mission: 'Stanford Online High School brings together scholars, artists, and critical thinkers across dozens of countries and every major timezone. As Editor-in-Chief, my mission has been to elevate the Observer from a traditional student bulletin into a world-class student newspaper characterized by rigorous investigative inquiry, incisive cultural critique, and deep philosophical engagement.',
    pillars: [
      {
        name: 'Epistemic Rigor',
        text: 'Every claim must be tested, sourced, and examined without reflexive ideological dogmatism.'
      },
      {
        name: 'Global Perspective',
        text: 'Bridging perspectives across North America, Europe, Asia, and Latin America with genuine curiosity.'
      },
      {
        name: 'The Friction of Long-Form',
        text: 'Championing contemplative essays and thorough analyses in an age addicted to viral soundbites.'
      }
    ]
  },

  influences: [
    {
      author: 'Amartya Sen',
      work: 'Development as Freedom & Inequality Reexamined',
      theme: 'Capabilities & Substantive Freedom',
      note: 'The foundational insight that human well-being must be evaluated through substantive freedoms to achieve valued functionings, rather than raw commodities alone.'
    },
    {
      author: 'Martha Nussbaum',
      work: 'Creating Capabilities: The Human Development Approach',
      theme: 'Constitutional Rights & Human Dignity',
      note: 'Her articulation of central human capabilities as non-negotiable entitlements for human flourishing.'
    },
    {
      author: 'John Rawls',
      work: 'A Theory of Justice',
      theme: 'Justice as Fairness & The Difference Principle',
      note: 'The classic benchmark of liberal egalitarianism, providing the essential counterpoint for capabilities critiques.'
    },
    {
      author: 'Joan Didion',
      work: 'Slouching Towards Bethlehem & The White Album',
      theme: 'Literary Journalism & Moral Cadence',
      note: 'Mastery of observational precision, rhythm, and the refusal to offer tidy consolations.'
    },
    {
      author: 'Jorge Luis Borges',
      work: 'Ficciones & Labyrinths',
      theme: 'Epistemology & Infinite Libraries',
      note: 'An indispensable guide to intellectual wonder, time, memory, and the architecture of imagination.'
    }
  ] as Influence[],

  artworks: [
    {
      id: 'coastal-solitude',
      title: 'Atlantic Breaking at Cabo da Roca',
      medium: 'Digital brushwork on tablet, high-res canvas',
      year: '2026',
      image: '/src/assets/images/portugal_coastal_twilight_1794328946026.jpg',
      description: 'A study of the Portuguese coastline at sunset where steep granite cliffs plunge into the Atlantic swell. Created during late autumn afternoons exploring how light dissolves salt mist.'
    },
    {
      id: 'capabilities-architectonics',
      title: 'Architectures of Human Flourishing',
      medium: 'Conceptual architectural digital study',
      year: '2026',
      image: '/src/assets/images/capabilities_philosophy_hero_1794328944655.jpg',
      description: 'An abstract exploration of open classical porticos framing modern skylines, meditating on institutional structures that empower personal agency and open horizons.'
    },
    {
      id: 'the-working-desk',
      title: 'Galley Proofs & Midnight Ink',
      medium: 'Editorial documentary study',
      year: '2025',
      image: '/src/assets/images/observer_editorial_desk_1794328946465.jpg',
      description: 'An intimate look at the physical materiality of news editing: printed layout spreads, red annotations, fountain pen, and the discipline of deadlines.'
    }
  ] as Artwork[],

  milestones: [
    {
      period: '2025 — Present',
      role: 'Editor-in-Chief',
      institution: 'The OHS Observer (Stanford Online High School)',
      description: 'Directing editorial strategy, managing section editors and contributors across global timezones, authoring flagship essays and investigative business and philosophy features.'
    },
    {
      period: '2025 — 2026',
      role: 'Academic Researcher & Author',
      institution: 'Scholastica & Policy Journals',
      description: 'Authored "Evaluating Affirmative Action Through Amartya Sen’s Capabilities Approach", analyzing distributive justice, conversion factors, and higher education admissions reform.'
    },
    {
      period: '2024 — Present',
      role: 'Staff Writer & Columnist',
      institution: 'The OHS Observer',
      description: 'Contributed regular columns to Business, Opinion, Two Cents, and Science & Tech, covering prediction markets, algorithmic media, European statecraft, and student life.'
    },
    {
      period: '2023 — Present',
      role: 'Competitive & Open-Water Swimmer',
      institution: 'Portuguese Coastal & Regional Aquatic Squads',
      description: 'Training in both pool and Atlantic coastal conditions; disciplined morning endurance sessions balancing intellectual and physical stamina.'
    }
  ] as Milestone[]
};
