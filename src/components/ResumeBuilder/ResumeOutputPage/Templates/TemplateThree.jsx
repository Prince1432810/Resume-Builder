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

const TemplateThree = (props) => {
    const {
        first,
        last,
        email,
        phone,
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

    // skill level bar widths based on primarySkillsData level or index fallback
    // const barWidths = ["90%", "80%", "100%", "70%", "60%", "68%"];

    const levelToWidth = (level) => {
        const map = {
            expert: "100%",
            advanced: "80%",
            intermediate: "60%",
            elementary: "40%",
            beginner: "20%",
        };
        return map[level?.toLowerCase()] || "50%";
    };

    const levelToRating = (level) => {
        const map = {
            expert: 10,
            advanced: 8,
            intermediate: 6,
            elementary: 4,
            beginner: 2,
        };
        return map[level?.toLowerCase()] || 5;
    };

    return (
        <div className="overflow-scroll no-scrollbar">
            <div
                id="resume-container"
                style={{
                    width: "794px",
                    minHeight: "1123px",
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    marginBottom: `${1123 * scale - 1123}px`,
                    fontFamily: "Calibri, 'Segoe UI', sans-serif",
                }}
                className="flex flex-col bg-white overflow-hidden shadow-md"
            >
                {/* ═══════════════ TOP HEADER ═══════════════ */}
                <div className="flex flex-row items-center px-8 pt-6 pb-5 bg-white gap-6">
                    {/* Photo */}
                    <div
                        style={{
                            width: "110px",
                            height: "130px",
                            minWidth: "110px",
                        }}
                        className="overflow-hidden rounded-md border border-gray-300 shrink-0"
                    >
                        <img
                            src="/oggyFace.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Name + contact row */}
                    <div className="flex-1 flex flex-col justify-center">
                        {/* Name + email + phone in one row */}
                        <div className="flex flex-row items-center gap-4 mb-3 flex-wrap">
                            <span
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "800",
                                    color: "#111",
                                    letterSpacing: "-0.5px",
                                    lineHeight: 1.1,
                                }}
                            >
                                {first} {last}
                            </span>
                            {email && (
                                <span
                                    className="flex items-center gap-1"
                                    style={{
                                        color: "#0177B5",
                                        fontSize: "12px",
                                    }}
                                >
                                    <MailIcon
                                        style={{
                                            fontSize: "16px",
                                            color: "#0177B5",
                                        }}
                                    />
                                    <span>{email}</span>
                                </span>
                            )}
                            {phone && (
                                <>
                                    <span style={{ color: "#ccc" }}>|</span>
                                    <span
                                        className="flex items-center gap-1"
                                        style={{
                                            color: "#0177B5",
                                            fontSize: "12px",
                                        }}
                                    >
                                        <CallIcon
                                            style={{
                                                fontSize: "16px",
                                                color: "#0177B5",
                                            }}
                                        />
                                        <span>{phone}</span>
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Meta rows */}
                        <div className="flex flex-col gap-[6px]">
                            {/* Experience row — if you have it in props, render it */}
                            {props.totalExperience && (
                                <div className="flex flex-row items-center gap-2">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            color: "#222",
                                            width: "90px",
                                        }}
                                    >
                                        Experience
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "#444",
                                        }}
                                    >
                                        {props.totalExperience}
                                    </span>
                                </div>
                            )}
                            {(city || state || country) && (
                                <div className="flex flex-row items-center gap-2">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            color: "#222",
                                            width: "90px",
                                        }}
                                    >
                                        Location
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "#444",
                                        }}
                                    >
                                        {[city, state, country]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                </div>
                            )}
                            {linkedin && (
                                <div className="flex flex-row items-center gap-2">
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            color: "#222",
                                            width: "90px",
                                        }}
                                    >
                                        LinkedIn
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "#0177B5",
                                        }}
                                    >
                                        <a href={linkedin} target="_blank">
                                            {linkedin}
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ═══════════════ BODY: LEFT + RIGHT ═══════════════ */}
                <div className="flex flex-row flex-1">
                    {/* LEFT MAIN CONTENT */}
                    <div className="flex-1 flex flex-col px-8 pb-6">
                        {/* SUMMARY */}
                        {hasSummary && (
                            <div className="mb-5">
                                <div
                                    className="text-[12px] text-[#333] leading-[1.75]"
                                    dangerouslySetInnerHTML={{
                                        __html: jsonToHtml(summary),
                                    }}
                                />
                            </div>
                        )}

                        {/* EDUCATION */}
                        {eduData.length > 0 && (
                            <div className="mb-5">
                                <SectionHeading>Education</SectionHeading>
                                <div className="mt-3 flex flex-col gap-0">
                                    {eduData.map((edu, idx) => (
                                        <div
                                            key={edu.id}
                                            className="flex flex-row items-start gap-3 mb-[14px]"
                                        >
                                            {/* Icon + connector */}
                                            <div className="flex flex-col items-center shrink-0">
                                                <div
                                                    style={{
                                                        width: "36px",
                                                        height: "36px",
                                                        background: "#0177B5",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <SchoolIcon
                                                        style={{
                                                            fontSize: "18px",
                                                            color: "#fff",
                                                        }}
                                                    />
                                                </div>
                                                {idx < eduData.length - 1 && (
                                                    <div
                                                        style={{
                                                            width: "2px",
                                                            flex: 1,
                                                            minHeight: "16px",
                                                            background:
                                                                "#0177B5",
                                                            margin: "3px 0",
                                                            borderRadius: "2px",
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            {/* Text */}
                                            <div className="flex-1 pt-[2px]">
                                                <div
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                        color: "#111",
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    {edu.institution}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#555",
                                                        marginTop: "1px",
                                                    }}
                                                >
                                                    {edu.degree}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "11px",
                                                        color: "#888",
                                                        marginTop: "1px",
                                                    }}
                                                >
                                                    {edu.startYear}
                                                    {edu.endYear
                                                        ? `–${edu.endYear}`
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE */}
                        {expData.length > 0 && (
                            <div className="mb-5">
                                <SectionHeading>Experience</SectionHeading>
                                <div className="mt-3">
                                    {expData.map((exp, idx) => (
                                        <div
                                            key={exp.id}
                                            className={`flex flex-row gap-3 ${idx < expData.length - 1 ? "mb-6" : ""}`}
                                        >
                                            {/* Icon + connector */}
                                            <div className="flex flex-col items-center shrink-0 pt-[2px]">
                                                <div
                                                    style={{
                                                        width: "36px",
                                                        height: "36px",
                                                        background: "#0177B5",
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <BusinessIcon
                                                        style={{
                                                            fontSize: "18px",
                                                            color: "#fff",
                                                        }}
                                                    />
                                                </div>
                                                {idx < expData.length && (
                                                    <div
                                                        style={{
                                                            width: "2px",
                                                            flex: 1,
                                                            minHeight: "16px",
                                                            background:
                                                                "#0177B5",
                                                            margin: "3px 0",
                                                            borderRadius: "2px",
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 flex flex-col">
                                                <div
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                        color: "#111",
                                                        marginBottom: "1px",
                                                    }}
                                                >
                                                    {exp.title}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#555",
                                                        marginBottom: "1px",
                                                    }}
                                                >
                                                    {exp.company}
                                                    {exp.location
                                                        ? ` • ${exp.location}`
                                                        : ""}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "11.5px",
                                                        color: "#0177B5",
                                                        fontWeight: "600",
                                                        marginBottom: "6px",
                                                    }}
                                                >
                                                    {exp.startDate}
                                                    {exp.endDate
                                                        ? ` – ${exp.endDate}`
                                                        : ""}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "11.5px",
                                                        color: "#444",
                                                        lineHeight: 1.65,
                                                    }}
                                                    className="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
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
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="flex flex-col px-5 py-6 self-stretch w-[240px] min-w-[240px] bg-[#0177B5] rounded-xl">
                        {/* PRIMARY SKILLS with bars */}
                        {primarySkillsData.length > 0 && (
                            <div className="mb-5">
                                {primarySkillsData.map((skill, idx) => (
                                    <div key={skill.id} className="mb-4">
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "700",
                                                color: "#fff",
                                                marginBottom: "2px",
                                            }}
                                        >
                                            {skill.primarySkillName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "10.5px",
                                                color: "rgba(255,255,255,0.75)",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {skill.level || "Advanced"}
                                        </div>
                                        {/* Bar with circle indicator */}
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "6px",
                                                background:
                                                    "rgba(255,255,255,0.25)",
                                                borderRadius: "3px",
                                                overflow: "visible",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: "100%",
                                                    background: "#fff",
                                                    borderRadius: "3px",
                                                    width: levelToWidth(
                                                        skill.level,
                                                    ),
                                                    position: "relative",
                                                }}
                                            >
                                                {/* Circle indicator at end of bar */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        right: "-9px",
                                                        top: "50%",
                                                        transform:
                                                            "translateY(-50%)",
                                                        width: "18px",
                                                        height: "18px",
                                                        borderRadius: "50%",
                                                        background: "#0177B5",
                                                        border: "2px solid #fff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        fontSize: "8px",
                                                        fontWeight: "700",
                                                        color: "#fff",
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    {levelToRating(skill.level)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* OTHER SKILLS */}
                        {skillsData.length > 0 && (
                            <div className="mb-5">
                                <RightSbHeading>Other Skills</RightSbHeading>
                                <div className="flex flex-wrap gap-[6px] mt-2">
                                    {skillsData.map((s) => (
                                        <span
                                            key={s.id}
                                            className="bg-white/15 text-white text-[10.5px] px-2 py-[3px] rounded-[3px]"
                                        >
                                            {s.skillName}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CERTIFICATIONS */}
                        {certificateData.length > 0 && (
                            <div className="mb-5">
                                <RightSbHeading>Certification</RightSbHeading>
                                <div className="mt-2 flex flex-col gap-[12px]">
                                    {certificateData.map((cert) => (
                                        <div
                                            key={cert.id}
                                            className="flex flex-row items-start gap-2"
                                        >
                                            <span
                                                style={{
                                                    color: "#fff",
                                                    fontSize: "14px",
                                                    marginTop: "1px",
                                                }}
                                            >
                                                •
                                            </span>
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "700",
                                                        color: "#fff",
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    {cert.certificateName}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "10.5px",
                                                        color: "rgba(255,255,255,0.8)",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    Issuing Organization:{" "}
                                                    {cert.organization}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "10px",
                                                        color: "rgba(255,255,255,0.65)",
                                                        marginTop: "1px",
                                                    }}
                                                >
                                                    {cert.month}
                                                    {cert.year
                                                        ? `-${cert.year}`
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* LINKS */}
                        {socialData.length > 0 && (
                            <div>
                                <RightSbHeading>Links</RightSbHeading>
                                <div className="flex flex-col gap-1 mt-2">
                                    {socialData.map((s) => (
                                        <a
                                            key={s.id}
                                            href={s.URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                color: "rgba(255,255,255,0.9)",
                                                fontSize: "11px",
                                                textDecoration: "underline",
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {s.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Left section heading ── */
const SectionHeading = ({ children }) => (
    <div>
        <div
            style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "4px",
            }}
        >
            {children}
        </div>
        <div
            style={{ width: "100%", height: "1.5px", background: "#e0e0e0" }}
        />
    </div>
);

/* ── Right sidebar heading ── */
const RightSbHeading = ({ children }) => (
    <div>
        <div
            style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "4px",
            }}
        >
            {children}
        </div>
        <div
            style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.3)",
            }}
        />
    </div>
);

export default TemplateThree;
