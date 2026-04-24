import add from '../assets/ResumeAsset/add.svg'

const Skills = ({skill}) => {
  return (
    <div className="p-2 bg-white w-fit h-fit flex cursor-pointer select-none">
      <span>{skill}</span>
      <img className='w-3' src={add} alt="" />
    </div>
  )
}

export default Skills