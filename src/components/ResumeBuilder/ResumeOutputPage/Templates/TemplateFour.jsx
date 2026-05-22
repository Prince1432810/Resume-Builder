import { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const TemplateFour = (props) => {
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
    const { expData } = props;
    const { eduData } = props;
    const { socialData } = props;
    const { certificateData } = props;
    const { skillsData } = props;
    const { primarySkillsData } = props;
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const A4_WIDTH = 794;
        const updateScale = () => {
            const container = document.getElementById("resume-container-four");
            if (!container) return;
            const available = container.parentElement.clientWidth;
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
            return "";
        }
    };

    // Build contact line: "City, State, Country | email | linkedin | phone"
    const contactParts = [];
    const locationStr = [city, state, country].filter(Boolean).join(", ");
    if (locationStr) contactParts.push(locationStr);
    if (email) contactParts.push(email);
    if (linkedin) contactParts.push(linkedin);
    if (phone) contactParts.push(phone);
    const contactLine = contactParts.join(" | ");

    // Combine all skills into one flat list for 3-column grid
    const allSkills = [
        ...(primarySkillsData || []).map((d) => d.primarySkillName),
        ...(skillsData || []).map((d) => d.skillName),
    ];

    // Has additional info (social or certificates)
    const hasAdditional =
        (socialData && socialData.length > 0) ||
        (certificateData && certificateData.length > 0);

    const hasSummary =
        summary && summary.replace(/<[^>]*>/g, "").trim().length > 0;

    // Section header bar — gray background, uppercase, small font
    const SectionHeader = ({ title }) => (
        <div
            style={{
                backgroundColor: "#d9d9d9",
                borderRadius: "4px",
                padding: "3px 10px",
                marginBottom: "8px",
                marginTop: "2px",
            }}
        >
            <span
                style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "0.05em",
                    color: "#222",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </span>
        </div>
    );

    return (
        <div
            id="resume-container-four"
            style={{
                width: "794px",
                height: "1123px",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                fontFamily: "Calibri, 'Times New Roman', serif",
                marginBottom: `${1123 * scale - 1123}px`,
                backgroundColor: "#ffffff",
                color: "#000000",
                boxSizing: "border-box",
                padding: "48px 52px 48px 52px",
            }}
            className="shadow-xl overflow-scroll no-scrollbar mx-auto rounded-lg border border-[#CBDAE3] place-self-center"
        >
            {/* ── HEADER ── */}
            <div style={{ marginBottom: "6px" }}>
                {/* Name */}
                <div
                    style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        lineHeight: "1.1",
                        letterSpacing: "0.01em",
                        marginBottom: "2px",
                    }}
                >
                    {`${first || ""} ${last || ""}`.trim()}
                </div>

                {/* Job title — shown from primarySkillsData[0] or a dedicated prop if available */}
                {/* The image shows "UX DESIGNER" — this maps to a role/title field.
                    If your app passes a `title` or `jobTitle` prop, use it here.
                    Falling back to primarySkillsData[0] as a proxy. */}
                {props.jobTitle && (
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: "3px",
                            color: "#000",
                        }}
                    >
                        {props.jobTitle}
                    </div>
                )}

                {/* Contact line */}
                {contactLine && (
                    <div
                        style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#222",
                            marginTop: "2px",
                        }}
                    >
                        {contactLine}
                    </div>
                )}
            </div>

            {/* ── SUMMARY ── */}
            {hasSummary && (
                <div style={{ marginTop: "14px" }}>
                    <SectionHeader title="Summary" />
                    <div
                        style={{
                            fontSize: "14px",
                            lineHeight: "1.45",
                            color: "#111",
                        }}
                        className="[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                        dangerouslySetInnerHTML={{
                            __html: jsonToHtml(summary),
                        }}
                    />
                </div>
            )}

            {/* ── TECHNICAL SKILLS ── */}
            {allSkills.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                    <SectionHeader title="Technical Skills" />
                    {/* 3-column grid layout matching image */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            rowGap: "2px",
                            columnGap: "8px",
                            fontSize: "14px",
                            color: "#111",
                            paddingLeft: "2px",
                        }}
                    >
                        {allSkills.map((skill, i) => (
                            <div key={i}>{skill}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PROFESSIONAL EXPERIENCE ── */}
            {expData && expData.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                    <SectionHeader title="Professional Experience" />
                    {expData.map((data, i) => (
                        <div key={data.id || i} style={{ marginBottom: "10px" }}>
                            {/* Title row */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                        color: "#000",
                                    }}
                                >
                                    {data.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#333",
                                        whiteSpace: "nowrap",
                                        marginLeft: "12px",
                                    }}
                                >
                                    {data.startDate} - {data.endDate}
                                </div>
                            </div>
                            {/* Company */}
                            {data.company && (
                                <div
                                    style={{
                                        fontSize: "14px",
                                        color: "#555",
                                        marginBottom: "3px",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {data.company}
                                </div>
                            )}
                            {/* Job summary */}
                            {data.jobSummary && (
                                <div
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        color: "#111",
                                    }}
                                    className="[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
                                    dangerouslySetInnerHTML={{
                                        __html: jsonToHtml(data.jobSummary),
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ── EDUCATION ── */}
            {eduData && eduData.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                    <SectionHeader title="Education" />
                    {eduData.map((data, i) => (
                        <div key={data.id || i} style={{ marginBottom: "8px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#000",
                                        }}
                                    >
                                        {data.institution}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#555",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {data.degree}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#333",
                                        whiteSpace: "nowrap",
                                        marginLeft: "12px",
                                    }}
                                >
                                    {data.startYear} - {data.endYear}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── ADDITIONAL INFORMATION (Social Links + Certificates combined) ── */}
            {hasAdditional && (
                <div style={{ marginTop: "14px" }}>
                    <SectionHeader title="Additional Information" />

                    {/* Social Links row */}
                    {socialData && socialData.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                marginBottom: "5px",
                                fontSize: "14px",
                            }}
                        >
                            <span style={{ fontWeight: "600" }}>
                                • Social Links:
                            </span>
                            <span style={{ marginLeft: "4px" }}>
                                {socialData.map((data, i) => (
                                    <span key={data.id || i}>
                                        <a
                                            href={data.URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: "underline",
                                                color: "#000",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {data.label}
                                        </a>
                                        {i < socialData.length - 1 && (
                                            <span
                                                style={{ marginRight: "6px" }}
                                            >
                                                ,
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </span>
                        </div>
                    )}

                    {/* Certificates row */}
                    {certificateData && certificateData.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "14px",
                            }}
                        >
                            <span style={{ fontWeight: "600" }}>
                                • CERTIFICATES:
                            </span>
                            <span style={{ marginLeft: "4px" }}>
                                {certificateData
                                    .map((d) => d.certificateName)
                                    .join(",   ")}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TemplateFour;
