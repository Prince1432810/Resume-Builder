import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer'
import TipTapParser from '../../TextEditor/TipTapParser'
import CallIcon from '@mui/icons-material/Call';
import { Image } from '@react-pdf/renderer';


export const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    fontSize: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },

  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 4,
  },

  headerName: {
    fontSize: 27,
    fontFamily: "Times-Bold",
    textAlign: 'center',
    marginBottom: 3,
  },

  headerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 8,
    fontFamily: "Times-Bold",
    marginBottom: 2,
  },

  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: "Times-Roman",
    marginBottom: 2,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 6,
  },

  section: {
    marginTop: 15,
    marginBottom: 15,
  },

  summarySection: {
    marginTop: 15,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },

  itemTitle: {
    fontSize: 13,
    fontFamily: "Times-Roman",
  },

  itemSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: "Times-Roman",
  },

  itemDate: {
    fontSize: 10,
    textAlign: 'right',
    fontFamily: "Times-Roman",
  },

  itemLocation: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'right',
    fontFamily: "Times-Roman",
  },

  itemBody: {
    paddingLeft: 15,
    marginTop: 2,
    fontSize: 10,
    lineHeight: 1.3

  },

  entryBlock: {
    marginBottom: 6,
  },

  // ── Profile Summary text: text-[.9rem] ───────────────────────────
  summaryText: {
    fontSize: 10,
    lineHeight: 1.3
  },

  // ── Technical Skills ─────────────────────────────────────────────
  skillsWrapper: {
    flexDirection: 'column',
    gap: 6,
    marginTop: 4,
  },

  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },

  skillLabel: {
    fontSize: 12,
    fontFamily: "Times-Bold",
  },

  skillItem: {
    fontSize: 10,
    color: '#4b5563',
    fontFamily: "Times-Roman",
  },

  // ── Social links ─────────────────────────────────────────────────
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },

  link: {
    fontSize: 12,
    textDecoration: 'underline',
    color: '#000000',
    fontFamily: "Times-Roman",
  },
})

const Section = ({ title, style, children }) => (
  <View style={[styles.section, style]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.divider} />
    {children}
  </View>
)

// ─── Experience entry ─────────────────────────────────────────────
const ExpEntry = ({ data }) => (
  <View style={styles.entryBlock}>
    {/* flex justify-between text-[.9rem] */}
    <View style={styles.rowBetween}>
      {/* Left: title + company */}
      <View style={{ flex: 1 }}>
        {/* text-lg */}
        <Text style={styles.itemTitle}>{data.title}</Text>
        {/* text-md text-gray-500 */}
        <Text style={styles.itemSubtitle}>{data.company}</Text>
      </View>
      {/* Right: date + location, items-end */}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemDate}>{data.startDate} - {data.endDate}</Text>
        <Text style={styles.itemLocation}>{data.location}</Text>
      </View>
    </View>
    {/* text-sm pl-5 job summary via TipTapParser */}
    {data.jobSummary && (
      <View style={styles.itemBody}>
        <TipTapParser content={data.jobSummary} />
      </View>
    )}
  </View>
)

// ─── Education entry ──────────────────────────────────────────────
const EduEntry = ({ data }) => (
  <View style={styles.entryBlock}>
    <View style={styles.rowBetween}>
      <View style={{ flex: 1 }}>
        {/* text-lg */}
        <Text style={styles.itemTitle}>{data.institution}</Text>
        {/* text-sm text-gray-500 */}
        <Text style={[styles.itemSubtitle, { fontSize: 10 }]}>{data.degree}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemDate}>{data.startYear} - {data.endYear}</Text>
      </View>
    </View>
  </View>
)

// ─── Certificate entry ────────────────────────────────────────────
const CertEntry = ({ data }) => (
  <View style={styles.entryBlock}>
    <View style={styles.rowBetween}>
      <View style={{ flex: 1 }}>
        {/* text-lg */}
        <Text style={styles.itemTitle}>{data.certificateName}</Text>
        {/* text-sm text-gray-500 */}
        <Text style={[styles.itemSubtitle, { fontSize: 10 }]}>{data.organization}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemDate}>{data.month} - {data.year}</Text>
      </View>
    </View>
  </View>
)

// ─── Skills row (Primary or regular) ─────────────────────────────
const SkillsRow = ({ label, items, keyProp }) => {
  if (!items?.length) return null
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillLabel}>{label} —</Text>
      {items.map((data, i) => (
        <Text key={i} style={styles.skillItem}>
          {data[keyProp]}{i < items.length - 1 ? '' : ''}
        </Text>
      ))}
    </View>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────
const hasContent = (jsonStr) => {
  try {
    const parsed = JSON.parse(jsonStr)
    const text = parsed.content
      ?.map(n => n.content?.map(c => c.text || '').join('') || '')
      .join('')
    return text && text.trim().length > 0
  } catch {
    return false
  }
}

// ─── Main PDF Document ────────────────────────────────────────────
const PDFone = ({
  first, last, email, phone, country, city, state, linkedin,
  summary, expData, eduData, socialData, certificateData,
  skillsData, primarySkillsData,
}) => {

  const hasLocation = city || state || country
  const locationStr = [city, state, country].filter(Boolean).join(', ')

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── Header: flex flex-col items-center ── */}
        <View style={styles.headerWrapper}>

          {/* font-semibold text-4xl */}
          <Text style={styles.headerName}>{`${first} ${last}`}</Text>

          {/* text-[.8rem] font-semibold flex flex-wrap justify-center */}
          <View style={styles.headerDetails}>
            {phone && (
              <View style={styles.headerItem}>
                {/* CallIcon equivalent — unicode phone symbol */}
                <Image
                  src="/Icons/call.png"
                  style={{ width: 9, height: 9, marginRight: 3 }}
                />
                <Text style={{ fontSize: 10, fontWeight: 700 }}>{phone}</Text>
              </View>
            )}
            {email && (
              <View style={styles.headerItem}>
                <Image
                  src="/Icons/mail.png"
                  style={{ width: 9, height: 9, marginRight: 3 }}
                />
                <Text style={{ fontSize: 10, fontWeight: 700 }}>{email}</Text>
              </View>
            )}
            {linkedin && (
              <View style={styles.headerItem}>
                <Image
                  src="/Icons/linkedin.png"
                  style={{ width: 9, height: 9, marginRight: 3 }}
                />
                <Text style={{ fontSize: 10, fontWeight: 700 }}>{linkedin}</Text>
              </View>
            )}
            {hasLocation && (
              <View style={styles.headerItem}>
                <Image
                  src="/Icons/location.png"
                  style={{ width: 9, height: 9, marginRight: 3 }}
                />
                <Text style={{ fontSize: 10, fontWeight: 700 }}>{locationStr}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ── Profile Summary: w-full self-start h-fit mt-5 ── */}
        {summary && hasContent(summary) && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>PROFILE SUMMARY</Text>
            <View style={styles.divider} />
            {/* text-[.9rem] */}
            <View style={styles.summaryText}>
              <TipTapParser content={summary} />
            </View>
          </View>
        )}

        {/* ── Technical Skills: mt-5 mb-5 ── */}
        {(skillsData?.length > 0 || primarySkillsData?.length > 0) && (
          <Section title="TECHNICAL SKILLS">
            <View style={styles.skillsWrapper}>
              {/* Primary Skills row */}
              {primarySkillsData?.length > 0 && (
                <SkillsRow
                  label="Primary Skills"
                  items={primarySkillsData}
                  keyProp="primarySkillName"
                />
              )}
              {/* Skills row */}
              {skillsData?.length > 0 && (
                <SkillsRow
                  label="Skills"
                  items={skillsData}
                  keyProp="skillName"
                />
              )}
            </View>
          </Section>
        )}

        {/* ── Experience: mt-5 mb-5 ── */}
        {expData?.length > 0 && (
          <Section title="EXPERIENCE">
            {expData.map((data, i) => (
              <ExpEntry key={i} data={data} />
            ))}
          </Section>
        )}

        {/* ── Education: mb-5 ── */}
        {eduData?.length > 0 && (
          <Section title="EDUCATION" style={{ marginTop: 0 }}>
            {eduData.map((data, i) => (
              <EduEntry key={i} data={data} />
            ))}
          </Section>
        )}

        {/* ── Social Links: mb-5 ── */}
        {socialData?.length > 0 && (
          <Section title="SOCIAL LINKS" style={{ marginTop: 0 }}>
            <View style={styles.socialRow}>
              {socialData.map((data, i) => (
                <Link key={i} src={data.URL} style={styles.link}>
                  {data.label}
                </Link>
              ))}
            </View>
          </Section>
        )}

        {/* ── Certifications: mb-5 ── */}
        {certificateData?.length > 0 && (
          <Section title="CERTIFICATION" style={{ marginTop: 0 }}>
            {certificateData.map((data, i) => (
              <CertEntry key={i} data={data} />
            ))}
          </Section>
        )}

      </Page>
    </Document>
  )
}

export default PDFone
