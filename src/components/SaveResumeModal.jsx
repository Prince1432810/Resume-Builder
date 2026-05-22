import { useState } from "react";
import { X, Save } from "lucide-react";
import { useResumes } from "../hooks/useResumes";

export default function SaveResumeModal({ onClose, activeTemplate }) {
    const { saveResume } = useResumes();
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const TEMPLATE_LABELS = {
        template1: "Template 1",
        template2: "Template 2",
        template3: "Template 3",
        template4: "Template 4",
    };

    const handleSave = async () => {
        if (!name.trim()) {
            setError("Please enter a name for this resume.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await saveResume(name.trim(), activeTemplate);
            setSuccess(true);
            setTimeout(() => onClose(), 1200);
        } catch (err) {
            console.error(err);
            setError("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-semibold text-gray-800">Save Resume</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {success ? (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Save size={22} className="text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Resume saved!</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 p-3 bg-indigo-50 rounded-xl text-sm text-indigo-700 flex items-center gap-2">
                            <span className="font-medium">Using:</span>
                            <span>{TEMPLATE_LABELS[activeTemplate] ?? activeTemplate}</span>
                        </div>

                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Resume name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            placeholder="e.g. My Resume — Fresher"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            autoFocus
                        />
                        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={onClose}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={15} />
                                        Save
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}