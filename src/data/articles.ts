export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: 'Research' | 'Business & Markets' | 'Philosophy & Society' | 'Tech & Media' | 'Culture & Arts' | 'Personal Essays';
  publication: string;
  date: string;
  readTime: string;
  featured?: boolean;
  abstract?: string;
  coverImage?: string;
  tags: string[];
  content: {
    sectionHeading?: string;
    body: string[];
    quote?: string;
    quoteAuthor?: string;
  }[];
  citation?: {
    bibtex: string;
    apa: string;
    mla: string;
    chicago: string;
  };
}

export const ARTICLES: Article[] = [
  {
    id: 'evaluating-affirmative-action-sen-capabilities',
    title: 'Evaluating Affirmative Action Through Amartya Sen’s Capabilities Approach',
    subtitle: 'Moving beyond raw resource distribution toward substantive human freedoms and equal conversion power.',
    category: 'Research',
    publication: 'Scholastica / Academic Policy Studies',
    date: '2026',
    readTime: '18 min read',
    featured: true,
    coverImage: '/src/assets/images/capabilities_philosophy_hero_1794328944655.jpg',
    abstract: 'Standard critiques and defenses of affirmative action remain entrenched in Rawlsian primary goods or utilitarian calculi of diversity. This paper applies Amartya Sen’s capability framework to argue that true justice requires examining individuals’ substantive freedoms—their capability sets—to lead lives they have reason to value. By dissecting conversion factors (personal, social, and environmental), affirmative action is reconceptualized not as an arbitrary preference, but as an indispensable corrective for asymmetrical conversion handicaps created by institutional and historical injustice.',
    tags: ['Amartya Sen', 'Capabilities Theory', 'Affirmative Action', 'Distributive Justice', 'Philosophy & Public Policy'],
    citation: {
      bibtex: `@article{banerjee2026evaluating,\n  author = {Banerjee, Aditya Neil},\n  title = {Evaluating Affirmative Action Through Amartya Sen's Capabilities Approach},\n  journal = {Scholastica Policy and Philosophy Review},\n  year = {2026},\n  url = {https://aditya-neil-banerjee.ai.studio/}\n}`,
      apa: `Banerjee, A. N. (2026). Evaluating Affirmative Action Through Amartya Sen's Capabilities Approach. Scholastica Policy and Philosophy Review.`,
      mla: `Banerjee, Aditya Neil. "Evaluating Affirmative Action Through Amartya Sen's Capabilities Approach." Scholastica Policy and Philosophy Review, 2026.`,
      chicago: `Banerjee, Aditya Neil. 2026. "Evaluating Affirmative Action Through Amartya Sen's Capabilities Approach." Scholastica Policy and Philosophy Review.`
    },
    content: [
      {
        sectionHeading: 'I. The Impasse of Resource-Centric Equality',
        body: [
          'Contemporary debates surrounding affirmative action in higher education and civil appointments frequently lapse into a predictable deadlock. Proponents celebrate the pedagogical dividends of diversity or demand reparations for past oppression, while critics claim the policy violates formal meritocracy and treats individuals as demographic proxies rather than autonomous agents.',
          'Underlying both orthodox positions is a shared conceptual flaw: the assumption that justice can be measured strictly through the lens of commodities, income, or formal legal access. John Rawls’s monumental construct of "primary goods" made great strides by prioritizing the least advantaged, yet it remains blind to the profound human heterogeneity that dictates how goods translate into actual lived freedom.',
          'As Amartya Sen famously posed in his 1979 Tanner Lecture, "Equality of What?": two individuals possessing identical baskets of resources do not hold identical liberties if one experiences chronic illness, structural caste or racial exclusion, or an inhospitable geographic environment. To equalize the resource without equalizing the conversion capacity is to consecrate formal parity while cementing substantive inequality.'
        ],
        quote: 'Equality of resources is an incomplete metric; freedom resides not in the possession of goods, but in the capability to choose the lives we have reason to value.',
        quoteAuthor: 'Amartya Sen, Inequality Reexamined'
      },
      {
        sectionHeading: 'II. Functionings, Capabilities, and Conversion Factors',
        body: [
          'Sen’s framework pivots upon three central concepts: commodities, functionings, and capabilities. Commodities are the means to well-being; functionings are the actualized states of "doing and being" (such as being educated, being nourished, participating in democratic discourse); and capabilities comprise the full set of attainable functioning vectors—representing a person’s real, substantive freedom of choice.',
          'The bridge connecting resources to functionings is determined by conversion factors, which Sen categorizes into three interactive domains:',
          '1. Personal conversion factors: Physical constitution, metabolic rates, cognitive adaptations, and acquired skills.',
          '2. Social conversion factors: Institutional structures, entrenched racial or gender hierarchies, legal safeguards, and network capital.',
          '3. Environmental conversion factors: Climate, geographic proximity to centers of knowledge, transportation infrastructure, and ecological safety.',
          'When an applicant from a historically marginalized background applies to a selective university, evaluating their admissions portfolio exclusively against standardized test scores treats the score as an unvarnished mirror of merit. In reality, a standardized score is merely a commodity metric deeply conditioned by differential social and environmental conversion factors.'
        ]
      },
      {
        sectionHeading: 'III. Affirmative Action as Conversion Parity',
        body: [
          'Once reframed through Sen’s capabilities matrix, affirmative action ceases to be a patronizing concession or an exception to fairness. Rather, it operates as an institutional recalibration that accounts for the systematic erosion of conversion factors inflicted upon disadvantaged cohorts.',
          'A student who attains a 1450 SAT score while navigating under-resourced schools, chronic economic instability, and community under-investment has converted scarce educational inputs with extraordinary personal agency. In contrast, an affluent peer with identical scores had every conversion vector greased by private tutoring, legacy collegiate literacy, and social buffer systems.',
          'Affirmative action recognizes that admissions committees are not merely selecting past commodity accumulation; they are evaluating the latent capability set of the individual and ensuring that the university acts as an amplifier of agency freedom.'
        ],
        quote: 'Merit stripped of contextual conversion capacity is not merit at all; it is the naturalization of inherited structural privilege.',
        quoteAuthor: 'Aditya Neil Banerjee'
      },
      {
        sectionHeading: 'IV. Policy Implications & The Horizon of Capability Expansion',
        body: [
          'What does a capability-sensitive admissions and public policy framework look like in practice? First, it necessitates holistic contextual evaluation where an applicant’s socioeconomic baseline, school opportunity profile, and geographic conversion factors are treated as fundamental analytical inputs.',
          'Second, it demands that institutions look beyond matriculation. Admitting students without constructing the institutional conversion supports (mentorship, research fellowships, psychological belonging) merely transplants structural vulnerability onto the campus quadrant.',
          'Finally, it bridges the gap between individualist meritocracy and collective social justice. By defining human well-being through substantive capabilities rather than rigid utility or uniform resource distribution, universities and societies can cultivate genuinely pluralistic flourishing.'
        ]
      }
    ]
  },
  {
    id: 'prediction-market-mayhem',
    title: 'Prediction Market Mayhem',
    subtitle: 'Decentralized liquidity, crowdsourced epistemics, and the volatile new reality of forecasting reality.',
    category: 'Business & Markets',
    publication: 'The OHS Observer',
    date: 'June 1, 2026',
    readTime: '7 min read',
    tags: ['Prediction Markets', 'Macroeconomics', 'Financial Epistemics', 'Information Theory'],
    content: [
      {
        sectionHeading: 'The Price of Truth in Real Time',
        body: [
          'On any given Tuesday afternoon, millions of dollars change hands over probabilities that cannot be confirmed until months down the road. Whether the Federal Reserve will cut interest rates by twenty-five basis points, whether a geopolitical treaty will hold in Geneva, or whether an electoral challenger will clear the five percent threshold in an unheralded primary: decentralized prediction markets have transformed collective belief into tradeable contracts.',
          'Advocates of prediction markets—from Friedrich Hayek’s dispersed knowledge theories to modern algorithmic market-makers—argue that price discovery under skin-in-the-game conditions outperforms punditry, polling aggregators, and institutional think tanks. If you believe a candidate has a 70% chance of winning while the market trades at 55 cents, you buy. If you are right, you profit; if you are wrong, you bleed capital.',
          'Yet the 2026 cycle has exposed profound fractures in this epistemic utopia. When market liquidity concentrates in the hands of a few crypto whales, the line between forecasting reality and manufacturing sentiment blurs into chaos.'
        ],
        quote: 'Markets are remarkable calculating engines, but when money buys visibility, probability becomes an advertising weapon.',
        quoteAuthor: 'Aditya Banerjee, The OHS Observer'
      },
      {
        sectionHeading: 'Whales, Cascades, and Epistemic Feedback Loops',
        body: [
          'The fundamental assumption of the efficient market hypothesis is that informational arbitrage swiftly erodes irrational mispricings. If a single trader injects ten million dollars to pump a candidate’s odds from 40% to 65%, rational counter-parties should theoretically rush in to sell overpriced contracts and pocket the spread.',
          'In practice, capital constraints, risk tolerance, and media amplification warp this equilibrium. Cable news anchors and social feeds routinely report prediction market percentages as objective polling consensus. When mainstream coverage announces that Candidate X has surged by 15 points, donors write checks, voters experience bandwagon effects, and campaign momentum becomes self-fulfilling.',
          'This is what George Soros termed reflexivity: the market does not merely measure the temperature of the room; it is wired directly to the thermostat.'
        ]
      },
      {
        sectionHeading: 'Toward Institutional Guardrails',
        body: [
          'To preserve the genuine analytical promise of prediction markets while blunting predatory manipulation, platforms must evolve. Tiered participation caps, transparent on-chain order flow attribution, and decentralized dispute arbitration are no longer luxury features; they are the bedrock of democratic resilience.',
          'As we navigate an era rife with synthetic media, algorithmic echo chambers, and institutional erosion, finding dependable anchors of truth is paramount. Prediction markets offer one of our sharpest mirrors—provided we do not allow those with the deepest pockets to bend the glass.'
        ]
      }
    ]
  },
  {
    id: 'equality-as-heirloom',
    title: 'Equality As Heirloom',
    subtitle: 'Intergenerational privilege, cultural transmission, and the myth of the clean slate.',
    category: 'Philosophy & Society',
    publication: 'The OHS Observer (Two Cents)',
    date: 'February 27, 2026',
    readTime: '6 min read',
    tags: ['Philosophy', 'Generational Wealth', 'Ethics', 'Cultural Capital'],
    content: [
      {
        sectionHeading: 'The Inheritance We Pretend Doesn’t Exist',
        body: [
          'We are taught to venerate the self-made figure: the solitary worker who, unmoored from aristocratic lineage, conquers the modern world purely through grit and acumen. Our cultural rhetoric insists on the level playing field—a clean starting line where each child enters the race with unburdened limbs.',
          'Yet anyone who pauses to examine their own intellectual bookshelf knows the clean slate is a polite fiction. Privilege does not arrive solely in the form of trust funds or Swiss real estate. Its most potent, indelible form is cultural and cognitive inheritance: the dinner-table conversations about international relations, the instinctive comfort when addressing authority figures, the bookshelves overflowing with Camus, Achebe, and Sen that whisper, from age six, that your opinions carry weight in the world.',
          'This is equality as heirloom: an inherited habitus, as Pierre Bourdieu identified, passed from generation to generation like fine silver, polished by access and invisible to those who possess it.'
        ],
        quote: 'The most durable form of inequality is not the money parents leave behind, but the quiet certainty they instill that the world belongs to their children.',
        quoteAuthor: 'Aditya Banerjee'
      },
      {
        sectionHeading: 'Reconciling Parental Love and Structural Justice',
        body: [
          'The tragic paradox of the heirloom is that it stems from our most tender instinct: the parental desire to give one’s child every possible advantage. No decent society can or should outlaw bedtime reading, intellectual encouragement, or museum visits.',
          'The dilemma emerges when a society builds competitive tournaments—selective high schools, elite universities, early-career internships—that measure these heirloom advantages as pure intrinsic character. When the child of university professors wins a debate tournament over a child whose parents work twelve-hour shifts, we are not measuring raw cognitive potential. We are measuring the accumulated velocity of two distinct family histories.',
          'Acknowledging the heirloom is neither an exercise in performative guilt nor a summons to nihilism. It is a demand for modesty. It asks that those of us blessed with rich starting endowments recognize our good fortune not as an entitlement, but as an unpaid debt to expand the horizon of possibility for everyone else.'
        ]
      }
    ]
  },
  {
    id: 'the-making-of-the-european-juggernaut',
    title: 'The Making of the European Juggernaut',
    subtitle: 'Regulatory statecraft, the Brussels Effect, and Europe’s quest for strategic technological sovereignty.',
    category: 'Business & Markets',
    publication: 'The OHS Observer',
    date: 'February 20, 2026',
    readTime: '8 min read',
    tags: ['European Union', 'Geopolitics', 'AI Regulation', 'Digital Sovereignty'],
    content: [
      {
        sectionHeading: 'The Regulatory Superpower',
        body: [
          'For decades, critics of the European project have recited a well-worn refrain: "America innovates, China replicates, and Europe regulates." In an economic arena dominated by Silicon Valley venture capital and Shenzhen manufacturing speed, Brussels was often dismissed as an over-caffeinated bureaucratic museum, drafting directives while the rest of the planet built the future.',
          'That narrative is dying before our eyes. As the global digital ecosystem grapples with monopolies, algorithmic surveillance, and catastrophic AI risks, the European Union’s legislative muscle—often termed the "Brussels Effect"—has evolved from defensive friction into unprecedented geopolitical leverage.',
          'From the AI Act to the Digital Markets Act, multinational technology giants no longer treat European standards as an annoying regional cost center. Because maintaining divergent software architectures across borders is prohibitively expensive, European rules are becoming the de facto global operating system.'
        ]
      },
      {
        sectionHeading: 'Living on the Atlantic Coast of Europe',
        body: [
          'Writing this from a coastal town in Portugal, Europe’s contradictions are visceral. On one hand, you witness the continent’s bureaucratic inertia and the genuine struggle of European startups to secure late-stage growth capital compared to their counterparts on Sand Hill Road.',
          'On the other hand, there is a profound civilizational sanity embedded in the European social contract. High-speed rail networks, public healthcare, environmental safeguards, and stringent data rights are not decorative luxuries; they are foundational infrastructure for human dignity.',
          'The crucial test for Europe over the coming decade will be proving that regulation does not smother innovation, but rather channels it toward sustainable, human-centric ends. If the EU can bridge the gap between regulatory sovereignty and commercial dynamism, the "European Juggernaut" will not just be a market regulator, but the philosophical compass of the twenty-first century.'
        ]
      }
    ]
  },
  {
    id: 'the-viral-video-trap',
    title: 'The Viral Video Trap',
    subtitle: 'The algorithmic optimization of attention and the slow erosion of contemplative interiority.',
    category: 'Tech & Media',
    publication: 'The OHS Observer',
    date: 'January 29, 2026',
    readTime: '5 min read',
    tags: ['Algorithmic Culture', 'Attention Economy', 'Psychology', 'Digital Well-Being'],
    content: [
      {
        sectionHeading: 'The Seven-Second Attention Horizon',
        body: [
          'Watch someone scroll through short-form video in an airport terminal or school cafeteria. The thumb flicks with the rhythmic, mechanical cadence of a textile loom: swipe, two seconds, swipe, four seconds, laugh, swipe, blank stare, swipe. An entire emotional spectrum—indignation, lust, amusement, fear, wonder—is compressed into a three-minute interval, leaving behind no residue of genuine memory.',
          'This is not an accident of user behavior. It is the victory of an optimization metric that prizes capture over comprehension. The recommendation algorithms governing TikTok, Instagram Reels, and YouTube Shorts have solved the equation of short-term dopamine release with terrifying precision.',
          'What happens to an intellect trained from adolescence to reject any idea that takes longer than forty-five seconds to develop? It suffers from what Neil Postman warned about forty years ago in *Amusing Ourselves to Death*: not that information will be withheld from us, but that we will be reduced to a passivity where substance is indistinguishable from entertainment.'
        ],
        quote: 'When every pause in your day is instantly filled by a machine predicting your impulses, you lose the empty silence where original thoughts are born.',
        quoteAuthor: 'Aditya Banerjee'
      },
      {
        sectionHeading: 'Reclaiming the Friction of Thought',
        body: [
          'Reading a dense text—whether a page of Spinoza, a long-form investigative report, or a complex mathematical proof—requires friction. It requires tolerating confusion, re-reading paragraphs, and allowing ideas to ferment in the subconscious.',
          'The viral video trap eliminates all friction. It smooths every edge so that consumption requires zero effort. To resist this is not a matter of neo-Luddite purism or moral superiority; it is an act of intellectual self-defense.',
          'Stepping away from the algorithmic feed and picking up a long book, swimming in cold ocean water, or sketching on a blank canvas is more than an aesthetic preference. It is how we rescue our interior lives from being auctioned off to the highest bidder.'
        ]
      }
    ]
  },
  {
    id: 'a-room-with-a-rearview',
    title: 'A Room with a Rearview',
    subtitle: 'On reading nooks, coastal transitions, and navigating the future through the mirror of memory.',
    category: 'Personal Essays',
    publication: 'Medium & Notebook Essays',
    date: 'August 2026',
    readTime: '9 min read',
    featured: true,
    tags: ['Memoir', 'São Paulo', 'Portugal', 'Literature', 'Memory'],
    content: [
      {
        sectionHeading: 'The Velvet Armchair by the Glass',
        body: [
          'Every reader keeps a sanctuary in their mind: a plush velvet or worn leather armchair pulled close to a sunlit window, a steaming ceramic mug resting on a stack of annotated paperback spines, and the comforting stillness of an afternoon with nowhere urgent to go.',
          'In my childhood memories of São Paulo, that sanctuary was soundtracked by the relentless cadence of a tropical metropolis—the low roar of traffic climbing the hills, sudden thunderstorms rattling against high-rise glass, and the vibrant, humid energy of South America’s beating commercial heart. It was a place of explosive color and perpetual forward momentum.',
          'Years later, when our lives crossed the Atlantic and settled into a quiet coastal town in Portugal, the landscape shifted dramatically. The horizon was no longer bounded by concrete towers; it opened onto the vast, temperamental expanse of the ocean. The noise receded, replaced by the rhythmic hiss of Atlantic breakers and sea mist curling over sandstone cliffs.'
        ],
        quote: 'We look into the rearview mirror not because we wish to drive in reverse, but because the road ahead only makes sense when we know the terrain we have crossed.',
        quoteAuthor: 'Aditya N. Banerjee'
      },
      {
        sectionHeading: 'Dual Geographies of the Mind',
        body: [
          'Straddling two worlds—the Brazilian urban hustle and the contemplative Portuguese seaside, mediated through the digital corridors of Stanford Online High School—forces you to develop a dual vision. You learn that identity is not a monolith rooted to a single soil, but a woven tapestry of memories, languages, and chosen curiosities.',
          'On my desk, digital sketches of coastal cliffs sit beside dense essays on Amartya Sen’s capabilities approach and layout proofs for the *OHS Observer*. The tablet screen and the sea view inform one another. In art, as in editorial writing, the key challenge is subtraction: learning what details to omit so that the true architecture of the thought can emerge.',
          'When we sit in our reading nooks, we are never merely isolated observers. We carry the cities we have left behind, the ocean waters we swim in, and the questions we have yet to answer. The rearview mirror does not trap us in nostalgia; it gives us depth of field.'
        ]
      }
    ]
  },
  {
    id: 'can-we-do-better-than-positive-masculinity',
    title: 'Can We Do Better Than "Positive Masculinity"?',
    subtitle: 'Deconstructing modern archetypes, transactional brotherhood, and moral complexity.',
    category: 'Philosophy & Society',
    publication: 'The OHS Observer',
    date: 'December 11, 2025',
    readTime: '7 min read',
    tags: ['Gender Studies', 'Philosophy', 'Ethics', 'Social Discourse'],
    content: [
      {
        sectionHeading: 'The Brand of the New Man',
        body: [
          'Over the past decade, in response to well-documented critiques of toxic masculinity, a counter-industry has exploded across books, podcasts, and corporate webinars: the gospel of "positive masculinity." Its tenets sound reassuringly modern: be vulnerable, seek mentorship, build emotional resilience, protect the vulnerable, and lift weights with your brothers.',
          'Yet scrutinize this discourse closely and an unsettling pattern emerges. Much of what is branded as "positive masculinity" remains fundamentally transactional, aestheticized, and obsessed with competence as status. It replaces the old authoritarian patriarch with an enlightened warrior-monk—a stoic who meditates, drinks cold-pressed juice, and journals, but whose core self-worth is still measured by dominance, discipline, and personal victory.',
          'Is this truly a moral reimagining, or merely a sophisticated rebranding of masculine exceptionalism for an era that demands emotional vocabulary?'
        ]
      },
      {
        sectionHeading: 'Toward Humane Autonomy',
        body: [
          'The deeper problem with boxing virtues into gendered silos—calling courage or compassion "masculine" or "feminine"—is that it robs them of their universal human significance. When an adolescent male is told he must express kindness through a masculine filter, we convey that virtue is only acceptable if it preserves his armor.',
          'What young people need is not a refined template of masculine performance, but the permission to be complex, flawed, artistic, gentle, and fiercely ethical humans. Real moral development begins when we discard the script and cultivate genuine empathy—unencumbered by the anxiety of whether our humanity looks sufficiently strong.'
        ]
      }
    ]
  },
  {
    id: 'im-still-here-history-resilience',
    title: 'I’m Still Here: History, Resilience, and the Power of Storytelling',
    subtitle: 'Cinematic memory, Walter Salles, and the moral duty to bear witness to historical trauma.',
    category: 'Culture & Arts',
    publication: 'The OHS Observer (Theater & Film)',
    date: 'April 24, 2025',
    readTime: '6 min read',
    tags: ['Cinema', 'Brazilian History', 'Walter Salles', 'Storytelling'],
    content: [
      {
        sectionHeading: 'The Ghosts of Rio de Janeiro',
        body: [
          'In Walter Salles’s cinematic masterpiece *Ainda Estou Aqui* (I’m Still Here), the lens does not revel in sensational violence or theatrical melodrama. Instead, it observes with devastating intimacy the slow, creeping disappearance of Rubens Paiva under the Brazilian military dictatorship, and the monumental resilience of his wife, Eunice Paiva, who held five children together while refusing to let history erase the truth.',
          'Growing up in Brazil, the shadow of that military regime was never ancient history; it lingered in constitutional debates, in family lore, and in the political polarization of modern avenues. Salles captures something essential: state violence is designed not only to eliminate bodies, but to induce a forced national amnesia.',
          'Against the erasure of the state, Eunice Paiva mounted the only weapon that cannot be confiscated: memory, dignity, and relentless, quiet testimony.'
        ],
        quote: 'To remember is not merely to mourn; it is an act of rebellion against those who would rewrite the past in their own image.',
        quoteAuthor: 'Aditya Banerjee'
      },
      {
        sectionHeading: 'The Responsibility of the Observer',
        body: [
          'As a young writer and student editor, watching *I’m Still Here* felt like an urgent reminder of what journalism and storytelling are fundamentally for. It is easy to be seduced by hot takes, fleeting engagement spikes, and trendy controversies.',
          'True storytelling, however, is custodial. It guards the archive of human suffering, celebrates understated courage, and insists that the names of those who were silenced must be spoken out loud. When the credits roll, the film’s title echoes not as a cry of victimhood, but as a triumphant declaration of endurance: *We are still here.*'
        ]
      }
    ]
  },
  {
    id: 'overwhelmed-reflections',
    title: 'Overwhelmed',
    subtitle: 'Navigating high school rigor, global timezones, and the quiet art of radical slowness.',
    category: 'Personal Essays',
    publication: 'The OHS Observer (Two Cents)',
    date: 'May 23, 2025',
    readTime: '5 min read',
    tags: ['Reflections', 'Mental Health', 'Student Life', 'Intentionality'],
    content: [
      {
        sectionHeading: 'The Badge of Exhaustion',
        body: [
          'There is a quiet currency among ambitious high school students: the competition over who got fewer hours of sleep, who has more AP problem sets due by midnight, and whose calendar looks more like a mosaic of panic. We wear our exhaustion like a medal of valor.',
          'Living in Portugal while attending Stanford Online High School means coordinating with teachers in California, collaborators in New York, and peers in Tokyo. The sun rises over the Atlantic while you are wrapping up a seminar, and by the time your afternoon rolls around, the western hemisphere is just waking up with an inbox full of requests.',
          'In that whirlpool of perpetual accessibility, "overwhelmed" ceases to be an acute crisis; it becomes a default atmospheric pressure.'
        ]
      },
      {
        sectionHeading: 'The Courage of the Ocean',
        body: [
          'What saved my sanity was the Atlantic Ocean. Open-water swimming has an uncompromising honesty: the water is cold, the waves do not care about your editorial deadlines, and you cannot look at a screen while breathing every three strokes.',
          'In the water, you are forced into radical presence. You realize that the world does not collapse if an email sits unanswered for two hours. The remedy for overwhelm is rarely working harder; it is having the courage to declare boundaries, to cook a slow meal from scratch, to draw with no commercial purpose, and to remember that we are humans learning to live, not machines built to optimize.'
        ]
      }
    ]
  }
];
