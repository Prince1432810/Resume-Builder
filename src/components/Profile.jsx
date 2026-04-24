import noView from '../assets/ProfileAsset/noView.png'

const Profile = () => {
  return (
    <div className='h-92 bg-[#f9fafc] flex justify-between items-center rounded-md p-4'>
      <div className='flex flex-col h-[80%] self-start justify-between text-gray-400'>
        <strong >Profile Insights</strong>
        <div>
            <p>Total Views</p>
            <strong className='text-2xl'>0</strong>
        </div>
        <div>
            <p>Unique Views</p>
            <strong className='text-2xl'>0</strong>
        </div>
        <div>
            <p>Profile Unlocks</p>
            <strong className='text-2xl'>0</strong>
        </div>
      </div>
        <img className='w-[40%]' src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Analyze-bro.png" alt="" />
    </div>
  )
}

export default Profile