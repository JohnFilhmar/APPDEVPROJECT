import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const options = [
    { value: 'Canubing Main', label: 'Canubing Main' },
    { value: 'Canubing 2', label: 'Canubing 2' },
    { value: 'Bayanan', label: 'Bayanan' },
    { value: 'Malinao', label: 'Malinao' },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <><label>Branches</label> <br></br><select value={selectedOption} onChange={handleChange}>
          {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
          ))}
      </select></>
  );
};

export default Dropdown;
