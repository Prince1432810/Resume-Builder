import {Link} from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useContext } from 'react'

const Generate = () => {
  const {tab, setTab} = useContext(UserContext);
  return (
    <div className="w-full lg:w-[30%] p-8 pt-5.5 pl-10 bg-white rounded-md border border-gray-200 flex flex-col ">
      <strong className="text-lg mb-2">Generate Your Professional Resume</strong>
      <p className="text-sm mb-4">As a Professional, create a resume by selecting your preferred template. These templates are tested by the best ATS software and have the highest acceptance rate.</p>
      <Link to='/resume-builder' className='w-fit'>
        <button onClick={() => setTab("resume")} className="bg-[#3985b6] p-2 h-10 rounded-md text-white w-38 text-sm font-semibold active:bg-[#4898ce]">Generate Resume</button>
      </Link>
    </div>
  )
}

export default Generate
