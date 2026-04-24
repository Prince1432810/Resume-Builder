import { useContext, useState } from 'react'
import { MakeResumeContext } from '../MakeResumeContext'
import SelectedCard from '../SelectedCard';

// MUI Icons
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StarIcon from '@mui/icons-material/Star';

const SkillsSection = () => {
  const { skills, setSkills, skillName, setSkillName, level, setLevel, skillsData, setSkillsData } = useContext(MakeResumeContext);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  function setEmpty(){
    setSkillName("");
    setLevel("");
  }

  const handleNoShow = (id) => {
    setSkillsData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({ ...data });
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    setSkillsData(prev => prev.map(item =>
      item.id === editingId ? { ...item, ...editForm } : item
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  function addSkill(){
    const skillObj = {
      id: Date.now(),
      show: true,
      skillName: skillName,
      level: level,
    };
    setSkillsData(prev => [...prev, skillObj]);
    setEmpty();
  }

  const isAddFormFilled = skillName && level;
  const isEditFormFilled = editForm.skillName && editForm.level;

  return (
    <div className=''>
      {/* <span className='font-extrabold text-xl'>Skills</span> */}
      <p className='text-gray-400 text-sm'>Highlight your key skills and proficiency levels to give employers a clear picture of your technical and professional capabilities.</p>

      {skillsData.map((elem) => (
        <div key={elem.id}>
          {editingId === elem.id ? (

            <div
              className='p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden'
              style={{animation: 'slideDown 0.3s ease'}}>

              <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
                <div className='inputContainer'>
                  <div className='flex items-center mb-0.5 gap-1'>
                    <SettingsSuggestIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField' >Skill Name</label>
                  </div>
                  <input
                    type="text"
                    value={editForm.skillName || ''}
                    onChange={(e) => handleEditChange('skillName', e.target.value)}
                    className='inputField'
                  />
                </div>

                <div className='inputContainer'>
                  <div className='flex items-center mb-0.5 gap-1'>
                    <StarIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
                    <label className='labelField' >Level</label>
                  </div>
                  <select
                    value={editForm.level || ''}
                    onChange={(e) => handleEditChange('level', e.target.value)}
                    className='inputField'
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                disabled={!isEditFormFilled}
                className={isEditFormFilled ? 'white-gray-btn safe-save' : 'white-gray-btn'}
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

      <div className={skills ? 'p-5 border mt-5 border-gray-200 rounded-lg' : "hidden"}
              style={{animation: 'slideDown 0.3s ease'}}
      >
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6'>
          <div className='inputContainer'>
            <div className='flex items-center mb-0.5 gap-1'>
              <SettingsSuggestIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' >Skill Name</label>
            </div>
            <input
              type="text"
              id='skillName'
              onChange={(e) => setSkillName(e.target.value)}
              value={skillName}
              className='inputField'
            />
          </div>

          <div className='inputContainer'>
            <div className='flex items-center mb-0.5 gap-1'>
              <StarIcon style={{ fontSize: "1.1rem" }} className='text-gray-500 mb-0.5' />
              <label className='labelField' >Level</label>
            </div>
            
            <select
              id='level'
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              className='inputField'
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => { addSkill(); setSkills(false); }}
          disabled={!isAddFormFilled}
          className={isAddFormFilled ? 'safe-button' : 'white-gray-btn'}
        >Save</button>

        <button onClick={() => {
          setSkills(false);
          setEmpty();
        }} className='black-gray-btn'>Cancel</button>
      </div>

      <button onClick={() => {
        setEditingId(null);
        setEditForm({});
        setSkills(true);
      }} className={skills ? "hidden" : 'btn mt-5'}>Add Skill</button>
    </div>
  )
}

export default SkillsSection