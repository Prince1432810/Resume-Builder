import locIcon from '../assets/CardAsset/location.svg'
import expIcon from '../assets/CardAsset/experience.svg'
import noticeIcon from '../assets/CardAsset/notice.svg'

const Card = ({jobs}) => {
// 
  return (
    <div className='shrink-0 w-[48%] grow-0 h-48 bg-white rounded-md border border-gray-200 p-3 flex flex-col justify-between'>
      <div className='flex '>
        <img className='h-12 rounded-md mr-3' src={jobs.companyLogo} alt="image" />
        <div>
            <h4 className='font-bold text-[#3985b6]'>{jobs.title}</h4>
            <h5 className='text-sm text-gray-500'>{jobs.company}</h5>
        </div>
      </div>

      <div className='flex items-center'>
        <img className='h-3 mr-2' src={locIcon} alt="" />
        <h5 className='text-xs mr-2 text-gray-500'>{jobs.location.type}, {jobs.location.country}</h5>
        <div className='border-r mr-2 border-gray-400 h-full bg-gray-400'></div>
        <img className='h-3 mr-2' src={expIcon} alt="" />
        <h5 className='text-xs mr-2 text-gray-500'>{jobs.experience.min}-{jobs.experience.max} years</h5>
        <div className='border-r mr-2 border-gray-400 h-full bg-gray-400'></div>
        <img className='h-3 mr-2' src={noticeIcon} alt="" />
        <h5 className='text-xs mr-2 text-gray-500'>{jobs.noticePeriod.minDays}-{jobs.noticePeriod.maxDays} days</h5>
      </div>

      <div className='flex text-[9px] text-gray-600'>
        <h5 className='bg-gray-200 rounded p-1 mr-2'>{jobs.skills.skill1}</h5>
        <h5 className='bg-gray-200 rounded p-1 mr-2'>{jobs.skills.skill2}</h5>
        <h5 className='bg-gray-200 rounded p-1 mr-2'>{jobs.skills.skill3}</h5>
      </div>

      <div className='text-xs text-gray-500  text-end mb-5'>
        <h5><b>Broadcasted: </b> {jobs.broadcasted}</h5>
      </div>
    </div>
  )
}

export default Card
