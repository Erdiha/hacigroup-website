"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const VOLUNTEER_OPPORTUNITIES = [
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

const VOLUNTEER_BENEFITS = [
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

const FAQS = [
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
];

export default function VolunteerPage() {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [formData, setFormData] = useState({
    opportunity: "",
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = (opp) => {
    setSelectedOpp(opp);
    setFormData((prev) => ({
      ...prev,
      opportunity: opp.id,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Volunteer interest:", formData);
    alert(
      "Thank you! We'll review your interest and reach out within a few days."
    );
    setIsSubmitting(false);
    setSelectedOpp(null);
    setFormData({
      opportunity: "",
      name: "",
      email: "",
      message: "",
    });
  };

  const filteredOpportunities = VOLUNTEER_OPPORTUNITIES.filter((opp) => {
    if (filterType !== "all" && opp.type !== filterType) return false;
    if (
      filterLocation !== "all" &&
      !opp.location.toLowerCase().includes(filterLocation.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.12)_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-8"
          >
            <span className="text-4xl">🤝</span>
            <span className="text-white font-bold">
              Volunteer Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{
              textShadow: "3px 3px 0px #8b5cf6, 6px 6px 0px #f59e0b",
              WebkitTextStroke: "2px black",
            }}
          >
            USE YOUR SKILLS
            <br />
            <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              TO BUILD THE FUTURE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
          >
            Join us in building technology that serves people, not profits.
            Flexible hours, remote-friendly roles, real impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-3"
          >
            <span className="text-2xl">🚀</span>
            <span className="text-white/90 font-semibold">
              Building toward Spring 2025 launch
            </span>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12 uppercase">
            What You&apos;ll Gain
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VOLUNTEER_BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-4 uppercase">
            Current Opportunities
          </h2>
          <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
            {filteredOpportunities.length} open positions to help us launch in
            2025
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterType === "all"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilterType("Ongoing")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterType === "Ongoing"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setFilterType("Project-based")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterType === "Project-based"
                    ? "bg-purple-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Project-based
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterLocation("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterLocation === "all"
                    ? "bg-amber-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                All Locations
              </button>
              <button
                onClick={() => setFilterLocation("remote")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterLocation === "remote"
                    ? "bg-amber-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Remote
              </button>
              <button
                onClick={() => setFilterLocation("hybrid")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filterLocation === "hybrid"
                    ? "bg-amber-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                LA/Hybrid
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredOpportunities.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{opp.icon}</div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className="text-xs font-bold px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                      {opp.type}
                    </span>
                    <span className="text-xs text-white/50">
                      📍 {opp.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {opp.title}
                </h3>

                <p className="text-white/70 text-sm mb-4 grow">
                  {opp.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <span>⏰</span>
                    <span>{opp.commitment}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/60">
                    <span>🎯</span>
                    <span>{opp.impact}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-white/50 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {opp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded-full border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(opp)}
                  className="w-full px-4 py-3 bg-linear-to-r from-purple-500 to-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-all"
                >
                  Express Interest
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0B1020] border-4 border-purple-500 rounded-3xl p-8 max-w-2xl w-full my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black text-white uppercase">
                  {selectedOpp.title}
                </h2>
                <p className="text-amber-400 text-sm font-semibold">
                  Express your interest
                </p>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="text-white/50 hover:text-white text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  Tell us about yourself
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your relevant experience, why you're interested, availability..."
                  rows={5}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email}
                className={`w-full py-4 font-black text-lg rounded-xl border-4 border-black transition-all ${
                  isSubmitting || !formData.name || !formData.email
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-500 to-amber-500 text-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Interest"}
              </button>

              <p className="text-center text-white/50 text-sm">
                We&apos;ll review your interest and reach out within a few days
              </p>
            </form>
          </motion.div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1528]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12 uppercase">
            Common Questions
          </h2>

          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161b22] border-2 border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-white/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B1020] border-4 border-black rounded-3xl p-12"
          >
            <h2 className="text-4xl font-black text-white mb-6 uppercase">
              READY TO MAKE AN IMPACT?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join us in building community-owned technology that puts people
              first.
            </p>
            <a
              href="#opportunities"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-black rounded-full border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase"
            >
              Browse All Roles
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
