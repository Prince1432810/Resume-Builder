import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Link,
    Image,
} from "@react-pdf/renderer";
import TipTapParser from "../../TextEditor/TipTapParser";

// ─── Palette ──────────────────────────────────────────────────────
const BLUE = "#0177B5";
const ACCENT = "#00BFFF";
const WHITE = "#ffffff";
const SIDEBAR_W = 175; // ~260px preview → proportional for A4 pts

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: WHITE,
        fontFamily: "Helvetica",
        fontSize: 10,
        minHeight: "100%",
    },

    // ── LEFT SIDEBAR ────────────────────────────────────────────────
    sidebar: {
        width: SIDEBAR_W,
        minWidth: SIDEBAR_W,
        backgroundColor: BLUE,
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 14,
        flexDirection: "column",
        alignItems: "center",
    },

    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginBottom: 18,
        objectFit: "cover",
    },

    sbHeading: {
        color: WHITE,
        fontSize: 7.5,
        fontFamily: "Helvetica-Bold",
        letterSpacing: 1.4,
        textTransform: "uppercase",
        width: "100%",
        marginBottom: 3,
    },

    sbHeadingTop: {
        marginTop: 14,
    },

    sbDivider: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.35)",
        marginBottom: 7,
    },

    sbRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: 5,
        gap: 5,
    },

    sbRowIcon: {
        width: 9,
        height: 9,
        marginTop: 1,
    },

    sbRowText: {
        color: "rgba(255,255,255,0.90)",
        fontSize: 7.5,
        flex: 1,
        flexWrap: "wrap",
        lineHeight: 1.45,
    },

    // Education timeline
    eduRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: 8,
        gap: 6,
    },

    eduIconCol: {
        flexDirection: "column",
        alignItems: "center",
    },

    eduIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
    },

    eduConnector: {
        width: 1.5,
        flex: 1,
        minHeight: 10,
        backgroundColor: "rgba(255,255,255,0.75)",
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 1,
    },

    eduInstitution: {
        color: WHITE,
        fontSize: 7.5,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.3,
    },

    eduDegree: {
        color: "rgba(255,255,255,0.82)",
        fontSize: 7,
        marginTop: 1,
    },

    eduDate: {
        color: "rgba(255,255,255,0.70)",
        fontSize: 6.5,
    },

    // Primary skills bar
    skillBarWrapper: {
        width: "100%",
        marginBottom: 7,
    },

    skillBarLabel: {
        color: WHITE,
        fontSize: 7.5,
        marginBottom: 3,
    },

    skillBarTrack: {
        width: "100%",
        height: 4.5,
        backgroundColor: "rgba(255,255,255,0.22)",
        borderRadius: 3,
        overflow: "hidden",
    },

    skillBarFill: {
        height: "100%",
        backgroundColor: ACCENT,
        borderRadius: 3,
    },

    // Regular skills
    skillsText: {
        color: "rgba(255,255,255,0.88)",
        fontSize: 7.5,
        lineHeight: 1.9,
        width: "100%",
        flexWrap: "wrap",
    },

    // Certifications
    certRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        gap: 6,
    },

    certIconCol: {
        flexDirection: "column",
        alignItems: "center",
    },

    certIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    certConnector: {
        width: 1.5,
        flex: 1,
        minHeight: 10,
        backgroundColor: "rgba(255,255,255,0.25)",
        marginTop: 2,
        marginBottom: 2,
    },

    certName: {
        color: WHITE,
        fontSize: 7.5,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.3,
    },

    certOrg: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 7,
        marginTop: 1,
    },

    certDate: {
        color: "rgba(255,255,255,0.65)",
        fontSize: 6.5,
    },

    // Links
    socialLink: {
        color: "rgba(255,255,255,0.90)",
        fontSize: 7.5,
        textDecoration: "underline",
        marginBottom: 3,
    },

    // ── RIGHT PANEL ─────────────────────────────────────────────────
    rightPanel: {
        flex: 1,
        paddingTop: 28,
        paddingBottom: 28,
        paddingHorizontal: 24,
        flexDirection: "column",
    },

    fullName: {
        fontSize: 26,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        letterSpacing: -0.5,
        lineHeight: 1.1,
        marginBottom: 14,
    },

    // Right section heading
    rightHeadingWrapper: {
        marginBottom: 2,
    },

    rightHeadingText: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: BLUE,
        letterSpacing: 1.3,
        textTransform: "uppercase",
    },

    rightHeadingLine: {
        width: "100%",
        height: 1,
        backgroundColor: BLUE,
        marginTop: 2,
    },

    // Profile summary
    summaryText: {
        fontSize: 7.5,
        color: "#333333",
        lineHeight: 1.7,
        marginTop: 7,
        marginBottom: 14,
    },

    // Experience
    expSection: {
        marginTop: 10,
    },

    expRow: {
        flexDirection: "row",
        gap: 9,
    },

    expIconCol: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 1,
    },

    expIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: BLUE,
        alignItems: "center",
        justifyContent: "center",
    },

    expConnector: {
        width: 1.5,
        flex: 1,
        minHeight: 10,
        backgroundColor: "rgba(1,119,181,0.75)",
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 1,
    },

    expCompany: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: "#111111",
        marginBottom: 1,
    },

    expTitle: {
        fontSize: 7.5,
        color: "#555555",
        marginBottom: 2,
    },

    expDate: {
        fontSize: 7,
        color: BLUE,
        fontFamily: "Helvetica-Bold",
        marginBottom: 4,
        textAlign: "right",
    },

    expBody: {
        fontSize: 7.5,
        color: "#444444",
        lineHeight: 1.65,
    },

    expContentFlex: {
        flex: 1,
    },

    expSpacing: {
        marginBottom: 16,
    },
});

// ─── Sidebar helper components ─────────────────────────────────────

const SbHeading = ({ children, top }) => (
    <Text style={[styles.sbHeading, top ? styles.sbHeadingTop : {}]}>
        {children}
    </Text>
);

const SbDivider = () => <View style={styles.sbDivider} />;

const SbRow = ({ iconSrc, children }) => (
    <View style={styles.sbRow}>
        {iconSrc && <Image src={iconSrc} style={styles.sbRowIcon} />}
        <Text style={styles.sbRowText}>{children}</Text>
    </View>
);

// ─── Right panel heading ───────────────────────────────────────────

const RightHeading = ({ children }) => (
    <View style={styles.rightHeadingWrapper}>
        <Text style={styles.rightHeadingText}>{children}</Text>
        <View style={styles.rightHeadingLine} />
    </View>
);

// ─── Bar widths mirroring TemplateTwo ─────────────────────────────
const barWidths = ["55%", "72%", "48%", "30%", "60%", "68%"];

// ─── hasContent helper ────────────────────────────────────────────
const hasContent = (jsonStr) => {
    try {
        const parsed = JSON.parse(jsonStr);
        const text = parsed.content
            ?.map((n) => n.content?.map((c) => c.text || "").join("") || "")
            .join("");
        return text && text.trim().length > 0;
    } catch {
        return typeof jsonStr === "string" && jsonStr.trim().length > 0;
    }
};

// ─── Main PDF Document ────────────────────────────────────────────
const PDFtwo = ({
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
}) => {
    const hasSummary = summary && hasContent(summary);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* ══════════════ LEFT SIDEBAR ══════════════ */}
                <View style={styles.sidebar}>
                    {/* Avatar */}
                    <Image src="/oggyFace.jpg" style={styles.avatar} />

                    {/* CONTACT */}
                    <SbHeading>Contact</SbHeading>
                    <SbDivider />

                    {email && (
                        <SbRow iconSrc="/Icons/mailWhite.png">{email}</SbRow>
                    )}
                    {phone && (
                        <SbRow iconSrc="/Icons/callWhite.png">{phone}</SbRow>
                    )}
                    {(city || state || country) && (
                        <SbRow iconSrc="/Icons/locationWhite.png">
                            {[city, state, country].filter(Boolean).join(" , ")}
                        </SbRow>
                    )}
                    {linkedin && (
                        <SbRow iconSrc="/Icons/linkedinWhite.png">
                            {linkedin}
                        </SbRow>
                    )}

                    {/* EDUCATION */}
                    {eduData.length > 0 && (
                        <>
                            <SbHeading top>Education</SbHeading>
                            <SbDivider />
                            {eduData.map((edu, idx) => (
                                <View key={edu.id} style={styles.eduRow}>
                                    {/* Icon + connector */}
                                    <View style={styles.eduIconCol}>
                                        <View style={styles.eduIconCircle}>
                                            <Image
                                                src="/Icons/schoolWhite.png"
                                                style={{
                                                    width: 11,
                                                    height: 11,
                                                }}
                                            />
                                        </View>
                                        {idx < eduData.length - 1 && (
                                            <View style={styles.eduConnector} />
                                        )}
                                    </View>
                                    {/* Text */}
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={
                                                        styles.eduInstitution
                                                    }
                                                >
                                                    {edu.institution}
                                                </Text>
                                                <Text style={styles.eduDegree}>
                                                    {edu.degree}
                                                </Text>
                                            </View>
                                            <Text style={styles.eduDate}>
                                                {edu.startYear}
                                                {edu.endYear
                                                    ? ` - ${edu.endYear}`
                                                    : ""}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </>
                    )}

                    {/* PRIMARY SKILLS */}
                    {primarySkillsData.length > 0 && (
                        <>
                            <SbHeading top>Primary Skills</SbHeading>
                            <SbDivider />
                            {primarySkillsData.map((skill, idx) => (
                                <View
                                    key={skill.id}
                                    style={styles.skillBarWrapper}
                                >
                                    <Text style={styles.skillBarLabel}>
                                        {skill.primarySkillName}
                                    </Text>
                                    <View style={styles.skillBarTrack}>
                                        <View
                                            style={[
                                                styles.skillBarFill,
                                                {
                                                    width: barWidths[
                                                        idx % barWidths.length
                                                    ],
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            ))}
                        </>
                    )}

                    {/* SKILLS */}
                    {skillsData.length > 0 && (
                        <>
                            <SbHeading top>Skills</SbHeading>
                            <SbDivider />
                            <Text style={styles.skillsText}>
                                {skillsData.map((s, idx) => (
                                    <Text key={s.id}>
                                        {s.skillName}
                                        {idx < skillsData.length - 1 ? (
                                            <Text
                                                style={{
                                                    color: "rgba(255,255,255,0.45)",
                                                }}
                                            >
                                                {" | "}
                                            </Text>
                                        ) : null}
                                    </Text>
                                ))}
                            </Text>
                        </>
                    )}

                    {/* CERTIFICATIONS */}
                    {certificateData.length > 0 && (
                        <>
                            <SbHeading top>Certifications</SbHeading>
                            <SbDivider />
                            {certificateData.map((cert, idx) => (
                                <View key={cert.id} style={styles.certRow}>
                                    {/* Icon + connector */}
                                    <View style={styles.certIconCol}>
                                        <View style={styles.certIconCircle}>
                                            <Image
                                                src="/Icons/certificateWhite.png"
                                                style={{
                                                    width: 11,
                                                    height: 11,
                                                }}
                                            />
                                        </View>
                                        {idx < certificateData.length - 1 && (
                                            <View
                                                style={styles.certConnector}
                                            />
                                        )}
                                    </View>
                                    {/* Text */}
                                    <View
                                        style={[
                                            { flex: 1 },
                                            idx < certificateData.length - 1
                                                ? { paddingBottom: 8 }
                                                : {},
                                        ]}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.certName}>
                                                    {cert.certificateName}
                                                </Text>
                                                <Text style={styles.certOrg}>
                                                    {cert.organization}
                                                </Text>
                                            </View>
                                            <Text style={styles.certDate}>
                                                {cert.month}
                                                {cert.year
                                                    ? `-${cert.year}`
                                                    : ""}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </>
                    )}

                    {/* LINKS */}
                    {socialData.length > 0 && (
                        <>
                            <SbHeading top>Links</SbHeading>
                            <SbDivider />
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 4,
                                }}
                            >
                                {socialData.map((s) => (
                                    <Link
                                        key={s.id}
                                        src={s.URL}
                                        style={styles.socialLink}
                                    >
                                        {s.label}
                                    </Link>
                                ))}
                            </View>
                        </>
                    )}
                </View>

                {/* ══════════════ RIGHT PANEL ══════════════ */}
                <View style={styles.rightPanel}>
                    {/* Full Name */}
                    <Text style={styles.fullName}>
                        {first} {last}
                    </Text>

                    {/* PROFILE */}
                    {hasSummary && (
                        <>
                            <RightHeading>Profile</RightHeading>
                            <View style={styles.summaryText}>
                                <TipTapParser content={summary} />
                            </View>
                        </>
                    )}

                    {/* EXPERIENCES */}
                    {expData.length > 0 && (
                        <>
                            <RightHeading>Experiences</RightHeading>
                            <View style={styles.expSection}>
                                {expData.map((exp, idx) => (
                                    <View
                                        key={exp.id}
                                        style={[
                                            styles.expRow,
                                            idx < expData.length - 1
                                                ? styles.expSpacing
                                                : {},
                                        ]}
                                    >
                                        {/* Blue circle + connector */}
                                        <View style={styles.expIconCol}>
                                            <View style={styles.expIconCircle}>
                                                <Image
                                                    src="/Icons/businessWhite.png"
                                                    style={{
                                                        width: 13,
                                                        height: 13,
                                                    }}
                                                />
                                            </View>
                                            {/* Always show connector below (mirrors preview) */}
                                            <View style={styles.expConnector} />
                                        </View>

                                        {/* Content */}
                                        <View style={styles.expContentFlex}>
                                            <Text style={styles.expCompany}>
                                                {exp.company}
                                            </Text>
                                            <Text style={styles.expTitle}>
                                                {exp.title}
                                            </Text>
                                            <Text style={styles.expDate}>
                                                {exp.startDate}
                                                {exp.endDate
                                                    ? ` — ${exp.endDate}`
                                                    : ""}
                                            </Text>
                                            {exp.jobSummary &&
                                                hasContent(exp.jobSummary) && (
                                                    <View
                                                        style={styles.expBody}
                                                    >
                                                        <TipTapParser
                                                            content={
                                                                exp.jobSummary
                                                            }
                                                        />
                                                    </View>
                                                )}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default PDFtwo;
