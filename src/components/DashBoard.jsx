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

                <div className="bg-white w-full lg:w-[70%] grow-0 min-w-0 rounded-xl overflow-hidden shadow-sm border border-gray-100 self-start">
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

                    <div className="p-5">
                        {loadingJobs ? (
                            <div className="flex gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="w-1/2 sm:w-1/2 w-full h-40 bg-gray-100 rounded-xl animate-pulse" />
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

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row w-full mt-4 gap-3 items-stretch">
                <Generate />
                <ApplicationSummary />
            </div>
        </div>
    );
};

/* ─── Responsive Sliding Carousel ─── */
const JobsCarousel = ({ jobs, onJobClick }) => {
    const [current, setCurrent] = useState(0);
    const [sliding, setSliding] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef(null);
    const touchStartX = useRef(null);
    const total = jobs.length;

    // Detect mobile breakpoint
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // On mobile show 1 card, on desktop show 2
    const visibleCount = isMobile ? 1 : 2;

    const next = () => {
        if (sliding || total <= visibleCount) return;
        setSliding(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
            setSliding(false);
        }, 450);
    };

    const prev = () => {
        if (sliding || total <= visibleCount) return;
        setSliding(true);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + total) % total);
            setSliding(false);
        }, 450);
    };

    // Auto-play
    useEffect(() => {
        if (total <= visibleCount) return;
        intervalRef.current = setInterval(next, 3000);
        return () => clearInterval(intervalRef.current);
    }, [total, sliding, visibleCount]);

    // Touch swipe support
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? next() : prev();
        }
        touchStartX.current = null;
    };

    if (total === 0) {
        return (
            <p className="text-gray-400 text-sm text-center py-10">
                No jobs available right now.
            </p>
        );
    }

    // Build visible cards array
    const visibleJobs = Array.from({ length: visibleCount + 1 }, (_, i) =>
        jobs[(current + i) % total]
    );

    // Translate by one card width (including gap)
    const cardWidthPercent = 100 / visibleCount;
    const gapPx = 16;

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="overflow-hidden w-full">
                <div
                    className="flex"
                    style={{
                        gap: `${gapPx}px`,
                        transform: sliding
                            ? `translateX(calc(-${cardWidthPercent}% - ${gapPx / visibleCount}px))`
                            : "translateX(0)",
                        transition: sliding
                            ? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
                            : "none",
                        willChange: "transform",
                    }}
                >
                    {visibleJobs.map((job, i) => (
                        <div
                            key={`${job.id}-${i}`}
                            className="cursor-pointer shrink-0"
                            style={{ width: `calc(${cardWidthPercent}% - ${gapPx * (visibleCount - 1) / visibleCount}px)` }}
                            onClick={onJobClick}
                        >
                            <Card jobs={job} />
                        </div>
                    ))}
                </div>
            </div>

            {total > visibleCount && (
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