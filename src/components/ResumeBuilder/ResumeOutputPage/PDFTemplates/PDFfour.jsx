import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Link,
    Font,
} from "@react-pdf/renderer";
import TipTapParser from "../../TextEditor/TipTapParser";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        paddingTop: 48,
        paddingBottom: 48,
        paddingHorizontal: 52,
        fontSize: 10,
        color: "#000000",
        backgroundColor: "#ffffff",
    },

    // ── HEADER ──────────────────────────────────────────────────────
    headerName: {
        fontSize: 32,
        fontFamily: "Helvetica-Bold",
        letterSpacing: 0.3,
        lineHeight: 1.1,
        marginBottom: 2,
    },

    headerJobTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 3,
        color: "#000000",
    },

    headerContact: {
        fontSize: 8,
        fontFamily: "Helvetica",
        color: "#222222",
        marginTop: 2,
    },

    // ── SECTION HEADER BAR ──────────────────────────────────────────
    sectionHeaderBar: {
        backgroundColor: "#d9d9d9",
        borderRadius: 3,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginBottom: 6,
        marginTop: 2,
    },

    sectionHeaderText: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        letterSpacing: 0.8,
        color: "#222222",
        textTransform: "uppercase",
    },

    // ── SECTION WRAPPER ─────────────────────────────────────────────
    section: {
        marginTop: 12,
    },

    // ── SUMMARY ─────────────────────────────────────────────────────
    summaryText: {
        fontSize: 9,
        lineHeight: 1.45,
        color: "#111111",
        fontFamily: "Helvetica",
    },

    // ── TECHNICAL SKILLS (3-column grid) ────────────────────────────
    skillsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    skillCell: {
        width: "33.33%",
        fontSize: 9.5,
        color: "#111111",
        fontFamily: "Helvetica",
        marginBottom: 2,
        paddingRight: 4,
    },

    // ── EXPERIENCE ──────────────────────────────────────────────────
    expBlock: {
        marginBottom: 9,
    },

    expTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    expTitle: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: "#000000",
        flex: 1,
    },

    expDate: {
        fontSize: 9,
        color: "#333333",
        fontFamily: "Helvetica",
        textAlign: "right",
        marginLeft: 10,
    },

    expCompany: {
        fontSize: 9.5,
        color: "#555555",
        fontFamily: "Helvetica-Oblique",
        marginBottom: 3,
        marginTop: 1,
    },

    expBody: {
        fontSize: 9,
        lineHeight: 1.4,
        color: "#111111",
        fontFamily: "Helvetica",
    },

    // ── EDUCATION ───────────────────────────────────────────────────
    eduBlock: {
        marginBottom: 7,
    },

    eduRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    eduInstitution: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: "#000000",
    },

    eduDegree: {
        fontSize: 9,
        color: "#555555",
        fontFamily: "Helvetica-Oblique",
        marginTop: 1,
    },

    eduDate: {
        fontSize: 9,
        color: "#333333",
        fontFamily: "Helvetica",
        textAlign: "right",
        marginLeft: 10,
    },

    // ── ADDITIONAL INFORMATION ───────────────────────────────────────
    additionalRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        flexWrap: "wrap",
    },

    additionalLabel: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: "#000000",
        marginRight: 4,
    },

    additionalText: {
        fontSize: 9.5,
        fontFamily: "Helvetica",
        color: "#000000",
    },

    socialLink: {
        fontSize: 9.5,
        fontFamily: "Helvetica",
        color: "#000000",
        textDecoration: "underline",
        marginRight: 6,
    },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Section Header Bar ────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeaderBar}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
);

// ── Experience Entry ──────────────────────────────────────────────────────────
const ExpEntry = ({ data }) => (
    <View style={styles.expBlock}>
        <View style={styles.expTitleRow}>
            <Text style={styles.expTitle}>{data.title}</Text>
            <Text style={styles.expDate}>
                {data.startDate} - {data.endDate}
            </Text>
        </View>
        {data.company && (
            <Text style={styles.expCompany}>{data.company}</Text>
        )}
        {data.jobSummary && (
            <View style={styles.expBody}>
                <TipTapParser content={data.jobSummary} />
            </View>
        )}
    </View>
);

// ── Education Entry ───────────────────────────────────────────────────────────
const EduEntry = ({ data }) => (
    <View style={styles.eduBlock}>
        <View style={styles.eduRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.eduInstitution}>{data.institution}</Text>
                <Text style={styles.eduDegree}>{data.degree}</Text>
            </View>
            <Text style={styles.eduDate}>
                {data.startYear} - {data.endYear}
            </Text>
        </View>
    </View>
);

// ── Main PDF Document ─────────────────────────────────────────────────────────
const PDFone = ({
    first,
    last,
    email,
    phone,
    country,
    city,
    state,
    linkedin,
    summary,
    expData,
    eduData,
    socialData,
    certificateData,
    skillsData,
    primarySkillsData,
    jobTitle,
}) => {
    // Contact line: "City, State, Country | email | linkedin | phone"
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

    const hasAdditional =
        (socialData && socialData.length > 0) ||
        (certificateData && certificateData.length > 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* ── HEADER ── */}
                <View style={{ marginBottom: 6 }}>
                    {/* Name */}
                    <Text style={styles.headerName}>
                        {`${first || ""} ${last || ""}`.trim()}
                    </Text>

                    {/* Job Title */}
                    {jobTitle && (
                        <Text style={styles.headerJobTitle}>{jobTitle}</Text>
                    )}

                    {/* Contact line */}
                    {contactLine ? (
                        <Text style={styles.headerContact}>{contactLine}</Text>
                    ) : null}
                </View>

                {/* ── SUMMARY ── */}
                {summary && hasContent(summary) && (
                    <View style={styles.section}>
                        <SectionHeader title="Summary" />
                        <View style={styles.summaryText}>
                            <TipTapParser content={summary} />
                        </View>
                    </View>
                )}

                {/* ── TECHNICAL SKILLS ── */}
                {allSkills.length > 0 && (
                    <View style={styles.section}>
                        <SectionHeader title="Technical Skills" />
                        <View style={styles.skillsGrid}>
                            {allSkills.map((skill, i) => (
                                <Text key={i} style={styles.skillCell}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* ── PROFESSIONAL EXPERIENCE ── */}
                {expData && expData.length > 0 && (
                    <View style={styles.section}>
                        <SectionHeader title="Professional Experience" />
                        {expData.map((data, i) => (
                            <ExpEntry key={data.id || i} data={data} />
                        ))}
                    </View>
                )}

                {/* ── EDUCATION ── */}
                {eduData && eduData.length > 0 && (
                    <View style={styles.section}>
                        <SectionHeader title="Education" />
                        {eduData.map((data, i) => (
                            <EduEntry key={data.id || i} data={data} />
                        ))}
                    </View>
                )}

                {/* ── ADDITIONAL INFORMATION ── */}
                {hasAdditional && (
                    <View style={styles.section}>
                        <SectionHeader title="Additional Information" />

                        {/* Social Links */}
                        {socialData && socialData.length > 0 && (
                            <View style={styles.additionalRow}>
                                <Text style={styles.additionalLabel}>
                                    • Social Links:
                                </Text>
                                {socialData.map((data, i) => (
                                    <Link
                                        key={data.id || i}
                                        src={data.URL}
                                        style={styles.socialLink}
                                    >
                                        {data.label}
                                        {i < socialData.length - 1 ? "," : ""}
                                    </Link>
                                ))}
                            </View>
                        )}

                        {/* Certificates */}
                        {certificateData && certificateData.length > 0 && (
                            <View style={styles.additionalRow}>
                                <Text style={styles.additionalLabel}>
                                    • CERTIFICATES:
                                </Text>
                                <Text style={styles.additionalText}>
                                    {certificateData
                                        .map((d) => d.certificateName)
                                        .join(",   ")}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

            </Page>
        </Document>
    );
};

export default PDFone;