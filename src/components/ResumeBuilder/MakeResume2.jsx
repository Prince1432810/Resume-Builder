import { useState, useEffect, Suspense } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import ResumePage from './ResumeOutputPage/ResumePage'
import { ResumeContext } from './ResumeContext'
import ResumePDF from './ResumeOutputPage/ResumePDF';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Skills from '../Skills'

import { MakeResumeContext } from './MakeResumeContext'
import Experience from './Experience/Experience'
import Education from './Education/Education';
import SkillsSection from './Skills/SkillsSection'
import PrimarySkills from './PrimarySkills/PrimarySkills';
import SocialLinks from './SocialLinks/SocialLinks';
import Certifications from './Certificates/Certifications';
import TextEditor from './TextEditor/TextEditor';

const MakeResume2 = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      const confirmLeave = window.confirm('Unsaved data will be lost. Do you still want to go back?');
      if (confirmLeave) {
        window.history.back();
      } else {
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [linkedin, setLinkdin] = useState("");
  const [summary, setSummary] = useState("");

  const [experience, setExperience] = useState(false);
  const [education, setEducation] = useState(false);
  const [certificate, setCertificate] = useState(false);

  // Experience
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [expData, setExpData] = useState([]);

  // Education
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [eduData, setEduData] = useState([]);

  // Skills
  const [skills, setSkills] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [skillsData, setSkillsData] = useState([]);

  // Social Links
  const [socialLink, setSocialLink] = useState(false);
  const [label, setLabel] = useState("");
  const [URL, setURL] = useState("");
  const [socialData, setSocialData] = useState([]);

  // Certificates
  const [certificateName, setCertificateName] = useState("");
  const [organization, setOrganization] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [certificateData, setCertificateData] = useState([]);

  const [openSection, setOpenSection] = useState(null);

  const handleAccordion = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Shared resume data passed to PDF
  const resumeProps = {
    first, last, email, phone, country, city, state, linkedin,
    summary, expData, eduData, socialData, certificateData,
  };

  return (
    <div className='w-full h-full bg-[#f8f9fb]'>

      {/* Top bar */}
      <div className='flex justify-between items-center py-3 px-1 border-b border-slate-200 bg-white'>
        <div className='text-xs items-center flex text-slate-400 font-medium tracking-wide'>
          <span className='mr-2 text-slate-400'>Resume builder</span>
          <KeyboardArrowRightIcon className='text-slate-300' style={{ fontSize: 14 }} />
          <span className='text-slate-700 font-semibold'>Create Resume</span>
        </div>

        {/* ── Download button via PDFDownloadLink ── */}
        <PDFDownloadLink
          document={<ResumePDF {...resumeProps} />}
          fileName={`${first || 'resume'}_${last || ''}.pdf`.trim()}
        >
          {({ loading }) => (
            <button
              className={`px-5 h-9 rounded-lg text-white text-sm font-semibold tracking-wide outline-none transition-colors
                ${loading
                  ? 'bg-slate-300 text-slate-500 cursor-wait'
                  : 'bg-[#3985b6] hover:bg-[#2d6e99] active:bg-[#256090] shadow-sm'
                }`}
            >
              {loading ? 'Preparing...' : 'Download Resume'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className='mt-5 flex flex-col lg:flex-row gap-5 h-[calc(100vh-9.5rem)] justify-between'>

        {/* Input panel */}
        <div className='w-full lg:w-[40%] overflow-scroll no-scrollbar pb-10 flex flex-col gap-2.5'>

          {/* Personal Details */}
          <div className='border border-slate-200 p-6 rounded-2xl bg-white shadow-sm'>
            <span className='font-bold text-base text-[#1a2332] tracking-tight'>Personal Details</span>

            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="first">First Name</label>
                <input type="text" id='first' onChange={(e) => setFirst(e.target.value.trim())} value={first}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="last">Last Name</label>
                <input type="text" id='last' onChange={(e) => setLast(e.target.value).trim()} value={last}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="email">Email</label>
                <input type="text" id='email' onChange={(e) => setEmail(e.target.value.trim())} value={email}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="phone">Phone</label>
                <input type="tel" id='phone' onChange={(e) => {setPhone(e.target.value.replace(/\D/g, ""))}} maxLength={10} value={phone}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="country">Country</label>
                <input type="text" id='country' onChange={(e) => setCountry(e.target.value.trim())} value={country}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="city">City</label>
                <input type="text" id='city' onChange={(e) => setCity(e.target.value.trim())} value={city}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="state">State</label>
                <input type="text" id='state' onChange={(e) => setState(e.target.value.trim())} value={state}
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide' htmlFor="linkedin">LinkedIn URL</label>
                <input type="text" id='linkedin' onChange={(e) => setLinkdin(e.target.value.trim())} value={linkedin} placeholder='linkedin.com/in/yourprofile'
                  className='h-9 border border-slate-200 rounded-lg px-3 text-sm text-[#1a2332] bg-white outline-none placeholder-slate-300 focus:border-[#93c4df] focus:ring-2 focus:ring-[#3985b6]/10 transition-all' />
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('profileSummary')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'profileSummary'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Profile Summary</span>
              <KeyboardArrowRightIcon
                className={`transition-transform duration-300 ${openSection === 'profileSummary' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                style={{ fontSize: 18 }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'profileSummary' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <p className='text-[11px] text-slate-400 mb-2.5'>Write 2–4 short sentences about your strengths, role, achievements, and skills.</p>
                  <TextEditor value={summary} onChange={setSummary} placeholder='Description...' />
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('experience')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'experience'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Experience</span>
              <div className='flex gap-2 items-center'>
                {expData.length > 0 && (
                  <div className='h-5 w-5 bg-[#3985b6] text-white rounded-full flex justify-center items-center text-[10px] font-bold'>{expData.length}</div>
                )}
                <KeyboardArrowRightIcon
                  className={`transition-transform duration-300 ${openSection === 'experience' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                  style={{ fontSize: 18 }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'experience' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <MakeResumeContext.Provider value={{ experience, setExperience, title, setTitle, company, setCompany, startDate, setStartDate, endDate, setEndDate, location, setLocation, jobSummary, setJobSummary, expData, setExpData }}>
                    <Experience />
                  </MakeResumeContext.Provider>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('education')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'education'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Education</span>
              <div className='flex gap-2 items-center'>
                {eduData.length > 0 && (
                  <div className='h-5 w-5 bg-[#3985b6] text-white rounded-full flex justify-center items-center text-[10px] font-bold'>{eduData.length}</div>
                )}
                <KeyboardArrowRightIcon
                  className={`transition-transform duration-300 ${openSection === 'education' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                  style={{ fontSize: 18 }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'education' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <MakeResumeContext.Provider value={{ education, setEducation, eduData, setEduData, institution, setInstitution, degree, setDegree, startYear, setStartYear, endYear, setEndYear }}>
                    <Education />
                  </MakeResumeContext.Provider>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Skills */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('primarySkills')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'primarySkills'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Primary Skills</span>
              <KeyboardArrowRightIcon
                className={`transition-transform duration-300 ${openSection === 'primarySkills' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                style={{ fontSize: 18 }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'primarySkills' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <PrimarySkills Skills={Skills} />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('skills')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'skills'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Skills</span>
              <div className='flex gap-2 items-center'>
                {skillsData.length > 0 && (
                  <div className='h-5 w-5 bg-[#3985b6] text-white rounded-full flex justify-center items-center text-[10px] font-bold'>{skillsData.length}</div>
                )}
                <KeyboardArrowRightIcon
                  className={`transition-transform duration-300 ${openSection === 'skills' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                  style={{ fontSize: 18 }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'skills' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <MakeResumeContext.Provider value={{ skills, setSkills, skillName, setSkillName, level, setLevel, skillsData, setSkillsData }}>
                    <SkillsSection />
                  </MakeResumeContext.Provider>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('certifications')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'certifications'
                  ? 'bg-[#f0f8ff] border-b border-[#dde9f5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Certifications</span>
              <div className='flex gap-2 items-center'>
                {certificateData.length > 0 && (
                  <div className='h-5 w-5 bg-[#3985b6] text-white rounded-full flex justify-center items-center text-[10px] font-bold'>{certificateData.length}</div>
                )}
                <KeyboardArrowRightIcon
                  className={`transition-transform duration-300 ${openSection === 'certifications' ? 'rotate-90 text-[#3985b6]' : 'text-slate-400'}`}
                  style={{ fontSize: 18 }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'certifications' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#fafcfe]'>
                  <MakeResumeContext.Provider value={{ certificateName, setCertificateName, certificate, setCertificate, setInstitution, organization, setOrganization, month, setMonth, year, setYear, certificateData, setCertificateData }}>
                    <Certifications />
                  </MakeResumeContext.Provider>
                </div>
              </div>
            </div>
          </div>

          {/* Website & Social Links */}
          <div className='border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden'>
            <div
              onClick={() => handleAccordion('socialLinks')}
              className={`flex justify-between items-center px-5 py-3.5 cursor-pointer select-none transition-colors duration-200
                ${openSection === 'socialLinks'
                  ? 'bg-[#f0fff8] border-b border-[#d1f0e5]'
                  : 'hover:bg-slate-50'
                }`}
            >
              <span className='font-bold text-sm text-[#1a2332] tracking-tight'>Website & Social Links</span>
              <div className='flex gap-2 items-center'>
                {socialData.length > 0 && (
                  <div className='h-5 w-5 bg-[#3985b6] text-white rounded-full flex justify-center items-center text-[10px] font-bold'>{socialData.length}</div>
                )}
                <KeyboardArrowRightIcon
                  className={`transition-transform duration-300 ${openSection === 'socialLinks' ? 'rotate-90 text-[#10b981]' : 'text-slate-400'}`}
                  style={{ fontSize: 18 }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: openSection === 'socialLinks' ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
              <div style={{ overflow: 'hidden' }}>
                <div className='px-5 py-4 bg-[#f6fef9]'>
                  <MakeResumeContext.Provider value={{ socialLink, setSocialLink, label, setLabel, URL, setURL, socialData, setSocialData }}>
                    <SocialLinks />
                  </MakeResumeContext.Provider>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── PDF Preview panel ── */}
        <div className='flex flex-col justify-start items-center w-full lg:w-[60%] h-[calc(100vh-9.5rem)] overflow-y-auto bg-[#f0f4f8] rounded-2xl border border-[#dde5ef] pt-5'>
          <p className='text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-4 self-start ml-5'>Live Preview</p>
          <ResumeContext.Provider value={{first, last, email, phone, country, city, state, linkedin, summary, expData, eduData, socialData, certificateData}}>
            <ResumePage />
          </ResumeContext.Provider>
        </div>

      </div>
    </div>
  )
}

export default MakeResume2
