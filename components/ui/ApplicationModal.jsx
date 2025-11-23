"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import CustomSelect from "./CustomSelect";

const APPLICATIONS_COLLECTION = "applications";

const modalFormDefaults = {
  name: "",
  email: "",
  phone: "",
  message: "",
  fileType: "resume",
  file: null,
  websiteUrl: "",
};

const volunteerFormDefaults = {
  name: "",
  email: "",
  phone: "",
  interests: "",
  availability: "",
  fileType: "resume",
  file: null,
  websiteUrl: "",
};

const fileTypeOptions = [
  { value: "resume", label: "Resume/CV" },
  { value: "portfolio", label: "Portfolio" },
  { value: "website", label: "Website Link" },
  { value: "other", label: "Other" },
];

const getTimestamp = () => new Date().toISOString();

async function uploadAttachment(file, context = "general") {
  if (!file) return null;
  const storageRef = ref(
    storage,
    `applications/${context}/${Date.now()}-${file.name}`,
  );
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return {
    url: downloadURL,
    name: file.name,
    path: snapshot.ref.fullPath,
    size: file.size,
    type: file.type,
  };
}

async function saveApplication(payload) {
  return addDoc(collection(db, APPLICATIONS_COLLECTION), payload);
}

export function ApplicationModal({ position, onClose }) {
  const [formData, setFormData] = useState(modalFormDefaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const requiresFile = formData.fileType !== "website";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (requiresFile && !formData.file) {
      setError("Please upload a file for your application.");
      return;
    }
    if (!requiresFile && !formData.websiteUrl.trim()) {
      setError("Please include a link to your work.");
      return;
    }

    setIsSubmitting(true);
    try {
      let attachment = null;
      if (requiresFile) {
        attachment = await uploadAttachment(
          formData.file,
          position?.id || "general",
        );
      }

      await saveApplication({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        fileType: formData.fileType,
        fileUrl: requiresFile
          ? attachment?.url || null
          : formData.websiteUrl.trim(),
        fileName: requiresFile ? attachment?.name || null : null,
        filePath: attachment?.path || null,
        status: "new",
        source: "get-involved-modal",
        submissionType: "position",
        positionId: position?.id || null,
        positionTitle: position?.title || "General submission",
        positionLocation: position?.location || null,
        positionType: position?.type || null,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      });

      alert("Application submitted! We'll be in touch soon.");
      setFormData(modalFormDefaults);
      onClose?.();
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f1528] border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-12 sm:my-8 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative"
      >
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h3 className=" text-lg font-black text-white uppercase leading-tight">
              Apply for {position?.title || "Position"}
            </h3>
            <p className="text-amber-400 text-xs sm:text-sm font-semibold mt-1.5">
              {position?.location} • {position?.type}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none p-2 -mr-2 -mt-2"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
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
                placeholder="John Doe"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Email *
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-white/70 text-sm font-semibold mb-2 block">
              Phone Number
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Upload Type *
              </span>
                <CustomSelect
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleInputChange}
                  options={fileTypeOptions}
                  className="w-full"
                />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                {formData.fileType === "website"
                  ? "Website URL *"
                  : "Upload File *"}
              </span>
              {formData.fileType === "website" ? (
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://yoursite.com"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  required
                />
              ) : (
                <input
                  type="file"
                  onChange={handleFileChange}
                  required={requiresFile}
                  accept=".pdf,.doc,.docx"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 focus:outline-none"
                />
              )}
            </label>
          </div>

          <label className="block">
            <span className="text-white/70 text-sm font-semibold mb-2 block">
              Why are you interested?
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your relevant experience and why you&apos;re excited about this opportunity..."
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none"
            />
          </label>

          {error && (
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-bold text-lg rounded-xl transition-all ${
              isSubmitting
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-amber-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          <p className="text-center text-white/50 text-xs">
            We&apos;ll review your application and get back to you within 3-5
            business days
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export function VolunteerForm({
  title = "General Volunteer Interest",
  subtitle = "Not seeing a specific role? Submit your info and we&apos;ll find the right fit for your skills.",
  anchorId = "volunteer",
}) {
  const [formData, setFormData] = useState(volunteerFormDefaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const requiresFile = formData.fileType !== "website";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (requiresFile && !formData.file) {
      setError("Please upload a file or switch to Website URL.");
      return;
    }
    if (!requiresFile && !formData.websiteUrl.trim()) {
      setError("Please share a link to your work.");
      return;
    }

    setIsSubmitting(true);
    try {
      let attachment = null;
      if (requiresFile) {
        attachment = await uploadAttachment(formData.file, "volunteer");
      }

      await saveApplication({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.interests.trim(),
        availability: formData.availability.trim(),
        fileType: formData.fileType,
        fileUrl: requiresFile
          ? attachment?.url || null
          : formData.websiteUrl.trim(),
        fileName: requiresFile ? attachment?.name || null : null,
        filePath: attachment?.path || null,
        status: "new",
        source: "volunteer-form",
        submissionType: "volunteer",
        positionId: null,
        positionTitle: "Volunteer Interest",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      });

      setFormData(volunteerFormDefaults);
      setSuccessMessage("Thank you! We'll be in touch soon.");
    } catch (err) {
      console.error("Error submitting volunteer form:", err);
      setError("Unable to submit right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={anchorId}>
      <Section variant="primary">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f1528] border-2 border-white/10 rounded-3xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
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
                  placeholder="John Doe"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  Email *
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Phone Number
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Skills & Interests *
              </span>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="What skills do you bring? What areas interest you?"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none resize-none"
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm font-semibold mb-2 block">
                Availability
              </span>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                placeholder="e.g., 5-10 hours/week, weekends, flexible..."
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  Upload Type
                </span>
                <CustomSelect
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleInputChange}
                  options={fileTypeOptions}
                  className="w-full"
                />
              </label>

              <label className="block">
                <span className="text-white/70 text-sm font-semibold mb-2 block">
                  {formData.fileType === "website"
                    ? "Website URL"
                    : "Upload File"}
                </span>
                {formData.fileType === "website" ? (
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://yoursite.com"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 focus:outline-none"
                  />
                )}
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-bold text-lg rounded-xl transition-all ${
                isSubmitting
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-amber-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Volunteer Interest"}
            </button>

            <p className="text-center text-white/50 text-xs">
              We&apos;ll review your info and reach out with opportunities that
              match your skills
            </p>
          </form>
        </div>
      </Container>
    </Section>
  </div>
  );
}
