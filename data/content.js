// =============================================================================
// HACIGROUP CONTENT DATA CENTER
// All text, data, and content in one place for easy updates and i18n support
// =============================================================================
// ------------------------
// SITE METADATA + NAVIGATION (UNIFIED — used by Header & Footer)
// ------------------------

export const siteMetadata = {
  name: "HaciGroup",
  tagline: "Nonprofit Innovation",
  description:
    "Parent organization for NELA Ride and The Handy Hack – nonprofit tech for equity and sustainability.",
  url: "https://hacigroup.org",
  email: {
    general: "hello@haci.group",
    press: "press@haci.group",
    partners: "partners@haci.group",
  },
  social: {
    twitter: "https://twitter.com/hacigroup",
    instagram: "https://instagram.com/hacigroup",
    linkedin: "https://linkedin.com/company/hacigroup",
  },
  address: {
    line1: "HaciGroup",
    line2: "PO Box 0000",
    line3: "Los Angeles, CA 90000",
  },
  contactEmail: "info@haci.group",
  location: "Northeast Los Angeles, CA",
  launchDate: "Spring 2025",
  copyright: `© ${new Date().getFullYear()} HaciGroup — Nonprofit technology for neighbors.`,
};

export const navigation = {
  main: [
    { href: "/about", label: "About" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/donate", label: "Donate" },
  ],
  footer: {
    programs: [
      { href: "/programs/nela-ride", label: "NELA Ride" },
      { href: "/programs/the-handy-hack", label: "The Handy Hack" },
    ],
    organization: [
      { href: "/about", label: "About" },
      { href: "/impact", label: "Impact" },
      { href: "/get-involved", label: "Get Involved" },
      { href: "/donate", label: "Donate" },
    ],
    legal: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

// ------------------------
// PAGE-SPECIFIC COPY
// ------------------------
export const getInvolvedContent = {
  hero: {
    badgeIcon: "💪",
    badgeText: "Join the Movement",
    titleTop: "PICK YOUR PATH.",
    titleGradient: "MAKE REAL IMPACT.",
    subtitle:
      "We're building technology that serves communities, not shareholders. Every action you take—whether volunteering time, donating funds, or spreading the word—helps build a more equitable future.",
    ctas: {
      primary: { label: "Start Volunteering", href: "/volunteer" },
      secondary: { label: "Support Our Launch", href: "/donate" },
    },
  },
  ways: {
    title: "Choose Your Impact",
    subtitle:
      "Every role matters. Pick what fits your skills, schedule, and passion.",
  },
  why: {
    title: "Why Your Involvement Matters",
    blurb:
      "Essential services have been controlled by profit-driven corporations that extract wealth from our communities. We’re building an alternative: nonprofit technology that keeps value local and puts communities in control.",
    pillars: [
      {
        icon: "🏘️",
        title: "Community Wealth",
        desc: "Earnings stay local with drivers and workers, not distant shareholders.",
      },
      {
        icon: "⚖️",
        title: "Economic Justice",
        desc: "Fair compensation and transparent operations that treat people with dignity.",
      },
      {
        icon: "🌱",
        title: "Sustainable Growth",
        desc: "Nonprofit models that scale without exploitation or extraction.",
      },
    ],
  },
  how: {
    title: "Getting Started Is Simple",
    steps: [
      {
        step: "1",
        title: "Choose Your Path",
        desc: "Pick how you want to contribute—volunteer time, donate funds, partner with us, or spread the word.",
      },
      {
        step: "2",
        title: "Get Connected",
        desc: "We'll match you with opportunities or projects based on your interests and availability.",
      },
      {
        step: "3",
        title: "Build Together",
        desc: "Join our community working to launch nonprofit tech that serves people, not profits.",
      },
    ],
  },
  faqsTitle: "Common Questions",
  finalCta: {
    icon: "🚀",
    title: "Ready to Build the Future?",
    blurb: "The movement starts with you. Pick your path and join us today.",
    buttons: {
      primary: { label: "Volunteer Now", href: "/volunteer" },
      secondary: { label: "Support Launch", href: "/donate" },
    },
  },
};

// ------------------------
// PROGRAMS / STATS / TEAM
// ------------------------
export const programs = [
  {
    id: "nela-ride",
    title: "NELA Ride",
    tagline: "Drivers first. Transparent fares. Community-owned.",
    description:
      "A nonprofit rideshare built to end extraction. Most of every fare goes to the driver. No surge games. Clear pricing that respects riders and workers.",
    icon: "🚗",
    href: "/programs/nela-ride",
    color: "from-purple-500 to-amber-500",
    cta: "See NELA Ride",
    comingSoon: false,
    status: "Launching Spring 2025",
  },
  {
    id: "the-handy-hack",
    title: "The Handy Hack",
    tagline: "Neighbors helping neighbors. Fair pay. Safe, verified help.",
    description:
      "A community platform for home repairs and small jobs. Local workers keep more. Households get dependable, accessible help without the platform skim.",
    icon: "🔧",
    href: "/programs/the-handy-hack",
    color: "from-amber-500 to-purple-500",
    cta: "Explore Handy Hack",
    comingSoon: true,
    status: "Coming 2025",
  },
];

export const stats = {
  home: [
    { value: "2", label: "Active Programs" },
    { value: "100%", label: "Nonprofit Model" },
    { value: "∞", label: "Community Impact" },
  ],
  about: [
    {
      value: "0%",
      label: "Profit to Shareholders",
      sublabel: "We're a nonprofit.",
    },
    {
      value: "2",
      label: "Active Programs",
      sublabel: "NELA Ride • Handy Hack",
    },
    { value: "∞", label: "Community Impact", sublabel: "People over profit." },
    { value: "100%", label: "Price Transparency", sublabel: "No surge games." },
  ],
};

export const team = {
  leadership: [
    {
      name: "Erdi Haciogullari",
      title: "Executive Director & Founder",
      bio: "Brief bio here - background in tech/nonprofit, passion for community empowerment, vision for HaciGroup. 2-3 sentences about experience and motivation.",
      image: "👤",
      linkedin: "https://linkedin.com",
      email: "founder@haci.group",
    },
    {
      name: "Team Member Name",
      title: "Technical Lead",
      bio: "Background in software engineering, experience building scalable platforms. Passionate about open-source and community-driven tech. 2-3 sentences.",
      image: "👤",
      linkedin: "https://linkedin.com",
      email: "tech@haci.group",
    },
    {
      name: "Team Member Name",
      title: "Community Director",
      bio: "Experienced in community organizing, partnerships, and grassroots movements. Dedicated to building bridges between tech and community. 2-3 sentences.",
      image: "👤",
      linkedin: "https://linkedin.com",
      email: "community@haci.group",
    },
  ],
  advisory: [
    {
      role: "Legal Advisor",
      icon: "⚖️",
      description: "Regulatory compliance & nonprofit governance",
    },
    {
      role: "Development Team",
      icon: "🛠️",
      description: "Volunteer engineers building our platforms",
    },
    {
      role: "Operations",
      icon: "📊",
      description: "Day-to-day management & community support",
    },
  ],
};

// ------------------------
// DONATIONS / FUNDS / VOLUNTEER
// ------------------------
export const donationTiers = [
  {
    id: "early",
    title: "Early Supporter",
    amount: 25,
    description: "Help us build the foundation for community-owned technology",
    benefits: [
      "Launch updates",
      "Supporter recognition",
      "Early access when we launch",
    ],
    icon: "🤝",
    popular: false,
  },
  {
    id: "launch",
    title: "Launch Backer",
    amount: 50,
    description: "Fuel our initial development and community outreach efforts",
    benefits: [
      "All previous benefits",
      "Founding supporter status",
      "Invitation to launch events",
      "Quarterly updates from founders",
    ],
    icon: "💫",
    popular: true,
  },
  {
    id: "founding",
    title: "Founding Donor",
    amount: 100,
    description:
      "Make a significant impact on our platform development and first pilots",
    benefits: [
      "All previous benefits",
      "Direct line to founding team",
      "Recognition on website",
      "Input on early features",
    ],
    icon: "🏆",
    popular: false,
  },
];

export const fundAllocation = [
  {
    icon: "💻",
    title: "Platform Development",
    desc: "Build the core technology infrastructure for NELA Ride and Handy Hack",
  },
  {
    icon: "🏛️",
    title: "Legal & Compliance",
    desc: "Establish nonprofit structure, licensing, and regulatory compliance",
  },
  {
    icon: "🏘️",
    title: "Community Outreach",
    desc: "Connect with drivers, service providers, and community partners",
  },
  {
    icon: "🎯",
    title: "Pilot Programs",
    desc: "Launch initial test services in select LA neighborhoods",
  },
  {
    icon: "📚",
    title: "Training Materials",
    desc: "Create resources for drivers and service providers",
  },
  {
    icon: "🔒",
    title: "Operations",
    desc: "Insurance, security, and day-to-day infrastructure",
  },
];

export const volunteerOpportunities = [
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    commitment: "Flexible",
    type: "Project-based",
    location: "Remote",
    icon: "💻",
    description:
      "Help build our web and mobile apps using React, Next.js, and React Native. Create interfaces that serve community needs.",
    responsibilities: [
      "Develop features for rider/driver apps",
      "Improve accessibility and mobile experience",
      "Collaborate with designers",
      "Contribute to open-source codebase",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    impact: "Build technology that puts people before profits",
    time: "5-15 hours/week, flexible",
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    commitment: "Flexible",
    type: "Project-based",
    location: "Remote",
    icon: "⚙️",
    description:
      "Design scalable backend systems for our nonprofit platforms. Work on APIs, databases, and infrastructure.",
    responsibilities: [
      "Build APIs for mobile and web apps",
      "Design database architecture",
      "Implement security and privacy features",
      "Optimize performance and scalability",
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "AWS/GCP"],
    impact: "Create infrastructure that scales nonprofit tech",
    time: "10-20 hours/week, flexible",
  },
  {
    id: "community-organizer",
    title: "Community Organizer",
    commitment: "10-15 hours/week",
    type: "Ongoing",
    location: "Hybrid (LA preferred)",
    icon: "📣",
    description:
      "Build grassroots support through local events, partnerships, and community engagement. Bring the movement to neighborhoods across LA.",
    responsibilities: [
      "Organize community info sessions",
      "Build relationships with local organizations",
      "Manage social media presence",
      "Recruit volunteers and partners",
    ],
    skills: ["Event Planning", "Social Media", "Public Speaking", "Networking"],
    impact: "Grow the movement and reach more communities",
    time: "Flexible, some evening/weekend events",
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    commitment: "Flexible",
    type: "Project-based",
    location: "Remote",
    icon: "🎨",
    description:
      "Design intuitive experiences for riders, drivers, and service providers. Conduct research and create prototypes.",
    responsibilities: [
      "Create wireframes and prototypes",
      "Design mobile-first experiences",
      "Conduct user research",
      "Build design systems",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    impact: "Make nonprofit tech as polished as for-profit alternatives",
    time: "5-10 hours/week, flexible",
  },
];

// ------------------------
// FAQs / ABOUT
// ------------------------
export const involvementPathways = [
  {
    icon: "🤝",
    title: "Volunteer",
    tagline: "Your time, our mission",
    description:
      "Join our community building nonprofit tech that serves people, not profits. From development to community organizing—find your role.",
    benefits: [
      "Flexible schedules",
      "Skill development",
      "Real community impact",
    ],
    cta: "See Opportunities",
    href: "/volunteer",
  },
  {
    icon: "🤝",
    title: "Partner",
    tagline: "Stronger together",
    description:
      "Nonprofits, co-ops, unions, and community groups—let's collaborate to scale impact and keep services in community hands.",
    benefits: ["Shared resources", "Collective power", "Network effects"],
    cta: "Partner With Us",
    href: "/contact",
  },
  {
    icon: "💰",
    title: "Donate",
    tagline: "Fund the launch",
    description:
      "Support our platform development and community outreach. Help us build the alternative to extractive tech.",
    benefits: [
      "100% tax-deductible",
      "Full transparency",
      "Community ownership",
    ],
    cta: "Support Our Launch",
    href: "/donate",
  },
  {
    icon: "📣",
    title: "Spread the Word",
    tagline: "Amplify the mission",
    description:
      "Help us reach more communities. Share our story or bring us to your neighborhood.",
    benefits: ["Easy sharing", "Build the network", "Grow the movement"],
    cta: "Share & Connect",
    href: "/contact",
  },
];

export const faqs = {
  general: [
    {
      question: "When will NELA Ride and Handy Hack launch?",
      answer:
        "We're targeting Spring 2025 for initial pilots in select LA neighborhoods. Sign up for updates to be notified when we're ready.",
    },
    {
      question: "How can I get involved if I'm not in Los Angeles?",
      answer:
        "Many volunteer roles (tech development, content creation, operations) are fully remote. We're also exploring expansion to other cities in the future.",
    },
    {
      question: "What makes HaciGroup different from other nonprofits?",
      answer:
        "We're building technology infrastructure that communities can own and control. Instead of traditional charity, we're creating sustainable systems that empower people long-term.",
    },
    {
      question: "Do I need experience to volunteer?",
      answer:
        "Not at all! We welcome people from all backgrounds. What matters most is your passion for our mission and willingness to learn.",
    },
  ],
  volunteer: [
    {
      q: "What's the time commitment?",
      a: "Most roles need 5-10 hours per week, but we're flexible. What matters is consistency and passion for the mission.",
    },
    {
      q: "Do I need nonprofit experience?",
      a: "Not at all! We welcome people from all backgrounds. Passion for our mission and willingness to learn matter most.",
    },
    {
      q: "Are positions remote?",
      a: "Most technical and creative roles are fully remote. Community organizing prefers LA-based volunteers but we're flexible.",
    },
    {
      q: "Can students apply?",
      a: "Absolutely! Volunteering is a great way to build your portfolio and gain real-world experience.",
    },
  ],
};

export const storyPanels = [
  {
    title: "The Problem",
    illustration: "💭",
    caption: "A driver works 60+ hours a week...",
    description:
      "Making barely minimum wage after platform cuts, gas, and car expenses.",
    bgColor: "from-slate-800 to-slate-900",
  },
  {
    title: "The Math",
    illustration: "📊",
    caption: "Rider pays $25. Driver gets $12.",
    description:
      "Where does the rest go? Surge pricing. Investor profits. Executive bonuses.",
    bgColor: "from-red-900/40 to-red-950/40",
  },
  {
    title: "The Question",
    illustration: "🤔",
    caption: "What if there was another way?",
    description:
      "A platform that doesn't need to extract maximum profit. One that puts drivers first.",
    bgColor: "from-purple-900/40 to-slate-900",
  },
  {
    title: "The Solution",
    illustration: "💡",
    caption: "100% Nonprofit. 0% Investors.",
    description:
      "HaciGroup was born. Building technology where drivers keep more, riders pay fair prices, and community wins.",
    bgColor: "from-amber-900/40 to-orange-900/40",
  },
];

export const foundingStory = {
  year: "2024",
  location: "Los Angeles",
  title: "Founded in Los Angeles",
  description:
    "Born from frustration with extractive tech platforms, HaciGroup started as a simple question: What if essential services were built for communities, not shareholders? We're proving that nonprofit technology can scale, compete, and win—while keeping value where it belongs.",
};

export const heroContent = {
  badge: { icon: "🟢", text: "Building Technology for Social Good" },
  title: { line1: "Empowering Communities", line2: "Through Technology" },
  description:
    "HaciGroup is a nonprofit innovation hub building equitable platforms that put people first. From driver-centric rideshare to accessible home services, we're reimagining essentials with transparency, dignity, and community at the core.",
  ctas: [
    { text: "Explore Our Programs", href: "/programs" },
    { text: "See Our Impact", href: "/impact" },
  ],
};

export const ctaBanner = {
  title: "We're Taking Technology Back.",
  description:
    "Every ride, every repair, every app we build — it's owned by the people who use it. That's how we start fixing what's broken.",
  ctas: [
    { text: "Join the Rebuild", href: "/donate" },
    { text: "Pitch In Locally", href: "/get-involved" },
  ],
};

export const volunteerBenefits = [
  {
    icon: "💡",
    title: "Skill Development",
    desc: "Learn new technologies and practices on real-world projects",
  },
  {
    icon: "🤝",
    title: "Community Network",
    desc: "Connect with mission-driven professionals and activists",
  },
  {
    icon: "📈",
    title: "Portfolio Building",
    desc: "Gain experience and references in nonprofit tech",
  },
  {
    icon: "🎯",
    title: "Direct Impact",
    desc: "See your work improve lives and build community wealth",
  },
  {
    icon: "⏰",
    title: "Flexible Schedule",
    desc: "Most roles are remote-friendly—contribute on your time",
  },
  {
    icon: "🚀",
    title: "Ground Floor",
    desc: "Join at the beginning and shape our direction",
  },
];

// ------------------------
// DONATE PAGE CONTENT (self-contained, no name collisions)
// ------------------------
export const donateContent = {
  hero: {
    badgeIcon: "❤️",
    badgeText: "Support Our Mission",
    titleTop: "FUEL COMMUNITY",
    titleGradient: "POWERED TECHNOLOGY",
    subtitle:
      "Every dollar keeps our rides affordable, pays drivers fair wages, and builds technology that serves people, not profits. Join the movement today.",
    impactStats: [
      { amount: "25", text: "provides 5 round-trip rides for seniors" },
      { amount: "50", text: "trains one new community driver" },
      { amount: "100", text: "supports app development for one week" },
      { amount: "250", text: "launches service in a new neighborhood" },
    ],
  },

  tiers: [
    {
      id: "community",
      title: "Community Builder",
      amount: 25,
      description:
        "Help keep our rides affordable for seniors and low-income residents",
      benefits: [
        "Monthly impact report",
        "Digital thank you card",
        "Community updates",
      ],
      icon: "🤝",
      popular: false,
    },
    {
      id: "sustainer",
      title: "Monthly Sustainer",
      amount: 50,
      description:
        "Provide reliable monthly support for driver training and community outreach",
      benefits: [
        "All previous benefits",
        "Exclusive webinar access",
        "Behind-the-scenes updates",
        "Sustainer badge on profile",
      ],
      icon: "💫",
      popular: true,
    },
    {
      id: "champion",
      title: "Community Champion",
      amount: 100,
      description:
        "Fuel major initiatives like app development and neighborhood expansion",
      benefits: [
        "All previous benefits",
        "Early feature access",
        "Virtual meet & greet with team",
        "Recognition in annual report",
      ],
      icon: "🏆",
      popular: false,
    },
    {
      id: "visionary",
      title: "Tech Visionary",
      amount: 250,
      description:
        "Accelerate our open-source platform development and tech innovation",
      benefits: [
        "All previous benefits",
        "Private tech demo sessions",
        "Advisory circle invitation",
        "Featured supporter spotlight",
      ],
      icon: "🚀",
      popular: false,
    },
  ],

  paymentMethods: [
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🔵" },
    { id: "venmo", name: "Venmo", icon: "💚" },
    { id: "crypto", name: "Crypto", icon: "₿" },
  ],

  allocations: [
    {
      icon: "🚗",
      title: "Affordable Rides",
      desc: "Subsidize rides for seniors, students, and low-income residents",
    },
    {
      icon: "💸",
      title: "Employee Salaries",
      desc: "Ensure fair pay and benefits for community workers",
    },
    {
      icon: "🔧",
      title: "Tech Development",
      desc: "Build and maintain our open-source platform",
    },
    {
      icon: "🏘️",
      title: "Community Expansion",
      desc: "Launch services in new neighborhoods across LA",
    },
    {
      icon: "📚",
      title: "Driver Training",
      desc: "Provide comprehensive training and support",
    },
    {
      icon: "🔒",
      title: "Operations",
      desc: "Keep the lights on and our services running smoothly",
    },
  ],

  trust: [
    {
      icon: "🔒",
      title: "SSL Encrypted",
      text: "Bank-level security for all transactions",
    },
    {
      icon: "📊",
      title: "Financial Transparency",
      text: "Annual reports publicly available",
    },
    {
      icon: "💝",
      title: "Tax Deductible",
      text: "501(c)(3) nonprofit • EIN: 12-3456789",
    },
  ],
};

// ------------------------
// CONSOLIDATED DEFAULT EXPORT
// ------------------------
const contentData = {
  siteMetadata,
  navigation,
  getInvolvedContent,
  programs,
  stats,
  team,
  donationTiers,
  fundAllocation,
  volunteerOpportunities,
  involvementPathways,
  faqs,
  storyPanels,
  foundingStory,
  heroContent,
  ctaBanner,
  volunteerBenefits,
};

export default contentData;
