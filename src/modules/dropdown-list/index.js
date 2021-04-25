import React, { useState, useEffect } from 'react';

import './index.scss';

const DropdownList = ({defaultSelectedValue = '', items = [], customizeItemClickHandler = (item) => void 0, isDisabled = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  const toggleClickDropdownHeader = () => {
    if (items.length === 1) {
      return null;
    }
    setIsOpen(!isOpen && !isDisabled);
  }

  const handleItemClick = (item) => {
    setIsOpen(false);
    if (typeof item === 'string') {
      setSelectedValue(item);
    } else {
      setSelectedValue(item.value);
    }
    customizeItemClickHandler(item);
  }

  useEffect(() => {
    const dropdownClickHandler = (evt) => {
      const classes = evt.target.getAttribute('class') || '';
      if (classes.indexOf('DropdownList-Element') < 0) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', dropdownClickHandler);

    return () => {
      document.removeEventListener('click', dropdownClickHandler);
    }
  }, []);

  return (
    <div className={`DropdownList DropdownList-Element ${isOpen ? 'DropdownList--Open' : ''} ${isDisabled ? 'DropdownList--disabled' : ''}`}>
      <div
        className={`DropdownHeader DropdownList-Element ${isOpen ? 'DropdownHeader--Open' : ''}`}
        onClick={toggleClickDropdownHeader}>
        {selectedValue}
      </div>
      {
        isOpen &&
        <div className='DropdownPanel DropdownList-Element'>
          {
            items.map((item, index) => (
              <div
                className='DropdownList__Item DropdownList-Element'
                key={item.key || index}
                onClick={() => handleItemClick(item)}>
                {item.value || item}
              </div>
            ))
          }
        </div>
      }

    </div>
  );
}

export default DropdownList;
