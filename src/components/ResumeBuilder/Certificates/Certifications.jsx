import { useContext, useState } from 'react'
import { MakeResumeContext } from '../MakeResumeContext'
import SelectedCard from '../SelectedCard';
import MonthPicker from '../DatePicker/MonthPicker';   // ← adjust path
import YearPicker from '../DatePicker/YearPicker';     // ← the one from Education

// MUI ICONS
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Certifications = () => {
  const {
    certificateName, setCertificateName,
    certificate, setCertificate,
    organization, setOrganization,
    month, setMonth,
    year, setYear,
    certificateData, setCertificateData
  } = useContext(MakeResumeContext);

  const [editForm, setEditForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  function setEmpty() {
    setCertificateName(""); setOrganization(""); setMonth(""); setYear("");
  }

  const handleNoShow = (id) => setCertificateData(prev => prev.filter(item => item.id !== id));
  const handleEdit = (data) => { setEditingId(data.id); setEditForm({ ...data }); };
  const handleEditChange = (field, value) => setEditForm(prev => ({ ...prev, [field]: value }));

  const handleSaveEdit = () => {
    setCertificateData(prev => prev.map(item =>
      item.id === editingId ? { ...item, ...editForm } : item
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => { setEditingId(null); setEditForm({}); };

  function addCertificate() {
    const certificateObj = { id: Date.now(), show: true, certificateName, organization, month, year };
    setCertificateData(prev => [...prev, certificateObj]);
    setEmpty();
  }

  const isEditFormFilled = editForm.certificateName && editForm.organization && editForm.month && editForm.year;
  const isAddFormFilled = certificateName && organization && month && year;

  return (
    <div className=''>
      <p className='text-gray-400 text-sm'>Showcase your expertise and stay ahead—certifications prove your skills, boost credibility, and open doors to new opportunities.</p>

      {certificateData.map((elem) => (
        <div key={elem.id}>
          {editingId === elem.id ? (

            <div className='p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden'
              style={{ animation: 'slideDown 0.3s ease' }}>

              <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <WorkspacePremiumOutlinedIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Certificate Name</label>
                  </div>
                  <input type="text" value={editForm.certificateName || ''} onChange={(e) => handleEditChange('certificateName', e.target.value)} className='inputField' placeholder='Enter certificate name' />
                </div>

                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CorporateFareOutlinedIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Issuing Organization</label>
                  </div>
                  <input type="text" value={editForm.organization || ''} onChange={(e) => handleEditChange('organization', e.target.value)} className='inputField' placeholder='Enter organization name' />
                </div>

                {/* EDIT MONTH */}
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Month</label>
                  </div>
                  <MonthPicker
                    value={editForm.month || ''}
                    onChange={(val) => handleEditChange('month', val)}
                  />
                </div>

                {/* EDIT YEAR */}
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Year</label>
                  </div>
                  <YearPicker
                    value={editForm.year || ''}
                    onChange={(val) => handleEditChange('year', val)}
                  />
                </div>
              </div>

              <button onClick={handleSaveEdit} disabled={!isEditFormFilled}
                className={isEditFormFilled ? 'safe-button' : 'white-gray-btn'}>Save</button>
              <button onClick={handleCancelEdit} className='black-gray-btn'>Cancel</button>
            </div>

          ) : (
            <SelectedCard data={elem} noShow={() => handleNoShow(elem.id)} onEdit={() => handleEdit(elem)} />
          )}
        </div>
      ))}

      <div className={certificate ? 'p-5 border mt-5 border-gray-200 rounded-lg' : "hidden"}
        style={{ animation: 'slideDown 0.3s ease' }}>

        <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <WorkspacePremiumOutlinedIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' htmlFor="certificate">Certificate Name</label>
            </div>
            <input type="text" id='certificate' onChange={(e) => setCertificateName(e.target.value)} value={certificateName} className='inputField' placeholder='Enter certificate name' />
          </div>

          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CorporateFareOutlinedIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' htmlFor="organization">Issuing Organization</label>
            </div>
            <input type="text" id='organization' onChange={(e) => setOrganization(e.target.value)} value={organization} className='inputField' placeholder='Enter organization name' />
          </div>

          {/* ADD MONTH */}
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField'>Month</label>
            </div>
            <MonthPicker
              value={month}
              onChange={setMonth}
            />
          </div>

          {/* ADD YEAR */}
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField'>Year</label>
            </div>
            <YearPicker
              value={year}
              onChange={setYear}
            />
          </div>
        </div>

        <button onClick={() => { addCertificate(); setCertificate(false); }} disabled={!isAddFormFilled}
          className={isAddFormFilled ? 'safe-button' : 'white-gray-btn cursor-not-allowed'}>Save</button>
        <button onClick={() => { setCertificate(false); setEditingId(null); setEmpty(); }} className='black-gray-btn'>Cancel</button>
      </div>

      <button onClick={() => { setEditingId(null); setEditForm({}); setCertificate(true); }} className={certificate ? "hidden" : 'btn mt-5'}>Add Certificate</button>
    </div>
  );
}

export default Certifications;