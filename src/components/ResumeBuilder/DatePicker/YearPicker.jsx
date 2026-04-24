import { useState, useRef, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const YearPicker = ({ value, onChange, placeholder = 'YYYY', disabled = false, minYear = 1948, maxYear }) => {
  const pickerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const max = maxYear ?? currentYear;
  const totalYears = max - minYear + 1;

  const scrollToSelectedYear = () => {
    setTimeout(() => {
      const selected =
        document.querySelector('.react-datepicker__year-text--selected') ||
        document.querySelector('.react-datepicker__year-text--keyboard-selected');
      if (selected) selected.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 50);
  };

  // Convert stored "YYYY" string → Date object for the picker
  const selectedDate = value ? new Date(parseInt(value), 0, 1) : null;

  return (
    <DatePicker
      ref={pickerRef}
      wrapperClassName="w-full no-scrollbar"
      className="inputField w-full no-scrollbar"
      placeholderText={disabled ? 'Select start year first' : placeholder}
      disabled={disabled}
      selected={selectedDate}
      onCalendarOpen={scrollToSelectedYear}
      shouldCloseOnSelect={true}
      onChange={(date) => {
        if (date) {
          onChange(String(date.getFullYear()));
        } else {
          onChange('');
        }
      }}
      onChangeRaw={(e) => e.preventDefault()}
      dateFormat="yyyy"
      showYearPicker
      yearItemNumber={totalYears}
      minDate={new Date(minYear, 0, 1)}
      maxDate={new Date(max, 11, 31)}
      renderCustomHeader={({ date, decreaseYear, increaseYear, prevYearButtonDisabled, nextYearButtonDisabled }) => (
        <div className="flex min-h-11 justify-between items-center px-3 py-2 bg-linear-to-br from-[#b4e5ff] to-yellow-50 rounded-t-lg">
          <button
            onClick={decreaseYear}
            disabled={prevYearButtonDisabled}
            className="font-bold text-lg hover:opacity-70"
          >
            <KeyboardArrowRightIcon className="text-[#3985b6] rotate-180" />
          </button>

          <span className="text-[#3985b6] font-bold">
            {date.getFullYear()}
          </span>

          <button
            onClick={increaseYear}
            disabled={nextYearButtonDisabled}
            className="font-bold text-lg hover:opacity-70"
          >
            <KeyboardArrowRightIcon className="text-[#3985b6]" />
          </button>
        </div>
      )}
    />
  );
};

export default YearPicker;