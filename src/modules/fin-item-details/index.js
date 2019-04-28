import React, {useState, useEffect} from 'react';
import FinComCatItem from '../fin-com-cat-item';
import DateTime from 'react-datetime';
import {connect} from 'react-redux';
import Axios from 'axios';

import {comCatItems} from './config';
import {uuid} from '../../utils/helper';

import './index.scss';

const FinItemDetails = ({item = {}, updatedCatGroup, dispatch}) => {
  const [latestItem, setLatestItem] = useState({...item, ...updatedCatGroup});

  useEffect(() => {
    dispatch({
      type: 'RESET_UPDATED_CAT_GROUP'
    });
  }, []);

  const handleBackBtn = () => {
    dispatch({
      type: 'RESET_SELECTED_ITEM',
    });
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

  const handleCatSelection = () => {
    dispatch({
      type: 'CHANGE_TO_CATEGORY_SELECTION',
      selectedCatGroup: {
        category: latestItem.category,
        subcategory: latestItem.subcategory
      }
    });
  }

  const handleAmountFocus = (evt) => {
    if (latestItem.amount) {
      evt.target.value = latestItem.amount;
    } else {
      evt.target.value = '';
    }
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

  const validateFinItem = ({category, subcategory, comment, amount}) => {
    if (!category || !subcategory) {
      return {
        errorMsg: '请选择类别！'
      }
    } else if (!amount) {
      return {
        errorMsg: '请输入有效金额！'
      }
    }

    return null;
  }

  const handleSaveButton = () => {
    let isInvalid = validateFinItem(latestItem);
    if (isInvalid) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        message: isInvalid.errorMsg
      });
      return;
    }

    let requestUrl = '', data = {};
    if (latestItem.id) {
      requestUrl = '/api/wacai/updateFinItem';
      data = {...latestItem};
    } else {
      requestUrl = '/api/wacai/createFinItem';
      data = {...latestItem, id: uuid()};
    }
    Axios.post(requestUrl, {data})
      .then(() => {
        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      });
  }

  const handleDeleteButton = () => {
    Axios.delete(`/api/wacai/deleteFinItem?id=${latestItem.id}`)
      .then(() => {
        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      });
  }

  /*
    Format change from '2019-04-20 19:20:00' to '2019/04/20 19:20:00'
    Required on mobile browser difference
    latestItem.date.replace(/-/g, '/')
  */
  return (
    <div className='FinItemDetails'>
      <div className='Fin-Nav'>
        <div className='Fin-Nav-Out'>支出</div>
        <div className='Fin-Nav-Arrow' />
      </div>
      <div className='Fin-Date Fin-WhiteBack'>
        <DateTime
          value={new Date(latestItem.date.replace(/-/g, '/'))}
          defaultValue={new Date()}
          onChange={handleDateTimeChange} />
      </div>
      <div className='Fin-Header Fin-WhiteBack'>
        <div
          className='Fin-SubCat'
          onClick={handleCatSelection}>
          <div className='Category'>
            {latestItem.category}
          </div>
          <div className='SubCategory'>
            {latestItem.subcategory}
          </div>
        </div>
        <div className='Fin-Amount'>
          <input
            type='number'
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
              <div
                className='Fin-ComCat'
                key={index}>
                <FinComCatItem
                  category={comItem.category}
                  subcategory={comItem.subcategory}
                  onClickHandler={handleCommonCatClick} />
              </div>
            ))
          }
        </div>
      </div>
      <div className='Fin-Comment Fin-WhiteBack'>
        <input className='CommentInput' placeholder='备注' type='input' onChange={handleCommentChange} value={latestItem.comment} />
      </div>
      <div className='Fin-Toolbar Fin-WhiteBack'>
        <div className='Fin-Btns'>
          <div
            className='Fin-Btn Fin-BackBtn'
            onClick={handleBackBtn}>
            返回
          </div>
          {
            latestItem.id &&
            <div
              className='Fin-Btn Fin-DeleteBtn'
              onClick={handleDeleteButton}>
              删除
            </div>
          }
          <div
            className='Fin-Btn Fin-SaveBtn'
            onClick={handleSaveButton}>
            保存
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  let fin = state.fin || {};
  let updatedCatGroup = fin.updatedCatGroup || {};
  return {
    updatedCatGroup
  }
};

export default connect(mapStateToProps)(FinItemDetails);
