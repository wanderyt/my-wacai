import React from 'react';
import './checkbox.scss';

const Checkbox = ({disabled, onChange, className = ''}) => {
  return (
    <input 
      type="checkbox" 
      disabled={disabled} 
      onChange={onChange}
      className={className}
    />
  );
};

export default Checkbox;
