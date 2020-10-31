import React from 'react';
import './Wpms.css';

const Wpms = (props) => {
  const wpms = props.wpms;

  return (
    <div className="wpm-list">
      {wpms.map((wpm) => {
        let strWpm = wpm.toString();
        return (
          <p className="wpm">wpm: {strWpm.substr(0, strWpm.indexOf('.'))}</p>
        );
      })}
    </div>
  );
};

export default Wpms;
