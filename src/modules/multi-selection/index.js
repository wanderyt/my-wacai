import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const MultiSelection = ({defaultSelection = [], validSeletions = [], handleSelection = () => void 0}) => {
  const [selections, setSelections] = useState(defaultSelection);

  const onCheckChange = (evt) => {
    const selectionItem = evt.target;
    const {name, checked} = selectionItem;
    let tempSelections = selections.slice();
    if (checked) {
      tempSelections.push(name);
      setSelections(tempSelections);
    } else {
      const uncheckedItemIndex = tempSelections.indexOf(name);
      tempSelections.splice(uncheckedItemIndex, 1);
      setSelections(tempSelections);
    }

    handleSelection(tempSelections);
  };

  useEffect(() => {
    setSelections(defaultSelection);
  }, [defaultSelection]);

  return (
    <div className='MultiSelection'>
      {
        validSeletions.length > 0 ?
        <div className='SelectionList'>
          {
            validSeletions.map((selection, index) => (
              <div
                key={index}
                className='SelectionItem'>
                <input type='checkbox' name={selection} onChange={onCheckChange} checked={selections.indexOf(selection) > -1} />
                <label>{selection}</label>
              </div>
            ))
          }
        </div>
        :
        null
      }
    </div>
  );
};

MultiSelection.propTypes = {
  defaultSelection: PropTypes.array,
  validSeletions: PropTypes.array,
  handleSelection: PropTypes.func,
};

export default MultiSelection;