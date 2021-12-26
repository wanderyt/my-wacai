import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const Container = styled.div`
  position: relative;
  &.SearchDropdown-Focused {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;
const DropdownInput = styled.div<{
  isFocused: boolean;
}>`
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 40px;
  background-color: ${Colors.GreyLightIIII};
  box-shadow: ${props =>
    props.isFocused ? '0 2px 4px 0 rgba(0,0,0,.1)' : 'none'};
  &:focus-within {
    background-color: #fff;
  }
`;
const DropdownSearchImage = styled.div`
  background-image: url('./search.svg');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 40px;
  .InputField {
    height: 50px;
    line-height: 50px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;
    background: transparent;
    text-indent: 10px;
  }
`;
const OptionList = styled.div<{
  isFocused: boolean;
}>`
  position: absolute;
  width: 100%;
  z-index: 1000;
  background-color: ${Colors.White};
  transition: all 0.2s linear;
  box-shadow: ${props =>
    props.isFocused ? '0 2px 4px 0 rgba(0,0,0,.1)' : 'none'};
`;
const OptionContainer = styled.div`
  border: 1px solid ${Colors.GreyLightII};
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 40px;
  line-height: 40px;

  animation-name: expandDown;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-duration: 0.2s;
  @keyframes expandDown {
    0% {
      opacity: 0;
      height: 0px;
    }
    100% {
      opacity: 1;
      height: 40px;
    }
  }
`;
const Option = styled.div`
  padding-left: 10px;
  font-size: 16px;
`;

const SearchDropdown = <T,>({
  optionList,
  filterFunction,
  placeholder = '',
  onChangeCallback,
  defaultValue = '',
  itemsDisplayed = 5,
}: {
  optionList: Array<T>;
  filterFunction: (
    options: Array<T>,
    value: string,
    itemsDisplayed?: number
  ) => string[];
  placeholder: string;
  onChangeCallback: (value: string, isSelected: boolean) => void;
  defaultValue: string;
  itemsDisplayed?: number;
}) => {
  const [value, setValue] = useState(defaultValue);
  const [validOptions, setValidOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
    const dropdownClickHandler = evt => {
      const classes = evt.target.getAttribute('class') || '';
      if (
        classes.indexOf('InputField') < 0 &&
        classes.indexOf('OptionContainer') < 0
      ) {
        setIsFocused(false);
        setValidOptions([]);
      }
    };
    document.addEventListener('click', dropdownClickHandler);

    return () => {
      document.removeEventListener('click', dropdownClickHandler);
    };
  }, [defaultValue]);

  const handleInputChange = evt => {
    const curValue = evt.target.value;
    // const newOptions = optionList.filter((option) => option.toLowerCase().indexOf(curValue.toLowerCase()) > -1);
    const newOptions = filterFunction(optionList, curValue) || [];
    setIsFocused(true);
    setValue(curValue);
    setValidOptions(curValue ? newOptions.slice(0, itemsDisplayed) : []);
    onChangeCallback && onChangeCallback(curValue, false);
  };

  const handleOptionSelection = evt => {
    const curValue = evt.target.innerText;
    setValue(curValue);
    setValidOptions([]);
    onChangeCallback && onChangeCallback(curValue, true);
  };

  return (
    <Container>
      <DropdownInput isFocused={isFocused}>
        <DropdownSearchImage>
          <input
            className="InputField"
            placeholder={placeholder}
            type="input"
            onChange={handleInputChange}
            value={value}
          />
        </DropdownSearchImage>
      </DropdownInput>
      <OptionList isFocused={isFocused}>
        {validOptions &&
          validOptions.length > 0 &&
          validOptions.map((option, index) => (
            <OptionContainer key={index} onClick={handleOptionSelection}>
              <Option>{option}</Option>
            </OptionContainer>
          ))}
      </OptionList>
    </Container>
  );
};

export default SearchDropdown;
