import React from 'react';
import {connect} from 'react-redux';
import {resetSelectedItem} from '../../actions';

import './index.scss';

const FinItemDetails = ({item = {}, dispatch}) => {
  const {subcategory, amount, date, comment, category} = item;

  const handleBackBtn = () => {
    dispatch(resetSelectedItem());
  }

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
      <div className='Fin-Date Fin-WhiteBack'>{date}</div>
      <div className='Fin-Toolbar Fin-WhiteBack'>
        <div className='Fin-Btns'>
          <div
            className='Fin-Btn Fin-BackBtn'
            onClick={handleBackBtn}>返回</div>
          <div className='Fin-Btn Fin-DeleteBtn'>删除</div>
          <div className='Fin-Btn Fin-SaveBtn'>保存</div>
        </div>
      </div>
    </div>
  )
};

export default connect()(FinItemDetails);
