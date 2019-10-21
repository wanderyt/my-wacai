import React, { useState, useEffect } from 'react';

import './index.scss';

const DropdownList = ({defaultSelectedValue = '', items = [], customizeItemClickHandler = () => void 0, isDisabled = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  const toggleClickDropdownHeader = () => {
    setIsOpen(!isOpen && !isDisabled);
  }

  const handleItemClick = (item) => {
    setIsOpen(false);
    setSelectedValue(item.value);
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
            items.map((item) => (
              <div
                className='DropdownList__Item DropdownList-Element'
                key={item.key}
                onClick={() => handleItemClick(item)}>
                {item.value}
              </div>
            ))
          }
        </div>
      }

    </div>
  );
}

export default DropdownList;
