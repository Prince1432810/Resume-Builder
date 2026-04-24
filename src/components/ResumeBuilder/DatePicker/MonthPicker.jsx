import { useRef } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = ({ value, onChange, placeholder = 'MM', disabled = false }) => {
  const pickerRef = useRef(null);

  const selectedDate = value
    ? new Date(new Date().getFullYear(), parseInt(value) - 1, 1)
    : null;

  return (
    <DatePicker
      ref={pickerRef}
      wrapperClassName="w-full no-scrollbar"
      className="inputField w-full no-scrollbar"
      placeholderText={disabled ? 'Not available' : placeholder}
      disabled={disabled}
      selected={selectedDate}
      shouldCloseOnSelect={true}
      onChange={(date) => {
        if (date) {
          onChange(String(date.getMonth() + 1).padStart(2, '0'));
        } else {
          onChange('');
        }
      }}
      onChangeRaw={(e) => e.preventDefault()}
      dateFormat="MM"
      showMonthYearPicker
      showFourColumnMonthYearPicker
      renderCustomHeader={({ date, decreaseYear, increaseYear, prevYearButtonDisabled, nextYearButtonDisabled }) => (
        <div className="flex min-h-11 justify-center items-center px-3 py-2 bg-linear-to-br from-[#b4e5ff] to-yellow-50 rounded-t-lg">
          <span className="text-[#3985b6] font-bold">Month</span>
        </div>
      )}
    />
  );
};

export default MonthPicker;