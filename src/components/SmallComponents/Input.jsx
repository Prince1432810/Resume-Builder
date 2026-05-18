import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Input({ label, name, value, onChange }) {
    return (
        <div className="inputContainer">
            <label className="labelField" htmlFor={name}>
                {label}
            </label>

            <input
                type="text"
                id={name}
                value={value}
                onChange={(e) => onChange(e.target)}
                className="inputField"
            />
        </div>
    );
}

export default Input;
