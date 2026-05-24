// import { useState, useEffect, Suspense } from "react";
// import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import { ResumeContext } from "./ResumeContext";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// // Resume Templates
// import TemplateOne from "./ResumeOutputPage/Templates/TemplateOne";
// import TemplateTwo from "./ResumeOutputPage/Templates/TemplateTwo";
// import TemplateThree from "./ResumeOutputPage/Templates/TemplateThree";
// import TemplateFour from "./ResumeOutputPage/Templates/TemplateFour";

// import PDFone from "./ResumeOutputPage/PDFTemplates/PDFone";
// import PDFtwo from "./ResumeOutputPage/PDFTemplates/PDFtwo";
// import PDFthree from "./ResumeOutputPage/PDFTemplates/PDFthree";
// import PDFfour from "./ResumeOutputPage/PDFTemplates/PDFfour";

// // SECTION
// import { MakeResumeContext } from "./MakeResumeContext";
// import Experience from "./Experience/Experience";
// import Education from "./Education/Education";
// import SkillsSection from "./Skills/SkillsSection";
// import PrimarySkills from "./PrimarySkills/PrimarySkills";
// import SocialLinks from "./SocialLinks/SocialLinks";
// import Certifications from "./Certificates/Certifications";
// import TextEditor from "./TextEditor/TextEditor";

// // ICONS FOR SECTIONS
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
// import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
// import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

// // ICONS FOR INPUT LABELS
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
// import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
// import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// import MyResumes from "../MyResumes";

// const MakeResume = () => {
//     useEffect(() => {
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = "";
//         };
//         window.history.pushState(null, "", window.location.href);
//         const handlePopState = () => {
//             const confirmLeave = window.confirm(
//                 "Unsaved data will be lost. Do you still want to go back?",
//             );
//             if (confirmLeave) {
//                 window.history.back();
//             } else {
//                 window.history.pushState(null, "", window.location.href);
//             }
//         };

//         window.addEventListener("beforeunload", handleBeforeUnload);
//         window.addEventListener("popstate", handlePopState);

//         return () => {
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//             window.removeEventListener("popstate", handlePopState);
//         };
//     }, []);

//     const [activeTemplate, setActiveTemplate] = useState("template3");
//     const [photo, setPhoto] = useState(null);

//     const [first, setFirst] = useState("");
//     const [last, setLast] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [country, setCountry] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [linkedin, setLinkdin] = useState("");
//     const [summary, setSummary] = useState("");

//     // Experience
//     const [experience, setExperience] = useState(true);
//     const [title, setTitle] = useState("");
//     const [company, setCompany] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [location, setLocation] = useState("");
//     const [jobSummary, setJobSummary] = useState("");
//     const [expData, setExpData] = useState([]);

//     // Education
//     const [education, setEducation] = useState(true);
//     const [institution, setInstitution] = useState("");
//     const [degree, setDegree] = useState("");
//     const [startYear, setStartYear] = useState("");
//     const [endYear, setEndYear] = useState("");
//     const [eduData, setEduData] = useState([]);

//     // Primary Skills
//     const [primarySkills, setPrimarySkills] = useState(true);
//     const [primarySkillName, setPrimarySkillName] = useState("");
//     const [primaryLevel, setPrimaryLevel] = useState("");
//     const [primarySkillsData, setPrimarySkillsData] = useState([]);
//     const primarySkillProps = {
//         primarySkills,
//         primarySkillName,
//         primaryLevel,
//         primarySkillsData,
//         setPrimarySkills,
//         setPrimarySkillName,
//         setPrimaryLevel,
//         setPrimarySkillsData,
//     };

//     // Skills
//     const [skills, setSkills] = useState(true);
//     const [skillName, setSkillName] = useState("");
//     const [level, setLevel] = useState("");
//     const [skillsData, setSkillsData] = useState([]);

//     // Social Links
//     const [socialLink, setSocialLink] = useState(true);
//     const [label, setLabel] = useState("");
//     const [URL, setURL] = useState("");
//     const [socialData, setSocialData] = useState([]);

//     // Certificates
//     const [certificate, setCertificate] = useState(true);
//     const [certificateName, setCertificateName] = useState("");
//     const [organization, setOrganization] = useState("");
//     const [month, setMonth] = useState("");
//     const [year, setYear] = useState("");
//     const [certificateData, setCertificateData] = useState([]);

//     // Open Sections
//     const [openSection, setOpenSection] = useState("personalDetails");

//     // Resume Pages
//     const [curZoom, setCurZoom] = useState(100);
//     function zoomIn() {
//         curZoom > 50 && setCurZoom((prev) => prev - 10);
//     }
//     function zoomOut() {
//         curZoom < 150 && setCurZoom((prev) => prev + 10);
//     }

//     const handleAccordion = (section) => {
//         setOpenSection((prev) => (prev === section ? null : section));
//     };

//     // Shared resume data passed to PDF
//     const resumeProps = {
//         first,
//         last,
//         email,
//         phone,
//         photo,
//         country,
//         city,
//         state,
//         linkedin,
//         summary,
//         expData,
//         eduData,
//         socialData,
//         certificateData,
//         skillsData,
//         primarySkillsData,
//     };

//     const iconShade =
//         "p-1 bg-linear-to-br from-[#99caeb] via-[#3985b6] to-[#31719b] rounded-lg mr-3 flex justify-center items-center transition-all duration-200 ease";
//     const numIconStyle =
//         "p-1 h-6 w-6 text-sm font-semibold bg-yellow-400 text-white rounded-full flex justify-center items-center";
//     const inputIconStyle = {
//         fontSize: "1.2rem",
//     };

//     const pdfComponents = {
//         template1: <PDFone {...resumeProps} />,
//         template2: <PDFtwo {...resumeProps} />,
//         template3: <PDFthree {...resumeProps} />,
//         template4: <PDFfour {...resumeProps} />,
//     };

//     const previewComponents = {
//         template1: <TemplateOne {...resumeProps} />,
//         template2: <TemplateTwo {...resumeProps} />,
//         template3: <TemplateThree {...resumeProps} />,
//         template4: <TemplateFour {...resumeProps} />,
//     };

//     return (
//         <div className="w-full h-full">
//             {/* Top bar */}
//             <div className="flex justify-between items-center ">
//                 <div className="text-xs items-center flex">
//                     <span className="mr-2">Resume builder</span>
//                     <KeyboardArrowRightIcon />
//                     <span>Create Resume</span>
//                 </div>

//                 <div className="flex gap-10">
//                     <div className="flex items-center gap-2 border border-[#CBDAE3] rounded-lg px-3 py-1.5 bg-white shadow-sm hover:border-[#3985b6] transition-all duration-200">
//                         <select
//                             value={activeTemplate}
//                             onChange={(e) => setActiveTemplate(e.target.value)}
//                             className="text-sm font-semibold text-gray-700 bg-transparent outline-none cursor-pointer pr-1 appearance-none"
//                         >
//                             <option value="template1">Template 1</option>
//                             <option value="template2">Template 2</option>
//                             <option value="template3">Template 3</option>
//                             <option value="template4">Template 4</option>
//                         </select>
//                         <svg
//                             className="w-3.5 h-3.5 text-gray-400 pointer-events-none"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             viewBox="0 0 24 24"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                         </svg>
//                     </div>

//                     {/* ── Download button via PDFDownloadLink ── */}
//                     <PDFDownloadLink
//                         document={pdfComponents[activeTemplate]}
//                         fileName={`${first || "resume"}_${last || ""}.pdf`.trim()}
//                     >
//                         <button
//                             className={`p-2 font-bold text-sm px-4 h-10 rounded-md text-white outline-none bg-linear-to-br from-[#3985b6] via-[#275b7d] to-[#3985b6] hover:via-[#33739e] active:scale-99  transition-all duration-300 ease'}`}
//                         >
//                             Download Resume
//                         </button>
//                     </PDFDownloadLink>
//                 </div>

//             </div>

//             <div className="mt-5 flex flex-col lg:flex-row gap-6 h-full lg:h-[calc(100vh-9.5rem)] justify-between">
//                 {/* Input panel */}
//                 <div className=" w-full lg:w-[40%] h-full overflow-scroll no-scrollbar pb-5">

//                     {/* PERSONAL DETAIL'S  */}
//                     <div
//                         className={`shadow-sm border border-[#CBDAE3] rounded-xl bg-white transition-all duration-300 ease-out  overflow-hidden ${openSection === "personalDetails" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("personalDetails")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] border-b border-[#CBDAE3] to-white group transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "personalDetails" ? "from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none">
//                                 <span className={iconShade}>
//                                     <PersonOutlinedIcon
//                                         style={{ fontSize: "1.3rem" }}
//                                         className="text-white place-self-center"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Personal Details
//                                 </span>
//                             </div>
//                             <KeyboardArrowRightIcon
//                                 className={`transition-all duration-300 ${openSection === "personalDetails" ? "rotate-90" : ""}`}
//                             />
//                         </div>
//                         {/* Input Fields */}
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "personalDetails"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="overflow-hidden">
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 p-6 gap-x-5 gap-y-6">
                                        
//                                         {/* Photo Upload — add after the LinkedIn inputContainer div */}
//                                         <div className="inputContainer sm:col-span-2">
//                                             <div className="flex mb-2 items-center gap-2">
//                                                 <PersonOutlinedIcon style={inputIconStyle} className="text-gray-500" />
//                                                 <label className="labelField" htmlFor="photo">
//                                                     Profile Photo
//                                                 </label>
//                                             </div>

//                                             {!photo ? (
//                                                 <label
//                                                     htmlFor="photo"
//                                                     className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#CBDAE3] rounded-xl cursor-pointer bg-[#f7fbfe] hover:bg-[#edf5fb] hover:border-[#3985b6] transition-all duration-200 group"
//                                                 >
//                                                     <div className="flex flex-col items-center justify-center gap-1 text-gray-400 group-hover:text-[#3985b6] transition-colors duration-200">
//                                                         <PersonOutlinedIcon style={{ fontSize: "2rem" }} />
//                                                         <span className="text-sm font-medium">Click to upload photo</span>
//                                                         <span className="text-xs text-gray-300">PNG, JPG up to 5MB</span>
//                                                     </div>
//                                                     <input
//                                                         type="file"
//                                                         id="photo"
//                                                         accept="image/*"
//                                                         className="hidden"
//                                                         onChange={(e) => {
//                                                             const file = e.target.files[0];
//                                                             if (!file) return;
//                                                             const reader = new FileReader();
//                                                             reader.onload = (ev) => setPhoto(ev.target.result);
//                                                             reader.readAsDataURL(file);
//                                                         }}
//                                                     />
//                                                 </label>
//                                             ) : (
//                                                 <div className="flex items-center gap-4 p-3 border border-[#CBDAE3] rounded-xl bg-[#f7fbfe]">
//                                                     <img
//                                                         src={photo}
//                                                         alt="Preview"
//                                                         className="w-14 h-14 rounded-full object-cover border-2 border-[#3985b6] shadow-sm"
//                                                     />
//                                                     <div className="flex flex-col gap-1 flex-1 min-w-0">
//                                                         <span className="text-sm font-semibold text-gray-700">Photo uploaded</span>
//                                                         <span className="text-xs text-gray-400 truncate">Looking good!</span>
//                                                     </div>
//                                                     <div className="flex flex-col gap-2">
//                                                         <label
//                                                             htmlFor="photo-replace"
//                                                             className="text-xs text-[#3985b6] hover:underline cursor-pointer font-medium"
//                                                         >
//                                                             Replace
//                                                             <input
//                                                                 type="file"
//                                                                 id="photo-replace"
//                                                                 accept="image/*"
//                                                                 className="hidden"
//                                                                 onChange={(e) => {
//                                                                     const file = e.target.files[0];
//                                                                     if (!file) return;
//                                                                     const reader = new FileReader();
//                                                                     reader.onload = (ev) => setPhoto(ev.target.result);
//                                                                     reader.readAsDataURL(file);
//                                                                 }}
//                                                             />
//                                                         </label>
//                                                         <button
//                                                             onClick={() => setPhoto(null)}
//                                                             className="text-xs text-red-400 hover:underline font-medium text-left"
//                                                         >
//                                                             Remove
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <PersonOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="first"
//                                                 >
//                                                     First Name
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="first"
//                                                 onChange={(e) =>
//                                                     setFirst(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter first name"
//                                                 value={first}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <PersonOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="last"
//                                                 >
//                                                     Last Name
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="last"
//                                                 onChange={(e) =>
//                                                     setLast(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter last name"
//                                                 value={last}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <EmailOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="email"
//                                                 >
//                                                     Email
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="email"
//                                                 onChange={(e) =>
//                                                     setEmail(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter email"
//                                                 value={email}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <LocalPhoneOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="phone"
//                                                 >
//                                                     Phone
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="tel"
//                                                 id="phone"
//                                                 onChange={(e) => {
//                                                     setPhone(
//                                                         e.target.value.replace(
//                                                             /\D/g,
//                                                             "",
//                                                         ),
//                                                     );
//                                                 }}
//                                                 placeholder="Enter phone"
//                                                 maxLength={10}
//                                                 value={phone}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <PublicOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="country"
//                                                 >
//                                                     Country
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="country"
//                                                 onChange={(e) =>
//                                                     setCountry(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter Country"
//                                                 value={country}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <LocationCityOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="city"
//                                                 >
//                                                     City
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="city"
//                                                 onChange={(e) =>
//                                                     setCity(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter City"
//                                                 value={city}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <MapsHomeWorkOutlinedIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="state"
//                                                 >
//                                                     State
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="state"
//                                                 onChange={(e) =>
//                                                     setState(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 placeholder="Enter State"
//                                                 value={state}
//                                                 className="inputField"
//                                             />
//                                         </div>
//                                         <div className="inputContainer">
//                                             <div className="flex mb-1 items-center gap-2">
//                                                 <LinkedInIcon
//                                                     style={inputIconStyle}
//                                                     className="text-gray-500"
//                                                 />
//                                                 <label
//                                                     className="labelField"
//                                                     htmlFor="linkedin"
//                                                 >
//                                                     LinkedIn Profile URL
//                                                 </label>
//                                             </div>
//                                             <input
//                                                 type="text"
//                                                 id="linkedin"
//                                                 onChange={(e) =>
//                                                     setLinkdin(
//                                                         e.target.value.trim(),
//                                                     )
//                                                 }
//                                                 value={linkedin}
//                                                 placeholder="https://www.linkedin.com/in/yourprofile"
//                                                 className="inputField"
//                                             />
//                                         </div>
                                        
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Profile Summary */}
//                     <div
//                         className={`shadow-sm mt-3 border border-[#CBDAE3] rounded-xl bg-white transition-all duration-300 ease-out  overflow-hidden ${openSection === "profileSummary" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("profileSummary")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white group transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "profileSummary" ? "from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <SummarizeOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Profile Summary
//                                 </span>
//                             </div>
//                             <KeyboardArrowRightIcon
//                                 className={`transition-all duration-300 ${openSection === "profileSummary" ? "rotate-90" : ""}`}
//                             />
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "profileSummary"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <p className="text-gray-400 text-sm mb-2">
//                                         Write 2-4 short sentences about your
//                                         strengths, role, achievements, and
//                                         skills.
//                                     </p>
//                                     <TextEditor
//                                         value={summary}
//                                         onChange={setSummary}
//                                         placeholder="Description..."
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Experience */}
//                     <div
//                         className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3]  ${openSection === "experience" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("experience")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "experience" ? " from-[#ebf8ff] " : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <WorkOutlineOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Experience
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {expData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {expData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "experience" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "experience"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <MakeResumeContext.Provider
//                                         value={{
//                                             experience,
//                                             setExperience,
//                                             title,
//                                             setTitle,
//                                             company,
//                                             setCompany,
//                                             startDate,
//                                             setStartDate,
//                                             endDate,
//                                             setEndDate,
//                                             location,
//                                             setLocation,
//                                             jobSummary,
//                                             setJobSummary,
//                                             expData,
//                                             setExpData,
//                                         }}
//                                     >
//                                         <Experience />
//                                     </MakeResumeContext.Provider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Education */}
//                     <div
//                         className={`mt-3 border  rounded-xl bg-white border-[#CBDAE3]  transition-all duration-300 ease-out group overflow-hidden ${openSection === "education" ? " shadow-md" : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("education")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "education" ? " from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <SchoolOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Education
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {eduData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {eduData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "education" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "education" ? "1fr" : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <MakeResumeContext.Provider
//                                         value={{
//                                             education,
//                                             setEducation,
//                                             eduData,
//                                             setEduData,
//                                             institution,
//                                             setInstitution,
//                                             degree,
//                                             setDegree,
//                                             startYear,
//                                             setStartYear,
//                                             endYear,
//                                             setEndYear,
//                                         }}
//                                     >
//                                         <Education />
//                                     </MakeResumeContext.Provider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Primary Skills */}
//                     <div
//                         className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "primarySkills" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("primarySkills")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "primarySkills" ? " from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <PsychologyOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Primary Skills
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {primarySkillsData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {primarySkillsData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "primarySkills" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "primarySkills"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <PrimarySkills data={primarySkillProps} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Skills */}
//                     <div
//                         className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "skills" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("skills")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "skills" ? " from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <SettingsSuggestOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Skills
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {skillsData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {skillsData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "skills" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "skills" ? "1fr" : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <MakeResumeContext.Provider
//                                         value={{
//                                             skills,
//                                             setSkills,
//                                             skillName,
//                                             setSkillName,
//                                             level,
//                                             setLevel,
//                                             skillsData,
//                                             setSkillsData,
//                                         }}
//                                     >
//                                         <SkillsSection />
//                                     </MakeResumeContext.Provider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Certifications */}
//                     <div
//                         className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "certifications" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("certifications")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "certifications" ? " from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <WorkspacePremiumOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Certifications
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {certificateData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {certificateData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "certifications" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "certifications"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <MakeResumeContext.Provider
//                                         value={{
//                                             certificateName,
//                                             setCertificateName,
//                                             certificate,
//                                             setCertificate,
//                                             setInstitution,
//                                             organization,
//                                             setOrganization,
//                                             month,
//                                             setMonth,
//                                             year,
//                                             setYear,
//                                             certificateData,
//                                             setCertificateData,
//                                         }}
//                                     >
//                                         <Certifications />
//                                     </MakeResumeContext.Provider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Website & Social Links */}
//                     <div
//                         className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "socialLinks" ? "shadow-md " : "shadow-sm "}`}
//                     >
//                         <div
//                             onClick={() => handleAccordion("socialLinks")}
//                             className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "socialLinks" ? " from-[#ebf8ff]" : ""}`}
//                         >
//                             <div className="flex group cursor-default select-none ">
//                                 <span className={iconShade}>
//                                     <LinkOutlinedIcon
//                                         style={{ fontSize: "1.2rem" }}
//                                         className="text-white place-self-center m-0.5"
//                                     />
//                                 </span>
//                                 <span className="font-extrabold text-gray-700 text-lg">
//                                     Website & Social Links
//                                 </span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 {socialData.length > 0 && (
//                                     <div className={numIconStyle}>
//                                         {socialData.length}
//                                     </div>
//                                 )}
//                                 <KeyboardArrowRightIcon
//                                     className={`transition-all duration-300 ${openSection === "socialLinks" ? "rotate-90" : ""}`}
//                                 />
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateRows:
//                                     openSection === "socialLinks"
//                                         ? "1fr"
//                                         : "0fr",
//                                 transition: "grid-template-rows 0.3s ease",
//                             }}
//                         >
//                             <div style={{ overflow: "hidden" }}>
//                                 <div className="p-6 border-t border-gray-200">
//                                     <MakeResumeContext.Provider
//                                         value={{
//                                             socialLink,
//                                             setSocialLink,
//                                             label,
//                                             setLabel,
//                                             URL,
//                                             setURL,
//                                             socialData,
//                                             setSocialData,
//                                         }}
//                                     >
//                                         <SocialLinks />
//                                     </MakeResumeContext.Provider>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* My Resumes Section */}
//                     {/* <MyResumes activeTemplate={activeTemplate} resumeProps={resumeProps} /> */}
//                 </div>

//                 {/* ── PDF Preview panel ── */}
//                 <div className="flex flex-col justify-center items-center w-full lg:w-[60%] h-full lg:h-[calc(100vh-9.5rem)] overflow-hidden">
//                     {previewComponents[activeTemplate]}
//                 </div>

//                 <div className=" hidden w-[60%] h-[calc(100vh-11rem)] rounded-lg overflow-hidden">
//                     <PDFViewer
//                         width="100%"
//                         height="100%"
//                         showToolbar={false}
//                         border="none"
//                         style={{ border: "none", borderRadius: "0.5rem" }}
//                     >
//                         <PDFfour {...resumeProps} />
//                     </PDFViewer>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default MakeResume;



import { useState, useEffect, Suspense } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeContext } from "./ResumeContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Resume Templates
import TemplateOne from "./ResumeOutputPage/Templates/TemplateOne";
import TemplateTwo from "./ResumeOutputPage/Templates/TemplateTwo";
import TemplateThree from "./ResumeOutputPage/Templates/TemplateThree";
import TemplateFour from "./ResumeOutputPage/Templates/TemplateFour";

import PDFone from "./ResumeOutputPage/PDFTemplates/PDFone";
import PDFtwo from "./ResumeOutputPage/PDFTemplates/PDFtwo";
import PDFthree from "./ResumeOutputPage/PDFTemplates/PDFthree";
import PDFfour from "./ResumeOutputPage/PDFTemplates/PDFfour";

// SECTION
import { MakeResumeContext } from "./MakeResumeContext";
import Experience from "./Experience/Experience";
import Education from "./Education/Education";
import SkillsSection from "./Skills/SkillsSection";
import PrimarySkills from "./PrimarySkills/PrimarySkills";
import SocialLinks from "./SocialLinks/SocialLinks";
import Certifications from "./Certificates/Certifications";
import TextEditor from "./TextEditor/TextEditor";

// ICONS FOR SECTIONS
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

// ICONS FOR INPUT LABELS
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import MyResumes from "../MyResumes";

const MakeResume = () => {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
            const confirmLeave = window.confirm(
                "Unsaved data will be lost. Do you still want to go back?",
            );
            if (confirmLeave) {
                window.history.back();
            } else {
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const [activeTemplate, setActiveTemplate] = useState("template3");
    const [photo, setPhoto] = useState(null);

    // Mobile tab state: "edit" | "preview"
    const [mobileTab, setMobileTab] = useState("edit");

    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [linkedin, setLinkdin] = useState("");
    const [summary, setSummary] = useState("");

    // Experience
    const [experience, setExperience] = useState(true);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [jobSummary, setJobSummary] = useState("");
    const [expData, setExpData] = useState([]);

    // Education
    const [education, setEducation] = useState(true);
    const [institution, setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [eduData, setEduData] = useState([]);

    // Primary Skills
    const [primarySkills, setPrimarySkills] = useState(true);
    const [primarySkillName, setPrimarySkillName] = useState("");
    const [primaryLevel, setPrimaryLevel] = useState("");
    const [primarySkillsData, setPrimarySkillsData] = useState([]);
    const primarySkillProps = {
        primarySkills,
        primarySkillName,
        primaryLevel,
        primarySkillsData,
        setPrimarySkills,
        setPrimarySkillName,
        setPrimaryLevel,
        setPrimarySkillsData,
    };

    // Skills
    const [skills, setSkills] = useState(true);
    const [skillName, setSkillName] = useState("");
    const [level, setLevel] = useState("");
    const [skillsData, setSkillsData] = useState([]);

    // Social Links
    const [socialLink, setSocialLink] = useState(true);
    const [label, setLabel] = useState("");
    const [URL, setURL] = useState("");
    const [socialData, setSocialData] = useState([]);

    // Certificates
    const [certificate, setCertificate] = useState(true);
    const [certificateName, setCertificateName] = useState("");
    const [organization, setOrganization] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [certificateData, setCertificateData] = useState([]);

    // Open Sections
    const [openSection, setOpenSection] = useState("personalDetails");

    // Resume Pages
    const [curZoom, setCurZoom] = useState(100);
    function zoomIn() {
        curZoom > 50 && setCurZoom((prev) => prev - 10);
    }
    function zoomOut() {
        curZoom < 150 && setCurZoom((prev) => prev + 10);
    }

    const handleAccordion = (section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    // Shared resume data passed to PDF
    const resumeProps = {
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
        expData,
        eduData,
        socialData,
        certificateData,
        skillsData,
        primarySkillsData,
    };

    const iconShade =
        "p-1 bg-linear-to-br from-[#99caeb] via-[#3985b6] to-[#31719b] rounded-lg mr-3 flex justify-center items-center transition-all duration-200 ease";
    const numIconStyle =
        "p-1 h-6 w-6 text-sm font-semibold bg-yellow-400 text-white rounded-full flex justify-center items-center";
    const inputIconStyle = {
        fontSize: "1.2rem",
    };

    const pdfComponents = {
        template1: <PDFone {...resumeProps} />,
        template2: <PDFtwo {...resumeProps} />,
        template3: <PDFthree {...resumeProps} />,
        template4: <PDFfour {...resumeProps} />,
    };

    const previewComponents = {
        template1: <TemplateOne {...resumeProps} />,
        template2: <TemplateTwo {...resumeProps} />,
        template3: <TemplateThree {...resumeProps} />,
        template4: <TemplateFour {...resumeProps} />,
    };

    return (
        <div className="w-full h-full">
            {/* Top bar */}
            <div className="flex flex-wrap justify-between items-center gap-y-2">
                <div className="text-xs items-center flex">
                    <span className="mr-2">Resume builder</span>
                    <KeyboardArrowRightIcon />
                    <span>Create Resume</span>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-10 items-center">
                    <div className="flex items-center gap-2 border border-[#CBDAE3] rounded-lg px-3 py-1.5 bg-white shadow-sm hover:border-[#3985b6] transition-all duration-200">
                        <select
                            value={activeTemplate}
                            onChange={(e) => setActiveTemplate(e.target.value)}
                            className="text-sm font-semibold text-gray-700 bg-transparent outline-none cursor-pointer pr-1 appearance-none"
                        >
                            <option value="template1">Template 1</option>
                            <option value="template2">Template 2</option>
                            <option value="template3">Template 3</option>
                            <option value="template4">Template 4</option>
                        </select>
                        <svg
                            className="w-3.5 h-3.5 text-gray-400 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* ── Download button via PDFDownloadLink ── */}
                    <PDFDownloadLink
                        document={pdfComponents[activeTemplate]}
                        fileName={`${first || "resume"}_${last || ""}.pdf`.trim()}
                    >
                        <button
                            className={`p-2 font-bold text-sm px-4 h-10 rounded-md text-white outline-none bg-linear-to-br from-[#3985b6] via-[#275b7d] to-[#3985b6] hover:via-[#33739e] active:scale-99 transition-all duration-300 ease`}
                        >
                            Download Resume
                        </button>
                    </PDFDownloadLink>
                </div>
            </div>

            {/* Mobile tab switcher — only visible on small screens */}
            <div className="flex lg:hidden mt-4 rounded-xl overflow-hidden border border-[#CBDAE3] bg-white shadow-sm">
                <button
                    onClick={() => setMobileTab("edit")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        mobileTab === "edit"
                            ? "bg-linear-to-br from-[#3985b6] via-[#275b7d] to-[#3985b6] text-white"
                            : "text-gray-500 hover:bg-gray-50"
                    }`}
                >
                    <EditOutlinedIcon style={{ fontSize: "1.1rem" }} />
                    Edit
                </button>
                <button
                    onClick={() => setMobileTab("preview")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        mobileTab === "preview"
                            ? "bg-linear-to-br from-[#3985b6] via-[#275b7d] to-[#3985b6] text-white"
                            : "text-gray-500 hover:bg-gray-50"
                    }`}
                >
                    <PreviewOutlinedIcon style={{ fontSize: "1.1rem" }} />
                    Preview
                </button>
            </div>

            <div className="mt-4 lg:mt-5 flex flex-col lg:flex-row gap-6 h-full lg:h-[calc(100vh-9.5rem)] justify-between">
                {/* Input panel — hidden on mobile when preview tab is active */}
                <div
                    className={`w-full lg:w-[40%] h-full overflow-scroll no-scrollbar pb-5 ${
                        mobileTab === "preview" ? "hidden lg:block" : "block"
                    }`}
                >

                    {/* PERSONAL DETAIL'S  */}
                    <div
                        className={`shadow-sm border border-[#CBDAE3] rounded-xl bg-white transition-all duration-300 ease-out  overflow-hidden ${openSection === "personalDetails" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("personalDetails")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] border-b border-[#CBDAE3] to-white group transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "personalDetails" ? "from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none">
                                <span className={iconShade}>
                                    <PersonOutlinedIcon
                                        style={{ fontSize: "1.3rem" }}
                                        className="text-white place-self-center"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Personal Details
                                </span>
                            </div>
                            <KeyboardArrowRightIcon
                                className={`transition-all duration-300 ${openSection === "personalDetails" ? "rotate-90" : ""}`}
                            />
                        </div>
                        {/* Input Fields */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "personalDetails"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="overflow-hidden">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-6 gap-x-5 gap-y-6">
                                        
                                        {/* Photo Upload */}
                                        <div className="inputContainer sm:col-span-2">
                                            <div className="flex mb-2 items-center gap-2">
                                                <PersonOutlinedIcon style={inputIconStyle} className="text-gray-500" />
                                                <label className="labelField" htmlFor="photo">
                                                    Profile Photo
                                                </label>
                                            </div>

                                            {!photo ? (
                                                <label
                                                    htmlFor="photo"
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#CBDAE3] rounded-xl cursor-pointer bg-[#f7fbfe] hover:bg-[#edf5fb] hover:border-[#3985b6] transition-all duration-200 group"
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-1 text-gray-400 group-hover:text-[#3985b6] transition-colors duration-200">
                                                        <PersonOutlinedIcon style={{ fontSize: "2rem" }} />
                                                        <span className="text-sm font-medium">Click to upload photo</span>
                                                        <span className="text-xs text-gray-300">PNG, JPG up to 5MB</span>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        id="photo"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (!file) return;
                                                            const reader = new FileReader();
                                                            reader.onload = (ev) => setPhoto(ev.target.result);
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />
                                                </label>
                                            ) : (
                                                <div className="flex items-center gap-4 p-3 border border-[#CBDAE3] rounded-xl bg-[#f7fbfe]">
                                                    <img
                                                        src={photo}
                                                        alt="Preview"
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-[#3985b6] shadow-sm"
                                                    />
                                                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                                                        <span className="text-sm font-semibold text-gray-700">Photo uploaded</span>
                                                        <span className="text-xs text-gray-400 truncate">Looking good!</span>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label
                                                            htmlFor="photo-replace"
                                                            className="text-xs text-[#3985b6] hover:underline cursor-pointer font-medium"
                                                        >
                                                            Replace
                                                            <input
                                                                type="file"
                                                                id="photo-replace"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (!file) return;
                                                                    const reader = new FileReader();
                                                                    reader.onload = (ev) => setPhoto(ev.target.result);
                                                                    reader.readAsDataURL(file);
                                                                }}
                                                            />
                                                        </label>
                                                        <button
                                                            onClick={() => setPhoto(null)}
                                                            className="text-xs text-red-400 hover:underline font-medium text-left"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <PersonOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="first"
                                                >
                                                    First Name
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="first"
                                                onChange={(e) =>
                                                    setFirst(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter first name"
                                                value={first}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <PersonOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="last"
                                                >
                                                    Last Name
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="last"
                                                onChange={(e) =>
                                                    setLast(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter last name"
                                                value={last}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <EmailOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="email"
                                                onChange={(e) =>
                                                    setEmail(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter email"
                                                value={email}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <LocalPhoneOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="phone"
                                                >
                                                    Phone
                                                </label>
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                onChange={(e) => {
                                                    setPhone(
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        ),
                                                    );
                                                }}
                                                placeholder="Enter phone"
                                                maxLength={10}
                                                value={phone}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <PublicOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="country"
                                                >
                                                    Country
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="country"
                                                onChange={(e) =>
                                                    setCountry(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter Country"
                                                value={country}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <LocationCityOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="city"
                                                >
                                                    City
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="city"
                                                onChange={(e) =>
                                                    setCity(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter City"
                                                value={city}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <MapsHomeWorkOutlinedIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="state"
                                                >
                                                    State
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="state"
                                                onChange={(e) =>
                                                    setState(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                placeholder="Enter State"
                                                value={state}
                                                className="inputField"
                                            />
                                        </div>
                                        <div className="inputContainer">
                                            <div className="flex mb-1 items-center gap-2">
                                                <LinkedInIcon
                                                    style={inputIconStyle}
                                                    className="text-gray-500"
                                                />
                                                <label
                                                    className="labelField"
                                                    htmlFor="linkedin"
                                                >
                                                    LinkedIn Profile URL
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id="linkedin"
                                                onChange={(e) =>
                                                    setLinkdin(
                                                        e.target.value.trim(),
                                                    )
                                                }
                                                value={linkedin}
                                                placeholder="https://www.linkedin.com/in/yourprofile"
                                                className="inputField"
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Summary */}
                    <div
                        className={`shadow-sm mt-3 border border-[#CBDAE3] rounded-xl bg-white transition-all duration-300 ease-out  overflow-hidden ${openSection === "profileSummary" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("profileSummary")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white group transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "profileSummary" ? "from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <SummarizeOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Profile Summary
                                </span>
                            </div>
                            <KeyboardArrowRightIcon
                                className={`transition-all duration-300 ${openSection === "profileSummary" ? "rotate-90" : ""}`}
                            />
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "profileSummary"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Write 2-4 short sentences about your
                                        strengths, role, achievements, and
                                        skills.
                                    </p>
                                    <TextEditor
                                        value={summary}
                                        onChange={setSummary}
                                        placeholder="Description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience */}
                    <div
                        className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3]  ${openSection === "experience" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("experience")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "experience" ? " from-[#ebf8ff] " : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <WorkOutlineOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Experience
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {expData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {expData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "experience" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "experience"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <MakeResumeContext.Provider
                                        value={{
                                            experience,
                                            setExperience,
                                            title,
                                            setTitle,
                                            company,
                                            setCompany,
                                            startDate,
                                            setStartDate,
                                            endDate,
                                            setEndDate,
                                            location,
                                            setLocation,
                                            jobSummary,
                                            setJobSummary,
                                            expData,
                                            setExpData,
                                        }}
                                    >
                                        <Experience />
                                    </MakeResumeContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div
                        className={`mt-3 border  rounded-xl bg-white border-[#CBDAE3]  transition-all duration-300 ease-out group overflow-hidden ${openSection === "education" ? " shadow-md" : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("education")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "education" ? " from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <SchoolOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Education
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {eduData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {eduData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "education" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "education" ? "1fr" : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <MakeResumeContext.Provider
                                        value={{
                                            education,
                                            setEducation,
                                            eduData,
                                            setEduData,
                                            institution,
                                            setInstitution,
                                            degree,
                                            setDegree,
                                            startYear,
                                            setStartYear,
                                            endYear,
                                            setEndYear,
                                        }}
                                    >
                                        <Education />
                                    </MakeResumeContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Primary Skills */}
                    <div
                        className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "primarySkills" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("primarySkills")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "primarySkills" ? " from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <PsychologyOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Primary Skills
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {primarySkillsData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {primarySkillsData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "primarySkills" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "primarySkills"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <PrimarySkills data={primarySkillProps} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div
                        className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "skills" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("skills")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "skills" ? " from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <SettingsSuggestOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Skills
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {skillsData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {skillsData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "skills" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "skills" ? "1fr" : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <MakeResumeContext.Provider
                                        value={{
                                            skills,
                                            setSkills,
                                            skillName,
                                            setSkillName,
                                            level,
                                            setLevel,
                                            skillsData,
                                            setSkillsData,
                                        }}
                                    >
                                        <SkillsSection />
                                    </MakeResumeContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div
                        className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "certifications" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("certifications")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "certifications" ? " from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <WorkspacePremiumOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Certifications
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {certificateData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {certificateData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "certifications" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "certifications"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <MakeResumeContext.Provider
                                        value={{
                                            certificateName,
                                            setCertificateName,
                                            certificate,
                                            setCertificate,
                                            setInstitution,
                                            organization,
                                            setOrganization,
                                            month,
                                            setMonth,
                                            year,
                                            setYear,
                                            certificateData,
                                            setCertificateData,
                                        }}
                                    >
                                        <Certifications />
                                    </MakeResumeContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Website & Social Links */}
                    <div
                        className={`mt-3 border rounded-xl bg-white transition-all duration-300 ease-out group overflow-hidden border-[#CBDAE3] ${openSection === "socialLinks" ? "shadow-md " : "shadow-sm "}`}
                    >
                        <div
                            onClick={() => handleAccordion("socialLinks")}
                            className={`bg-linear-to-r hover:from-[#ebf8ff] to-white transition-all duration-250 flex justify-between items-center py-4 px-6 cursor-pointer select-none ${openSection === "socialLinks" ? " from-[#ebf8ff]" : ""}`}
                        >
                            <div className="flex group cursor-default select-none ">
                                <span className={iconShade}>
                                    <LinkOutlinedIcon
                                        style={{ fontSize: "1.2rem" }}
                                        className="text-white place-self-center m-0.5"
                                    />
                                </span>
                                <span className="font-extrabold text-gray-700 text-lg">
                                    Website & Social Links
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                {socialData.length > 0 && (
                                    <div className={numIconStyle}>
                                        {socialData.length}
                                    </div>
                                )}
                                <KeyboardArrowRightIcon
                                    className={`transition-all duration-300 ${openSection === "socialLinks" ? "rotate-90" : ""}`}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows:
                                    openSection === "socialLinks"
                                        ? "1fr"
                                        : "0fr",
                                transition: "grid-template-rows 0.3s ease",
                            }}
                        >
                            <div style={{ overflow: "hidden" }}>
                                <div className="p-4 sm:p-6 border-t border-gray-200">
                                    <MakeResumeContext.Provider
                                        value={{
                                            socialLink,
                                            setSocialLink,
                                            label,
                                            setLabel,
                                            URL,
                                            setURL,
                                            socialData,
                                            setSocialData,
                                        }}
                                    >
                                        <SocialLinks />
                                    </MakeResumeContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* My Resumes Section */}
                    {/* <MyResumes activeTemplate={activeTemplate} resumeProps={resumeProps} /> */}
                </div>

                {/* ── PDF Preview panel ── */}
                <div
                    className={`flex flex-col justify-center items-center w-full lg:w-[60%] h-full lg:h-[calc(100vh-9.5rem)] overflow-hidden ${
                        mobileTab === "edit" ? "hidden lg:flex" : "flex"
                    }`}
                >
                    {previewComponents[activeTemplate]}
                </div>

                <div className=" hidden w-[60%] h-[calc(100vh-11rem)] rounded-lg overflow-hidden">
                    <PDFViewer
                        width="100%"
                        height="100%"
                        showToolbar={false}
                        border="none"
                        style={{ border: "none", borderRadius: "0.5rem" }}
                    >
                        <PDFfour {...resumeProps} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
};
export default MakeResume;
