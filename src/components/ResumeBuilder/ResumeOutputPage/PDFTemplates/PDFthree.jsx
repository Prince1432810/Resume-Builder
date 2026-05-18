import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Link,
    Font,
    Image,
    Svg,
    Circle,
    Rect,
    Path,
    G,
} from "@react-pdf/renderer";
import TipTapParser from "../../TextEditor/TipTapParser";

// ─── Styles ──────────────────────────────────────────────────────
export const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#000000",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        paddingTop: 24,
        paddingBottom: 24,
    },

    // ══════════ TOP HEADER ══════════
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 20,
        backgroundColor: "#ffffff",
        gap: 24,
    },

    photo: {
        width: 83,
        height: 98,
        borderRadius: 4,
        border: "1px solid #d1d5db",
        objectFit: "cover",
    },

    headerRight: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 10,
        gap: 12,
    },

    fullName: {
        fontSize: 21,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        letterSpacing: -0.4,
        lineHeight: 1.1,
    },

    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },

    contactText: {
        fontSize: 9,
        color: "#0177B5",
        fontFamily: "Helvetica",
    },

    separator: {
        fontSize: 9,
        color: "#cccccc",
        marginHorizontal: 2,
    },

    metaRows: {
        flexDirection: "column",
        gap: 5,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    metaLabel: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: "#222222",
        width: 68,
    },

    metaValue: {
        fontSize: 9,
        color: "#444444",
        fontFamily: "Helvetica",
    },

    metaLink: {
        fontSize: 9,
        color: "#0177B5",
        fontFamily: "Helvetica",
    },

    // ══════════ BODY ══════════
    body: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 0,
    },

    // ── Left main content ──
    leftColumn: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 32,
        paddingRight: 201, // 181 sidebar + 20 gap
        paddingBottom: 24,
    },

    // ── Right sidebar ──
    rightSidebar: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 181,
        minWidth: 181,
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 24,
        backgroundColor: "#0177B5",
        borderRadius: 9,
    },

    // ══════════ SECTION HEADINGS ══════════
    sectionHeadingWrapper: {
        marginBottom: 10,
    },

    sectionHeadingText: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        marginBottom: 3,
    },

    sectionDivider: {
        width: "100%",
        height: 1.5,
        backgroundColor: "#e0e0e0",
    },

    rightSbHeadingWrapper: {
        marginBottom: 4,
    },

    rightSbHeadingText: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: "#ffffff",
        marginBottom: 3,
    },

    rightSbDivider: {
        width: "100%",
        height: 1,
        backgroundColor: "rgba(255,255,255,0.3)",
    },

    // ══════════ SUMMARY ══════════
    summarySection: {
        marginBottom: 14,
    },

    summaryText: {
        fontSize: 8.7,
        color: "#333333",
        lineHeight: 1.75,
        fontFamily: "Helvetica",
    },

    // ══════════ EDUCATION ══════════
    eduSection: {
        marginBottom: 14,
        paddingTop: 8,
    },

    timelineItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 11,
        marginBottom: 10,
    },

    timelineIconCol: {
        flexDirection: "column",
        alignItems: "center",
        width: 27,
    },

    timelineCircle: {
        width: 27,
        height: 27,
        borderRadius: 13.5,
        backgroundColor: "#0177B5",
        alignItems: "center",
        justifyContent: "center",
    },

    timelineConnector: {
        width: 2,
        minHeight: 14,
        backgroundColor: "#0177B5",
        marginVertical: 3,
        borderRadius: 2,
        flex: 1,
    },

    timelineContent: {
        flex: 1,
        paddingTop: 2,
    },

    timelineTitle: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        lineHeight: 1.3,
    },

    timelineSubtitle: {
        fontSize: 9,
        color: "#555555",
        fontFamily: "Helvetica",
        marginTop: 1,
    },

    timelineDate: {
        fontSize: 8.3,
        color: "#888888",
        fontFamily: "Helvetica",
        marginTop: 1,
    },

    // ══════════ EXPERIENCE ══════════
    expSection: {
        marginBottom: 14,
        paddingTop: 8,
    },

    expItem: {
        flexDirection: "row",
        gap: 11,
    },

    expIconCol: {
        flexDirection: "column",
        alignItems: "center",
        width: 27,
        paddingTop: 2,
    },

    expConnector: {
        width: 2,
        backgroundColor: "#0177B5",
        marginVertical: 3,
        borderRadius: 2,
        flex: 1,
        minHeight: 14,
    },

    expContent: {
        flex: 1,
        flexDirection: "column",
    },

    expTitle: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        marginBottom: 1,
    },

    expCompany: {
        fontSize: 9,
        color: "#555555",
        fontFamily: "Helvetica",
        marginBottom: 1,
    },

    expDate: {
        fontSize: 8.7,
        color: "#0177B5",
        fontFamily: "Helvetica-Bold",
        marginBottom: 5,
    },

    expBody: {
        fontSize: 8.7,
        color: "#444444",
        lineHeight: 1.65,
        fontFamily: "Helvetica",
    },

    // ══════════ RIGHT SIDEBAR ══════════

    // Primary skill bars
    primarySkillSection: {
        marginBottom: 14,
    },

    primarySkillItem: {
        marginBottom: 12,
    },

    primarySkillName: {
        fontSize: 9.8,
        fontFamily: "Helvetica-Bold",
        color: "#ffffff",
        marginBottom: 1,
    },

    primarySkillLevel: {
        fontSize: 7.9,
        color: "rgba(255,255,255,0.75)",
        fontFamily: "Helvetica",
        marginBottom: 4,
    },

    barTrack: {
        width: "100%",
        height: 5,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 3,
        position: "relative",
    },

    // Other skills
    otherSkillsSection: {
        marginBottom: 14,
    },

    skillTagsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        marginTop: 8,
    },

    skillTag: {
        backgroundColor: "rgba(255,255,255,0.15)",
        color: "#ffffff",
        fontSize: 7.9,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontFamily: "Helvetica",
    },

    // Certifications
    certSection: {
        marginBottom: 14,
    },

    certItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 6,
        marginBottom: 9,
    },

    certBullet: {
        fontSize: 10.5,
        color: "#ffffff",
        fontFamily: "Helvetica",
        marginTop: 1,
    },

    certName: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: "#ffffff",
        lineHeight: 1.3,
    },

    certOrg: {
        fontSize: 7.9,
        color: "rgba(255,255,255,0.8)",
        fontFamily: "Helvetica",
        marginTop: 1,
    },

    certDate: {
        fontSize: 7.5,
        color: "rgba(255,255,255,0.65)",
        fontFamily: "Helvetica",
        marginTop: 1,
    },

    // Links
    linksSection: {},

    linkItem: {
        fontSize: 8.3,
        color: "rgba(255,255,255,0.9)",
        textDecoration: "underline",
        fontFamily: "Helvetica",
        marginBottom: 4,
        wordBreak: "break-all",
    },
});

// ─── Helpers ─────────────────────────────────────────────────────
const hasContent = (jsonStr) => {
    try {
        const parsed = JSON.parse(jsonStr);
        const text = parsed.content
            ?.map((n) => n.content?.map((c) => c.text || "").join("") || "")
            .join("");
        return text && text.trim().length > 0;
    } catch {
        return false;
    }
};

const levelToWidth = (level) => {
    const map = {
        expert: 1.0,
        advanced: 0.8,
        intermediate: 0.6,
        elementary: 0.4,
        beginner: 0.2,
    };
    return map[level?.toLowerCase()] ?? 0.5;
};

const levelToRating = (level) => {
    const map = {
        expert: 10,
        advanced: 8,
        intermediate: 6,
        elementary: 4,
        beginner: 2,
    };
    return map[level?.toLowerCase()] ?? 5;
};

// ─── School Icon (SVG inline) ─────────────────────────────────────
const SchoolIconSvg = () => (
    <Svg width="14" height="14" viewBox="0 0 24 24">
        <Path
            d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
            fill="#ffffff"
        />
    </Svg>
);

// ─── Business Icon (SVG inline) ───────────────────────────────────
const BusinessIconSvg = () => (
    <Svg width="14" height="14" viewBox="0 0 24 24">
        <Path
            d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
            fill="#ffffff"
        />
    </Svg>
);

// ─── Mail Icon ────────────────────────────────────────────────────
const MailIconSvg = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24">
        <Path
            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="#0177B5"
        />
    </Svg>
);

// ─── Call Icon ────────────────────────────────────────────────────
const CallIconSvg = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24">
        <Path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="#0177B5"
        />
    </Svg>
);

// ─── Location Icon ────────────────────────────────────────────────
const LocationIconSvg = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24">
        <Path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
            fill="#0177B5"
        />
    </Svg>
);

// ─── LinkedIn Icon ────────────────────────────────────────────────
const LinkedInIconSvg = () => (
    <Svg width="12" height="12" viewBox="0 0 24 24">
        <Path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="#0177B5"
        />
    </Svg>
);

// ─── Skill Bar with circle indicator ─────────────────────────────
const SkillBar = ({ level }) => {
    const ratio = levelToWidth(level);
    const rating = levelToRating(level);
    // The bar track is full width of the sidebar content (~141pt after padding)
    // We render track + filled portion + circle at the end
    const TRACK_WIDTH = 141;
    const TRACK_HEIGHT = 5;
    const CIRCLE_R = 9;
    const filledWidth = TRACK_WIDTH * ratio;

    return (
        <View
            style={{
                position: "relative",
                height: TRACK_HEIGHT + CIRCLE_R * 2,
                marginTop: 2,
            }}
        >
            {/* Track */}
            <View
                style={{
                    position: "absolute",
                    top: CIRCLE_R - TRACK_HEIGHT / 2,
                    left: 0,
                    width: TRACK_WIDTH,
                    height: TRACK_HEIGHT,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    borderRadius: 3,
                }}
            />
            {/* Filled */}
            <View
                style={{
                    position: "absolute",
                    top: CIRCLE_R - TRACK_HEIGHT / 2,
                    left: 0,
                    width: filledWidth,
                    height: TRACK_HEIGHT,
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                }}
            />
            {/* Circle indicator */}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: filledWidth - CIRCLE_R,
                    width: CIRCLE_R * 2,
                    height: CIRCLE_R * 2,
                    borderRadius: CIRCLE_R,
                    backgroundColor: "#0177B5",
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 6,
                        fontFamily: "Helvetica-Bold",
                        color: "#ffffff",
                    }}
                >
                    {rating}
                </Text>
            </View>
        </View>
    );
};

// ─── Section Heading (Left) ───────────────────────────────────────
const SectionHeading = ({ children }) => (
    <View style={styles.sectionHeadingWrapper} minPresenceAhead={60}>
        <Text style={styles.sectionHeadingText}>{children}</Text>
        <View style={styles.sectionDivider} />
    </View>
);

// ─── Right Sidebar Heading ────────────────────────────────────────
const RightSbHeading = ({ children }) => (
    <View style={styles.rightSbHeadingWrapper}>
        <Text style={styles.rightSbHeadingText}>{children}</Text>
        <View style={styles.rightSbDivider} />
    </View>
);

// ─── Main PDF Document ────────────────────────────────────────────
const PDFthree = ({
    first,
    last,
    email,
    phone,
    country,
    city,
    state,
    linkedin,
    summary,
    expData = [],
    eduData = [],
    socialData = [],
    certificateData = [],
    skillsData = [],
    primarySkillsData = [],
    totalExperience,
}) => {
    const hasLocation = city || state || country;
    const locationStr = [city, state, country].filter(Boolean).join(", ");

    const hasSummary =
        summary && summary.replace(/<[^>]*>/g, "").trim().length > 0;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* ═══════════════ TOP HEADER ═══════════════ */}
                <View style={styles.header}>
                    {/* Photo */}
                    <Image src="/oggyFace.jpg" style={styles.photo} />

                    {/* Name + contact */}
                    <View style={styles.headerRight}>
                        {/* Name row with email + phone */}
                        <View style={styles.nameRow}>
                            <Text style={styles.fullName}>
                                {first} {last}
                            </Text>

                            {email && (
                                <View style={styles.contactItem}>
                                    <MailIconSvg />
                                    <Text style={styles.contactText}>
                                        {email}
                                    </Text>
                                </View>
                            )}

                            {phone && (
                                <>
                                    <Text style={styles.separator}>|</Text>
                                    <View style={styles.contactItem}>
                                        <CallIconSvg />
                                        <Text style={styles.contactText}>
                                            {phone}
                                        </Text>
                                    </View>
                                </>   
                            )}
                        </View>
                        <div>

                        </div>

                        {/* Meta rows */}
                        <View style={styles.metaRows}>
                            {totalExperience && (
                                <View style={styles.metaRow}>
                                    <Text style={styles.metaLabel}>
                                        Experience
                                    </Text>
                                    <Text style={styles.metaValue}>
                                        {totalExperience}
                                    </Text>
                                </View>
                            )}
                            {hasLocation && (
                                <View style={styles.metaRow}>
                                    <Text style={styles.metaLabel}>
                                        Location
                                    </Text>
                                    <Text style={styles.metaValue}>
                                        {locationStr}
                                    </Text>
                                </View>
                            )}
                            {linkedin && (
                                <View style={styles.metaRow}>
                                    <Text style={styles.metaLabel}>
                                        LinkedIn
                                    </Text>
                                    <Link
                                        src={linkedin}
                                        style={styles.metaLink}
                                    >
                                        {linkedin}
                                    </Link>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* ═══════════════ BODY: LEFT + RIGHT ═══════════════ */}
                <View style={styles.body}>
                    {/* ── LEFT MAIN CONTENT ── */}
                    <View style={styles.leftColumn}>
                        {/* SUMMARY */}
                        {hasSummary && (
                            <View style={styles.summarySection}>
                                <View style={styles.summaryText}>
                                    <TipTapParser content={summary} />
                                </View>
                            </View>
                        )}

                        {/* EDUCATION */}
                        {eduData.length > 0 && (
                            <View style={styles.eduSection}>
                                <SectionHeading>Education</SectionHeading>
                                <View style={{ marginTop: 10 }}>
                                    {eduData.map((edu, idx) => (
                                        <View
                                            key={edu.id}
                                            wrap={false}
                                            style={styles.timelineItem}
                                        >
                                            {/* Icon col */}
                                            <View
                                                style={styles.timelineIconCol}
                                            >
                                                <View
                                                    style={
                                                        styles.timelineCircle
                                                    }
                                                >
                                                    <SchoolIconSvg />
                                                </View>
                                                {idx < eduData.length - 1 && (
                                                    <View
                                                        style={
                                                            styles.timelineConnector
                                                        }
                                                    />
                                                )}
                                            </View>
                                            {/* Text */}
                                            <View
                                                style={styles.timelineContent}
                                            >
                                                <Text
                                                    style={styles.timelineTitle}
                                                >
                                                    {edu.institution}
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.timelineSubtitle
                                                    }
                                                >
                                                    {edu.degree}
                                                </Text>
                                                <Text
                                                    style={styles.timelineDate}
                                                >
                                                    {edu.startYear}
                                                    {edu.endYear
                                                        ? `-${edu.endYear}`
                                                        : ""}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* EXPERIENCE */}
                        {expData.length > 0 && (
                            <View style={styles.expSection}>
                                <SectionHeading>Experience</SectionHeading>
                                <View style={{ marginTop: 10 }}>
                                    {expData.map((exp, idx) => (
                                        <View
                                            key={exp.id}
                                            style={[
                                                styles.expItem,
                                                idx < expData.length - 1 && {
                                                    marginBottom: 18,
                                                },
                                            ]}
                                        >
                                            {/* Icon col */}
                                            <View style={styles.expIconCol}>
                                                <View
                                                    style={
                                                        styles.timelineCircle
                                                    }
                                                >
                                                    <BusinessIconSvg />
                                                </View>
                                                {/* Always render connector (matches TemplateThree which renders for all) */}
                                                <View
                                                    style={styles.expConnector}
                                                />
                                            </View>
                                            {/* Content */}
                                            <View style={styles.expContent}>
                                                <Text style={styles.expTitle}>
                                                    {exp.title}
                                                </Text>
                                                <Text style={styles.expCompany}>
                                                    {exp.company}
                                                    {exp.location
                                                        ? ` • ${exp.location}`
                                                        : ""}
                                                </Text>
                                                <Text style={styles.expDate}>
                                                    {exp.startDate}
                                                    {exp.endDate
                                                        ? ` - ${exp.endDate}`
                                                        : ""}
                                                </Text>
                                                <View style={styles.expBody}>
                                                    <TipTapParser
                                                        content={exp.jobSummary}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* ── RIGHT SIDEBAR ── */}
                    <View style={styles.rightSidebar}>
                        {/* PRIMARY SKILLS with bars */}
                        {primarySkillsData.length > 0 && (
                            <View style={styles.primarySkillSection}>
                                {primarySkillsData.map((skill) => (
                                    <View
                                        key={skill.id}
                                        style={styles.primarySkillItem}
                                    >
                                        <Text style={styles.primarySkillName}>
                                            {skill.primarySkillName}
                                        </Text>
                                        <Text style={styles.primarySkillLevel}>
                                            {skill.level || "Advanced"}
                                        </Text>
                                        <SkillBar
                                            level={skill.level || "advanced"}
                                        />
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* OTHER SKILLS */}
                        {skillsData.length > 0 && (
                            <View style={styles.otherSkillsSection}>
                                <RightSbHeading>Other Skills</RightSbHeading>
                                <View style={styles.skillTagsWrapper}>
                                    {skillsData.map((s) => (
                                        <Text
                                            key={s.id}
                                            style={styles.skillTag}
                                        >
                                            {s.skillName}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* CERTIFICATIONS */}
                        {certificateData.length > 0 && (
                            <View style={styles.certSection}>
                                <RightSbHeading>Certification</RightSbHeading>
                                <View style={{ marginTop: 8 }}>
                                    {certificateData.map((cert) => (
                                        <View
                                            key={cert.id}
                                            style={styles.certItem}
                                        >
                                            <Text style={styles.certBullet}>
                                                •
                                            </Text>
                                            <View>
                                                <Text style={styles.certName}>
                                                    {cert.certificateName}
                                                </Text>
                                                <Text style={styles.certOrg}>
                                                    Issuing Organization:{" "}
                                                    {cert.organization}
                                                </Text>
                                                <Text style={styles.certDate}>
                                                    {cert.month}
                                                    {cert.year
                                                        ? `-${cert.year}`
                                                        : ""}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* LINKS */}
                        {socialData.length > 0 && (
                            <View style={styles.linksSection}>
                                <RightSbHeading>Links</RightSbHeading>
                                <View
                                    style={{
                                        marginTop: 8,
                                        flexDirection: "column",
                                        gap: 4,
                                    }}
                                >
                                    {socialData.map((s) => (
                                        <Link
                                            key={s.id}
                                            src={s.URL}
                                            style={styles.linkItem}
                                        >
                                            {s.label}
                                        </Link>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFthree;
