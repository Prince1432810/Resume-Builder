import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Generate = () => {
    const { tab, setTab } = useContext(UserContext);

    return (
        <div className="w-full sm:w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Top accent band */}
            <div className="bg-linear-to-br from-[#eaf4fb] to-[#d6eaf7] px-5 pt-5 pb-4 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#3985b6]/[0.07]" />
                <div className="absolute right-5 top-4 w-10 h-10 rounded-full bg-[#3985b6]/5" />

                {/* Icon */}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-[#3985b6] flex items-center justify-center shadow-md shadow-[#3985b6]/30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>

                {/* ATS badge */}
                <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[#1e6a9e] bg-[#3985b6]/10 border border-[#3985b6]/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3985b6]" />
                    ATS-OPTIMISED
                </div>
            </div>

            {/* Body */}
            <div className="px-5 pt-4 pb-5 flex flex-col gap-4">
                <div>
                    <h3 className="text-[15px] font-semibold text-gray-800 leading-snug">
                        Professional Resume
                    </h3>
                    <p className="text-[12.5px] text-gray-400 mt-1 leading-relaxed">
                        Stand out with recruiter-tested templates built for the highest acceptance rate.
                    </p>
                </div>

                <Link to="/resume-builder" onClick={() => setTab("resume")}>
                    <button className="w-full flex items-center justify-center gap-2 bg-[#3985b6] hover:bg-[#2e6fa0] active:bg-[#25608e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-[#3985b6]/25 hover:shadow-md hover:shadow-[#3985b6]/30 hover:-translate-y-px active:translate-y-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Generate Resume
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Generate;
