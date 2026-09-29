// Edit this file to personalise the whole site.

export const profile = {
  name: 'Alex Rivera',
  initials: 'AR',
  role: 'Web Designer & Developer',
  email: 'hello@example.com',
  about:
    'An experienced Web Designer and Developer with a versatile background spanning industries such as IT/BPO, Digital Design Services and White Label Services. Proficient in platforms like WordPress, Shopify and WooCommerce — handling everything from setup and design to development and deployment. Also skilled in Graphic Design, Digital Marketing and Search Engine Optimization.',
  stats: [
    { value: 8, suffix: '+', label: 'Years experience' },
    { value: 120, suffix: '+', label: 'Projects shipped' },
    { value: 60, suffix: '+', label: 'Happy clients' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'works', label: 'Works' },
  { id: 'testimonials', label: 'Testimonials' },
]

export const skills = [
  {
    icon: 'design',
    title: 'Graphic Design & Web Design',
    text: 'Envisions and carries out visual design projects in Graphic and Web Design, primarily using Adobe Photoshop, Illustrator, Adobe XD, Figma and other relevant tools as necessary.',
  },
  {
    icon: 'code',
    title: 'Front-End & Web Development',
    text: 'Expert in front-end and web development using HTML, CSS, JavaScript, WordPress and Shopify. Recently building interactive projects with React, Three.js, GSAP and Tailwind CSS.',
  },
  {
    icon: 'seo',
    title: 'Search Engine Optimization & SMM',
    text: 'Proficient in on-page SEO, website analysis and optimization. Also well-versed in Social Media Marketing and capable of handling various ad-hoc digital marketing tasks.',
  },
]

export const experience = [
  {
    role: 'WordPress & Web Developer | Graphic & Web Designer | SEO',
    company: 'Independent Contractor (Home-based)',
    date: 'Oct 2019 — Present',
    points: [
      'Web development using WordPress and different themes such as Astra, Divi, Newspaper, Elementor and more.',
      'E-commerce development using WooCommerce and Shopify with themes customized to brand requirements.',
      'Front-end development using HTML5, CSS3 and JavaScript; recently React, GSAP and Three.js.',
      'On-page SEO, website analysis and speed optimization.',
    ],
  },
  {
    role: 'Front-End Web Developer',
    company: 'Affinity X',
    date: 'Sep 2017 — Jan 2019',
    points: [
      'Designed and built responsive websites mainly using WordPress and CMS templating themes.',
      'Updated layouts of websites mainly using HTML, CSS and jQuery.',
      'Used Adobe Photoshop for manipulating, editing, sizing and enhancement of graphic assets.',
    ],
  },
  {
    role: 'IT Technical Recruiter',
    company: 'Remote Staffing Ltd.',
    date: 'Aug 2016 — Sep 2017',
    points: [
      'Reviewed and understood technical job requirements, technology stack and technical skills.',
      'Sourced candidates via job boards, social media and professional networks.',
      'Screened, interviewed and evaluated candidates for technical positions.',
    ],
  },
  {
    role: 'IT Helpdesk / Technical Consultant',
    company: 'Global Services Co.',
    date: 'May 2015 — May 2016',
    points: [
      'Provided technical support for Microsoft Windows operating systems and Microsoft Office.',
      'Performed remote desktop troubleshooting and PC setup.',
      'Accurately processed and documented all transactions using ticketing tools.',
    ],
  },
]

// abbr is what renders inside the tile; color is the brand-ish tint.
export const tech = [
  { name: 'HTML5', abbr: '5', color: '#e34f26' },
  { name: 'CSS3', abbr: '3', color: '#2965f1' },
  { name: 'JavaScript', abbr: 'JS', color: '#f7df1e', dark: true },
  { name: 'React', abbr: '⚛', color: '#61dafb', dark: true },
  { name: 'Three.js', abbr: '3D', color: '#ffffff', dark: true },
  { name: 'GSAP', abbr: 'GS', color: '#88ce02', dark: true },
  { name: 'Tailwind', abbr: 'TW', color: '#38bdf8', dark: true },
  { name: 'WordPress', abbr: 'W', color: '#21759b' },
  { name: 'Shopify', abbr: 'S', color: '#95bf47', dark: true },
  { name: 'WooCommerce', abbr: 'Woo', color: '#7f54b3' },
  { name: 'Figma', abbr: 'F', color: '#f24e1e' },
  { name: 'Photoshop', abbr: 'Ps', color: '#31a8ff', bg: '#001e36' },
  { name: 'Illustrator', abbr: 'Ai', color: '#ff9a00', bg: '#330000' },
  { name: 'Adobe XD', abbr: 'Xd', color: '#ff61f6', bg: '#470137' },
  { name: 'Bootstrap', abbr: 'B', color: '#7952b3' },
  { name: 'SEO', abbr: 'SEO', color: '#3b5bff' },
  { name: 'Notion', abbr: 'N', color: '#ffffff', dark: true },
  { name: 'GitHub', abbr: 'GH', color: '#24292e' },
]

export const works = [
  {
    title: 'Designs By Lita',
    text: 'An e-commerce website for graphic design and print products, built from scratch using Shopify with custom sections.',
    tags: ['Shopify', 'Liquid', 'Figma'],
    gradient: 'from-rose-200 via-amber-100 to-white',
    dark: false,
    href: '#',
  },
  {
    title: 'My Personal Website',
    text: 'An interactive portfolio developed with React, Three.js, GSAP and Tailwind CSS — the site you are looking at.',
    tags: ['React', 'Three.js', 'GSAP'],
    gradient: 'from-indigo-900 via-blue-800 to-violet-900',
    dark: true,
    href: '#',
  },
  {
    title: 'NLOWE',
    text: 'A marketing website for a fashion brand, designed in Figma and developed on WordPress with Elementor.',
    tags: ['WordPress', 'Elementor'],
    gradient: 'from-pink-100 via-rose-200 to-red-300',
    dark: false,
    href: '#',
  },
  {
    title: 'Travel Journal',
    text: 'A content-driven travel blog with custom post types, fast image loading and on-page SEO optimisation.',
    tags: ['WordPress', 'SEO'],
    gradient: 'from-sky-200 via-cyan-100 to-emerald-200',
    dark: false,
    href: '#',
  },
  {
    title: 'Cafe Crema',
    text: 'Landing page for a specialty coffee shop with online menu, reservations and Instagram feed.',
    tags: ['HTML', 'CSS', 'JS'],
    gradient: 'from-amber-200 via-orange-100 to-stone-200',
    dark: false,
    href: '#',
  },
  {
    title: 'SaaS Dashboard',
    text: 'Marketing site and dashboard UI kit for an analytics start-up, with animated charts and dark mode.',
    tags: ['React', 'Tailwind'],
    gradient: 'from-slate-800 via-indigo-900 to-sky-900',
    dark: true,
    href: '#',
  },
]

export const testimonials = [
  {
    quote:
      'Alex took our rough ideas and turned them into a fast, beautiful store. Communication was excellent from start to finish.',
    name: 'Maria Santos',
    title: 'Founder, Designs By Lita',
  },
  {
    quote:
      'Our organic traffic doubled within four months of the redesign. Genuinely the best freelancer we have worked with.',
    name: 'James Whitaker',
    title: 'Marketing Lead, NLOWE',
  },
  {
    quote:
      'Pixel-perfect execution and animations that make the product feel premium. We keep coming back for new projects.',
    name: 'Priya Nair',
    title: 'Product Manager, Metricly',
  },
]
