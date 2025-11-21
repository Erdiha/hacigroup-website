"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import TeamCard from "@/components/ui/TeamCard";
import { db, storage } from "@/lib/firebase";
import { foundingStory, storyPanels, programs, team } from "@/data/content";
import AboutBackground from "@/components/ui/AboutBackground";

const values = [
  {
    icon: "🤝",
    title: "Community Governance",
    description: "We co-design products with riders, drivers, and neighbors.",
  },
  {
    icon: "🧭",
    title: "Radical Transparency",
    description: "Budgets, roadmaps, and metrics stay public by default.",
  },
  {
    icon: "⚙️",
    title: "Lean Execution",
    description: "Small, senior teams ship fast and stay focused on impact.",
  },
];

const timeline = storyPanels.map((panel, idx) => ({
  ...panel,
  step: idx + 1,
  // Add icons if missing in data, or use defaults
  illustration: panel.illustration || (idx === 0 ? "💡" : idx === 1 ? "🚀" : "🏛️"),
}));

const formatMember = (member) => {
  const capitalizeName = (value) => {
    if (!value) return "";
    return value
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };
  return {
    ...member,
    name: capitalizeName(member.name),
    title: capitalizeName(member.title),
    photoUrl: member.photoUrl || "",
    fallbackIcon: member.image || member.initials || "👤",
  };
};

const boardOrderRank = (title = "") => {
  const normalized = title.toLowerCase();
  if (normalized.includes("founder") || normalized.includes("ceo")) return 0;
  if (normalized.includes("secretary")) return 1;
  if (normalized.includes("treasurer")) return 2;
  return 3;
};

export default function AboutPage() {
  const [boardMembers, setBoardMembers] = useState([]);
  const [leadershipMembers, setLeadershipMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function loadTeam() {
      setTeamLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "team"));
        if (snapshot.empty) {
          if (isMounted) {
            setBoardMembers([]);
            setLeadershipMembers([]);
            setTeamLoading(false);
          }
          return;
        }
        const docs = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            let photoUrl = data.photoUrl || "";
            if (!photoUrl && data.photoPath) {
              try {
                photoUrl = await getDownloadURL(ref(storage, data.photoPath));
              } catch (err) {
                console.error("Error loading team image:", err);
              }
            }
            return formatMember({
              id: doc.id,
              name: data.name || "Unnamed",
              title: data.title || "",
              bio: data.bio || "",
              linkedin: data.linkedin || "",
              category: (data.category || "leadership").toLowerCase(),
              photoUrl,
              image: data.emoji || data.image || data.initials || "👤",
              email: data.email || "",
            });
          })
        );

        if (!isMounted) return;

        const fetchedBoard = docs
          .filter((member) => member.category === "board")
          .sort((a, b) => {
            const rankDiff = boardOrderRank(a.title) - boardOrderRank(b.title);
            if (rankDiff !== 0) return rankDiff;
            return a.name.localeCompare(b.name);
          });
        const fetchedLeadership = docs.filter(
          (member) => member.category === "leadership"
        );

        setBoardMembers(fetchedBoard);
        setLeadershipMembers(fetchedLeadership);
      } catch (error) {
        console.error("Error loading team:", error);
        if (isMounted) {
          setTeamError(
            "Unable to load the latest team roster. Showing cached info."
          );
        }
      } finally {
        if (isMounted) setTeamLoading(false);
      }
    }

    loadTeam();
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <AboutBackground />
        
        <Container className="relative z-10 max-w-5xl text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-brand-purple mb-6">
              About HaciGroup
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
              Community-Owned Tech, <br className="hidden sm:block" />
              <span className="gradient-text">Built in Los Angeles</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We are a nonprofit technology organization building platforms like NELA Ride and The
              Handy Hack. Our mission is simple: put workers, riders, and
              neighborhoods first—always.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* FOUNDING STORY */}
      <Section variant="secondary" className="py-20 sm:py-32">
        <Container className="max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-purple/20 to-brand-amber/20 rounded-3xl blur-2xl" />
              <div className="relative bg-[#13182b] border border-white/10 rounded-3xl p-8 sm:p-12">
                <div className="text-6xl sm:text-8xl font-black gradient-text mb-6">
                  {foundingStory.year}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {foundingStory.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {foundingStory.description}
                </p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <SectionTitle
                title="How We Got Here"
                subtitle="Three moments that define our work"
                className="mb-8"
              />
              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex gap-6"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:border-brand-purple/50 transition-colors">
                      {item.illustration}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                          Step {item.step}
                        </span>
                        <h4 className="text-lg font-bold text-white">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROGRAMS */}
      <Section variant="primary" className="py-20 sm:py-32">
        <Container className="px-4">
          <SectionTitle
            title="Programs We Run"
            subtitle="Proof that nonprofit tech can scale"
            centered
            gradient
          />
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-16">
            {programs.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#13182b] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl">
                    {program.icon}
                  </div>
                  {program.comingSoon && (
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white/60">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-amber transition-colors">
                  {program.title}
                </h3>
                <p className="text-sm font-semibold text-brand-purple mb-4">
                  {program.tagline}
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  {program.description}
                </p>

                <div className="flex items-center">
                  {!program.comingSoon ? (
                    <Link
                      href={program.href}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-brand-amber transition-colors"
                    >
                      Visit Site
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  ) : (
                    <span className="text-sm font-bold uppercase tracking-wider text-white/30 cursor-not-allowed">
                      Launching Soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TEAM SECTION */}
      <Section variant="secondary" className="py-20 sm:py-32">
        <Container className="px-4">
          <SectionTitle
            title="Meet the Team"
            subtitle="Board leadership, hands-on operators, and trusted advisors"
            centered
          />

          {teamError && (
            <div className="max-w-md mx-auto mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-200 text-sm">
              {teamError}
            </div>
          )}
          
          {teamLoading && (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
              <p className="text-white/50 text-sm uppercase tracking-widest">Syncing Roster...</p>
            </div>
          )}

          {!teamLoading && (
            <div className="mt-16 space-y-20">
              {/* Board */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-bold text-white">Board of Directors</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                {boardMembers.length === 0 ? (
                  <p className="text-white/40 italic">Roster coming soon.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boardMembers.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
              </div>

              {/* Leadership */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-bold text-white">Leadership Team</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                {leadershipMembers.length === 0 ? (
                  <p className="text-white/40 italic">Roster coming soon.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leadershipMembers.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
                  </div>
                )}
              </div>

              {/* Advisory */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-bold text-white">Advisory & Support</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.advisory.map((group, idx) => (
                    <div
                      key={idx}
                      className="bg-[#161b22] border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-colors"
                    >
                      <div className="text-4xl mb-4">{group.icon}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{group.role}</h4>
                      <p className="text-sm text-white/60">{group.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* VALUES */}
      <Section variant="primary" className="py-20 sm:py-32">
        <Container className="px-4">
          <SectionTitle
            title="How We Operate"
            subtitle="Principles we carry into every project"
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#13182b] border border-white/10 rounded-3xl p-8 text-center group hover:border-brand-purple/30 transition-all"
              >
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020] to-[#13182b]" />
        <Container className="relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Volunteer, partner, or introduce us to your neighborhood. <br className="hidden sm:block" />
              We build faster when we build together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/get-involved#volunteer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#0B1020] font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Volunteer
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

