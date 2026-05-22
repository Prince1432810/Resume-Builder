import locIcon from "../assets/CardAsset/location.svg";
import expIcon from "../assets/CardAsset/experience.svg";
import noticeIcon from "../assets/CardAsset/notice.svg";

const Card = ({ jobs }) => {
    const location =
        typeof jobs.location === "object"
            ? `${jobs.location?.type ?? ""}, ${jobs.location?.country ?? ""}`.trim().replace(/^,|,$/, "")
            : jobs.location ?? "—";

    const expMin = jobs.experience?.min ?? null;
    const expMax = jobs.experience?.max ?? null;
    const noticeMin = jobs.noticePeriod?.minDays ?? null;
    const noticeMax = jobs.noticePeriod?.maxDays ?? null;

    let skills = [];
    if (Array.isArray(jobs.skills)) {
        skills = jobs.skills.slice(0, 3);
    } else if (jobs.skills && typeof jobs.skills === "object") {
        skills = [jobs.skills.skill1, jobs.skills.skill2, jobs.skills.skill3].filter(Boolean);
    }

    const description = jobs.description
        ? jobs.description.slice(0, 80) + (jobs.description.length > 80 ? "..." : "")
        : null;

    return (
        <div className="w-full h-full rounded-xl p-4 flex flex-col justify-between gap-2 border border-blue-100"
            style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 60%, #faf5ff 100%)",
            }}
        >
            {/* Company + Title */}
            <div className="flex items-start gap-3">
                {jobs.companyLogo ? (
                    <img className="h-11 w-11 rounded-lg object-contain shrink-0 bg-white p-1 border border-blue-100" src={jobs.companyLogo} alt="logo" />
                ) : (
                    <div className="h-11 w-11 rounded-lg shrink-0 bg-[#3985b6]/15 flex items-center justify-center text-[#3985b6] font-bold text-lg border border-blue-100">
                        {jobs.company?.charAt(0) ?? "?"}
                    </div>
                )}
                <div className="min-w-0">
                    <h4 className="font-semibold text-[#3985b6] text-sm leading-tight truncate">
                        {jobs.title ?? "Untitled"}
                    </h4>
                    <h5 className="text-xs text-gray-500 mt-0.5">{jobs.company ?? "—"}</h5>
                    {jobs.salary && (
                        <span className="text-xs font-semibold text-emerald-600">{jobs.salary}</span>
                    )}
                </div>
            </div>

            {/* Description */}
            {description && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{description}</p>
            )}

            {/* Location / Experience / Notice */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                <div className="flex items-center gap-1">
                    <img className="h-3" src={locIcon} alt="" />
                    <span className="text-xs text-gray-500">{location}</span>
                </div>

                {expMin !== null && (
                    <>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1">
                            <img className="h-3" src={expIcon} alt="" />
                            <span className="text-xs text-gray-500">{expMin}-{expMax} yrs</span>
                        </div>
                    </>
                )}

                {noticeMin !== null && (
                    <>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1">
                            <img className="h-3" src={noticeIcon} alt="" />
                            <span className="text-xs text-gray-500">{noticeMin}-{noticeMax} days</span>
                        </div>
                    </>
                )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
                {skills.length > 0 ? (
                    skills.map((skill, i) => (
                        <span key={i} className="text-[10px] bg-white text-blue-600 border border-blue-100 rounded-full px-2 py-0.5 font-medium">
                            {skill}
                        </span>
                    ))
                ) : (
                    <span className="text-[10px] bg-white text-gray-400 border border-gray-100 rounded-full px-2 py-0.5">
                        No skills listed
                    </span>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1 border-t border-blue-100">
                {jobs.type && (
                    <span className="text-[10px] bg-blue-50 text-blue-500 border border-blue-100 rounded-full px-2 py-0.5 font-medium">
                        {jobs.type}
                    </span>
                )}
                <span className="text-[10px] text-gray-400 ml-auto">
                    {jobs.broadcasted ?? (jobs.postedAt?.toDate?.().toLocaleDateString() ?? "—")}
                </span>
            </div>
        </div>
    );
};

export default Card;