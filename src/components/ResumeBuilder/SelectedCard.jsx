import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const SelectedCard = ({ data, noShow, onEdit }) => {
  const { title, company, startDate, endDate, location, show } = data;
  const { institution, degree, startYear, endYear } = data;
  const { label, URL } = data;
  const { certificateName, organization, month, year } = data;
  const { skillName, primarySkillName, level, primaryLevel } = data;

  const isSkill = skillName || primarySkillName;

  return isSkill ? (

    // ── Skill card (SkillsSection + PrimarySkills) ──────────────────────────
    <div className={show ? "relative w-full h-fit mt-4 bg-white border border-gray-300 rounded-xl overflow-hidden flex" : "hidden"}>
      <button
        onClick={() => onEdit(data)}
        className='opacity-0 z-0 hover:opacity-100 absolute bg-black/20 transition-all duration-200 h-full w-full top-0 left-0 text-white text-xl'
      >Edit</button>

      {/* Left accent — blue for skills, teal for primary skills */}
      <div className={`w-1 shrink-0 rounded-l-xl ${primarySkillName ? 'bg-[#5DCAA5]' : 'bg-[#378ADD]'}`}></div>

      <div className='flex items-center justify-between flex-1 px-4 py-3'>
        <div>
          <span className='text-[11px] text-gray-400'>
            {primarySkillName ? 'Primary skill' : 'Skill'}
          </span>
          <p className='text-sm font-semibold text-gray-700 mt-0.5'>
            {skillName || primarySkillName}
          </p>
        </div>
        <div className='flex items-center gap-2 z-10'>
          <span className={`text-xs px-2.5 py-0.5 rounded-md font-medium
            ${primarySkillName
              ? 'bg-[#e1f5ee] text-[#085041]'
              : 'bg-[#e6f1fb] text-[#0C447C]'
            }`}>
            {level || primaryLevel}
          </span>
          <button
            onClick={() => noShow()}
            className='z-10 px-1.5 py-0.5 rounded-full bg-red-100 border border-red-500 text-red-500 text-xs flex-shrink-0'
          >x</button>
        </div>
      </div>
    </div>

  ) : (

    // ── Original card (experience, education, links, certificates) ──────────
    <div className={show ? "relative w-full h-fit mt-4 bg-white border border-gray-300 rounded-xl overflow-hidden flex" : "hidden"}>
      <button onClick={() => onEdit(data)} className='opacity-0 z-0 hover:opacity-100 absolute bg-black/20 transition-all duration-200 h-full w-full top-0 left-0 text-white text-xl'>Edit</button>

      <div className='w-1 bg-[#378ADD] shrink-0 rounded-l-xl'></div>
      <div className='flex flex-col gap-1 flex-1 p-4'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-0.5'>
            <span className={URL ? 'text-md font-semibold text-[#3985B6]' : organization ? 'text-md font-semibold text-gray-600' : 'text-md font-semibold text-[#3985B6]'}>
              {company || degree || URL || organization}
            </span>
            <span className='text-sm font-semibold text-gray-700'>
              {title || institution || label || certificateName}
            </span>
          </div>
          <button onClick={() => noShow()} className='z-10 px-1.5 py-0.5 ml-2 rounded-full bg-red-100 border border-red-500 text-red-500 text-xs flex-shrink-0'>x</button>
        </div>

        <div className='flex items-center gap-2 mt-1 flex-wrap'>
          {(startDate || startYear) && (
            <span className='text-xs text-[#baa125] bg-[#fffbdc] px-2.5 py-0.5 rounded-md'>
              {startDate || startYear} - {endDate || endYear}
            </span>
          )}
          {organization && (
            <span className='text-xs bg-blue-50 text-[#2c7be5] px-2.5 py-0.5 rounded-md'>
              {month}-{year}
            </span>
          )}
          {location && <div className='text-xs text-[#3986b5]'>{location}</div>}
        </div>
      </div>
    </div>

  );
};

export default SelectedCard;