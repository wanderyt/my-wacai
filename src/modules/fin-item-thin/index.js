import React from 'react';
import {connect} from 'react-redux';
import {selectItem} from '../../actions';

import './index.scss';

const FinItemThin = ({item, onClickHandler = () => void 0}) => {
  const {subcategory, date, amount, comment} = item;

  const selectItem = () => {
    onClickHandler(item);
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

const mapDispatchToProps = {
  onClickHandler: selectItem
};

export default connect(null, mapDispatchToProps)(FinItemThin);
