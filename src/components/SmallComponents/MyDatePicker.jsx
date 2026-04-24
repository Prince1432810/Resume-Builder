import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker({data, setData, state}) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    // <DatePicker
    // className="bg-white"
    //   selected={startDate}
    //   onChange={(date) => setStartDate(date)}
    //   dateFormat="yyyy/MM/dd"
    // />

    <div className='inputContainer'>
      <label className='labelField' htmlFor="start-date">Start date</label>
      <input type="text" id='start-date' placeholder='YYYY-MM-DD' onChange={(event)=>{setData((event.target.value).trim())}} value={data} className='inputField'/>
    </div>

    // <div className='inputContainer'>
    //   <label className='labelField' htmlFor="company">Company Name</label>
    //   <input type="text" id='company' onChange={(event)=>{setCompany((event.target.value).trim())}} value={company} className='inputField'/>
    // </div>

  );
}

export default MyDatePicker;