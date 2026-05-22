// src/pages/ApplicationsPage.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Briefcase, ArrowLeft, CalendarDays,
    FileText, Trash2, Loader2, Trophy,
    XCircle, Clock, MapPin, Banknote,
    CheckCircle2, ChevronRight, Search,
} from "lucide-react";
import { useApplications } from "../hooks/useApplications";

function formatDate(ts) {
    if (!ts) return "—";
    const date = ts?.toDate?.() ?? new Date(ts);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// Status config — each status gets its own distinct visual identity
const STATUS_CONFIG = {
    Applied: {
        label: "Applied",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-700",
        badgeBorder: "border-emerald-200",
        dot: "bg-emerald-400",
        barColor: "bg-emerald-400",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        timelineLine: "bg-emerald-200",
        statBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
        statBorder: "border-emerald-100",
        statValue: "text-emerald-700",
        Icon: CheckCircle2,
    },
    Reviewing: {
        label: "Reviewing",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-700",
        badgeBorder: "border-amber-200",
        dot: "bg-amber-400",
        barColor: "bg-amber-400",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        timelineLine: "bg-amber-200",
        statBg: "bg-gradient-to-br from-amber-50 to-yellow-50",
        statBorder: "border-amber-100",
        statValue: "text-amber-700",
        Icon: Clock,
    },
    Hired: {
        label: "Hired",
        badgeBg: "bg-violet-50",
        badgeText: "text-violet-700",
        badgeBorder: "border-violet-200",
        dot: "bg-violet-500",
        barColor: "bg-violet-500",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        timelineLine: "bg-violet-200",
        statBg: "bg-gradient-to-br from-violet-50 to-purple-50",
        statBorder: "border-violet-100",
        statValue: "text-violet-700",
        Icon: Trophy,
    },
    Rejected: {
        label: "Rejected",
        badgeBg: "bg-red-50",
        badgeText: "text-red-600",
        badgeBorder: "border-red-200",
        dot: "bg-red-400",
        barColor: "bg-red-400",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
        timelineLine: "bg-red-200",
        statBg: "bg-gradient-to-br from-red-50 to-rose-50",
        statBorder: "border-red-100",
        statValue: "text-red-600",
        Icon: XCircle,
    },
};

const STATUS_KEYS = ["Applied", "Reviewing", "Hired", "Rejected"];

// ── ApplicationRow ──────────────────────────────────────────────────────────
function ApplicationRow({ app, onDelete, isLast }) {
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.Applied;
    const { Icon } = cfg;

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
        }
        setDeleting(true);
        try {
            await onDelete(app.jobId);
        } catch {
            setDeleting(false);
        }
    };

    return (
        <div className="relative flex gap-4">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full ${cfg.iconBg} border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10`}>
                    <Icon size={16} className={cfg.iconColor} />
                </div>
                {!isLast && (
                    <div className={`w-0.5 flex-1 mt-1 ${cfg.timelineLine} opacity-50`} />
                )}
            </div>

            {/* Card */}
            <div
                className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm mb-4 cursor-pointer hover:shadow-md hover:border-[#b8ddf0] transition-all duration-200 overflow-hidden"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Main row */}
                <div className="p-4 flex items-center gap-3">
                    {/* Company logo placeholder */}
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#cce8f7] to-[#edf7fd] border border-[#daeaf5] flex items-center justify-center shrink-0">
                        <Briefcase size={16} className="text-[#3985b6]" />
                    </div>

                    {/* Job info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-800 truncate">{app.title}</p>
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                {cfg.label}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{app.company}</p>
                    </div>

                    {/* Right: date + expand */}
                    <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs text-gray-400 hidden sm:block">{formatDate(app.appliedAt)}</span>
                        <ChevronRight
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
                        />
                    </div>
                </div>

                {/* Expanded details */}
                {expanded && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                        <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {app.location && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <MapPin size={12} className="text-[#3985b6] shrink-0" />
                                    <span>{app.location}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <CalendarDays size={12} className="text-[#3985b6] shrink-0" />
                                <span>{formatDate(app.appliedAt)}</span>
                            </div>
                            {(app.type || app.salary) && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Banknote size={12} className="text-[#3985b6] shrink-0" />
                                    <span>{[app.type, app.salary].filter(Boolean).join(" · ")}</span>
                                </div>
                            )}
                            {app.resumeName && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FileText size={12} className="text-[#3985b6] shrink-0" />
                                    <span className="truncate">{app.resumeName}</span>
                                </div>
                            )}
                        </div>

                        {/* Delete button */}
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                                    ${confirmDelete
                                        ? "bg-red-50 border-red-200 text-red-600"
                                        : "bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                                    } disabled:opacity-40`}
                            >
                                {deleting
                                    ? <Loader2 size={12} className="animate-spin" />
                                    : <Trash2 size={12} />
                                }
                                {confirmDelete ? "Confirm delete?" : "Remove"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ cfg, count, label }) {
    const { Icon } = cfg;
    return (
        <div className={`rounded-xl border p-4 flex items-center gap-3 ${cfg.statBg} ${cfg.statBorder}`}>
            <div className={`w-10 h-10 rounded-lg ${cfg.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={cfg.iconColor} />
            </div>
            <div>
                <p className={`text-2xl font-bold ${cfg.statValue}`}>{count}</p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function FunnelBar({ grouped, total }) {
    if (total === 0) return null;
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Application Funnel</p>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                {STATUS_KEYS.map((key) => {
                    const cfg = STATUS_CONFIG[key];
                    const pct = total > 0 ? (grouped[key]?.length / total) * 100 : 0;
                    if (pct === 0) return null;
                    return (
                        <div
                            key={key}
                            className={`${cfg.barColor} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                            title={`${cfg.label}: ${grouped[key]?.length}`}
                        />
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                {STATUS_KEYS.map((key) => {
                    const cfg = STATUS_CONFIG[key];
                    const count = grouped[key]?.length ?? 0;
                    return (
                        <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                            {cfg.label}: <span className="font-semibold text-gray-700">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <div className="flex gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse shrink-0" />
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 mb-4 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3.5 bg-gray-100 rounded w-1/3" />
                        <div className="h-3 bg-gray-100 rounded w-1/4" />
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-16" />
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
    const { applications, loading, error, deleteApplication } = useApplications();
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const grouped = useMemo(() => {
        const map = {};
        STATUS_KEYS.forEach((k) => { map[k] = []; });
        applications.forEach((app) => {
            const key = app.status in map ? app.status : "Applied";
            map[key].push(app);
        });
        return map;
    }, [applications]);

    const filtered = useMemo(() => {
        let list = statusFilter === "All" ? applications : (grouped[statusFilter] ?? []);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (a) =>
                    a.title?.toLowerCase().includes(q) ||
                    a.company?.toLowerCase().includes(q)
            );
        }
        return list;
    }, [applications, grouped, statusFilter, searchQuery]);

    const total = applications.length;

    return (
        <div className="min-h-screen w-full bg-[#f0f4f8] px-4 py-8 md:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Back link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#3985b6] mb-6 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                {/* Page header — pastel gradient banner */}
                <div
                    className="rounded-2xl p-6 mb-6 border border-[#b8ddf0]"
                    style={{ background: "linear-gradient(135deg, #cce8f7 0%, #ddf0fb 60%, #edf7fd 100%)" }}
                >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                            <p className="text-sm text-[#3985b6] mt-1 font-medium">
                                {loading ? "Loading..." : `${total} application${total !== 1 ? "s" : ""} tracked`}
                            </p>
                        </div>
                        {/* Search */}
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by role or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-4 py-2 text-sm rounded-lg border border-[#b8ddf0] bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#3985b6]/20 focus:border-[#3985b6] w-56 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Stat cards */}
                {!loading && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <StatCard cfg={STATUS_CONFIG.Applied} count={grouped.Applied.length} label="Applied" />
                        <StatCard cfg={STATUS_CONFIG.Reviewing} count={grouped.Reviewing.length} label="In Review" />
                        <StatCard cfg={STATUS_CONFIG.Hired} count={grouped.Hired.length} label="Offers" />
                        <StatCard cfg={STATUS_CONFIG.Rejected} count={grouped.Rejected.length} label="Rejected" />
                    </div>
                )}

                {/* Funnel bar */}
                {!loading && total > 0 && (
                    <FunnelBar grouped={grouped} total={total} />
                )}

                {/* Filter tabs */}
                <div className="flex gap-2 flex-wrap mb-5">
                    {["All", ...STATUS_KEYS].map((s) => {
                        const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
                        const isActive = statusFilter === s;
                        return (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border flex items-center gap-1.5 ${
                                    isActive
                                        ? "bg-[#3985b6] text-white border-[#3985b6] shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-[#3985b6] hover:text-[#3985b6]"
                                }`}
                            >
                                {cfg && (
                                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : cfg.dot}`} />
                                )}
                                {s}
                                {!loading && s !== "All" && (
                                    <span className={`text-xs ${isActive ? "text-white/70" : "text-gray-400"}`}>
                                        {grouped[s]?.length ?? 0}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4 mb-5">
                        Failed to load applications: {error}
                    </div>
                )}

                {/* Timeline list */}
                {loading ? (
                    <div className="mt-2">
                        {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-[#f0f4f8] flex items-center justify-center mx-auto mb-4">
                            <Briefcase size={24} className="text-[#3985b6]" />
                        </div>
                        <p className="text-gray-500 font-medium">
                            {searchQuery
                                ? "No results match your search."
                                : statusFilter === "All"
                                ? "No applications yet."
                                : `No "${statusFilter}" applications.`}
                        </p>
                        {statusFilter === "All" && !searchQuery ? (
                            <Link to="/jobs" className="mt-3 inline-block text-sm text-[#3985b6] hover:underline font-medium">
                                Browse jobs to get started →
                            </Link>
                        ) : (
                            <button
                                onClick={() => { setStatusFilter("All"); setSearchQuery(""); }}
                                className="mt-3 text-sm text-[#3985b6] hover:underline font-medium"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="mt-2">
                        {filtered.map((app, idx) => (
                            <ApplicationRow
                                key={app.id}
                                app={app}
                                onDelete={deleteApplication}
                                isLast={idx === filtered.length - 1}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
