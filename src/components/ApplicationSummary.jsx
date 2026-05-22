// import { seedJobs } from "../firebase/seedJobs";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../firebase/config";

// const deleteAllJobs = async () => {
//     const snap = await getDocs(collection(db, "jobs"));
//     for (const d of snap.docs) {
//         await deleteDoc(doc(db, "jobs", d.id));
//     }
//     alert("All jobs deleted!");
// };

// // Add this button temporarily next to your existing button
// {/* <button onClick={deleteAllJobs} className="bg-red-500 p-2 rounded-md text-white w-fit px-10 text-sm font-semibold">
//     Delete All Jobs
// </button> */}


// const AiInterview = () => {
//     return (
//         <div className="flex flex-col lg:flex-row w-full lg:h-auto bg-white border border-gray-200 rounded-md">
//             <div className="sm:lg:w-[30%] lg:h-auto">
//                 <img
//                     className="h-full w-full mr-5 object-cover rounded-md"
//                     src="https://www.ttnews.com/sites/default/files/2023-09/iTECH-Dysart-1200.jpg"
//                     alt=""
//                 />
//             </div>
//             <div className="flex flex-col w-full lg:w-[70%] mb-15 p-4">
//                 <strong className="text-2xl mb-2">AI Mock Interview</strong>
//                 <p className="text-gray-500 text-sm mb-2">
//                     Assess your skills, communication, and confidence in
//                     real-time. Receive instant, actionable feedback to identify
//                     strengths and weaknesses, refine your performance, and
//                     continuously improve your interview readiness for career
//                     success.
//                 </p>
//                 <button className="bg-[#3985b6] p-2  rounded-md text-white w-fit pl-10 pr-10 text-sm font-semibold active:bg-[#4898ce]">
//                     Start Mock Interview
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AiInterview;








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const ApplicationSummary = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;
        const unsub = onSnapshot(
            collection(db, "applications", user.id, "jobs"),
            (snap) => {
                setApps(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            (err) => {
                console.error(err);
                setLoading(false);
            }
        );
        return () => unsub();
    }, [user?.id]);

    const total = apps.length;
    const reviewing = apps.filter((a) => a.status === "Reviewing").length;
    const hired = apps.filter((a) => a.status === "Hired").length;
    const rejected = apps.filter((a) => a.status === "Rejected").length;

    // Latest 2 applications for preview
    const recent = [...apps]
        .sort((a, b) => (b.appliedAt?.toMillis?.() || 0) - (a.appliedAt?.toMillis?.() || 0))
        .slice(0, 2);

    return (
        <div className="flex flex-col w-full lg:w-[70%] bg-white border border-gray-100 shadow-sm rounded-xl p-5 gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <strong className="text-gray-800 text-lg">My Applications</strong>
                    <p className="text-sm text-gray-400">Track your job application status</p>
                </div>
                <button
                    onClick={() => navigate("/applications")}
                    className="bg-[#3985b6] hover:bg-[#2e6fa0] active:bg-[#25608e] transition-colors text-white text-sm font-semibold cursor-pointer px-4 py-2 rounded-lg"
                >
                    View All →
                </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard label="Total Applied" value={loading ? "—" : total} color="bg-blue-50 text-blue-600 border-blue-100" />
                <StatCard label="In Review" value={loading ? "—" : reviewing} color="bg-yellow-50 text-yellow-600 border-yellow-100" />
                <StatCard label="Hired" value={loading ? "—" : hired} color="bg-green-50 text-green-600 border-green-100" />
                <StatCard label="Rejected" value={loading ? "—" : rejected} color="bg-red-50 text-red-500 border-red-100" />
            </div>

            {/* Recent applications preview */}
            {!loading && recent.length > 0 && (
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Recent</p>
                    {recent.map((app) => (
                        <RecentRow key={app.id} app={app} />
                    ))}
                </div>
            )}

            {!loading && total === 0 && (
                <div className="flex flex-col items-center justify-center py-4 text-gray-400">
                    <p className="text-sm">No applications yet.</p>
                    <button
                        onClick={() => navigate("/jobs")}
                        className="mt-2 text-[#3985b6] text-sm underline cursor-pointer"
                    >
                        Browse Jobs →
                    </button>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${color} gap-0.5`}>
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
);

const statusColors = {
    Applied: "bg-blue-100 text-blue-600",
    Reviewing: "bg-yellow-100 text-yellow-600",
    Hired: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-500",
};

const RecentRow = ({ app }) => (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5">
        <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-700 truncate">{app.title}</p>
            <p className="text-xs text-gray-400 truncate">{app.company}</p>
        </div>
        <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
                statusColors[app.status] || "bg-gray-100 text-gray-500"
            }`}
        >
            {app.status || "Applied"}
        </span>
    </div>
);

export default ApplicationSummary;
