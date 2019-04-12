import React from 'react';

import './index.scss';

const FinItemDetails = ({item = {}}) => {
  const {subcategory, amount, date, comment, category} = item;
  return (
    <div className='FinItemDetails'>
      <div className='Fin-Nav'>
        <div className='Fin-Nav-Out'>支出</div>
        <div className='Fin-Nav-Arrow' />
      </div>
      <div className='Fin-Header Fin-WhiteBack'>
        <div className='Fin-SubCat'>{subcategory}</div>
        <div className='Fin-Amount'>{amount}</div>
      </div>
      <div className='Fin-ComCats Fin-WhiteBack'>
        <div className='Fin-ComCat'></div>
      </div>
      <div className='Fin-Comment Fin-WhiteBack'>{comment}</div>
      <div className='Fin-Toolbar Fin-WhiteBack'></div>
    </div>
  )
};

export default FinItemDetails;