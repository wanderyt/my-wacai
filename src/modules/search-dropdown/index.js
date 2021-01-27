import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {options} from './mockOptions.json';

import './index.scss';

const SearchDropdown = ({optionList = options, filterFunction, placeholder = '', onChangeCallback, defaultValue = '', searchOptions = 5}) => {
  const [value, setValue] = useState(defaultValue);
  const [validOptions, setValidOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
    const dropdownClickHandler = (evt) => {
      const classes = evt.target.getAttribute('class') || '';
      if (classes.indexOf('InputField') < 0 && classes.indexOf('OptionContainer') < 0) {
        setIsFocused(false);
        setValidOptions([]);
      }
    }
    document.addEventListener('click', dropdownClickHandler);

    return () => {
      document.removeEventListener('click', dropdownClickHandler);
    }
  }, [defaultValue]);

  const handleInputChange = (evt) => {
    const curValue = evt.target.value;
    // const newOptions = optionList.filter((option) => option.toLowerCase().indexOf(curValue.toLowerCase()) > -1);
    const newOptions = filterFunction(optionList, curValue) || [];
    setIsFocused(true);
    setValue(curValue);
    setValidOptions(curValue ? newOptions.slice(0, searchOptions) : []);
    onChangeCallback && onChangeCallback(curValue);
  }

  const handleOptionSelection = (evt) => {
    const curValue = evt.target.innerText;
    setValue(curValue);
    setValidOptions([]);
    onChangeCallback && onChangeCallback(curValue);
  }

  return (
    <div className='SearchDropdown'>
      <div className={`Dropdown-Input ${isFocused ? 'SearchDropdown-Focused': ''}`}>
        <div className='Dropdown-SearchImage'>
          <input
            className='InputField'
            placeholder={placeholder}
            type='input'
            onChange={handleInputChange}
            value={value} />
          </div>
      </div>
      <div className={`OptionList ${isFocused ? 'SearchDropdown-Focused': ''}`}>
        {
          validOptions && validOptions.length > 0 && validOptions.map((option, index) => (
            <div
              key={index}
              className='OptionContainer'
              onClick={handleOptionSelection}>
              <div className='Option'>
                {option}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

SearchDropdown.propTypes = {
  optionList: PropTypes.array,
  filterFunction: PropTypes.func,
  placeholder: PropTypes.string,
  onChangeCallback: PropTypes.func,
  defaultValue: PropTypes.string,
  searchOptions: PropTypes.number,
};

SearchDropdown.defaultProps = {
  filterFunction: () => void 0
};

export default SearchDropdown;
