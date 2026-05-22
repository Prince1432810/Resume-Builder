import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Card from "./Card";
import rightIcon from "../assets/CardAsset/right_arrow.svg";
import Profile from "./Profile";
import Generate from "./Generate";
import ApplicationSummary from "./ApplicationSummary";

const DashBoard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
                const snap = await getDocs(q);
                const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            } finally {
                setLoadingJobs(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="w-full h-full pb-10">
            {/* Top Row: Recommended Jobs + Profile */}
            <div className="flex flex-col lg:flex-row w-full grow-0 gap-3">

                {/* ── Recommended Jobs Card with gradient top bar ── */}
                <div className="bg-white w-full lg:w-[70%] grow-0 min-w-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 self-start">

                    {/* Light pastel header matching profile/generate sections */}
                    <div
                        className="flex justify-between items-center px-5 py-4"
                        style={{
                            background: "linear-gradient(135deg, #cce8f7 0%, #ddf0fb 60%, #edf7fd 100%)",
                            borderBottom: "1px solid #b8ddf0",
                        }}
                    >
                        <div>
                            <strong className="text-lg text-gray-800 tracking-tight">Recommended Jobs</strong>
                            <p className="text-xs text-[#3985b6] mt-0.5">as per your profile</p>
                        </div>
                        <button
                            onClick={() => navigate("/jobs")}
                            className="flex items-center gap-1.5 text-[#3985b6] text-sm font-medium hover:underline"
                        >
                            View all jobs
                            <img className="w-4" src={rightIcon} alt="" />
                        </button>
                    </div>

                    {/* Carousel body */}
                    <div className="p-5">
                        {loadingJobs ? (
                            <div className="flex gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="w-1/2 h-40 bg-gray-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <JobsCarousel jobs={jobs} onJobClick={() => navigate("/jobs")} />
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-[30%]">
                    <Profile />
                </div>
            </div>

            {/* Bottom Row: Generate Resume + Application Summary */}
            <div className="flex flex-col sm:flex-row w-full mt-4 gap-3">
                <Generate />
                <ApplicationSummary />
            </div>
        </div>
    );
};

/* ─── Sliding Carousel (unchanged) ─── */
const JobsCarousel = ({ jobs, onJobClick }) => {
    const [current, setCurrent] = useState(0);
    const [sliding, setSliding] = useState(false);
    const intervalRef = useRef(null);
    const total = jobs.length;

    const next = () => {
        if (sliding || total < 2) return;
        setSliding(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
            setSliding(false);
        }, 450);
    };

    useEffect(() => {
        if (total < 2) return;
        intervalRef.current = setInterval(next, 3000);
        return () => clearInterval(intervalRef.current);
    }, [total, sliding]);

    if (total === 0) {
        return (
            <p className="text-gray-400 text-sm text-center py-10">
                No jobs available right now.
            </p>
        );
    }

    const i0 = current % total;
    const i1 = (current + 1) % total;
    const i2 = (current + 2) % total;
    const visibleJobs = [jobs[i0], jobs[i1], jobs[i2]];

    return (
        <div>
            <div className="overflow-hidden w-full">
                <div
                    className="flex gap-4"
                    style={{
                        transform: sliding ? "translateX(calc(-50% - 8px))" : "translateX(0)",
                        transition: sliding
                            ? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
                            : "none",
                        willChange: "transform",
                    }}
                >
                    {visibleJobs.map((job, i) => (
                        <div
                            key={`${job.id}-${i}`}
                            className="cursor-pointer flex-shrink-0"
                            style={{ width: "calc(50% - 8px)" }}
                            onClick={onJobClick}
                        >
                            <Card jobs={job} />
                        </div>
                    ))}
                </div>
            </div>

            {total > 2 && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {jobs.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-[#3985b6]" : "w-1.5 bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashBoard;