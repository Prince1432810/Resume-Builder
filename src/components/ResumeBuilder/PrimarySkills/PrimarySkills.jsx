import { useContext, useState } from "react";
import { MakeResumeContext } from "../MakeResumeContext";
import SelectedCard from "../SelectedCard";

// MUI Icons
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StarIcon from "@mui/icons-material/Star";

const PrimarySkills = ({ data }) => {
    const {
        primarySkills,
        primarySkillName,
        primaryLevel,
        primarySkillsData,
        setPrimarySkills,
        setPrimarySkillName,
        setPrimaryLevel,
        setPrimarySkillsData,
    } = data;

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    console.log("PrimarySKILLS: " + primarySkillsData);

    function setEmpty() {
        setPrimarySkillName("");
        setPrimaryLevel("");
    }

    const handleNoShow = (id) => {
        setPrimarySkillsData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (data) => {
        setEditingId(data.id);
        setEditForm({ ...data });
    };

    const handleEditChange = (field, value) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveEdit = () => {
        setPrimarySkillsData((prev) =>
            prev.map((item) =>
                item.id === editingId
                    ? { ...item, ...editForm, level: editForm.primaryLevel }
                    : item,
            ),
        );
        setEditingId(null);
        setEditForm({});
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    function addSkill() {
        const skillObj = {
            id: Date.now(),
            show: true,
            primarySkillName: primarySkillName,
            level: primaryLevel,
        };
        setPrimarySkillsData((prev) => [...prev, skillObj]);
        setEmpty();
    }

    const isAddFormFilled = primarySkillName && primaryLevel;
    const isEditFormFilled = editForm.primarySkillName && editForm.primaryLevel;

    return (
        <div className="">
            {/* <span className='font-extrabold text-xl'>Skills</span> */}
            <p className="text-gray-400 text-sm">
                Highlight your key skills and proficiency levels to give
                employers a clear picture of your technical and professional
                capabilities.
            </p>

            {primarySkillsData.map((elem) => (
                <div key={elem.id}>
                    {editingId === elem.id ? (
                        <div
                            className="p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden"
                            style={{ animation: "slideDown 0.3s ease" }}
                        >
                            <div className="grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6">
                                <div className="inputContainer">
                                    <div className="flex items-center mb-0.5 gap-1">
                                        <SettingsSuggestIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            Primary Skill Name
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={editForm.primarySkillName || ""}
                                        onChange={(e) =>
                                            handleEditChange(
                                                "primarySkillName",
                                                e.target.value,
                                            )
                                        }
                                        className="inputField"
                                        placeholder="Enter primary skills"
                                    />
                                </div>

                                <div className="inputContainer">
                                    <div className="flex items-center mb-0.5 gap-1">
                                        <StarIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            Level
                                        </label>
                                    </div>
                                    <select
                                        value={editForm.primaryLevel || ""}
                                        onChange={(e) =>
                                            handleEditChange(
                                                "primaryLevel",
                                                e.target.value,
                                            )
                                        }
                                        className="inputField"
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Beginner">
                                            Beginner
                                        </option>
                                        <option value="Elementary">
                                            Elementary
                                        </option>
                                        <option value="Intermediate">
                                            Intermediate
                                        </option>
                                        <option value="Advanced">
                                            Advanced
                                        </option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveEdit}
                                disabled={!isEditFormFilled}
                                className={
                                    isEditFormFilled
                                        ? "white-gray-btn safe-save"
                                        : "white-gray-btn"
                                }
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="black-gray-btn"
                            >
                                Cancel
                            </button>
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

            <div
                className={
                    primarySkills
                        ? "p-5 border mt-5 border-gray-200 rounded-lg"
                        : "hidden"
                }
                style={{ animation: "slideDown 0.3s ease" }}
            >
                <div className="grid md:grid-cols-2 gap-x-5 gap-y-6 mb-6">
                    <div className="inputContainer">
                        <div className="flex items-center mb-0.5 gap-1">
                            <SettingsSuggestIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">
                                Primary Skill Name
                            </label>
                        </div>
                        <input
                            type="text"
                            id="skillName"
                            onChange={(e) =>
                                setPrimarySkillName(e.target.value)
                            }
                            value={primarySkillName}
                            className="inputField"
                        />
                    </div>

                    <div className="inputContainer">
                        <div className="flex items-center mb-0.5 gap-1">
                            <StarIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">Level</label>
                        </div>

                        <select
                            id="level"
                            onChange={(e) => setPrimaryLevel(e.target.value)}
                            value={primaryLevel}
                            className="inputField"
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
                    onClick={() => {
                        addSkill();
                        setPrimarySkills(false);
                    }}
                    disabled={!isAddFormFilled}
                    className={
                        isAddFormFilled ? "safe-button" : "white-gray-btn"
                    }
                >
                    Save
                </button>

                <button
                    onClick={() => {
                        setPrimarySkills(false);
                        setEmpty();
                    }}
                    className="black-gray-btn"
                >
                    Cancel
                </button>
            </div>

            <button
                onClick={() => {
                    setEditingId(null);
                    setEditForm({});
                    setPrimarySkills(true);
                }}
                className={primarySkills ? "hidden" : "btn mt-5"}
            >
                Add Skill
            </button>
        </div>
    );
};

export default PrimarySkills;
