import { useContext, useState } from 'react'
import { MakeResumeContext } from '../MakeResumeContext'
import SelectedCard from '../SelectedCard';
import YearPicker from '../DatePicker/YearPicker';

// MUI ICONS
import SchoolIcon from '@mui/icons-material/School';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Education = () => {
  const {
    education, setEducation,
    eduData, setEduData,
    institution, setInstitution,
    degree, setDegree,
    startYear, setStartYear,
    endYear, setEndYear
  } = useContext(MakeResumeContext);

  const [editForm, setEditForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  function setEmpty() {
    setInstitution(""); setDegree(""); setStartYear(""); setEndYear("");
  }

  const handleEdit = (data) => { setEditingId(data.id); setEditForm({ ...data }); };
  const handleEditChange = (field, value) => setEditForm(prev => ({ ...prev, [field]: value }));

  const handleSaveEdit = () => {
    setEduData(prev => prev.map(item =>
      item.id === editingId ? { ...item, ...editForm } : item
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => { setEditingId(null); setEditForm({}); };

  const handleNoShow = (id) => setEduData(prev => prev.filter(item => item.id !== id));

  function addEducation() {
    const eduObj = { id: Date.now(), show: true, institution, degree, startYear, endYear };
    setEduData(prev => [...prev, eduObj]);
    setEmpty();
  }

  const isAddFormFilled = institution && degree && startYear && endYear;
  const isEditFormFilled = editForm.institution && editForm.degree && editForm.startYear && editForm.endYear;

  return (
    <div className=''>
      <p className='text-gray-400 text-sm'>A varied education on your resume sums up the value that your learning and background will bring to job.</p>

      {eduData.map((elem) => (
        <div key={elem.id}>
          {editingId === elem.id ? (

            <div className='p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden'
              style={{ animation: 'slideDown 0.3s ease' }}>

              <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <SchoolIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Institution</label>
                  </div>
                  <input type="text" value={editForm.institution || ''} onChange={(e) => handleEditChange('institution', e.target.value)} className='inputField' placeholder='university / school board' />
                </div>

                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CardMembershipIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Degree</label>
                  </div>
                  <input type="text" value={editForm.degree || ''} onChange={(e) => handleEditChange('degree', e.target.value)} className='inputField' placeholder='Enter degree / class' />
                </div>

                {/* EDIT START YEAR */}
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>Start Year</label>
                  </div>
                  <YearPicker
                    value={editForm.startYear || ''}
                    onChange={(val) => {
                      handleEditChange('startYear', val);
                      handleEditChange('endYear', ''); // reset end when start changes
                    }}
                  />
                </div>

                {/* EDIT END YEAR */}
                <div className='inputContainer'>
                  <div className='flex mb-0.5 gap-1'>
                    <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField'>End Year</label>
                  </div>
                  <YearPicker
                    value={editForm.endYear || ''}
                    onChange={(val) => handleEditChange('endYear', val)}
                    disabled={!editForm.startYear}
                    minYear={editForm.startYear ? parseInt(editForm.startYear) : 1948}
                    maxYear={editForm.startYear ? parseInt(editForm.startYear) + 10 : undefined}
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

      <div className={education ? 'p-5 border mt-5 border-gray-200 rounded-lg' : "hidden"}
        style={{ animation: 'slideDown 0.3s ease' }}>

        <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <SchoolIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' htmlFor='institution'>Institution</label>
            </div>
            <input type="text" id='institution' onChange={(e) => setInstitution(e.target.value)} value={institution} className='inputField' placeholder='university / school board' />
          </div>

          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CardMembershipIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' htmlFor='degree'>Degree</label>
            </div>
            <input type="text" id='degree' onChange={(e) => setDegree(e.target.value)} value={degree} className='inputField' placeholder='Enter degree / class' />
          </div>

          {/* ADD START YEAR */}
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField'>Start Year</label>
            </div>
            <YearPicker
              value={startYear}
              onChange={(val) => { setStartYear(val); setEndYear(''); }}
            />
          </div>

          {/* ADD END YEAR */}
          <div className='inputContainer'>
            <div className='flex mb-0.5 gap-1'>
              <CalendarMonthIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField'>End Year</label>
            </div>
            <YearPicker
              value={endYear}
              onChange={setEndYear}
              disabled={!startYear}
              minYear={startYear ? parseInt(startYear) : 1948}
              maxYear={startYear ? parseInt(startYear) + 10 : undefined}
            />
          </div>
        </div>

        <button onClick={() => { addEducation(); setEducation(false); }} disabled={!isAddFormFilled}
          className={isAddFormFilled ? 'safe-button' : 'white-gray-btn'}>Save</button>
        <button onClick={() => { setEducation(false); setEditingId(null); setEmpty(); }} className='black-gray-btn'>Cancel</button>
      </div>

      <button onClick={() => setEducation(true)} className={education ? "hidden" : 'btn mt-5'}>Add Education</button>
    </div>
  );
}

export default Education;