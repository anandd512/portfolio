/**
 * -----------------------------------------------------------------------------
 * SITE CONFIG — edit everything about "you" here in one place.
 * Names, links, nav, and all section copy read from this file.
 *
 * Note: this site is deliberately about side projects only. Keep employer,
 * job titles, career history and education out of it.
 * -----------------------------------------------------------------------------
 */

export const site = {
  name: 'Anand Deshpande',
  firstName: 'Anand',
  title: 'Product builder & tinkerer',
  location: 'Bengaluru, India',
  url: 'https://ananddeshpande.in',
  description:
    'Anand Deshpande builds small, real products with AI: a private finance app, a multiplayer card table, a whiteboard, a reading companion, and a Pacman with opinionated ghosts.',

  // The hero headline. Wrap the phrase you want highlighted in {{ }}.
  heroHeadline: 'Weekend projects, {{shipped like real products.}}',
  heroSub:
    'I turn small personal itches into real, working products with AI-assisted development. So far: a private finance app, a card table for scattered friends, a whiteboard, a reading companion, and a Pacman with opinionated ghosts.',

  // Big numbers under the hero. `value: 'projects'` is replaced with the live project count.
  proof: [
    { value: 'projects', label: 'Side projects you can click' },
    { value: '5 days', label: 'Empty repo to installer (Artha)' },
    { value: '1', label: 'College group back at the card table' },
    { value: '3', label: 'Pacman ghosts, each with its own brain' },
  ],

  // The little "Now" line at the bottom of the hero.
  now: [
    { label: 'Building', value: 'Artha, now on iOS too' },
    { label: 'Losing at', value: 'Judgement, mostly' },
  ],

  // Contact + social. Leave a value empty ('') to hide that link.
  email: 'anandd512@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/anandd512',
    github: 'https://github.com/anandd512',
  },

  // Footer / contact
  contact: {
    eyebrow: 'Your move',
    heading: 'Let’s talk',
    body: 'Building something, want to compare notes, or ready to defend your Judgement bidding strategy? I’d love to hear from you, and I do reply.',
    copied: 'Copied. Talk soon!',
  },
  footerNote: 'Built with Next.js and a lot of AI. Every word reviewed by a human.',
} as const;

export type NavItem = { label: string; href: string; id?: string };

// `id` ties a link to a home-page section for the active-section highlight.
export const nav: NavItem[] = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'How I think', href: '/#principles', id: 'principles' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Writing', href: '/blog/' },
];

/**
 * SIDE PROJECTS section header.
 */
export const work = {
  eyebrow: 'Side projects',
  heading: 'Things I built because I couldn’t stop thinking about them.',
  sub: 'They all work. Mostly. Each one taught me something a spec never would.',
};

/**
 * HOW I THINK — principles, each backed by a real example on this site.
 */
export const principlesSection = {
  eyebrow: 'How I think',
  heading: 'Four habits, with receipts.',
};

export const principles = [
  {
    title: 'Be user zero',
    body: 'If I don’t feel the itch, I’ll build the wrong scratch.',
    receipt: 'CardArena started because my own college group had stopped playing.',
    href: '/projects/taash-table/',
  },
  {
    title: 'Build the argument',
    body: 'A clickable prototype settles in a day what a doc debates for a month.',
    receipt: 'Why I ship playable prototypes instead of decks.',
    href: '/blog/playable-prototypes/',
  },
  {
    title: 'Cut to the core loop',
    body: 'Find the one thing the product must do in its first minute, then protect it from everything else.',
    receipt: 'CardArena’s MVP had one job: shared link to dealt hand in under a minute.',
    href: '/projects/taash-table/',
  },
  {
    title: 'Trust is a feature',
    body: 'Especially once AI is involved. Make it optional, keep data where it belongs, let people bring their own keys.',
    receipt: 'Artha encrypts everything on your own devices, and its AI is bring-your-own-key.',
    href: '/projects/wealth-manager/',
  },
];

/**
 * ABOUT section copy.
 */
export const about = {
  eyebrow: 'About',
  heading: 'Prototyping is how I think.',
  paragraphs: [
    'I’m Anand. I like ideas best once they’re clickable. A working prototype answers questions a document can only argue about, and it’s a lot more fun to share.',
    'Most of what I build starts with a small personal itch: friends scattered across cities, documents scattered across inboxes, jargon I kept having to look up. Solving my own problem first keeps me honest about whether it’s a real one.',
    'AI-assisted development turned my “someday” list into a “this weekend” list. My weekends have not recovered.',
  ],
  // Little tags shown under the about text.
  interests: ['Judgement (the card game, mostly)', 'Puzzles', 'Game mechanics', 'Systems thinking'],
};

/**
 * WRITING section header.
 */
export const writing = {
  eyebrow: 'Writing',
  heading: 'Thinking out loud, occasionally in full sentences.',
  description: 'Notes on product, building, and learning in public.',
};
