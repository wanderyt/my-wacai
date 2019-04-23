import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './index.scss';

const FinItem = ({item, dayMode = false, isLast = false, dispatch}) => {
  const {category, subcategory, date, amount, comment} = item;

  const selectItem = () => {
    dispatch({
      type: 'SELECT_ITEM',
      item
    });
  };

  return (
    <div className='FinItemPanel forbid-select'
      onClick={selectItem}>
      <div className={`FinItem ${isLast ? '' : 'FinItem-Border'}`}>
        <div className='Fin-Left'>
          <div className='Fin-SubCat'>{category} - {subcategory}</div>
          <div className='Fin-Info'>
            <span className='Fin-Date'>
              {dayMode ? date.substring(11) : date}
            </span>
            <span className='Fin-Comment'>{comment}</span>
          </div>
        </div>
        <div className='Fin-Right'>
          <span className='Fin-Amount'>{parseFloat(amount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

FinItem.propTypes = {
  item: PropTypes.object
};

export default connect()(FinItem);