import { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BusinessIcon from "@mui/icons-material/Business";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const TemplateTwo = (props) => {
    const {
        first,
        last,
        email,
        phone,
        photo,
        country,
        city,
        state,
        linkedin,
        summary,
    } = props;
    const { expData = [] } = props;
    const { eduData = [] } = props;
    const { socialData = [] } = props;
    const { certificateData = [] } = props;
    const { skillsData = [] } = props;
    const { primarySkillsData = [] } = props;

    const [scale, setScale] = useState(1);

    useEffect(() => {
        const A4_WIDTH = 794;
        const updateScale = () => {
            const container = document.getElementById("resume-container");
            if (!container) return;
            const available = container.parentElement?.clientWidth || A4_WIDTH;
            const newScale = Math.min(1, available / A4_WIDTH);
            setScale(newScale);
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    const jsonToHtml = (jsonString) => {
        try {
            const json = JSON.parse(jsonString);
            return generateHTML(json, [StarterKit, Underline]);
        } catch {
            return typeof jsonString === "string" ? jsonString : "";
        }
    };

    const hasSummary =
        summary && summary.replace(/<[^>]*>/g, "").trim().length > 0;

    const getLevelWidth = (level) => {
        const map = {
            beginner: "20%",
            elementary: "40%",
            intermediate: "60%",
            advanced: "80%",
            expert: "100%",
        };
        return map[(level || "").toLowerCase()] || "50%";
    };

    const initials =
        `${first || ""}${last || ""}`.length > 0
            ? `${(first || "")[0] || ""}${(last || "")[0] || ""}`.toUpperCase()
            : "?";

    return (
        <div className="overflow-scroll">
            <div
                id="resume-container"
                style={{
                    width: "794px",
                    minHeight: "1123px",
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    marginBottom: `${1123 * scale - 1123}px`,
                }}
                className="flex flex-row bg-white border border-[#CBDAE3] rounded-lg overflow-hidden shadow-md font-[Inter, Calibri,_'Segoe_UI',_sans-serif]"
            >
                {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
                <div className="w-65 min-w-65 bg-[#0177B5] flex flex-col items-center px-5 py-8 self-stretch">
                    {/* Initials Avatar */}
                    {/* <div className="w-[110px] h-[110px] rounded-full border-[3px] border-white/60 bg-white/15 flex items-center justify-center mb-7 shrink-0"> */}
                    <div className="w-27.5 h-27.5 rounded-full overflow-hidden border-[3px] border-white/60 shrink-0">
                        <img
                            src={photo || "/profile.png"}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* </div> */}

                    {/* CONTACT */}
                    <SbHeading>Contact</SbHeading>
                    <SbLine />
                    {email && (
                        <SbRow icon={<MailIcon style={{ fontSize: "13px" }} />}>
                            {email}
                        </SbRow>
                    )}
                    {phone && (
                        <SbRow icon={<CallIcon style={{ fontSize: "13px" }} />}>
                            {phone}
                        </SbRow>
                    )}
                    {(city || state || country) && (
                        <SbRow
                            icon={
                                <LocationOnIcon style={{ fontSize: "13px" }} />
                            }
                        >
                            {[city, state, country].filter(Boolean).join(" , ")}
                        </SbRow>
                    )}
                    {linkedin && (
                        <SbRow
                            icon={<LinkedInIcon style={{ fontSize: "13px" }} />}
                        >
                            {linkedin}
                        </SbRow>
                    )}

                    {/* EDUCATION */}
                    {eduData.length > 0 && (
                        <>
                            <SbHeading top>Education</SbHeading>
                            <SbLine />
                            {eduData.map((edu, idx) => (
                                <div
                                    key={edu.id}
                                    className="w-full flex flex-row items-start gap-2 mb-2.5"
                                >
                                    {/* Icon + vertical connector */}
                                    <div className="flex flex-col items-center shrink-0 h-full">
                                        <div className="w-7.5 h-7.5 rounded-full bg-white/18 flex items-center justify-center shrink-0 mt-0.5">
                                            <SchoolIcon
                                                style={{
                                                    fontSize: "15px",
                                                    color: "#fff",
                                                }}
                                            />
                                        </div>
                                        {idx < eduData.length - 1 && (
                                            <div className="w-0.5 flex-1 min-h-4 h-full bg-white/75 my-0.75 rounded-full" />
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-white text-[12px] font-bold leading-[1.3]">
                                                    {edu.institution}
                                                </div>
                                                <div className="text-white/82 text-[11px] mt-px">
                                                    {edu.degree}
                                                </div>
                                            </div>
                                            <div className="text-white/70 text-[10px] whitespace-nowrap ml-1.5 mt-0.5">
                                                {edu.startYear}
                                                {edu.endYear
                                                    ? ` - ${edu.endYear}`
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* PRIMARY SKILLS */}
                    {primarySkillsData.length > 0 && (
                        <>
                            <SbHeading top>Primary Skills</SbHeading>
                            <SbLine />
                            {primarySkillsData.map((skill, idx) => (
                                <div key={skill.id} className="w-full mb-2.25">
                                    <div className="text-white text-[11.5px] mb-1">
                                        {skill.primarySkillName}
                                    </div>
                                    <div className="w-full h-1.5 bg-white/22 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#00BFFF] rounded-full"
                                            style={{
                                                width: getLevelWidth(skill.level),
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* SKILLS */}
                    {skillsData.length > 0 && (
                        <>
                            <SbHeading top>Skills</SbHeading>
                            <SbLine />
                            <div className="text-white/88 text-[11px] leading-[1.9] w-full wrap-break-word">
                                {skillsData.map((s, idx) => (
                                    <span key={s.id}>
                                        {s.skillName}
                                        {idx < skillsData.length - 1 && (
                                            <span className="text-white/45">
                                                {" "}
                                                |{" "}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}

                    {/* CERTIFICATIONS */}
                    {certificateData.length > 0 && (
                        <>
                            <SbHeading top>Certifications</SbHeading>
                            <SbLine />
                            {certificateData.map((cert, idx) => (
                                <div
                                    key={cert.id}
                                    className="w-full flex flex-row gap-2"
                                >
                                    {/* Icon + vertical connector */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-7.5 h-7.5 rounded-full bg-white/18 flex items-center justify-center shrink-0">
                                            <WorkspacePremiumIcon
                                                style={{
                                                    fontSize: "15px",
                                                    color: "#fff",
                                                }}
                                            />
                                        </div>
                                        {idx < certificateData.length - 1 && (
                                            <div className="w-0.5 flex-1 min-h-4 bg-white/25 my-0.75" />
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div
                                        className={`flex-1 ${idx < certificateData.length - 1 ? "pb-2.5" : ""}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-white text-[11.5px] font-bold leading-[1.3]">
                                                    {cert.certificateName}
                                                </div>
                                                <div className="text-white/75 text-[10.5px] mt-px">
                                                    {cert.organization}
                                                </div>
                                            </div>
                                            <div className="text-white/65 text-[10px] whitespace-nowrap ml-1.5 mt-0.5">
                                                {cert.month}
                                                {cert.year
                                                    ? `-${cert.year}`
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* LINKS */}
                    {socialData.length > 0 && (
                        <>
                            <SbHeading top>Links</SbHeading>
                            <SbLine />
                            <div className="w-full flex gap-1">
                                {socialData.map((s) => (
                                    <a
                                        key={s.id}
                                        href={s.URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block text-white/90 text-[11px] underline mb-1.25 break-all"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* ═══════════════ RIGHT PANEL ═══════════════ */}
                <div className="flex-1 flex flex-col px-8 py-9">
                    {/* Name */}
                    <div className="text-[32px] font-extrabold text-[#111] tracking-tight leading-[1.1] mb-4.5">
                        {first} {last}
                    </div>

                    {/* PROFILE */}
                    {hasSummary && (
                        <>
                            <RightHeading>Profile</RightHeading>
                            <div
                                className="text-[12px] text-[#333] leading-[1.7] mt-2.5 mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                                dangerouslySetInnerHTML={{
                                    __html: jsonToHtml(summary),
                                }}
                            />
                        </>
                    )}

                    {/* EXPERIENCES */}
                    {expData.length > 0 && (
                        <>
                            <RightHeading>Experiences</RightHeading>
                            <div className="mt-3.5">
                                {expData.map((exp, idx) => (
                                    <div
                                        key={exp.id}
                                        className={`flex flex-row gap-3 ${idx < expData.length - 1 ? "mb-6" : ""}`}
                                    >
                                        {/* Blue circle with building icon */}
                                        <div className="flex flex-col items-center shrink-0 pt-0.5">
                                            <div className="w-9 h-9 rounded-full bg-[#0177B5] flex items-center justify-center">
                                                <BusinessIcon
                                                    style={{
                                                        fontSize: "18px",
                                                        color: "#fff",
                                                    }}
                                                />
                                            </div>
                                            {idx < expData.length && (
                                                <div className="w-0.5 flex-1 min-h-4 bg-[#0177B5]/75 my-0.75 rounded-full" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="">
                                                    <div className="text-[14px] font-bold text-[#111] mb-px">
                                                        {exp.company}
                                                    </div>
                                                    <div className="text-[11.5px] text-[#555] mb-0.5">
                                                        {exp.title}
                                                    </div>
                                                </div>
                                                <div className="text-[11px] text-[#0177B5] font-semibold mb-1.5 text-right">
                                                    {exp.startDate}
                                                    {exp.endDate
                                                        ? ` — ${exp.endDate}`
                                                        : ""}
                                                </div>
                                            </div>
                                            <div
                                                className="text-[11.5px] text-[#444] leading-[1.65] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                                                dangerouslySetInnerHTML={{
                                                    __html: jsonToHtml(
                                                        exp.jobSummary,
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Sidebar helpers ── */
const SbHeading = ({ children, top }) => (
    <p
        className={`text-white text-[11px] font-bold tracking-[1.6px] uppercase w-full mb-1.25 ${top ? "mt-5" : "mt-0"}`}
    >
        {children}
    </p>
);

const SbLine = () => <div className="w-full h-px bg-white/35 mb-2.25" />;

const SbRow = ({ icon, children }) => (
    <div className="flex items-start gap-1.75 text-white/90 text-[11px] mb-1.75 w-full break-all leading-[1.45]">
        <span className="mt-px shrink-0 text-white">{icon}</span>
        <span>{children}</span>
    </div>
);

const RightHeading = ({ children }) => (
    <div className="mb-0.5">
        <div className="text-[13px] font-bold text-[#0177B5] tracking-[1.5px] uppercase">
            {children}
        </div>
        <div className="w-full h-[1.5px] bg-[#0177B5] mt-0.75" />
    </div>
);

export default TemplateTwo;
