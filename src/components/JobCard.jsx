// src/components/JobCard.jsx
import { MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";

const typeColors = {
    "Full-time": "bg-emerald-100 text-emerald-700",
    "Part-time": "bg-amber-100 text-amber-700",
    "Contract": "bg-purple-100 text-purple-700",
};

export default function JobCard({ job, isApplied, onApply }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-slate-800 text-base leading-snug">{job.title}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{job.company}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${typeColors[job.type] || "bg-slate-100 text-slate-600"}`}>
                    {job.type}
                </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                    <MapPin size={13} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                    <IndianRupee size={13} /> {job.salary}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{job.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill) => (
                    <span key={skill} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                        {skill}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={11} />
                    {job.postedAt?.toDate
                        ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(job.postedAt.toDate())
                        : "Recently"}
                </span>
                {isApplied ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                        ✓ Applied
                    </span>
                ) : (
                    <button
                        onClick={() => onApply(job)}
                        className="text-sm font-semibold bg-slate-800 text-white px-4 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        Apply Now
                    </button>
                )}
            </div>
        </div>
    );
}