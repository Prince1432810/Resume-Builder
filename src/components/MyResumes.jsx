import { useState } from "react";
import { FileText, Trash2, Plus, BookOpen } from "lucide-react";
import { useResumes } from "../hooks/useResumes";
import SaveResumeModal from "./SaveResumeModal";

const TEMPLATE_LABELS = {
  template1: "Template 1",
  template2: "Template 2",
  template3: "Template 3",
  template4: "Template 4",
};

export default function MyResumes({ activeTemplate = "template3" }) {
  const { resumes, loading, deleteResume } = useResumes();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id, storagePath) => {
        setDeletingId(id);
        try {
            await deleteResume(id, storagePath);
        } finally {
            setDeletingId(null);
        }
    };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">My Resumes</h2>
        </div>
        <button
          onClick={() => setShowSaveModal(true)}
          className="flex items-center gap-1.5 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={15} />
          Save Current Resume
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <FileText size={36} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No resumes saved yet.</p>
          <p className="text-xs mt-1">Build a resume and click "Save Current Resume".</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{resume.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {TEMPLATE_LABELS[resume.templateId] ?? resume.templateId} &middot;{" "}
                    {formatDate(resume.createdAt)}
                  </p>
                </div>
              </div>

              <button
                      onClick={() => handleDelete(resume.id, resume.storagePath)}
                disabled={deletingId === resume.id}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                title="Delete resume"
              >
                {deletingId === resume.id ? (
                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Save modal */}
          {showSaveModal && (
              <SaveResumeModal
                  onClose={() => setShowSaveModal(false)}
                  activeTemplate={activeTemplate}
              />
          )}
    </div>
  );
}
