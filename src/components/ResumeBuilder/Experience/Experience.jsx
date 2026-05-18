import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useContext, useState, useEffect, useRef } from "react";
import { MakeResumeContext } from "../MakeResumeContext";
import SelectedCard from "../SelectedCard";
import TextEditor from "../TextEditor/TextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// MUI Icons
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Experience = () => {
    const {
        experience,
        setExperience,
        title,
        setTitle,
        company,
        setCompany,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        location,
        setLocation,
        jobSummary,
        setJobSummary,
        expData,
        setExpData,
    } = useContext(MakeResumeContext);

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const [showYearPickerAdd, setShowYearPickerAdd] = useState({
        start: true,
        end: true,
    });
    const [showYearPickerEdit, setShowYearPickerEdit] = useState({
        start: true,
        end: true,
    });

    const addStartPickerRef = useRef(null);
    const addEndPickerRef = useRef(null);
    const editStartPickerRef = useRef(null);
    const editEndPickerRef = useRef(null);

    const handleNoShow = (id) => {
        setExpData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (data) => {
        setEditingId(data.id);
        setEditForm({ ...data });
        setShowYearPickerEdit({ start: true, end: true });
    };

    const handleEditChange = (field, value) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveEdit = () => {
        setExpData((prev) =>
            prev.map((item) =>
                item.id === editingId ? { ...item, ...editForm } : item,
            ),
        );
        setEditingId(null);
        setEditForm({});
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    function setEmpty() {
        setTitle("");
        setCompany("");
        setStartDate("");
        setEndDate("");
        setLocation("");
        setJobSummary("");
    }

    function addExperience() {
        const expObj = {
            id: Date.now(),
            show: true,
            title,
            company,
            startDate,
            endDate,
            location,
            jobSummary,
        };
        setExpData((prev) => [...prev, expObj]);
        setEmpty();
    }

    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - 1948 + 1;
    const isAddFormFilled =
        title && company && startDate && endDate && location;
    const isEditFormFilled =
        editForm.title &&
        editForm.company &&
        editForm.startDate &&
        editForm.endDate &&
        editForm.location;

    const scrollToSelectedYear = () => {
        setTimeout(() => {
            const selectedYear =
                document.querySelector(
                    ".react-datepicker__year-text--selected",
                ) ||
                document.querySelector(
                    ".react-datepicker__year-text--keyboard-selected",
                );
            if (selectedYear) {
                selectedYear.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                });
            }
        }, 50);
    };

    return (
        <div className="">
            <p className="text-gray-400 text-sm">
                Show your relevant experience. if possible use number/facts
                (Achieved X, measures by Y , by doing Z)
            </p>

            {expData.map((elem) => (
                <div key={elem.id}>
                    {editingId === elem.id ? (
                        <div
                            className="p-5 border mt-5 border-gray-200 rounded-lg bg-white overflow-hidden"
                            style={{ animation: "slideDown 0.3s ease" }}
                        >
                            <div className="grid md:grid-cols-2 gap-x-5 gap-y-6">
                                <div className="inputContainer">
                                    <div className="flex items-center mb-0.5 gap-1">
                                        <WorkOutlinedIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            Job Title
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={editForm.title || ""}
                                        onChange={(e) =>
                                            handleEditChange(
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        className="inputField"
                                        placeholder="Enter job title"
                                    />
                                </div>

                                <div className="inputContainer">
                                    <div className="flex  mb-0.5 gap-1">
                                        <CorporateFareOutlinedIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            Company name
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={editForm.company || ""}
                                        onChange={(e) =>
                                            handleEditChange(
                                                "company",
                                                e.target.value,
                                            )
                                        }
                                        className="inputField"
                                        placeholder="Enter company name"
                                    />
                                </div>

                                {/* EDIT START DATE */}
                                <div className="inputContainer">
                                    <div className="flex mb-0.5 gap-1">
                                        <CalendarMonthIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            Start Date
                                        </label>
                                    </div>
                                    <DatePicker
                                        ref={editStartPickerRef}
                                        wrapperClassName="w-full no-scrollbar"
                                        placeholderText="YYYY-MM-DD"
                                        className="inputField w-full no-scrollbar"
                                        selected={
                                            editForm.startDate
                                                ? new Date(editForm.startDate)
                                                : null
                                        }
                                        shouldCloseOnSelect={
                                            !showYearPickerEdit.start
                                        }
                                        onCalendarOpen={scrollToSelectedYear}
                                        onChange={(date) => {
                                            if (showYearPickerEdit.start) {
                                                const today = new Date();
                                                const corrected = date
                                                    ? new Date(
                                                          date.getFullYear(),
                                                          today.getMonth(),
                                                          today.getDate(),
                                                      )
                                                    : null;
                                                handleEditChange(
                                                    "startDate",
                                                    corrected
                                                        ? corrected
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "",
                                                );
                                                handleEditChange("endDate", "");
                                                setShowYearPickerEdit(
                                                    (prev) => ({
                                                        ...prev,
                                                        start: false,
                                                    }),
                                                );
                                                setTimeout(
                                                    () =>
                                                        editStartPickerRef.current?.setOpen(
                                                            true,
                                                        ),
                                                    0,
                                                );
                                            } else {
                                                handleEditChange(
                                                    "startDate",
                                                    date
                                                        ? date
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "",
                                                );
                                                handleEditChange("endDate", "");
                                                setShowYearPickerEdit(
                                                    (prev) => ({
                                                        ...prev,
                                                        start: true,
                                                    }),
                                                );
                                            }
                                        }}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        dateFormat="yyyy-MM-dd"
                                        showYearPicker={
                                            showYearPickerEdit.start
                                        }
                                        yearItemNumber={totalYears}
                                        minDate={new Date(1948, 0, 1)}
                                        maxDate={new Date()}
                                        renderCustomHeader={(props) => (
                                            <CustomHeader
                                                {...props}
                                                showYearPicker={
                                                    showYearPickerEdit.start
                                                }
                                                setShowYearPicker={(val) =>
                                                    setShowYearPickerEdit(
                                                        (prev) => ({
                                                            ...prev,
                                                            start:
                                                                typeof val ===
                                                                "function"
                                                                    ? val(
                                                                          prev.start,
                                                                      )
                                                                    : val,
                                                        }),
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </div>

                                {/* EDIT END DATE */}
                                <div className="inputContainer">
                                    <div className="flex items-center mb-0.5 gap-1">
                                        <CalendarMonthIcon
                                            style={{ fontSize: "1.1rem" }}
                                            className="text-gray-500 mb-0.5"
                                        />
                                        <label className="labelField">
                                            End Date
                                        </label>
                                    </div>
                                    <DatePicker
                                        ref={editEndPickerRef}
                                        wrapperClassName="w-full no-scrollbar"
                                        placeholderText={
                                            editForm.startDate
                                                ? "YYYY-MM-DD"
                                                : "Select start date first"
                                        }
                                        className="inputField w-full no-scrollbar"
                                        selected={
                                            editForm.endDate
                                                ? new Date(editForm.endDate)
                                                : null
                                        }
                                        onCalendarOpen={scrollToSelectedYear}
                                        shouldCloseOnSelect={
                                            !showYearPickerEdit.end
                                        }
                                        onChange={(date) => {
                                            if (showYearPickerEdit.end) {
                                                const today = new Date();
                                                const corrected = date
                                                    ? new Date(
                                                          date.getFullYear(),
                                                          today.getMonth(),
                                                          today.getDate(),
                                                      )
                                                    : null;
                                                handleEditChange(
                                                    "endDate",
                                                    corrected
                                                        ? corrected
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "",
                                                );
                                                setShowYearPickerEdit(
                                                    (prev) => ({
                                                        ...prev,
                                                        end: false,
                                                    }),
                                                );
                                                setTimeout(
                                                    () =>
                                                        editEndPickerRef.current?.setOpen(
                                                            true,
                                                        ),
                                                    0,
                                                );
                                            } else {
                                                handleEditChange(
                                                    "endDate",
                                                    date
                                                        ? date
                                                              .toISOString()
                                                              .split("T")[0]
                                                        : "",
                                                );
                                                setShowYearPickerEdit(
                                                    (prev) => ({
                                                        ...prev,
                                                        end: true,
                                                    }),
                                                );
                                            }
                                        }}
                                        onChangeRaw={(e) => e.preventDefault()}
                                        dateFormat="yyyy-MM-dd"
                                        disabled={!editForm.startDate}
                                        showYearPicker={showYearPickerEdit.end}
                                        yearItemNumber={totalYears}
                                        minDate={
                                            editForm.startDate
                                                ? new Date(editForm.startDate)
                                                : undefined
                                        }
                                        maxDate={
                                            editForm.startDate
                                                ? new Date(
                                                      new Date(
                                                          editForm.startDate,
                                                      ).getFullYear() + 50,
                                                      11,
                                                      31,
                                                  )
                                                : undefined
                                        }
                                        renderCustomHeader={(props) => (
                                            <CustomHeader
                                                {...props}
                                                showYearPicker={
                                                    showYearPickerEdit.end
                                                }
                                                setShowYearPicker={(val) =>
                                                    setShowYearPickerEdit(
                                                        (prev) => ({
                                                            ...prev,
                                                            end:
                                                                typeof val ===
                                                                "function"
                                                                    ? val(
                                                                          prev.end,
                                                                      )
                                                                    : val,
                                                        }),
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="inputContainer mt-6">
                                <div className="flex mb-0.5 gap-1">
                                    <LocationOnIcon
                                        style={{ fontSize: "1.1rem" }}
                                        className="text-gray-500 mb-0.5"
                                    />
                                    <label className="labelField">
                                        Location
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={editForm.location || ""}
                                    onChange={(e) =>
                                        handleEditChange(
                                            "location",
                                            e.target.value,
                                        )
                                    }
                                    className="inputField location"
                                    placeholder="Enter work location"
                                />
                            </div>

                            <TextEditor
                                value={editForm.jobSummary || ""}
                                onChange={(val) =>
                                    handleEditChange("jobSummary", val)
                                }
                                placeholder="Description..."
                            />

                            <div className="mt-6">
                                <button
                                    onClick={() => handleSaveEdit()}
                                    disabled={!isEditFormFilled}
                                    className={
                                        isEditFormFilled
                                            ? "safe-button"
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

            {/* Add new experience form */}
            <div
                className={
                    experience
                        ? "p-5 border mt-5 border-gray-200 rounded-lg"
                        : "hidden"
                }
                style={{ animation: "slideDown 0.3s ease" }}
            >
                <div className="grid md:grid-cols-2 gap-x-5 gap-y-6">
                    <div className="inputContainer">
                        <div className="flex mb-0.5 gap-1">
                            <CalendarMonthIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">Job title</label>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="inputField"
                            placeholder="Enter job title"
                        />
                    </div>

                    <div className="inputContainer">
                        <div className="flex mb-0.5 gap-1">
                            <CorporateFareOutlinedIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">Company name</label>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setCompany(e.target.value)}
                            value={company}
                            className="inputField"
                            placeholder="Enter company name"
                        />
                    </div>

                    {/* ADD START DATE */}
                    <div className="inputContainer">
                        <div className="flex mb-0.5 gap-1">
                            <CalendarMonthIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">Start Date</label>
                        </div>
                        <DatePicker
                            ref={addStartPickerRef}
                            wrapperClassName="w-full"
                            placeholderText="YYYY-MM-DD"
                            className="inputField w-full"
                            calendarClassName="no-scrollbar"
                            selected={startDate ? new Date(startDate) : null}
                            onCalendarOpen={scrollToSelectedYear}
                            shouldCloseOnSelect={!showYearPickerAdd.start}
                            onChange={(date) => {
                                if (showYearPickerAdd.start) {
                                    const today = new Date();
                                    const corrected = date
                                        ? new Date(
                                              date.getFullYear(),
                                              today.getMonth(),
                                              today.getDate(),
                                          )
                                        : null;
                                    setStartDate(
                                        corrected
                                            ? corrected
                                                  .toISOString()
                                                  .split("T")[0]
                                            : "",
                                    );
                                    setEndDate("");
                                    setShowYearPickerAdd((prev) => ({
                                        ...prev,
                                        start: false,
                                    }));
                                    setTimeout(
                                        () =>
                                            addStartPickerRef.current?.setOpen(
                                                true,
                                            ),
                                        0,
                                    );
                                } else {
                                    setStartDate(
                                        date
                                            ? date.toISOString().split("T")[0]
                                            : "",
                                    );
                                    setEndDate("");
                                    setShowYearPickerAdd((prev) => ({
                                        ...prev,
                                        start: true,
                                    }));
                                }
                            }}
                            onChangeRaw={(e) => e.preventDefault()}
                            dateFormat="yyyy-MM-dd"
                            showYearPicker={showYearPickerAdd.start}
                            yearItemNumber={totalYears}
                            minDate={new Date(1948, 0, 1)}
                            maxDate={new Date()}
                            renderCustomHeader={(props) => (
                                <CustomHeader
                                    {...props}
                                    showYearPicker={showYearPickerAdd.start}
                                    setShowYearPicker={(val) =>
                                        setShowYearPickerAdd((prev) => ({
                                            ...prev,
                                            start:
                                                typeof val === "function"
                                                    ? val(prev.start)
                                                    : val,
                                        }))
                                    }
                                />
                            )}
                        />
                    </div>

                    {/* ADD END DATE */}
                    <div className="inputContainer">
                        <div className="flex mb-0.5 gap-1">
                            <CalendarMonthIcon
                                style={{ fontSize: "1.1rem" }}
                                className="text-gray-500 mb-0.5"
                            />
                            <label className="labelField">End Date</label>
                        </div>

                        <DatePicker
                            ref={addEndPickerRef}
                            wrapperClassName="w-full"
                            placeholderText={
                                startDate
                                    ? "YYYY-MM-DD"
                                    : "Select start date first"
                            }
                            disabled={!startDate}
                            className="inputField w-full no-scrollbar"
                            calendarClassName="no-scrollbar"
                            selected={endDate ? new Date(endDate) : null}
                            onCalendarOpen={scrollToSelectedYear}
                            shouldCloseOnSelect={!showYearPickerAdd.end}
                            onChange={(date) => {
                                if (showYearPickerAdd.end) {
                                    const today = new Date();
                                    const corrected = date
                                        ? new Date(
                                              date.getFullYear(),
                                              today.getMonth(),
                                              today.getDate(),
                                          )
                                        : null;
                                    setEndDate(
                                        corrected
                                            ? corrected
                                                  .toISOString()
                                                  .split("T")[0]
                                            : "",
                                    );
                                    setShowYearPickerAdd((prev) => ({
                                        ...prev,
                                        end: false,
                                    }));
                                    setTimeout(
                                        () =>
                                            addEndPickerRef.current?.setOpen(
                                                true,
                                            ),
                                        0,
                                    );
                                } else {
                                    setEndDate(
                                        date
                                            ? date.toISOString().split("T")[0]
                                            : "",
                                    );
                                    setShowYearPickerAdd((prev) => ({
                                        ...prev,
                                        end: true,
                                    }));
                                }
                            }}
                            onChangeRaw={(e) => e.preventDefault()}
                            dateFormat="yyyy-MM-dd"
                            showYearPicker={showYearPickerAdd.end}
                            yearItemNumber={totalYears}
                            minDate={
                                startDate ? new Date(startDate) : undefined
                            }
                            maxDate={
                                startDate
                                    ? new Date(
                                          new Date(startDate).getFullYear() +
                                              50,
                                          11,
                                          31,
                                      )
                                    : undefined
                            }
                            renderCustomHeader={(props) => (
                                <CustomHeader
                                    {...props}
                                    showYearPicker={showYearPickerAdd.end}
                                    setShowYearPicker={(val) =>
                                        setShowYearPickerAdd((prev) => ({
                                            ...prev,
                                            end:
                                                typeof val === "function"
                                                    ? val(prev.end)
                                                    : val,
                                        }))
                                    }
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="inputContainer mt-6">
                    <div className="flex mb-0.5 gap-1">
                        <LocationOnIcon
                            style={{ fontSize: "1.1rem" }}
                            className="text-gray-500 mb-0.5"
                        />
                        <label className="labelField">Location</label>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        className="inputField location"
                        placeholder="Enter work location"
                    />
                </div>

                <TextEditor
                    value={jobSummary}
                    onChange={setJobSummary}
                    placeholder="Description..."
                />

                <div className="mt-6">
                    <button
                        onClick={() => {
                            addExperience();
                            setExperience(false);
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
                            setExperience(false);
                            setEmpty();
                        }}
                        className="black-gray-btn"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <button
                onClick={() => {
                    setExperience(true);
                    setJobSummary("");
                    setEditingId(null);
                    setEditForm({});
                    setShowYearPickerAdd({ start: true, end: true });
                }}
                className={experience ? "hidden" : "btn mt-5"}
            >
                Add Experience
            </button>
        </div>
    );
};

const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    showYearPicker,
    setShowYearPicker,
}) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return (
        <div className="flex min-h-11 justify-between items-center px-3 py-2 bg-linear-to-br from-[#b4e5ff] to-yellow-50 rounded-t-lg">
            {!showYearPicker && (
                <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    className="font-bold text-lg hover:opacity-70"
                >
                    <KeyboardArrowRightIcon className="text-[#3985b6] rotate-180" />
                </button>
            )}
            {showYearPicker && <div className="w-6" />}

            <button
                onClick={() => setShowYearPicker((prev) => !prev)}
                className="text-[#3985b6] font-bold flex items-center gap-1"
            >
                {months[date.getMonth()]} {date.getFullYear()}
                <KeyboardArrowRightIcon
                    style={{ fontSize: "1rem" }}
                    className={showYearPicker ? "-rotate-90" : "rotate-90"}
                />
            </button>

            {!showYearPicker && (
                <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="font-bold text-lg hover:opacity-70"
                >
                    <KeyboardArrowRightIcon className="text-[#3985b6]" />
                </button>
            )}
            {showYearPicker && <div className="w-6" />}
        </div>
    );
};

export default Experience;
