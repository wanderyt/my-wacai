import React, { useState } from 'react';
import './index.scss';

const SlideButton = ({isActive, customClickHandler = () => void 0}) => {
  const [status, setStatus] = useState(!!isActive);

  const handleClick = () => {
    const newStatus = !status;
    setStatus(newStatus);
    customClickHandler(newStatus);
  }

  return (
    <div
      className={`SlideButton ${status ? 'active' : 'inactive'}`}
      onClick={handleClick}>
      <div className='SlideFrame'>
        <div className='Block'></div>
        <div className='Slider'></div>
      </div>
    </div>
  );
};

export default SlideButton;
