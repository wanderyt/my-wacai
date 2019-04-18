import React from 'react';
import {connect} from 'react-redux';

import './index.scss';

const FinItemThin = ({item, dispatch}) => {
  const {subcategory, date, amount, comment} = item;

  const selectItem = () => {
    dispatch({
      type: 'SELECT_ITEM',
      item
    });
  };

  return (
    <div className='FinItemThin forbid-select'
      onClick={selectItem}>
      <div className='FinItem'>
        <div className='Fin-Left'>
          <div className='Fin-SubCat'>{subcategory}</div>
          <div className='Fin-Info'>
            <span className='Fin-Date'>{date}</span>
            <span className='Fin-Comment'>{comment}</span>
          </div>
        </div>
        <div className='Fin-Right'>
          <span className='Fin-Amount'>{parseFloat(amount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
};

export default connect()(FinItemThin);
