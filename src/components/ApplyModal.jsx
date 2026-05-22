// src/components/ApplyModal.jsx
import { useState } from "react";
import {
    X, Briefcase, MapPin, DollarSign, CheckCircle,
    FileText, ArrowRight, User, Mail,
    Phone, Link2, Award, Upload,
} from "lucide-react";

function Field({ label, optional, children }) {
    return (
        <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                {label}
                {optional && (
                    <span className="text-slate-400 font-normal normal-case tracking-normal">
                        (optional)
                    </span>
                )}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white";

export default function ApplyModal({ job, onClose, onConfirm, onApplied }) {
    const [step, setStep] = useState("form");

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        experience: "",
    });
    const [formError, setFormError] = useState("");

    const [resumeFile, setResumeFile] = useState(null);
    const [applying, setApplying] = useState(false);
    const [applyError, setApplyError] = useState("");

    const handleFormNext = () => {
        setFormError("");
        if (!form.fullName.trim()) return setFormError("Full name is required.");
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
            return setFormError("Please enter a valid email address.");
        if (!form.phone.trim()) return setFormError("Phone number is required.");
        setStep("resume");
    };

    const handleApply = async () => {
        setApplying(true);
        setApplyError("");
        try {
            // pass only the file name — no upload
            const resumeName = resumeFile ? resumeFile.name : "";
            await onConfirm(job, resumeName, form);
            setStep("success");
            if (onApplied) onApplied(job.id);
            setTimeout(() => onClose(), 2000);
        } catch (err) {
            setApplyError("Something went wrong. Please try again.");
        } finally {
            setApplying(false);
        }
    };

    const MetaPills = () => (
        <div className="flex flex-wrap gap-2 mb-5">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <MapPin size={11} /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <Briefcase size={11} /> {job.type}
            </span>
            {job.salary && (
                <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <DollarSign size={11} /> {job.salary}
                </span>
            )}
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

                {/* SUCCESS */}
                {step === "success" && (
                    <div className="text-center py-12 px-6">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Application Sent!</h3>
                        <p className="text-sm text-slate-500">
                            You've applied to <span className="font-semibold">{job.title}</span> at{" "}
                            <span className="font-semibold">{job.company}</span>.
                        </p>
                    </div>
                )}

                {/* STEP 1: FORM */}
                {step === "form" && (
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">
                                    Step 1 of 2 — Your Info
                                </p>
                                <h3 className="text-base font-bold text-slate-800">{job.title}</h3>
                                <p className="text-sm text-slate-500">{job.company}</p>
                            </div>
                            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition">
                                <X size={18} />
                            </button>
                        </div>

                        <MetaPills />

                        <div className="space-y-4">
                            <Field label="Full Name">
                                <div className="relative">
                                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="Rahul Sharma" value={form.fullName}
                                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                        className={`${inputCls} pl-9`} />
                                </div>
                            </Field>

                            <Field label="Email">
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="email" placeholder="rahul@email.com" value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={`${inputCls} pl-9`} />
                                </div>
                            </Field>

                            <Field label="Phone Number">
                                <div className="relative">
                                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className={`${inputCls} pl-9`} />
                                </div>
                            </Field>

                            <Field label="LinkedIn Profile" optional>
                                <div className="relative">
                                    <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={form.linkedin}
                                        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                                        className={`${inputCls} pl-9`} />
                                </div>
                            </Field>

                            <Field label="Years of Experience" optional>
                                <div className="relative">
                                    <Award size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="number" min="0" max="50" placeholder="e.g. 2" value={form.experience}
                                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                        className={`${inputCls} pl-9`} />
                                </div>
                            </Field>
                        </div>

                        {formError && <p className="mt-3 text-xs text-red-500 text-center">{formError}</p>}

                        <div className="flex gap-3 mt-6">
                            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleFormNext} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                Next <ArrowRight size={15} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: RESUME UPLOAD */}
                {step === "resume" && (
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">
                                    Step 2 of 2 — Attach Resume
                                </p>
                                <h3 className="text-base font-bold text-slate-800">{job.title}</h3>
                                <p className="text-sm text-slate-500">{job.company}</p>
                            </div>
                            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Applicant summary */}
                        <div className="my-4 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 space-y-0.5">
                            <p className="text-sm font-semibold text-slate-700">{form.fullName}</p>
                            <p className="text-xs text-slate-500">{form.email} · {form.phone}</p>
                            {form.linkedin && <p className="text-xs text-indigo-500 truncate">{form.linkedin}</p>}
                            {form.experience && <p className="text-xs text-slate-400">{form.experience} yr{form.experience !== "1" ? "s" : ""} experience</p>}
                        </div>

                        {/* File upload */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                                Resume PDF{" "}
                                <span className="text-slate-400 font-normal normal-case tracking-normal">(optional)</span>
                            </label>

                            <label className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-slate-200 rounded-xl px-4 py-5 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
                                <div className="p-2.5 bg-slate-100 group-hover:bg-indigo-100 rounded-xl transition-colors">
                                    <Upload size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                {resumeFile ? (
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-indigo-600 truncate max-w-60">{resumeFile.name}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">Click to change</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-sm text-slate-600 font-medium">Click to upload your resume</p>
                                        <p className="text-xs text-slate-400 mt-0.5">PDF files only</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => setResumeFile(e.target.files[0] || null)}
                                />
                            </label>

                            {resumeFile && (
                                <button
                                    onClick={() => setResumeFile(null)}
                                    className="mt-2 text-xs text-red-400 hover:text-red-500 transition"
                                >
                                    Remove file
                                </button>
                            )}
                        </div>

                        {applyError && <p className="mb-3 text-xs text-red-500 text-center">{applyError}</p>}

                        <div className="flex gap-3">
                            <button onClick={() => setStep("form")} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition">
                                ← Back
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {applying ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : "Confirm & Apply"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}