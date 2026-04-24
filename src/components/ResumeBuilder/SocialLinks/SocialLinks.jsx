import { useContext, useState } from 'react'
import { MakeResumeContext } from '../MakeResumeContext'
import SelectedCard from '../SelectedCard'

// MUI Icons
import PublicIcon from '@mui/icons-material/Public';
import AddLinkIcon from '@mui/icons-material/AddLink';

const SocialLinks = () => {
  const {socialLink, setSocialLink, label, setLabel, URL, setURL, socialData, setSocialData} = useContext(MakeResumeContext);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  function setEmpty(){
    setSocialLink("");
    setLabel("");
    setURL("");
  }
  
  function filterData() {
    setSocialData(prev => prev.filter(elem => elem.show));
  }

  const handleNoShow = (id) => {
    setSocialData(prev => prev.filter(item => item.id !== id));
  };

    const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({ ...data });
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    setSocialData(prev => prev.map(item =>
      item.id === editingId ? { ...item, ...editForm } : item
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  function addSocialLink(){
    const socialObj = {
      id: Date.now(),
      show: true,
      label: label,
      URL: URL,
    };
    setSocialData(prev => [...prev, socialObj]);
    setEmpty();
  }

  const isAddFormFilled = label && URL;
  const isEditFormFilled = editForm.label && editForm.URL;

  return (
    <div className=''>
      {/* <span className='font-extrabold text-xl'>Website & Social Links</span> */}
      <p className=' text-gray-400 text-md'>Add your professional links (LinkedIn, Portfolio, etc.).</p>

      {socialData.map((elem) => (
        <div key={elem.id}>
          {editingId === elem.id ? (

            <div className='p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden'
              style={{animation: 'slideDown 0.3s ease'}}>

              <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
                <div className='inputContainer'>
                  <div className='flex items-center mb-0.5 gap-1'>
                    <PublicIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField' >Platform</label>
                  </div>
                  <input type="text" value={editForm.label || ''} onChange={(e) => handleEditChange('label', e.target.value)} className='inputField' placeholder='Enter platform name'/>
                </div>

                <div className='inputContainer'>
                  <div className='flex items-center mb-0.5 gap-1'>
                    <AddLinkIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField' >URL</label>
                  </div>
                  <input type="text" value={editForm.URL || ''} onChange={(e) => handleEditChange('URL', e.target.value)} className='inputField' placeholder='https://www.example.com/user123/'/>
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                disabled={!isEditFormFilled}
                className={isEditFormFilled ? 'safe-button' : 'white-gray-btn'}
              >Save</button>
              
              <button onClick={handleCancelEdit} className='black-gray-btn'>Cancel</button>
            </div>

          ) : (
            <SelectedCard
              data={elem}
              noShow={() => handleNoShow(elem.id)}
              onEdit={() => handleEdit(elem)}
            />
          )}
        </div>
      ))}

      <div className={socialLink ? 'p-5 border mt-5 border-gray-200 rounded-lg': "hidden"}
        style={{animation: 'slideDown 0.3s ease'}}
      >
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
            <div className='inputContainer'>
            <div className='flex items-center mb-0.5 gap-1'>
              <PublicIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' >Platform</label>
            </div>
            <input type="text" id='Label' onChange={(event) => { setLabel((event.target.value)) }} value={label} className='inputField' placeholder='Enter platform name' />
          </div>

          <div className='inputContainer'>
            <div className='flex items-center mb-0.5 gap-1'>
              <AddLinkIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' >URL</label>
            </div>
            <input type="text" id='URL' onChange={(event) => { setURL((event.target.value)) }} value={URL} className='inputField' placeholder='https://www.example.com/user123/' />
          </div>
        </div>

        <button
          onClick={() => { addSocialLink(); setSocialLink(false); }}
          disabled={!isAddFormFilled}
          className={isAddFormFilled ? 'safe-button' : 'white-gray-btn'}
        >Save</button>

        <button onClick={() => {
          setSocialLink(false);
          setEmpty();
        }} className='black-gray-btn'>Cancel</button>
      </div>

      <button onClick={() => {
          setEditingId(null);
          setEditForm({});
          setSocialLink(true);
      }} className={socialLink ? "hidden" : 'btn mt-5'}>Add Link</button>
    </div>
  )
}

export default SocialLinks
