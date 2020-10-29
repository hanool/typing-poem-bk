import React, { useState } from 'react';
import './EnKrSwitch.css';

const EnKrSwitch = (props) => {
  const [checkedLang, setCheckedLang] = useState(props.selectedLang);

  const onSwitch = (e) => {
    if (e.currentTarget.checked) {
      const selectedLang = e.currentTarget.value;
      setCheckedLang(selectedLang);
      props.onSwitchChange(selectedLang);
    }
  };

  return (
    <div className="en-kr-switch">
      <input
        type="radio"
        name="en-kr-radio"
        id="radio-check-en"
        className="en-kr-radio"
        checked={checkedLang === 'en'}
        onChange={onSwitch}
        value="en"
      />
      <label htmlFor="radio-check-en" id="radio-label-en">
        En
      </label>
      <input
        type="radio"
        name="en-kr-radio"
        id="radio-check-kr"
        className="en-kr-radio"
        checked={checkedLang === 'kr'}
        onChange={onSwitch}
        value="kr"
      />
      <label htmlFor="radio-check-kr" id="radio-label-kr">
        Kr
      </label>
    </div>
  );
};

export default EnKrSwitch;
