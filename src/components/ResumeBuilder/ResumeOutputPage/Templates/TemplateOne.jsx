import { useRef, useEffect, useState } from "react"
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const TemplateOne = (props) => {
  const { first, last, email, phone, country, city, state, linkedin, summary } = props;
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
      const container = document.getElementById('resume-container');
      if (!container) return;
      const available = container.parentElement.clientWidth;
      const newScale = Math.min(1, available / A4_WIDTH);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);


  const pageIconTailwind = { height: "14px" };

  const jsonToHtml = (jsonString) => {
    try {
      const json = JSON.parse(jsonString);
      return generateHTML(json, [StarterKit, Underline]);
    } catch {
      return '';
    }
  };

  function printExp(data) {
    if (!expData.length)
      return;

    return (

      <div className="mb-2" key={data.id}>
        <div className="flex justify-between text-[.9rem] w-full text-wrap">
          <div>
            <div className="text-lg">{data.title}</div>
            <div className="text-md text-gray-500">{data.company}</div>
          </div>

          <div className="flex flex-col items-end">
            <div>{data.startDate + ' - '} {data.endDate}</div>
            <div className="text-gray-500">{data.location}</div>
          </div>

        </div>
        {/* <ul className="pl-5 list-disc text-sm">
          <li>{data.jobSummary}</li>
        </ul> */}
        {/* <div className="text-sm pl-5" dangerouslySetInnerHTML={{ __html: data.jobSummary }}/> */}
        <div className="text-sm pl-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: jsonToHtml(data.jobSummary) }} />
      </div>
    )
  }

  function printEdu(data) {
    if (!eduData.length)
      return;

    return (

      <div className="mb-2" key={data.id}>
        <div className="flex justify-between items-center text-[.9rem] w-full text-wrap">

          <div>
            <div className="text-lg">{data.institution}</div>
            <div className="text-sm text-gray-500">{data.degree}</div>
          </div>

          <div className="flex flex-col items-end">
            <div>{data.startYear + ' - '} {data.endYear}</div>
          </div>

        </div>
      </div>
    )
  }

  function printSocial(data) {
    if (!socialData.length)
      return;

    return (
      <div className="mb-2" key={data.id}>
        <div className="flex justify-between items-center w-full ">
          <a href={data.URL} target="_blank" className="text-base underline cursor-pointer">{data.label}</a>
        </div>
      </div>
    )
  }

  function printCertificate(data) {
    if (!certificateData.length)
      return;

    return (

      <div className="mb-2" key={data.id}>
        <div className="flex justify-between text-[.9rem] w-full text-wrap">
          <div>
            <div className="text-lg">{data.certificateName}</div>
            <div className="text-sm text-gray-500">{data.organization}</div>
          </div>

          <div className="flex flex-col items-end">
            <div>{data.month + ' - '} {data.year}</div>
          </div>

        </div>
      </div>
    )
  }

  function printSkills(data) {
    if (!skillsData.length) return;

    return (
      <div key={data.id} className="text-sm text-gray-600  rounded-full ">
        {data.skillName}
      </div>
    );
  }

  function printPrimarySkills(data) {
    if (!primarySkillsData.length) return;

    return (
      <div key={data.id} className="text-sm text-gray-600  rounded-full ">
        {data.primarySkillName}
      </div>
    );
  }

  return (
    <div
      id="resume-container"
      style={{
        width: '794px',
        height: '1123px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        fontFamily: "Calibri",
        marginBottom: `${(1123 * scale) - 1123}px`,
        // boxShadow: "2px 2px 7px rgb(0, 0, 0, 0.5)"
      }}
      className="bg-white text-black border border-[#CBDAE3] overflow-scoll mx-auto p-20 rounded-lg overflow-scroll place-self-center shadow-xl  "
    >
      {/* <div className="bg-white text-black border border-gray-200 min-w-[790px] max-w-[794px] min-h-[1123px] max-h-[1123px] mx-auto p-20 overflow-scroll rounded-lg w" style={{ fontFamily: "Calibri" }}> */}
      <div className="flex items-center flex-col ">
        <div className="font-semibold text-4xl">{`${first} ${last}`}</div>

        {/* Personal Details */}
        <div className="text-[.8rem] font-semibold flex w-full flex-wrap justify-center">

          <div className={phone ? "flex items-center" : "hidden"}>
            <CallIcon style={pageIconTailwind} className="text-[8px]" />
            <div>{`${phone}`}</div>
          </div>

          <div className={(email) ? "flex items-center" : "hidden"}>
            <MailIcon style={pageIconTailwind} />
            <div>{`${email}`}</div>
          </div>

          <div className={linkedin ? "flex items-center" : "hidden"}>
            <LinkedInIcon style={pageIconTailwind} />
            <div>{`${linkedin}`}</div>
          </div>

          <div className={(city || state || country) ? "flex items-center" : "hidden"}>
            <div className="flex">
              <LocationOnIcon style={pageIconTailwind} />
              <div>{city}{((city && state) || (city && country)) && ","}&nbsp;</div>
            </div>

            <div className="flex">
              <div>{state}{(state && country) && ","}&nbsp;</div>
            </div>

            <div className="flex">
              <div>{country}</div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className={summary && summary.replace(/<[^>]*>/g, '').trim() ? "w-full self-start h-fit mt-5" : "hidden"}>
          <div className="text-xl font-medium">PROFILE SUMMARY</div>
          <div className="w-full border-t"></div>
          <div className="text-[.9rem] leading-4.5 text-wrap [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: jsonToHtml(summary) }} />
        </div>

        {/* Technical Skills */}
        <div className={skillsData.length ? "w-full self-start h-fit mt-5 mb-5" : "hidden"}>
          <div className="text-xl ">TECHNICAL SKILLS</div>
          <div className="w-full border-t flex flex-row gap-10" />
          <div className="flex flex-col gap-2 flex-wrap mt-1">
            {/* Primary Skills  */}
            <div className="flex gap-2">
              <span className={primarySkillsData.length ? "text-md font-semibold" : "hidden"}> Primary Skills —</span>
              <div className="flex gap-2 flex-wrap items-center">
                {primarySkillsData.map((data) => printPrimarySkills(data))}
              </div>
            </div>
            {/* Skills */}
            <div className="flex gap-2">
              <span className={skillsData.length ? "text-md font-semibold" : "hidden"}>Skills —</span>
              <div className="flex gap-2 flex-wrap items-center">
                {skillsData.map((data) => printSkills(data))}
              </div>
            </div>
          </div>
        </div>

        {/* EXPERIENCE  */}
        <div className={expData.length ? "w-full self-start h-fit mt-5 mb-5" : "hidden"}>
          <div className="text-xl ">EXPERIENCE</div>
          <div className="w-full border-t flex flex-row gap-10" />
          {
            expData.map((data) => {
              return (
                printExp(data)
              )
            })
          }

        </div>

        {/* EDUCATION */}
        <div className={eduData.length ? "w-full self-start h-fit mb-5" : "hidden"}>
          <div className="text-xl ">EDUCATION</div>
          <div className="w-full border-t" />

          {
            eduData.map((data, index) => {
              return (
                printEdu(data, index)
              )
            })
          }
        </div>

        {/* SOCIAL LINK */}
        <div className={socialData.length ? "w-full self-start h-fit mb-5" : "hidden"}>
          <div className="text-xl ">SOCIAL LINKS</div>
          <div className="w-full border-t" />
          <div className="flex mt-2 gap-2">

            {
              socialData.map((data) => {
                return (
                  printSocial(data)
                )
              })
            }
          </div>

        </div>

        {/* CERTIFICATE */}
        <div className={certificateData.length ? "w-full self-start h-fit mb-5" : "hidden"}>
          <div className="text-xl ">CERTIFICATION</div>
          <div className="w-full border-t" />

          {
            certificateData.map((data) => {
              return (
                printCertificate(data)
              )
            })
          }

        </div>

      </div>

      {/* </div> */}
    </div>

  )
}

export default TemplateOne
