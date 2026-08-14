/**
 * -----------------------------------------------------------------------------
 * SITE CONFIG — edit everything about "you" here in one place.
 * Names, tagline, links, nav, and section copy all read from this file.
 * -----------------------------------------------------------------------------
 */

export const site = {
  name: 'Anand Deshpande',
  role: 'Senior Product Manager',
  tagline: 'A product builder & tinkerer.',
  // The hero headline. Wrap the phrase you want highlighted in {{ }}.
  heroHeadline: 'I build products — {{sometimes for millions, sometimes just to see if I can.}}',
  heroSub:
    'Senior PM by day, builder by compulsion. I use AI-assisted development to go from “what if” to “try it yourself” in days, not quarters. Everything here is real — poke around.',

  // Contact + social. Leave a value empty ('') to hide that link.
  email: 'anandd512@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/anandd512',
    github: 'https://github.com/your-handle',
    resume: '/resume.pdf', // drop resume.pdf into /public
  },

  // Footer
  footerNote: 'Built with Next.js & AI — reviewed by a human.',
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Writing', href: '/blog' },
];

/**
 * ABOUT section copy.
 */
export const about = {
  heading: 'The best PMs build enough to earn an engineer’s trust.',
  paragraphs: [
    'I’m Anand — Senior Product Manager, former software engineer, computer-engineering background. I’ve spent my career at the intersection of deeply technical products and the humans who actually have to use them.',
    'Outside work, I build — because prototyping an idea teaches you more about it than any document ever will. AI-assisted development turned my “someday” list into a “this weekend” list.',
    'I believe the best PMs can build enough to earn an engineer’s trust, and communicate enough to earn everyone else’s. This site is my attempt to prove the first half.',
  ],
  // Little tags shown under the about text.
  interests: ['Systems thinking', 'Game mechanics', 'Rapid prototyping', 'Puzzles'],
};

/**
 * HOW I WORK — the repeatable loop.
 */
export const process = [
  {
    title: 'Feel the problem',
    body: 'Be my own first user. If the itch isn’t real, the product won’t be either.',
  },
  {
    title: 'Prototype fast',
    body: 'A working demo beats a beautiful doc. AI just makes “fast” faster.',
  },
  {
    title: 'Real users, early',
    body: 'Put it in front of people who’ll break it — then watch, don’t explain.',
  },
  {
    title: 'Let usage decide',
    body: 'Opinions argue. Usage settles. Rank, cut, and double down accordingly.',
  },
];

/**
 * EXPERIENCE / career timeline. Newest first.
 */
export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const experience: TimelineEntry[] = [
  {
    period: '2021 — Present',
    role: 'Senior Product Manager',
    org: 'Microsoft',
    detail:
      'Founding PM for App Governance — took it 0→1 into Microsoft Defender, now protecting 45K+ enterprise customers. Leading security against non-human and AI agent identity threats.',
  },
  {
    period: '2016 — 2019',
    role: 'Senior Software Engineer',
    org: 'CouponDunia (acq. Times Group)',
    detail:
      'Built consumer-scale services — gamification (+24% transactions), a 5M+ subscriber marketing platform, and a homepage rebuild (2.4s → 350ms).',
  },
  {
    period: '2019 — 2021',
    role: 'PGDM, Business Management',
    org: 'XLRI, Jamshedpur',
    detail:
      'MBA following a B.Tech in Computer Science from VNIT Nagpur — the pivot from engineer to product.',
  },
];
