import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

const CATEGORY_COLORS = {
  "General Inquiry": { bg: "#e0f2fe", text: "#0369a1" },
  "Resume Builder Issue": { bg: "#fef9c3", text: "#854d0e" },
  "Job Application Issue": { bg: "#fce7f3", text: "#9d174d" },
  "Account / Login Problem": { bg: "#fee2e2", text: "#b91c1c" },
  "Bug Report": { bg: "#ffedd5", text: "#c2410c" },
  "Feature Request": { bg: "#d1fae5", text: "#065f46" },
  Other: { bg: "#f1f5f9", text: "#475569" },
};

const STATUS_COLORS = {
  Open: { bg: "#fef9c3", text: "#854d0e", dot: "#eab308" },
  "In Progress": { bg: "#e0f2fe", text: "#0369a1", dot: "#0ea5e9" },
  Resolved: { bg: "#d1fae5", text: "#065f46", dot: "#22c55e" },
  Closed: { bg: "#f1f5f9", text: "#475569", dot: "#94a3b8" },
};

function formatDate(ts) {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CategoryBadge({ category }) {
  const style = CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {category}
    </span>
  );
}

function StatusBadge({ status }) {
  const style = STATUS_COLORS[status] || STATUS_COLORS["Open"];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {status}
    </span>
  );
}

export default function SupportHistory() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const q = query(
      collection(db, "supportTickets", user.id, "tickets"),
      orderBy("submittedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTickets(data);
      setLoading(false);
    });

    return () => unsub();
  }, [user?.id]);

  const filtered = tickets.filter((t) => {
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    const matchCat =
      filterCategory === "All" || t.category === filterCategory;
    const matchSearch =
      !search ||
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase()) ||
      t.message?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Header */}
      <div
        className="w-full py-10 px-6"
        style={{
          background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
          borderBottom: "1px solid #bae6fd",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm font-medium mb-4 transition"
            style={{ color: "#1a9ec9" }}
          >
            ← Back to Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                My Support Tickets
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Track all your past support requests in one place.
              </p>
            </div>
            <button
              onClick={() => navigate("/support")}
              className="self-start sm:self-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{ backgroundColor: "#1a9ec9" }}
            >
              + New Ticket
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Tickets", value: stats.total, color: "#1a9ec9" },
            { label: "Open", value: stats.open, color: "#eab308" },
            { label: "Resolved", value: stats.resolved, color: "#22c55e" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center"
            >
              <p
                className="text-2xl font-bold"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by subject, category, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9ec9]"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9ec9]"
          >
            <option value="All">All Statuses</option>
            {Object.keys(STATUS_COLORS).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a9ec9]"
          >
            <option value="All">All Categories</option>
            {Object.keys(CATEGORY_COLORS).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Ticket List */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            Loading your tickets...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
            <p className="text-4xl mb-4">🎫</p>
            <p className="text-slate-700 font-semibold mb-1">
              {tickets.length === 0
                ? "No tickets yet"
                : "No tickets match your filters"}
            </p>
            <p className="text-slate-400 text-sm mb-6">
              {tickets.length === 0
                ? "Submit a support request and it will appear here."
                : "Try adjusting your search or filters."}
            </p>
            {tickets.length === 0 && (
              <button
                onClick={() => navigate("/support")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: "#1a9ec9" }}
              >
                Submit a Ticket
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Ticket Header Row */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer hover:bg-slate-50 transition"
                  onClick={() =>
                    setExpanded(expanded === ticket.id ? null : ticket.id)
                  }
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {ticket.subject}
                      </span>
                      <CategoryBadge category={ticket.category} />
                    </div>
                    <p className="text-xs text-slate-400">
                      Submitted on {formatDate(ticket.submittedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={ticket.status} />
                    <span className="text-slate-400 text-xs">
                      {expanded === ticket.id ? "▲ Hide" : "▼ View"}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expanded === ticket.id && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Name</p>
                        <p className="text-slate-700 font-medium">
                          {ticket.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">Email</p>
                        <p className="text-slate-700 font-medium">
                          {ticket.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">
                        Your Message
                      </p>
                      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap leading-relaxed">
                        {ticket.message}
                      </p>
                    </div>

                    {/* Ticket ID for reference */}
                    <p className="text-xs text-slate-400">
                      Ticket ID:{" "}
                      <span className="font-mono text-slate-500">
                        {ticket.id}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        {filtered.length > 0 && (
          <p className="text-center text-xs text-slate-400 pb-4">
            Showing {filtered.length} of {tickets.length} ticket
            {tickets.length !== 1 ? "s" : ""} · Sorted by newest first
          </p>
        )}
      </div>
    </div>
  );
}
