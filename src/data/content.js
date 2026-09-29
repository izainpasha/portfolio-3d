// Edit this file to personalise the whole site.

export const profile = {
  name: 'Syed Zain Pasha',
  logoLines: ['Syed Zain', 'Pasha'],
  initials: 'SZ',
  // file name in /public without extension (expects .webp and .jpg); set to null to hide
  photo: 'profile',
  role: 'Full Stack Developer & Shopify Theme / App Specialist',
  location: 'Karachi, Pakistan',
  email: 'syedzain1999@gmail.com',
  about:
    'Full Stack Developer with 5+ years of experience building and shipping custom eCommerce solutions, specialising in Shopify custom theme and app development. I grew at Beecreative from Junior CMS Developer to Senior CMS Developer, Team Lead and Production Manager, delivering 300+ Shopify and eCommerce projects across multiple industries. I work in JavaScript, Liquid, HTML/CSS, Node.js and React, with hands-on experience in the Shopify Admin and Storefront APIs, and I turn Figma and Adobe XD designs into fast, conversion-focused stores. Today I lead two cross-functional development and SEO teams of 13+ developers and project managers.',
  stats: [
    { value: 5, suffix: '+', label: 'Years experience' },
    { value: 300, suffix: '+', label: 'Projects delivered' },
    { value: 13, suffix: '+', label: 'Team members led' },
  ],
  education: [
    { degree: 'Bachelor of Computer Science', school: 'Sir Syed University of Engineering & Technology', years: '2018 — 2022' },
    { degree: 'Intermediate (HSC)', school: 'Govt. Degree College Gulshan Block 7', years: '2015 — 2017' },
  ],
  socials: [{ label: 'GitHub', href: 'https://github.com/izainpasha' }],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'works', label: 'Works' },
  { id: 'impact', label: 'Impact' },
]

export const skills = [
  {
    icon: 'design',
    title: 'Shopify Custom Theme Development',
    text: 'Custom-coded Online Store 2.0 themes built from scratch with Liquid, sections & blocks, templates, metafields and metaobjects — pixel-perfect conversions of Figma and Adobe XD designs, tuned for Core Web Vitals and conversion.',
  },
  {
    icon: 'code',
    title: 'Shopify Apps & Full Stack',
    text: 'Custom and public Shopify apps with React, Remix, Node.js, Polaris and App Bridge. Admin API (GraphQL & REST), Storefront API, webhooks, OAuth, Theme App Extensions, and data with MySQL, PostgreSQL and Prisma.',
  },
  {
    icon: 'seo',
    title: 'Delivery & Team Leadership',
    text: 'Leading development and SEO teams through Agile / Scrum — sprint planning, code review, QA and release management, risk and timeline control, and clear client communication from scoping to post-launch support.',
  },
]

export const experience = [
  {
    role: 'Production Manager (Development & Service Delivery)',
    company: 'Beecreative.pk',
    date: 'Feb 2025 — Present',
    points: [
      'Lead 2 cross-functional development and SEO teams (13+ developers and project managers), owning delivery from requirement gathering and technical scoping through QA, launch and post-launch support.',
      'Act as the technical bridge between clients, sales and engineering, translating business requirements into scalable Shopify and eCommerce solutions.',
      'Plan sprints, allocate resources and manage risk and timelines across concurrent projects, keeping delivery predictable and high quality.',
      'Partner with sales on upsell and recurring-revenue opportunities, improving customer satisfaction and retention.',
    ],
  },
  {
    role: 'Team Lead',
    company: 'Beecreative.pk',
    date: 'Mar 2024 — Feb 2025',
    points: [
      'Led a team of CMS developers on Shopify theme and app builds, setting technical standards, assigning tasks and reviewing code before release.',
      'Coordinated with designers and project managers to meet tight deadlines while keeping output pixel-perfect and performant.',
      'Guided developers on Liquid, JavaScript and Shopify best practices, raising overall code quality and delivery speed.',
    ],
  },
  {
    role: 'Senior CMS Developer',
    company: 'Beecreative.pk',
    date: 'Jun 2022 — Mar 2024',
    points: [
      'Designed and developed custom-coded Shopify themes from scratch using Liquid, sections, templates and metafields.',
      'Built custom Shopify apps that extended store functionality, integrating the Admin and Storefront APIs and third-party services.',
      'Converted Figma and Adobe XD designs into pixel-perfect, responsive stores optimised for performance, UX and conversion.',
      'Owned complex client requirements end to end, working closely with designers and project managers.',
    ],
  },
  {
    role: 'Junior CMS Developer',
    company: 'Beecreative.pk',
    date: 'Mar 2021 — Jun 2022',
    points: [
      'Built and customised Shopify storefronts with HTML, CSS, JavaScript and Liquid from Figma and Adobe XD designs.',
      'Implemented sections, templates and metafield-driven content, and handled client change requests and bug fixes.',
      'Tested across browsers and devices to ensure consistent, high-quality delivery.',
    ],
  },
  {
    role: 'Project Manager (Service Delivery)',
    company: 'WeBytez Technologies',
    date: 'Oct 2019 — Dec 2020',
    points: [
      'Managed client communication, requirement gathering and project execution for web and digital products.',
      'Coordinated designers and developers for smooth, on-time delivery, translating client needs into clear technical tasks.',
      'Ran client calls, demos and progress updates, building long-term relationships and driving digital upsell opportunities.',
    ],
  },
]

// abbr is what renders inside the tile; color is the brand-ish tint.
export const tech = [
  { name: 'JavaScript', abbr: 'JS', color: '#f7df1e', dark: true },
  { name: 'TypeScript', abbr: 'TS', color: '#3178c6' },
  { name: 'Liquid', abbr: '{%}', color: '#95bf47', dark: true },
  { name: 'HTML5', abbr: '5', color: '#e34f26' },
  { name: 'CSS / SCSS', abbr: 'Sass', color: '#cc6699' },
  { name: 'Node.js', abbr: 'N', color: '#5fa04e' },
  { name: 'React', abbr: '⚛', color: '#61dafb', dark: true },
  { name: 'Remix', abbr: 'R', color: '#e8f2ff', dark: true },
  { name: 'Express.js', abbr: 'ex', color: '#444444' },
  { name: 'Shopify', abbr: 'S', color: '#95bf47', dark: true },
  { name: 'Polaris', abbr: 'P', color: '#008060' },
  { name: 'GraphQL', abbr: 'GQL', color: '#e10098' },
  { name: 'MySQL', abbr: 'SQL', color: '#00758f' },
  { name: 'PostgreSQL', abbr: 'PG', color: '#336791' },
  { name: 'Prisma', abbr: '▲', color: '#2d3748' },
  { name: 'Git / GitHub', abbr: 'GH', color: '#f05032' },
  { name: 'Figma', abbr: 'F', color: '#f24e1e' },
  { name: 'Adobe XD', abbr: 'Xd', color: '#ff61f6', bg: '#470137' },
]

// Types of work from the CV. Add real client projects (with href + screenshot) when ready.
export const works = [
  {
    title: 'Custom Shopify Themes',
    text: 'Online Store 2.0 themes coded from scratch — sections & blocks, templates, metafields and metaobjects, built for speed and conversion.',
    tags: ['Liquid', 'OS 2.0', 'Metafields'],
    gradient: 'from-lime-100 via-emerald-100 to-white',
    dark: false,
  },
  {
    title: 'Custom Shopify Apps',
    text: 'Embedded apps that extend store functionality with the Admin & Storefront APIs, webhooks and third-party integrations.',
    tags: ['Remix', 'Polaris', 'Admin API'],
    gradient: 'from-indigo-900 via-blue-800 to-violet-900',
    dark: true,
  },
  {
    title: 'Figma / XD to Storefront',
    text: 'Pixel-perfect, responsive, mobile-first stores converted from Figma and Adobe XD designs and tested across browsers.',
    tags: ['Figma', 'Adobe XD', 'Responsive'],
    gradient: 'from-pink-100 via-rose-200 to-red-300',
    dark: false,
  },
  {
    title: 'Theme App Extensions',
    text: 'App blocks and embeds that merchants drop into any theme — no code edits needed, clean uninstall.',
    tags: ['Shopify CLI', 'App Blocks'],
    gradient: 'from-sky-200 via-cyan-100 to-emerald-200',
    dark: false,
  },
  {
    title: 'Performance Optimisation',
    text: 'Core Web Vitals and Lighthouse improvements for existing stores — leaner assets, fewer scripts, faster pages.',
    tags: ['Core Web Vitals', 'Lighthouse'],
    gradient: 'from-amber-200 via-orange-100 to-stone-200',
    dark: false,
  },
  {
    title: 'APIs & Integrations',
    text: 'RESTful and GraphQL services with Node.js and Express, backed by MySQL, PostgreSQL and Prisma.',
    tags: ['Node.js', 'GraphQL', 'Prisma'],
    gradient: 'from-slate-800 via-indigo-900 to-sky-900',
    dark: true,
  },
]

// Figures from the CV.
export const impact = [
  { value: 300, suffix: '+', label: 'Shopify & eCommerce projects', text: 'Delivered across multiple industries, from custom themes to custom apps.' },
  { value: 30, prefix: '25–', suffix: '%', label: 'Better on-time delivery', text: 'Through sprint planning, prioritisation and workflow optimisation.' },
  { value: 25, suffix: '%', label: 'Repeat clients', text: 'Supported by upsell initiatives and long-term client relationships.' },
  { value: 13, suffix: '+', label: 'Developers & PMs led', text: 'Across two cross-functional development and SEO teams.' },
]
