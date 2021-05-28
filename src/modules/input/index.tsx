import React, {FC, useState, useEffect } from 'react';

import './index.scss';

interface IInputProps {
  defaultValue?: string;
  placeholder?: string;
  onInputChange?: (value: string) => void;
};

const Input: FC<IInputProps> = ({defaultValue, onInputChange, placeholder}) => {
  const [value, setValue] = useState<string>(defaultValue || '');
  const inputValueChanged = (evt) => {
    const currValue = evt.target.value;
    setValue(currValue);

    onInputChange && onInputChange(currValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className='InputContainer'>
      <input
        type='input'
        placeholder={placeholder}
        onChange={inputValueChanged}
        value={value} />
    </div>
  )
};

export default Input;
