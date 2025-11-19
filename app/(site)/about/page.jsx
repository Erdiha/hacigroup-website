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
import { db, storage } from "@/lib/firebase";
import { foundingStory, storyPanels, programs, team } from "@/data/content";

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

function TeamAvatar({ member }) {
  return (
    <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden bg-[#080c1a]">
      {member.photoUrl ? (
        <>
          <Image
            src={member.photoUrl}
            alt={`${member.name} headshot`}
            fill
            sizes="320px"
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl">
          {member.fallbackIcon}
        </div>
      )}
    </div>
  );
}

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
    <div className="min-h-screen bg-[#0B1020] text-white">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent)]" />
        <Container className="relative max-w-4xl text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">
            About HaciGroup
          </p>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            Community-Owned Technology, Built in Los Angeles
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            We are a nonprofit studio designing platforms like NELA Ride and The
            Handy Hack. Our mission is simple: put workers, riders, and
            neighborhoods first—always.
          </p>
        </Container>
      </section>

      <Section variant="secondary" className="py-14">
        <Container className="max-w-5xl px-4">
          <div className="bg-[#111527] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-amber-500 text-3xl sm:text-4xl font-black text-white w-24 h-24 mx-auto sm:mx-0">
              {foundingStory.year}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-amber-300 font-semibold text-sm">
                {foundingStory.title}
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {foundingStory.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="primary" className="py-14">
        <Container className="px-4">
          <SectionTitle
            title="How We Got Here"
            subtitle="Three moments that define our work"
            centered
            gradient
          />
          <div className="flex flex-col gap-6">
            {timeline.map((item) => (
              <div
                key={item.step}
                className="bg-[#13182b] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-3 sm:gap-6"
              >
                <div className="flex items-center justify-center text-3xl sm:text-4xl h-14 w-14 rounded-xl bg-white/5 border border-white/15">
                  {item.illustration}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 mb-1">
                    <span>Step {item.step}</span>
                    <span className="h-px w-6 bg-white/20" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-amber-300 text-sm font-semibold mb-1">
                    {item.caption}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="secondary" className="py-14">
        <Container className="px-4">
          <SectionTitle
            title="Programs We Run"
            subtitle="Proof that nonprofit tech can scale"
            centered
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program.id}
                className="rounded-2xl border border-white/10 bg-[#13182b] p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{program.icon}</div>
                  {program.comingSoon && (
                    <span className="text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full">
                      {program.status}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {program.tagline}
                  </p>
                  <h3 className="text-xl font-bold mt-1">{program.title}</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1">
                  {program.description}
                </p>
                <div>
                  {program.comingSoon ? (
                    <span className="text-xs text-white/50">
                      Launching soon
                    </span>
                  ) : (
                    <Link
                      href={program.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-amber-300 hover:text-amber-200"
                    >
                      Visit site →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="primary" className="py-14">
        <Container className="px-4">
          <SectionTitle
            title="Meet the Team"
            subtitle="Board leadership, hands-on operators, and trusted advisors"
            centered
          />

          {teamError && (
            <p className="text-center text-xs text-red-300 mb-4">{teamError}</p>
          )}
          {teamLoading && (
            <p className="text-center text-xs text-white/50 mb-4">
              Syncing latest roster...
            </p>
          )}

          <div className="mb-12">
            <h3 className="text-center text-xs uppercase tracking-[0.5em] text-white/40 mb-4">
              Board of Directors
            </h3>
            {teamLoading ? (
              <p className="text-center text-white/50">
                Syncing latest roster…
              </p>
            ) : boardMembers.length === 0 ? (
              <p className="text-center text-white/50 text-sm">
                Board roster coming soon.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {boardMembers.map((member, idx) => (
                  <div
                    key={member.id ?? member.name ?? idx}
                    className="border border-white/10 rounded-2xl bg-[#13182b]"
                  >
                    <div className="p-5 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-[minmax(140px,180px)_1fr] items-center">
                        <TeamAvatar member={member} />
                        <div className="text-left">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                            {member.title}
                          </p>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white/60">{member.bio}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="underline hover:text-white"
                            >
                              {member.email}
                            </a>
                          )}
                          {member.linkedin && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold text-amber-300 hover:text-amber-200"
                            >
                              LinkedIn →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-10">
            <h3 className="text-center text-xs uppercase tracking-[0.5em] text-white/40 mb-4">
              Leadership Team
            </h3>
            {teamLoading ? (
              <p className="text-center text-white/50">
                Syncing latest roster…
              </p>
            ) : leadershipMembers.length === 0 ? (
              <p className="text-center text-white/50 text-sm">
                Leadership roster coming soon.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {leadershipMembers.map((member, idx) => (
                  <div
                    key={member.id ?? member.email ?? idx}
                    className="border border-white/10 rounded-2xl bg-[#13182b]"
                  >
                    <div className="p-5 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-[minmax(120px,160px)_1fr] items-center">
                        <TeamAvatar member={member} />
                        <div className="text-left">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                            {member.title}
                          </p>
                          <h3 className="text-lg font-bold">{member.name}</h3>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white/60">{member.bio}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="underline hover:text-white"
                            >
                              {member.email}
                            </a>
                          )}
                          {member.linkedin && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200"
                            >
                              LinkedIn →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h4 className="text-center text-xs uppercase tracking-[0.5em] text-white/40 mb-4">
              Advisory & Support
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {team.advisory.map((group, idx) => (
                <div
                  key={group.role ?? idx}
                  className="p-4 border border-white/10 rounded-2xl bg-[#161b22] text-center"
                >
                  <div className="text-3xl mb-2">{group.icon}</div>
                  <p className="text-sm font-semibold">{group.role}</p>
                  <p className="text-xs text-white/60">{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="secondary" className="py-14">
        <Container className="px-4">
          <SectionTitle
            title="How We Operate"
            subtitle="Principles we carry into every project"
            centered
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {values.map((item, idx) => (
              <div
                key={item.title ?? idx}
                className="bg-[#13182b] border border-white/10 rounded-2xl p-5 text-center flex flex-col gap-2"
              >
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="secondary" className="py-16">
        <Container className="px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
              Ready to help?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black my-4">
              Join the movement for community-owned technology.
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-6">
              Volunteer, partner, or introduce us to your neighborhood. We build
              faster when we build together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/get-involved#volunteer"
                className="inline-flex w-full sm:w-auto justify-center items-center rounded-xl border-2 border-purple-500/40 px-5 py-3 font-semibold"
              >
                Volunteer
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto justify-center items-center rounded-xl border-2 border-white/20 px-5 py-3 font-semibold"
              >
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
