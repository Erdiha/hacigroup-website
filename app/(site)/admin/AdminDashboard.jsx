"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { auth, db, storage } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "archived", label: "Archived" },
];

const statusStyles = {
  new: "bg-amber-500/20 text-amber-200 border border-amber-500/30",
  reviewed: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
  archived: "bg-white/10 text-white/60 border border-white/10",
};

const createDefaultPositionForm = () => ({
  title: "",
  type: "",
  location: "",
  commitment: "",
  description: "",
  skills: "",
});

const createDefaultTeamForm = () => ({
  name: "",
  title: "",
  bio: "",
  linkedin: "",
  email: "",
  category: "leadership",
  emoji: "",
  photoUrl: "",
  photoPath: "",
});

const parseTimestamp = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "number") {
    return new Date(value);
  }
  if (value?.seconds) {
    return new Date(value.seconds * 1000);
  }
  return null;
};

const formatRelativeTime = (date) => {
  if (!date) return "—";
  const diff = Date.now() - date.getTime();
  if (diff < 60 * 1000) return "just now";
  const minutes = Math.floor(diff / (60 * 1000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

const formatFullDate = (date) => {
  if (!date) return "—";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminDashboard({ initialSection = "applications" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [positions, setPositions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(createDefaultPositionForm);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataError, setDataError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamForm, setTeamForm] = useState(createDefaultTeamForm());
  const [teamEditingId, setTeamEditingId] = useState(null);
  const [teamPhotoFile, setTeamPhotoFile] = useState(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState("");
  const [teamSubmitting, setTeamSubmitting] = useState(false);
  const [teamMessage, setTeamMessage] = useState("");

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchApplications = useCallback(async () => {
    try {
      setDataError("");
      const snapshot = await getDocs(collection(db, "applications"));
      const apps = snapshot.docs
        .map((docItem) => {
          const data = docItem.data();
          return {
            id: docItem.id,
            ...data,
            createdAt: parseTimestamp(data.createdAt),
            updatedAt: parseTimestamp(data.updatedAt),
          };
        })
        .sort(
          (a, b) =>
            (b.createdAt?.getTime?.() || 0) - (a.createdAt?.getTime?.() || 0),
        );
      setApplications(apps);
    } catch (err) {
      console.error("Error loading applications:", err);
      setDataError(
        "Unable to load applications. Please check the console for details.",
      );
    }
  }, []);

  const loadPositions = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, "positions"));
      const positionsData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setPositions(positionsData);
    } catch (err) {
      console.error("Error loading positions:", err);
    }
  }, []);

  const loadTeam = useCallback(async () => {
    setTeamLoading(true);
    setTeamError("");
    try {
      const snapshot = await getDocs(collection(db, "team"));
      const members = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      members.sort((a, b) => {
        const categoryOrder =
          (a.category || "").localeCompare(b.category || "");
        if (categoryOrder !== 0) return categoryOrder;
        return (a.name || "").localeCompare(b.name || "");
      });
      setTeamMembers(members);
    } catch (err) {
      console.error("Error loading team:", err);
      setTeamError("Unable to load team members.");
    } finally {
      setTeamLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([fetchApplications(), loadPositions(), loadTeam()]);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchApplications, loadPositions, loadTeam]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user, refreshData]);

  const handlePositionInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetPositionForm = () => {
    setFormData(createDefaultPositionForm());
    setEditingId(null);
  };

  const handlePositionSubmit = async (e) => {
    e.preventDefault();
    const positionData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "positions", editingId), positionData);
        alert("Position updated!");
      } else {
        await addDoc(collection(db, "positions"), positionData);
        alert("Position added!");
      }
      resetPositionForm();
      loadPositions();
    } catch (err) {
      console.error("Error saving position:", err);
      alert("Error saving position. Check console.");
    }
  };

  const handleEditPosition = (position) => {
    setEditingId(position.id);
    setFormData({
      title: position.title || "",
      type: position.type || "",
      location: position.location || "",
      commitment: position.commitment || "",
      description: position.description || "",
      skills: (position.skills || []).join(", "),
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeletePosition = async (id) => {
    if (!confirm("Are you sure you want to delete this position?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "positions", id));
      alert("Position deleted!");
      loadPositions();
    } catch (err) {
      console.error("Error deleting position:", err);
      alert("Error deleting position. Check console.");
    }
  };

  const getPositionFilterValue = useCallback((application) => {
    if (application.positionId) return `id:${application.positionId}`;
    if (application.positionTitle) return `title:${application.positionTitle}`;
    return "general";
  }, []);

  const positionOptions = useMemo(() => {
    const values = new Map();
    positions.forEach((position) => {
      values.set(`id:${position.id}`, position.title || "Untitled Position");
    });
    applications.forEach((application) => {
      const key = getPositionFilterValue(application);
      if (key !== "general" && !values.has(key)) {
        values.set(key, application.positionTitle || "General submission");
      }
    });
    return Array.from(values.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  }, [positions, applications, getPositionFilterValue]);

  const filteredApplications = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return applications.filter((application) => {
      const currentStatus = (application.status || "new").toLowerCase();
      const matchesStatus =
        statusFilter === "all" || statusFilter === currentStatus;
      const matchesPosition =
        positionFilter === "all" ||
        getPositionFilterValue(application) === positionFilter;
      const searchableFields = [
        application.name,
        application.email,
        application.phone,
        application.positionTitle,
        application.message,
        application.fileType,
      ]
        .filter(Boolean)
        .map((field) => String(field).toLowerCase());
      const matchesSearch =
        searchTerm === "" ||
        searchableFields.some((field) => field.includes(searchTerm));

      return matchesStatus && matchesPosition && matchesSearch;
    });
  }, [
    applications,
    statusFilter,
    positionFilter,
    search,
    getPositionFilterValue,
  ]);

  const stats = useMemo(() => {
    const newApplications = applications.filter(
      (application) => (application.status || "new") === "new",
    ).length;
    const lastSubmission =
      applications.length > 0
        ? formatRelativeTime(applications[0].createdAt)
        : "No submissions yet";

    return [
      {
        label: "Total applications",
        value: applications.length,
        description: `${newApplications} awaiting review`,
      },
      {
        label: "Pending review",
        value: newApplications,
        description: "Mark applications as reviewed once contacted",
      },
      {
        label: "Open positions",
        value: positions.length,
        description: `Last submission ${lastSubmission}`,
      },
      {
        label: "Team members",
        value: teamMembers.length,
        description: "Board + leadership entries",
      },
    ];
  }, [applications, positions.length, teamMembers.length]);

  const sortedTeamMembers = useMemo(() => {
    return [...teamMembers].sort((a, b) => {
      const catA = (a.category || "").localeCompare(b.category || "");
      if (catA !== 0) return catA;
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [teamMembers]);

  const handleUpdateStatus = async (applicationId, nextStatus) => {
    try {
      await updateDoc(doc(db, "applications", applicationId), {
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      });
      setApplications((prev) =>
        prev.map((application) =>
          application.id === applicationId
            ? { ...application, status: nextStatus }
            : application,
        ),
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Unable to update status. Please try again.");
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!confirm("Delete this application? This action cannot be undone.")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "applications", applicationId));
      setApplications((prev) =>
        prev.filter((application) => application.id !== applicationId),
      );
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Unable to delete application. Please try again.");
    }
  };

  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamPhotoChange = (e) => {
    setTeamPhotoFile(e.target.files?.[0] || null);
  };

  const resetTeamFormState = () => {
    setTeamForm(createDefaultTeamForm());
    setTeamPhotoFile(null);
    setTeamEditingId(null);
    setTeamError("");
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setTeamSubmitting(true);
    setTeamError("");
    setTeamMessage("");
    try {
      let photoPath = teamForm.photoPath || "";
      let photoUrl = teamForm.photoUrl || "";
      if (teamPhotoFile) {
        if (photoPath) {
          try {
            await deleteObject(ref(storage, photoPath));
          } catch (err) {
            console.warn("Unable to delete existing team image:", err);
          }
        }
        const fileRef = ref(
          storage,
          `team/${Date.now()}-${teamPhotoFile.name}`,
        );
        const snapshot = await uploadBytes(fileRef, teamPhotoFile);
        photoPath = snapshot.ref.fullPath;
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      const formatName = (value) =>
        value
          .trim()
          .split(" ")
          .filter(Boolean)
          .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
          .join(" ");

      const payload = {
        name: formatName(teamForm.name),
        title: formatName(teamForm.title),
        bio: teamForm.bio.trim(),
        linkedin: teamForm.linkedin.trim(),
        email: teamForm.email.trim(),
        category: teamForm.category,
        emoji: teamForm.emoji.trim(),
        photoUrl,
        photoPath,
        updatedAt: new Date().toISOString(),
      };

      if (teamEditingId) {
        await updateDoc(doc(db, "team", teamEditingId), payload);
        resetTeamFormState();
        setTeamMessage("Member updated.");
      } else {
        await addDoc(collection(db, "team"), {
          ...payload,
          createdAt: new Date().toISOString(),
        });
        resetTeamFormState();
        setTeamMessage("Member added.");
      }
      loadTeam();
    } catch (err) {
      console.error("Error saving team member:", err);
      setTeamError("Unable to save member. Please try again.");
    } finally {
      setTeamSubmitting(false);
    }
  };

  const handleTeamEdit = (member) => {
    setTeamEditingId(member.id);
    setTeamForm({
      name: member.name || "",
      title: member.title || "",
      bio: member.bio || "",
      linkedin: member.linkedin || "",
      email: member.email || "",
      category: member.category || "leadership",
      emoji: member.emoji || "",
      photoUrl: member.photoUrl || "",
      photoPath: member.photoPath || "",
    });
    setTeamPhotoFile(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTeamDelete = async (member) => {
    if (
      !confirm(
        `Remove ${member.name || "this member"} from the team directory?`,
      )
    ) {
      return;
    }
    try {
      await deleteDoc(doc(db, "team", member.id));
      if (member.photoPath) {
        try {
          await deleteObject(ref(storage, member.photoPath));
        } catch (err) {
          console.warn("Unable to delete team photo:", err);
        }
      }
      setTeamMembers((prev) => prev.filter((m) => m.id !== member.id));
      if (teamEditingId === member.id) {
        resetTeamFormState();
      }
    } catch (err) {
      console.error("Error deleting team member:", err);
      alert("Unable to delete member right now.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-black text-white mb-6 text-center">
            Admin Login
          </h1>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@haci.group"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 text-xs text-white/60"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400">
              Admin Dashboard
            </p>
            <h1 className="text-4xl font-black text-white mt-2">
              Applications Center
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Track every submission and keep your open positions in sync.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {isRefreshing ? "Refreshing..." : "Refresh data"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-200 rounded-xl hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-6"
            >
              <p className="text-white/50 text-sm">{stat.label}</p>
              <p className="text-3xl font-black text-white mt-2">
                {stat.value}
              </p>
              <p className="text-white/40 text-xs mt-2">{stat.description}</p>
            </div>
          ))}
        </div>

        {dataError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl p-4 text-sm">
            {dataError}
          </div>
        )}

        <div className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-2 inline-flex">
          {[
            { key: "applications", label: `Applications (${applications.length})` },
            { key: "positions", label: `Positions (${positions.length})` },
            { key: "team", label: `Team (${teamMembers.length})` },
          ].map((segment) => (
            <button
              key={segment.key}
              onClick={() => setActiveSection(segment.key)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeSection === segment.key
                  ? "bg-white text-[#0B1020]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {segment.label}
            </button>
          ))}
        </div>

        {activeSection === "applications" ? (
          <section className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone or position"
                className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="bg-white/5 border-2 border-white/10 rounded-2xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All positions</option>
                  <option value="general">General submission</option>
                  {positionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="text-center text-white/50 py-16">
                <p className="text-lg font-semibold mb-2">
                  No applications found
                </p>
                <p className="text-sm text-white/40">
                  Try adjusting the filters or check again after new submissions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => {
                  const status = application.status || "new";
                  return (
                    <div
                      key={application.id}
                      className="bg-[#0b1222] border border-white/5 rounded-3xl p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-white text-xl font-bold">
                            {application.name || "Unnamed applicant"}
                          </p>
                          <p className="text-white/60 text-sm">
                            {application.email || "No email"}{" "}
                            {application.phone && (
                              <span className="text-white/40">
                                • {application.phone}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/40">
                            Applied{" "}
                            {formatFullDate(application.createdAt)} (
                            {formatRelativeTime(application.createdAt)})
                          </p>
                          <p className="text-xs text-purple-300 font-semibold mt-1">
                            {application.positionTitle || "General submission"}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 mt-4 text-sm text-white/70">
                        <div className="space-y-1">
                          <p className="text-white/40 text-xs uppercase">
                            Upload type
                          </p>
                          <p className="font-semibold capitalize">
                            {application.fileType || "Not provided"}
                          </p>
                          {application.fileUrl && (
                            <a
                              href={application.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-300 text-xs underline"
                            >
                              View attachment
                            </a>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-white/40 text-xs uppercase">
                            Status
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${statusStyles[status] || statusStyles.new}`}
                          >
                            ● {status}
                          </span>
                        </div>
                      </div>

                      {application.message && (
                        <div className="mt-4">
                          <p className="text-white/40 text-xs uppercase mb-2">
                            Message
                          </p>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {application.message}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2">
                          {["new", "reviewed", "archived"].map(
                            (nextStatus) => (
                              <button
                                key={nextStatus}
                                onClick={() =>
                                  handleUpdateStatus(application.id, nextStatus)
                                }
                                className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wide transition-all ${
                                  status === nextStatus
                                    ? "bg-purple-500 text-white"
                                    : "bg-white/5 text-white/60 hover:text-white"
                                }`}
                              >
                                Mark {nextStatus}
                              </button>
                            ),
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {application.email && (
                            <a
                              href={`mailto:${application.email}`}
                              className="px-4 py-2 bg-white/5 text-white rounded-2xl text-sm hover:bg-white/10 transition-all"
                            >
                              Reply via email
                            </a>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteApplication(application.id)
                            }
                            className="px-4 py-2 bg-red-500/20 text-red-200 rounded-2xl text-sm hover:bg-red-500/30 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : activeSection === "positions" ? (
          <section className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Manage Positions</h2>
              <p className="text-sm text-white/60">
                Create new roles, edit existing listings, or remove outdated
                opportunities.
              </p>
            </div>

            <div className="bg-[#0b1222] border border-white/5 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingId ? "Edit Position" : "Add New Position"}
              </h3>
              <form onSubmit={handlePositionSubmit} className="space-y-5">
                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Title *
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handlePositionInputChange}
                    required
                    placeholder="Frontend Developer"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  />
                </label>

                <div className="grid md:grid-cols-3 gap-4">
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Type *
                    </span>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handlePositionInputChange}
                      required
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Location *
                    </span>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handlePositionInputChange}
                      required
                      placeholder="Remote"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Commitment *
                    </span>
                    <input
                      type="text"
                      name="commitment"
                      value={formData.commitment}
                      onChange={handlePositionInputChange}
                      required
                      placeholder="10-20 hrs/week"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Description *
                  </span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handlePositionInputChange}
                    required
                    rows={4}
                    placeholder="Brief description of the role..."
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </label>

                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Skills (comma-separated) *
                  </span>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handlePositionInputChange}
                    required
                    placeholder="React, Next.js, TypeScript"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  />
                </label>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    {editingId ? "Update Position" : "Add Position"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetPositionForm}
                      className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Current Positions ({positions.length})
              </h3>
              {positions.length === 0 ? (
                <p className="text-white/50 text-center py-12">
                  No positions yet. Add your first one above!
                </p>
              ) : (
                positions.map((position) => (
                  <div
                    key={position.id}
                    className="bg-[#0b1222] border border-white/5 rounded-3xl p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">
                            {position.icon || "💼"}
                          </span>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {position.title}
                            </h3>
                            <p className="text-sm text-purple-400">
                              {position.type || "Role"} •{" "}
                              {position.location || "Location TBD"} •{" "}
                              {position.commitment || "Commitment TBD"}
                            </p>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-3">
                          {position.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(position.skills || []).map((skill, idx) => (
                            <span
                              key={`${position.id}-${idx}`}
                              className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded-full border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditPosition(position)}
                          className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-all text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePosition(position.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        ) : (
          <section className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Team Directory</h2>
              <p className="text-sm text-white/60">
                Create board or leadership entries and manage headshots stored
                in Firebase.
              </p>
            </div>

            <div className="bg-[#0b1222] border border-white/5 rounded-3xl p-6 space-y-6">
              <h3 className="text-xl font-bold text-white">
                {teamEditingId ? "Edit Team Member" : "Add Team Member"}
              </h3>
              {teamError && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                  {teamError}
                </p>
              )}
              {teamMessage && (
                <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                  {teamMessage}
                </p>
              )}
              <form onSubmit={handleTeamSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Name *
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={teamForm.name}
                      onChange={handleTeamInputChange}
                      required
                      placeholder="Jordan Lee"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Title *
                    </span>
                    <input
                      type="text"
                      name="title"
                      value={teamForm.title}
                      onChange={handleTeamInputChange}
                      required
                      placeholder="Executive Director"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Category *
                    </span>
                    <select
                      name="category"
                      value={teamForm.category}
                      onChange={handleTeamInputChange}
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="board">Board</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      LinkedIn URL
                    </span>
                    <input
                      type="url"
                      name="linkedin"
                      value={teamForm.linkedin}
                      onChange={handleTeamInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Bio *
                  </span>
                  <textarea
                    name="bio"
                    value={teamForm.bio}
                    onChange={handleTeamInputChange}
                    required
                    rows={3}
                    placeholder="Two sentences describing experience and focus."
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Email (optional)
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={teamForm.email}
                      onChange={handleTeamInputChange}
                      placeholder="hello@haci.group"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white/70 text-sm font-semibold mb-2 block">
                      Emoji / Initials fallback
                    </span>
                    <input
                      type="text"
                      name="emoji"
                      value={teamForm.emoji}
                      onChange={handleTeamInputChange}
                      placeholder="👩🏽‍💻 or JL"
                      className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-white/70 text-sm font-semibold mb-2 block">
                    Portrait Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTeamPhotoChange}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 focus:outline-none"
                  />
                  {teamForm.photoUrl && !teamPhotoFile && (
                    <p className="text-xs text-white/60 mt-2">
                      Current:{" "}
                      <a
                        href={teamForm.photoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        View photo
                      </a>
                    </p>
                  )}
                </label>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={teamSubmitting}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {teamEditingId
                      ? teamSubmitting
                        ? "Saving..."
                        : "Save Changes"
                      : teamSubmitting
                        ? "Adding..."
                        : "Add Member"}
                  </button>
                  {teamEditingId && (
                    <button
                      type="button"
                      onClick={() => {
                        resetTeamFormState();
                        setTeamMessage("");
                      }}
                      className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  Current Members ({teamMembers.length})
                </h3>
                <button
                  onClick={loadTeam}
                  className="text-sm text-white/60 hover:text-white"
                >
                  Refresh list
                </button>
              </div>
              {teamLoading ? (
                <p className="text-center text-white/60 py-8">
                  Loading team...
                </p>
              ) : sortedTeamMembers.length === 0 ? (
                <p className="text-center text-white/50 py-10">
                  No team members yet. Add your first record above.
                </p>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {sortedTeamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#0b1222] border border-white/5 rounded-3xl p-5"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-white/5 overflow-hidden flex items-center justify-center text-3xl border border-white/10">
                          {member.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={member.photoUrl}
                              alt={member.name || "Team member"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{member.emoji || "👤"}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                              {member.category || "leadership"}
                            </p>
                            <h4 className="text-xl font-bold text-white">
                              {member.name}
                            </h4>
                            <p className="text-sm text-purple-300">
                              {member.title}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTeamEdit(member)}
                              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleTeamDelete(member)}
                              className="px-3 py-2 text-xs font-semibold rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500/30 transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mt-3">
                          {member.bio}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/60">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="underline hover:text-white"
                            >
                              {member.email}
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:text-white"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
