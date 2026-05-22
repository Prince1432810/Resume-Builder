// src/pages/JobsPage.jsx
import { useState, useMemo, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import {
    Search, MapPin, SlidersHorizontal, Briefcase, Clock,
    DollarSign, X, ChevronRight, Sparkles, Building2, Filter,
    TrendingUp, Users, BookOpen,
} from "lucide-react";
import { useJobs } from "../hooks/useJobs";
import { useApplications } from "../hooks/useApplications";
import ApplyModal from "../components/ApplyModal";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract"];

// Each type gets a distinct colour so they never look the same
const TYPE_STYLES = {
    "Full-time": {
        badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        dot: "bg-emerald-500",
        stat: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
        active: "bg-emerald-600 text-white border-emerald-600",
    },
    "Part-time": {
        badge: "bg-amber-50 text-amber-700 border border-amber-200",
        dot: "bg-amber-400",
        stat: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
        active: "bg-amber-500 text-white border-amber-500",
    },
    "Contract": {
        badge: "bg-violet-50 text-violet-700 border border-violet-200",
        dot: "bg-violet-500",
        stat: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
        active: "bg-violet-600 text-white border-violet-600",
    },
};

// Diverse logo colours so each company feels different
const LOGO_PALETTES = [
    { bg: "bg-[#dbeafe] text-[#3985b6]" },
    { bg: "bg-violet-100 text-violet-700" },
    { bg: "bg-emerald-100 text-emerald-700" },
    { bg: "bg-amber-100 text-amber-700" },
    { bg: "bg-rose-100 text-rose-600" },
    { bg: "bg-teal-100 text-teal-700" },
    { bg: "bg-indigo-100 text-indigo-700" },
    { bg: "bg-orange-100 text-orange-700" },
];

// Skill tag colours cycle through a palette so the cloud looks vibrant
const SKILL_COLORS = [
    "bg-[#e8f4fc] text-[#3985b6] border-[#b8ddf0]",
    "bg-violet-50 text-violet-700 border-violet-200",
    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "bg-amber-50 text-amber-700 border-amber-200",
    "bg-rose-50 text-rose-600 border-rose-200",
    "bg-teal-50 text-teal-700 border-teal-200",
];

function skillColor(skill) {
    let hash = 0;
    for (let i = 0; i < skill.length; i++) hash = skill.charCodeAt(i) + ((hash << 5) - hash);
    return SKILL_COLORS[Math.abs(hash) % SKILL_COLORS.length];
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-1 bg-gray-100" />
            <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gray-100 shrink-0 animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-100 rounded-lg w-3/5 animate-pulse" />
                        <div className="h-3 bg-gray-100 rounded-lg w-2/5 animate-pulse" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded-lg w-full animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded-lg w-4/5 animate-pulse" />
                </div>
                <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-100 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
    );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, isApplied, onApply }) {
    const typeStyle = TYPE_STYLES[job.type] || {
        badge: "bg-gray-50 text-gray-600 border border-gray-200",
        dot: "bg-gray-400",
    };
    const initials = job.company?.slice(0, 2).toUpperCase() || "JB";
    const palette = LOGO_PALETTES[job.company?.charCodeAt(0) % LOGO_PALETTES.length];

    const postedDate = useMemo(() => {
        if (!job.postedAt) return null;
        const date = typeof job.postedAt?.toDate === "function" ? job.postedAt.toDate() : new Date();
        const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    }, [job.postedAt]);

    // Accent bar colour per type for visual variety
    const accentBar = {
        "Full-time": "from-emerald-400 via-teal-400 to-emerald-300",
        "Part-time": "from-amber-400 via-orange-400 to-amber-300",
        "Contract": "from-violet-500 via-purple-400 to-violet-300",
    }[job.type] || "from-[#3985b6] via-[#56aee2] to-[#4a9fd4]";

    return (
        <div className={`group bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden transition-all duration-200
            ${isApplied
                ? "border-emerald-200"
                : "border-gray-100 hover:border-[#b8ddf0] hover:shadow-md hover:-translate-y-0.5"
            }`}
        >
            {/* Accent bar — always visible for applied; animates in on hover otherwise */}
            <div className={`h-1 w-full bg-linear-to-r ${accentBar}
                ${isApplied ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
            />

            {isApplied && (
                <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-xs font-semibold text-emerald-700">Applied</span>
                </div>
            )}

            <div className="p-5 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${palette.bg}`}>
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-1 group-hover:text-[#3985b6] transition-colors">
                            {job.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                            <Building2 size={11} className="text-gray-400 shrink-0" />
                            <p className="text-xs text-gray-400 truncate">{job.company}</p>
                        </div>
                    </div>
                </div>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${typeStyle.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${typeStyle.dot}`} />
                        {job.type}
                    </span>
                    {job.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full">
                            <MapPin size={10} className="shrink-0 text-[#3985b6]" />
                            {job.location}
                        </span>
                    )}
                    {job.salary && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full">
                            <DollarSign size={10} className="shrink-0 text-emerald-500" />
                            {job.salary}
                        </span>
                    )}
                </div>

                {/* Description */}
                {job.description && (
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{job.description}</p>
                )}

                {/* Skills — each tag gets its own colour */}
                {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className={`text-xs border px-2 py-0.5 rounded-md font-medium ${skillColor(skill)}`}>
                                {skill}
                            </span>
                        ))}
                        {job.skills.length > 3 && (
                            <span className="text-xs text-gray-400 self-center">+{job.skills.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock size={10} className="text-gray-300" />
                        {postedDate || "Recently"}
                    </span>
                    <button
                        onClick={() => !isApplied && onApply(job)}
                        disabled={isApplied}
                        className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1
                            ${isApplied
                                ? "bg-emerald-50 text-emerald-600 cursor-default border border-emerald-200"
                                : "bg-[#3985b6] hover:bg-[#2e72a0] active:scale-95 text-white shadow-sm shadow-blue-100"
                            }`}
                    >
                        {isApplied ? "Applied ✓" : <>Apply <ChevronRight size={11} /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JobsPage() {
    const { user } = useUser();
    const { jobs, loading, error } = useJobs();
    const { applyToJob, appliedJobIds } = useApplications();

    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [selectedJob, setSelectedJob] = useState(null);
    const [sortBy, setSortBy] = useState("newest");

    const searchRef = useRef(null);

    const filtered = useMemo(() => {
        const results = jobs.filter((job) => {
            const q = search.toLowerCase();
            const matchesSearch =
                job.title?.toLowerCase().includes(q) ||
                job.company?.toLowerCase().includes(q) ||
                job.skills?.some((s) => s.toLowerCase().includes(q));
            const matchesLocation = !locationFilter ||
                job.location?.toLowerCase().includes(locationFilter.toLowerCase());
            const matchesType = typeFilter === "All" || job.type === typeFilter;
            return matchesSearch && matchesLocation && matchesType;
        });

        if (sortBy === "newest") {
            results.sort((a, b) => (b.postedAt?.seconds || 0) - (a.postedAt?.seconds || 0));
        } else if (sortBy === "applied") {
            results.sort((a) => (appliedJobIds?.has(a.id) ? -1 : 1));
        }
        return results;
    }, [jobs, search, locationFilter, typeFilter, sortBy, appliedJobIds]);

    const hasActiveFilters = search || locationFilter || typeFilter !== "All";

    function clearFilters() {
        setSearch(""); setLocationFilter(""); setTypeFilter("All");
        searchRef.current?.focus();
    }

    async function handleConfirmApply(job) {
        try { await applyToJob(job); }
        catch (err) { console.error("Apply failed:", err); }
    }

    const typeCounts = useMemo(() => {
        const counts = { "Full-time": 0, "Part-time": 0, "Contract": 0 };
        jobs.forEach((j) => { if (counts[j.type] !== undefined) counts[j.type]++; });
        return counts;
    }, [jobs]);

    return (
        <div className="min-h-screen w-full bg-[#f0f4f8] px-4 py-8 md:px-8 pb-12">
            <style>{`
                .line-clamp-1 { display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden; }
                .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
            `}</style>

            <div className="max-w-6xl mx-auto">

                {/* ── Header Banner ─────────────────────────────────────────── */}
                <div className="rounded-xl overflow-hidden mb-6 border border-[#b8ddf0] shadow-sm">
                    <div style={{ background: "linear-gradient(135deg,#cce8f7 0%,#ddf0fb 60%,#edf7fd 100%)" }}
                        className="px-6 py-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 rounded-lg bg-[#3985b6]/15 flex items-center justify-center">
                                        <Briefcase size={14} className="text-[#3985b6]" />
                                    </div>
                                    <span className="text-xs font-semibold text-[#3985b6] uppercase tracking-widest">
                                        ProLegion · Job Board
                                    </span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-800">Browse Opportunities</h1>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    {loading ? "Fetching latest listings…" : (
                                        <>
                                            <span className="font-semibold text-[#3985b6]">{filtered.length}</span>
                                            {" of "}
                                            <span className="font-semibold text-gray-700">{jobs.length}</span>
                                            {" jobs available"}
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Type filter buttons — each has its own colour */}
                            {!loading && (
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(typeCounts).map(([type, count]) => {
                                        const s = TYPE_STYLES[type];
                                        const isActive = typeFilter === type;
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => setTypeFilter(isActive ? "All" : type)}
                                                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all duration-150
                                                    ${isActive ? s.active : `bg-white/80 border ${s.stat}`}`}
                                            >
                                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5
                                                    ${isActive ? "bg-white/70" : s.dot}`}
                                                />
                                                {count} {type}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Mini stat strip */}
                        {!loading && jobs.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#b8ddf0]/60">
                                <div className="flex items-center gap-1.5 text-xs text-[#3985b6]">
                                    <TrendingUp size={13} />
                                    <span className="font-semibold">{jobs.length}</span> total listings
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-violet-600">
                                    <BookOpen size={13} />
                                    <span className="font-semibold">{typeCounts["Contract"]}</span> contract roles
                                </div>
                                {appliedJobIds?.size > 0 && (
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                                        <Users size={13} />
                                        <span className="font-semibold">{appliedJobIds.size}</span> applied by you
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Search + Filters ─────────────────────────────────────── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5">
                    <div className="flex flex-col sm:flex-row gap-2">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3985b6]" />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search role, company or skill…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#f0f4f8] border border-gray-200 rounded-lg outline-none
                                    focus:border-[#3985b6] focus:ring-2 focus:ring-[#3985b6]/10 transition-all placeholder:text-gray-400"
                            />
                            {search && (
                                <button onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Location */}
                        <div className="relative sm:w-44">
                            <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400" />
                            <input
                                type="text"
                                placeholder="Location…"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#f0f4f8] border border-gray-200 rounded-lg outline-none
                                    focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Type */}
                        <div className="relative sm:w-36">
                            <Filter size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none z-10" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#f0f4f8] border border-gray-200 rounded-lg outline-none
                                    focus:border-violet-300 appearance-none cursor-pointer text-gray-700"
                            >
                                {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="relative sm:w-40">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2.5 text-sm bg-[#f0f4f8] border border-gray-200 rounded-lg outline-none
                                    focus:border-[#3985b6] appearance-none cursor-pointer text-gray-700"
                            >
                                <option value="newest">Newest first</option>
                                <option value="applied">Applied first</option>
                            </select>
                        </div>
                    </div>

                    {/* Active filter pills */}
                    {hasActiveFilters && (
                        <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                            <span className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">Active:</span>
                            {search && (
                                <span className="inline-flex items-center gap-1 text-xs bg-[#e8f4fc] text-[#3985b6] border border-[#b8ddf0] px-2.5 py-0.5 rounded-full font-medium">
                                    "{search}"
                                    <button onClick={() => setSearch("")} className="ml-0.5"><X size={11} /></button>
                                </span>
                            )}
                            {locationFilter && (
                                <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-0.5 rounded-full font-medium">
                                    <MapPin size={10} /> {locationFilter}
                                    <button onClick={() => setLocationFilter("")} className="ml-0.5"><X size={11} /></button>
                                </span>
                            )}
                            {typeFilter !== "All" && (
                                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_STYLES[typeFilter]?.badge}`}>
                                    {typeFilter}
                                    <button onClick={() => setTypeFilter("All")} className="ml-0.5"><X size={11} /></button>
                                </span>
                            )}
                            <button onClick={clearFilters} className="ml-auto text-xs text-[#3985b6] hover:underline font-medium">
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Error ────────────────────────────────────────────────── */}
                {error && (
                    <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 mb-5">
                        <p className="text-red-500 text-sm font-semibold">Failed to load jobs</p>
                        <p className="text-red-400 text-xs mt-1">{error}</p>
                    </div>
                )}

                {/* ── Applied banner ───────────────────────────────────────── */}
                {!loading && appliedJobIds?.size > 0 && (
                    <div className="flex items-center gap-2 mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        You've applied to <strong>{appliedJobIds.size}</strong> job{appliedJobIds.size > 1 ? "s" : ""} — keep the momentum going!
                    </div>
                )}

                {/* ── Grid / States ────────────────────────────────────────── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 rounded-2xl bg-[#e8f4fc] flex items-center justify-center mb-4">
                            <Sparkles size={24} className="text-[#3985b6]" />
                        </div>
                        <p className="text-gray-800 font-semibold text-lg">No jobs found</p>
                        <p className="text-gray-400 text-sm mt-1 max-w-xs">
                            {hasActiveFilters
                                ? "Try adjusting your filters to see more opportunities."
                                : "No listings right now — check back soon!"}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="mt-5 text-sm font-semibold text-white bg-[#3985b6] hover:bg-[#2e72a0] px-5 py-2 rounded-lg shadow-sm transition-colors"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isApplied={appliedJobIds?.has(job.id)}
                                    onApply={setSelectedJob}
                                />
                            ))}
                        </div>
                        {filtered.length > 6 && (
                            <p className="text-center text-xs text-gray-400 mt-8">
                                Showing all {filtered.length} matching jobs
                            </p>
                        )}
                    </>
                )}
            </div>

            {selectedJob && (
                <ApplyModal
                    job={selectedJob}
                    onConfirm={handleConfirmApply}
                    onClose={() => setSelectedJob(null)}
                    onApplied={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
}
