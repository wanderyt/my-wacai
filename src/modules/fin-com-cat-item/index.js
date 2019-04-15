import React from 'react';

import './index.scss';

const FinComCatItem = ({category, subcategory, onClickHandler = () => void 0}) => {
  return (
    <div
      className='FinComCatItem'
      onClick={() => onClickHandler(category, subcategory)}>
      <span className='SubCat-Name'>{subcategory}</span>
    </div>
  );
};

export default FinComCatItem;
