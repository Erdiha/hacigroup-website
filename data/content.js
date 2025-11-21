// ==========================================
// SITE-WIDE CONTENT - Single source of truth
// ==========================================

export const siteMetadata = {
  name: "HaciGroup",
  description: "Nonprofit technology platforms for community empowerment",
  url: "https://haciogroup.org",
};

// ==========================================
// NAVIGATION
// ==========================================
export const navigation = {
  main: [
    { href: "/about", label: "About" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/contact", label: "Contact" },
    { href: "/donate", label: "Donate" },
  ],
  footer: {
    programs: [
      { href: "https://nelaride.com", label: "NELA Ride" },
      { href: "#", label: "Handy Hack" },
    ],
    organization: [
      { href: "/about", label: "About Us" },
      { href: "/get-involved#volunteer", label: "Volunteer" },
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Contact" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
};

// ==========================================
// PROGRAMS
// ==========================================
export const programs = [
  {
    id: "nela-ride",
    title: "NELA Ride",
    icon: "🚗",
    tagline: "Rideshare that pays drivers fairly",
    description:
      "A nonprofit rideshare platform where drivers earn 90% of fares and riders save 20% compared to traditional platforms.",
    color: "from-purple-400/20 to-purple-500/10",
    href: "https://nelaride.com",
    comingSoon: false,
    status: "Live in Northeast LA",
  },
  {
    id: "handy-hack",
    title: "Handy Hack",
    icon: "🔧",
    tagline: "Affordable home services",
    description:
      "A nonprofit home services platform connecting communities with skilled workers for fair prices and fair wages.",
    color: "from-amber-400/20 to-amber-500/10",
    href: "#",
    comingSoon: true,
    status: "Coming Spring 2025",
  },
];

// ==========================================
// HOMEPAGE CONTENT
// ==========================================
export const homepage = {
  hero: {
    badge: "Building Technology for Social Good",
    title: {
      line1: "Fair Technology",
      line2: "For Everyone",
    },
    subtitle:
      "A nonprofit technology platform delivering better value for riders and better earnings for drivers.",
  },

  comparison: {
    title: "See The Difference",
    subtitle:
      "Compare our transparent pricing model with traditional rideshare platforms",
    fareUberLyft: 50,
    fareNela: 40,
    stats: {
      drivers: 247,
      saved: 94580,
    },
  },

  stats: [
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
    {
      value: "∞",
      label: "Community Impact",
      sublabel: "People over profit.",
    },
    {
      value: "100%",
      label: "Price Transparency",
      sublabel: "No surge games.",
    },
  ],

  cta: {
    title: "Ready to Make a Difference?",
    description:
      "Join us in building technology that serves communities, not shareholders.",
    cta: {
      text: "Get Involved",
      href: "/get-involved",
    },
  },
};

// ==========================================
// ABOUT PAGE
// ==========================================
export const team = {
  board: [
    {
      name: "Alex Rivera",
      title: "Board Chair",
      bio: "Civic technologist focused on public-sector innovation.",
      image: "🛠️",
      linkedin: "#",
    },
    {
      name: "Dana Singh",
      title: "Treasurer",
      bio: "Finance lead for community-owned enterprises.",
      image: "📊",
      linkedin: "#",
    },
  ],
  leadership: [
    {
      name: "Team Member",
      title: "Founder & Executive Director",
      bio: "Building community-owned technology platforms.",
      image: "👤",
      linkedin: "#",
      email: "hello@haci.group",
    },
    {
      name: "Jordan Lee",
      title: "Head of Programs",
      bio: "Launches new nonprofit services across Los Angeles.",
      image: "🚀",
      linkedin: "#",
    },
  ],
  advisory: [
    {
      role: "Technical Advisors",
      icon: "💻",
      description: "Industry veterans guiding platform development",
    },
    {
      role: "Community Partners",
      icon: "🤝",
      description: "Local organizations helping us serve better",
    },
    {
      role: "Legal & Compliance",
      icon: "⚖️",
      description: "Ensuring nonprofit transparency and accountability",
    },
  ],
};

export const foundingStory = {
  year: "2024",
  title: "Founded on a Simple Idea",
  description:
    "Technology platforms should serve people, not drain money from them. We're building the alternative.",
};

export const storyPanels = [
  {
    illustration: "🚗",
    title: "The Problem",
    caption: "Rideshare drivers earn only ~35% of what riders pay",
    description:
      "Traditional platforms take massive cuts, leaving drivers struggling and riders overpaying.",
    bgColor: "from-red-500/20 to-red-600/10",
  },
  {
    illustration: "💡",
    title: "The Solution",
    caption: "A nonprofit model changes everything",
    description:
      "By eliminating investor profit targets, we can pay drivers 90% and charge riders 20% less.",
    bgColor: "from-purple-500/20 to-purple-600/10",
  },
  {
    illustration: "🌱",
    title: "The Impact",
    caption: "Money stays in the community",
    description:
      "Every dollar saved or earned extra goes back to families, not shareholders.",
    bgColor: "from-green-500/20 to-green-600/10",
  },
];

// ==========================================
// GET INVOLVED PAGE
// ==========================================
export const getInvolvedContent = {
  hero: {
    titleTop: "Volunteer With HaciGroup",
    titleGradient: "Build Community-Owned Tech",
    subtitle:
      "Bring your skills—engineering, organizing, design, storytelling—to grow people-first platforms.",
    ctas: {
      primary: { label: "Volunteer", href: "#volunteer" },
      secondary: { label: "Make a Donation", href: "/donate" },
    },
  },
  ways: {
    title: "Ways to Get Involved",
    subtitle: "Choose the path that fits your skills and availability",
  },
  why: {
    title: "Why It Matters",
    blurb:
      "We're not just building apps—we're building a model for how technology can serve communities instead of draining value away from them.",
    pillars: [
      {
        icon: "💰",
        title: "Economic Justice",
        desc: "Workers keep more of what they earn. Communities save money.",
      },
      {
        icon: "🔓",
        title: "Open & Transparent",
        desc: "No hidden fees, surge pricing, or algorithmic manipulation.",
      },
      {
        icon: "🏘️",
        title: "Community Wealth",
        desc: "Every dollar circulates locally instead of flowing to distant shareholders.",
      },
    ],
  },
  how: {
    title: "How It Works",
    steps: [
      {
        step: 1,
        title: "Choose Your Path",
        desc: "Pick volunteer, donate, or spread the word",
      },
      {
        step: 2,
        title: "Connect With Us",
        desc: "Fill out a quick form or reach out directly",
      },
      {
        step: 3,
        title: "Make an Impact",
        desc: "Join the movement building fairer technology",
      },
    ],
  },
  faqsTitle: "Common Questions",
  finalCta: {
    icon: "🚀",
    title: "Ready to Get Started?",
    blurb: "Let's build something better together.",
    buttons: {
      primary: { label: "Volunteer With Us", href: "#volunteer" },
      secondary: { label: "Support Our Mission", href: "/donate" },
    },
  },
};

export const involvementPathways = [
  {
    title: "Volunteer Your Time",
    icon: "🙌",
    tagline: "Contribute skills, build community",
    description:
      "Help build, test, and improve our platforms. From coding to community organizing, we need diverse talents.",
    benefits: [
      "Flexible remote work",
      "Real portfolio projects",
      "Mission-driven community",
    ],
    cta: "See Opportunities",
    href: "#volunteer",
  },
  {
    title: "Make a Donation",
    icon: "💝",
    tagline: "Fund nonprofit technology",
    description:
      "Your tax-deductible contribution directly supports platform development and operations.",
    benefits: [
      "100% goes to operations",
      "Full transparency",
      "Tax-deductible (501c3)",
    ],
    cta: "Donate Now",
    href: "/donate",
  },
  {
    title: "Spread the Word",
    icon: "📣",
    tagline: "Help us reach more communities",
    description:
      "Share our mission with friends, neighbors, and local organizations who might benefit.",
    benefits: [
      "Social media toolkit",
      "Community presentation materials",
      "Referral program (coming soon)",
    ],
    cta: "Get Resources",
    href: "/contact",
  },
  {
    title: "Become a Partner",
    icon: "🤝",
    tagline: "Organizational collaboration",
    description:
      "Local businesses, nonprofits, and community groups can partner to expand our impact.",
    benefits: [
      "Co-marketing opportunities",
      "Preferred pricing for members",
      "Community impact reports",
    ],
    cta: "Explore Partnership",
    href: "/contact",
  },
];

// ==========================================
// FAQS
// ==========================================
export const faqs = {
  general: [
    {
      question: "What kinds of volunteers are you looking for?",
      answer:
        "We need builders (engineering, design, product), storytellers (communications, video, social), community organizers, and operations partners. If you care about people-first tech, there is a slot for you.",
    },
    {
      question: "Do I need to live in Los Angeles?",
      answer:
        "Most tech and operations roles are remote-friendly. Community organizing roles benefit from being in LA, but we still welcome collaborators from other cities.",
    },
    {
      question: "How much time do volunteers usually give?",
      answer:
        "Many roles work well at 5-10 hours per week, but we can flex around your schedule. The most important thing is consistent follow-through on the commitments you make.",
    },
    {
      question: "Are these roles paid or do you offer stipends?",
      answer:
        "These are volunteer positions. We do cover reasonable project expenses and write professional references, and we are building pathways for future paid fellowships as funding grows.",
    },
    {
      question: "How do I get started?",
      answer:
        "Scroll to the volunteer form on this page, submit your info, and we will reach out with next steps. You can also email hello@hacigroup.org if you have a specific idea or partnership in mind.",
    },
  ],
};

// ==========================================
// DONATE PAGE
// ==========================================
export const donateContent = {
  hero: {
    title: "Support Platform Technology",
    subtitle:
      "Your contribution funds the development and operation of NELA Ride and The Handy Hack—nonprofit platforms that prioritize fair wages for workers and affordable services for communities.",
  },
  tiers: [
    {
      id: "supporter",
      title: "Supporter",
      amount: 25,
      icon: "🌟",
      description: "Help cover basic platform costs",
      benefits: ["Supporter badge", "Monthly impact updates"],
      popular: false,
    },
    {
      id: "sustainer",
      title: "Sustainer",
      amount: 50,
      icon: "💚",
      description: "Sustain ongoing operations",
      benefits: [
        "All Supporter perks",
        "Quarterly impact reports",
        "Community recognition",
      ],
      popular: true,
    },
    {
      id: "champion",
      title: "Champion",
      amount: 100,
      icon: "🏆",
      description: "Champion our mission",
      benefits: [
        "All Sustainer perks",
        "Annual strategy briefing",
        "Early feature access",
      ],
      popular: false,
    },
    {
      id: "custom",
      title: "Custom Amount",
      amount: 0,
      icon: "💝",
      description: "Choose what works for you",
      benefits: ["Every dollar makes a difference"],
      popular: false,
    },
  ],
  paymentMethods: [
    { id: "card", name: "Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🅿️" },
    { id: "venmo", name: "Venmo", icon: "💸" },
    { id: "zelle", name: "Zelle", icon: "⚡" },
  ],
  allocations: [
    {
      icon: "💻",
      title: "Platform Development",
      desc: "Building and maintaining our apps and infrastructure",
    },
    {
      icon: "🛡️",
      title: "Operations & Safety",
      desc: "Insurance, compliance, background checks, support",
    },
    {
      icon: "📢",
      title: "Community Outreach",
      desc: "Growing awareness and serving more neighborhoods",
    },
  ],
  trust: [
    {
      icon: "🔒",
      title: "Secure & Encrypted",
      text: "Bank-level security for all transactions",
    },
    {
      icon: "✅",
      title: "501(c)(3) Verified",
      text: "Tax-deductible donations, full transparency",
    },
    {
      icon: "📊",
      title: "Impact Reporting",
      text: "See exactly how your contribution makes a difference",
    },
  ],
};

// ==========================================
// CTA BANNER
// ==========================================
export const ctaBanner = {
  title: "Ready to Make a Difference?",
  description:
    "Join us in building technology that serves communities, not shareholders.",
  cta: {
    text: "Get Involved",
    href: "/get-involved",
  },
};

// ==========================================
// GET INVOLVED PAGE (Updated)
// ==========================================
export const getInvolvedPage = {
  hero: {
    title: "Join Us in Building",
    titleGradient: "Community-Owned Tech",
    subtitle:
      "Use your skills to create technology that serves people, not profits",
  },

  positions: {
    title: "Open Positions",
    subtitle: "Specific roles we're actively hiring for",
    emptyState:
      "No open positions at the moment. Check back soon or submit a general volunteer form below!",
  },

  volunteer: {
    title: "General Volunteer Interest",
    subtitle:
      "Not seeing a specific role? Submit your info and we'll find the right fit for your skills",
  },
};

// ==========================================
// ADMIN PAGE
// ==========================================
export const adminContent = {
  title: "Manage Positions",
  addNew: "Add New Position",
  editPosition: "Edit Position",
  currentPositions: "Current Positions",
  emptyState: "No positions yet. Add your first one above!",
};
