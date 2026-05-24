import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const CATEGORIES = [
  "General Inquiry",
  "Resume Builder Issue",
  "Job Application Issue",
  "Account / Login Problem",
  "Bug Report",
  "Feature Request",
  "Other",
];

const TIPS = [
  "Include your registered email address",
  "Describe the steps that led to the issue",
  "Attach any relevant screenshots if possible",
  "Mention the browser / device you are using",
];

const COMMON_ISSUES = [
  "Can't log in or sign up",
  "Resume PDF not generating",
  "Job application not saving",
  "Resume not uploading to storage",
  "Dashboard stats not updating",
];

export default function Support() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.category) e.category = "Please select a category.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) {
      e.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      e.message = "Message must be at least 20 characters.";
    }
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSaving(true);

    try {
      // Save to Firestore
      const userId = user?.id || "anonymous";
      await addDoc(collection(db, "supportTickets", userId, "tickets"), {
        name: form.name.trim(),
        email: form.email.trim(),
        category: form.category,
        subject: form.subject.trim(),
        message: form.message.trim(),
        submittedAt: serverTimestamp(),
        status: "Open",
      });

      // Also open mailto as a bonus notification
      const mailBody = `Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\n${form.message}`;
      const mailtoLink = `mailto:prince1432810@gmail.com?subject=[ProLegion Support] ${encodeURIComponent(
        form.category + ": " + form.subject
      )}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailtoLink;

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save support ticket:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1a9ec9] transition ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-slate-200 focus:border-[#1a9ec9]"
    }`;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header Banner */}
      <div
        className="w-full py-10 px-6"
        style={{
          background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
          borderBottom: "1px solid #bae6fd",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-medium mb-4 transition cursor-pointer"
            style={{ color: "#1a9ec9" }}
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-slate-800">Support Center</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Have a question or ran into an issue? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form / Success */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#e0f9f0" }}
              >
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Ticket Submitted!
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Your support request has been saved. We'll get back to you
                within 1–2 business days at{" "}
                <span className="font-medium text-slate-700">{form.email}</span>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition"
                  style={{ backgroundColor: "#1a9ec9" }}
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                >
                  Send Another
                </button>
                <button
                  onClick={() => navigate("/support/history")}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                >
                  View My Tickets
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Submit a Support Request
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass("name")}
                      value={form.name}
                      onChange={(ev) => handleChange("name", ev.target.value)}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputClass("email")}
                      value={form.email}
                      onChange={(ev) => handleChange("email", ev.target.value)}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    className={inputClass("category")}
                    value={form.category}
                    onChange={(ev) => handleChange("category", ev.target.value)}
                  >
                    <option value="">Select a category...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass("subject")}
                    value={form.subject}
                    onChange={(ev) => handleChange("subject", ev.target.value)}
                    placeholder="Brief summary of your issue"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className={inputClass("message")}
                    value={form.message}
                    onChange={(ev) => handleChange("message", ev.target.value)}
                    placeholder="Describe your issue in detail... (min 20 characters)"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-red-500 text-xs">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <p
                      className={`text-xs ${
                        form.message.length < 20
                          ? "text-slate-400"
                          : "text-green-500"
                      }`}
                    >
                      {form.message.length} / 20 min
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60"
                  style={{ backgroundColor: "#1a9ec9" }}
                >
                  {saving ? "Submitting..." : "Submit Support Request"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              📬 Contact Info
            </h3>
            <p className="text-xs text-slate-500 mb-1">
              <span className="font-medium text-slate-700">Email:</span>{" "}
              prince1432810@gmail.com
            </p>
            <p className="text-xs text-slate-500">
              <span className="font-medium text-slate-700">Response time:</span>{" "}
              1–2 business days
            </p>
            <button
              onClick={() => navigate("/support/history")}
              className="mt-4 w-full py-2 rounded-xl text-xs font-semibold border transition hover:bg-slate-50"
              style={{ borderColor: "#1a9ec9", color: "#1a9ec9" }}
            >
              View My Past Tickets →
            </button>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              💡 Tips for Faster Help
            </h3>
            <ol className="space-y-2">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-500">
                  <span
                    className="font-bold shrink-0"
                    style={{ color: "#1a9ec9" }}
                  >
                    {i + 1}.
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>

          {/* Common Issues */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              🔍 Common Issues
            </h3>
            <ul className="space-y-1.5">
              {COMMON_ISSUES.map((issue, i) => (
                <li key={i} className="text-xs text-slate-500 flex gap-2">
                  <span style={{ color: "#1a9ec9" }}>•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
