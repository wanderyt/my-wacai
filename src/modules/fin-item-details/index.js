import React, {useState} from 'react';
import FinComCatItem from '../fin-com-cat-item';
import DateTime from 'react-datetime';
import {connect} from 'react-redux';
import {resetSelectedItem} from '../../actions';

import {comCatItems} from './config';

import './index.scss';

const FinItemDetails = ({item = {}, dispatch}) => {
  const [latestItem, setLatestItem] = useState({...item});

  const handleBackBtn = () => {
    dispatch(resetSelectedItem());
  }

  const handleCommonCatClick = (category, subcategory) => {
    setLatestItem(Object.assign({}, latestItem, {category, subcategory}));
  }

  const handleCommentChange = (evt) => {
    setLatestItem(Object.assign({}, latestItem, {comment: evt.target.value}));
  }

  const handleDateTimeChange = (newDate) => {
    let newDateString = newDate.format('YYYY-MM-DD hh:mm:ss');
    setLatestItem(Object.assign({}, latestItem, {date: newDateString}));
  }

  const handleAmountFocus = (evt) => {
    evt.target.value = latestItem.amount;
  }

  const handleAmountChange = (evt) => {
    let newAmount = parseFloat(evt.target.value);
    if (Number.isNaN(newAmount)) {
      newAmount = 0;
    }
    setLatestItem(Object.assign({}, latestItem, {amount: newAmount}));
  }

  const handleAmountBlur = (evt) => {
    evt.target.value = parseFloat(latestItem.amount).toFixed(2);
  }

  return (
    <div className='FinItemDetails'>
      <div className='Fin-Nav'>
        <div className='Fin-Nav-Out'>支出</div>
        <div className='Fin-Nav-Arrow' />
      </div>
      <div className='Fin-Date Fin-WhiteBack'>
        {/* {latestItem.date} */}
        <DateTime
          value={new Date(latestItem.date.replace(/-/g, '/'))}
          defaultValue={new Date()}
          onChange={handleDateTimeChange} />
      </div>
      <div className='Fin-Header Fin-WhiteBack'>
        <div className='Fin-SubCat'>{latestItem.subcategory}</div>
        <div className='Fin-Amount'>
          <input
            onFocus={handleAmountFocus}
            onBlur={handleAmountBlur}
            onChange={handleAmountChange}
            defaultValue={parseFloat(latestItem.amount).toFixed(2) || 0} />
        </div>
      </div>
      <div className='Fin-ComCats Fin-WhiteBack'>
        <div className='Fin-ComCat-Container'>
          {
            comCatItems.map((comItem, index) => (
              <div className='Fin-ComCat'>
                <FinComCatItem
                  key={index}
                  category={comItem.category}
                  subcategory={comItem.subcategory}
                  onClickHandler={handleCommonCatClick} />
              </div>
            ))
          }
        </div>
      </div>
      <div className='Fin-Comment Fin-WhiteBack'>
        <input className='CommentInput' type='input' onChange={handleCommentChange} value={latestItem.comment} />
      </div>
      <div className='Fin-Toolbar Fin-WhiteBack'>
        <div className='Fin-Btns'>
          <div
            className='Fin-Btn Fin-BackBtn'
            onClick={handleBackBtn}>
            返回
          </div>
          {
            latestItem.id && <div className='Fin-Btn Fin-DeleteBtn'>删除</div>
          }
          <div className='Fin-Btn Fin-SaveBtn'>保存</div>
        </div>
      </div>
    </div>
  )
};

export default connect()(FinItemDetails);
