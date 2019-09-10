import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FinListItemLoadingState} from '../loading-state';

import './index.scss';

const FinItem = ({item, isLoading, dayMode = false, isLast = false, dispatch}) => {
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
        {
          isLoading ?
            <FinListItemLoadingState />
            :
            <React.Fragment>
              <div className='Fin-Left'>
                <div className='Fin-SubCat'>{category} - {subcategory}</div>
                <div className='Fin-Info Fin-Date'>
                  <span>
                    {dayMode ? date.substring(11) : date}
                  </span>
                </div>
                <div className='Fin-Info Fin-Comment'>
                  <span>{comment}</span>
                </div>
              </div>
              <div className='Fin-Right'>
                <span className='Fin-Amount'>{parseFloat(amount).toFixed(2)}</span>
              </div>
            </React.Fragment>
        }
      </div>
    </div>
  );
};

FinItem.propTypes = {
  item: PropTypes.object
};

export default connect()(FinItem);
