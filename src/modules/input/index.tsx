import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const InputContainer = styled.div`
  border-bottom: 1px solid ${Colors.GreyLightII};
  width: 100%;
  input {
    width: 100%;
    height: 50px;
    line-height: 50px;
    inline-size: 100%;
    text-indent: 25px;
    font-size: 16px;
    outline: none;
    border: 0;
    padding: 0;
    background: transparent;
  }
`;

interface IInputProps {
  defaultValue?: string;
  placeholder?: string;
  onInputChange?: (value: string) => void;
}

const Input: FC<IInputProps> = ({
  defaultValue,
  onInputChange,
  placeholder,
}) => {
  const [value, setValue] = useState<string>('');
  const inputValueChanged = evt => {
    const currValue = evt.target.value;
    setValue(currValue);

    onInputChange && onInputChange(currValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <InputContainer className="InputContainer">
      <input
        type="input"
        placeholder={placeholder}
        onChange={inputValueChanged}
        value={value}
      />
    </InputContainer>
  );
};

export default Input;
