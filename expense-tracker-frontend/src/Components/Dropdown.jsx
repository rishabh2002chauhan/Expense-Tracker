import React from "react";

function Dropdown({ options, onChange, value, selectStyle = {} }) {
  return (
    <>
      <select onChange={onChange} value={value} className={selectStyle}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default Dropdown;
