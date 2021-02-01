import React, {useState, useEffect, useRef} from 'react';
import FinComCatItem from '../fin-com-cat-item';
import SearchDropdown from '../search-dropdown';
import PopupButtons from '../popup-buttons';
import DateTime from 'react-datetime';
import DropdownList from '../dropdown-list';
import Calculator from '../calculator';
import HashTagManagement from '../hash-tag';
import CommentHintDialog from '../comment-hint-dialog';
import {connect} from 'react-redux';
import Axios from 'axios';

import {comCatItems} from './config';
import {uuid} from '../../utils/helper';
import {commentFilterFn, placeFilterFn, restructureCommentOptions} from './util';

import './index.scss';

const scheduleModeItems = [{
  key: 0,
  value: '非周期入账'
}, {
  key: 1,
  value: '每天入账'
}, {
  key: 2,
  value: '每周入账'
}, {
  key: 3,
  value: '每月入账'
}, {
  key: 4,
  value: '每年入账'
}];

const DEFAULT_CITY = '上海';

const FinItemDetails = ({item = {amount: 0, city: DEFAULT_CITY}, updatedCatGroup, dispatch}) => {
  const [latestItem, setLatestItem] = useState({...item, ...updatedCatGroup});
  const [commentOptions, setCommentOptions] = useState([]);
  const [placeOptions, setPlaceOptions] = useState([]);
  const [commentFullInfoOptions, setCommentFullInfoOptions] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filteredTagList, setFilteredTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState(item.tags ? item.tags.split(',') : []);
  const [deleteScheduledPopupStatus, setDeleteScheduledPopupStatus] = useState(false);
  const [updateScheduledPopupStatus, setUpdateScheduledPopupStatus] = useState(false);
  const [calculatorStatus, setCalculatorStatus] = useState(false);
  const [commentHintDialogStatus, setCommentHintDialogStatus] = useState(false);
  const isUpdate = !!item.id;
  const amountInputRef = useRef(null);
  const tagInputRef = useRef(null);

  useEffect(() => {
    Axios.get('/api/wacai/getAllCommentWithOptions')
      .then(({data}) => {
        console.log('comments data: ', data.data);
        let commentsResponse = data.data.comments || [];
        let placeOptions = [];
        commentsResponse.forEach((option) => {
          placeOptions.push(option.comment);
        });
        setCommentOptions(commentsResponse);
        setPlaceOptions(placeOptions);
        setCommentFullInfoOptions(data.data.options || []);
        // setCommentFullInfoOptions(restructureCommentOptions(data.data.options || []));
      });

    Axios.get('/api/wacai/getAllTags')
      .then(({data}) => {
        let responseData = data.data || [];
        setTagList(responseData);
        setFilteredTagList(responseData);
      });

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

  const handleCommentChange = (newValue) => {
    const isCommentValid = commentFullInfoOptions.filter(({comment}) => comment === newValue).length > 0;
    if (isCommentValid) {
      setCommentHintDialogStatus(true);
    }
    setLatestItem(Object.assign({}, latestItem, {comment: newValue}));
  }

  const toggleCommentHintDialogStatus = () => {
    setCommentHintDialogStatus(!commentHintDialogStatus);
  };

  const saveCommentHintResult = (place, category, subcategory) => {
    setLatestItem(Object.assign({}, latestItem, {place, category, subcategory}));
    setCommentHintDialogStatus(false);
  };

  const handleDateTimeChange = (newDate) => {
    let newDateString = newDate.format('YYYY-MM-DD hh:mm:ss');
    setLatestItem(Object.assign({}, latestItem, {date: newDateString}));
  }

  const handleScheduleModeChange = (newItem) => {
    let newScheduleMode = newItem.key;
    setLatestItem(Object.assign({}, latestItem, {isScheduled: newScheduleMode}));
  }

  const handlePlaceChange = (place) => {
    setLatestItem(Object.assign({}, latestItem, {place: place}));
  }

  const handleCityChange = (evt) => {
    let city = evt.target.value || '';
    setLatestItem(Object.assign({}, latestItem, {city: city}));
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

  const handleSaveButton = ({repeatRecord = false}) => {
    let isInvalid = validateFinItem(latestItem);
    if (isInvalid) {
      dispatch({
        type: 'SET_MESSAGE',
        notificationType: 'error',
        message: isInvalid.errorMsg
      });
      return;
    }

    let requestUrl = '', data = {};
    if (latestItem.id) {
      if (latestItem.isScheduled > 0) {
        setUpdateScheduledPopupStatus(true);
        return;
      } else {
        requestUrl = '/api/wacai/updateFinItem';
        data = {...latestItem, tags: selectedTags.join(',')};
      }
    } else {
      if (latestItem.isScheduled > 0) {
        requestUrl = '/api/wacai/createScheduledFinItem';
        data = {...latestItem, tags: selectedTags.join(',')};
      } else {
        requestUrl = '/api/wacai/createFinItem';
        data = {...latestItem, tags: selectedTags.join(','), id: uuid()};
      }
    }

    // App Loading Status
    dispatch({
      type: 'APP_LOADING'
    });

    Axios.post(requestUrl, {data})
      .then(() => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        dispatch({
          type: 'SET_MESSAGE',
          notificationType: 'info',
          message: '保存成功'
        });

        if (repeatRecord) {
          setLatestItem(Object.assign({}, latestItem, {amount: 0}));
          amountInputRef.current.value = '0.00';
        } else {
          dispatch({
            type: 'RESET_SELECTED_ITEM'
          });
        }
      });
  }

  const updateSingleScheduledItem = () => {
    setUpdateScheduledPopupStatus(false);
    const requestUrl = '/api/wacai/updateFinItem';
    const data = {...latestItem};

    // App Loading Status
    dispatch({
      type: 'APP_LOADING'
    });

    Axios.post(requestUrl, {data})
      .then(() => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      });
  }

  const updateSeriesScheduledItems = () => {
    const requestUrl = '/api/wacai/updateScheduledFinItem';
    const data = {...latestItem};
    const options = {};
    const now = new Date();
    options.scheduledId = data.scheduledId;
    options.year = now.getFullYear();
    options.month = now.getMonth();
    options.day = now.getDate();

    // App Loading Status
    dispatch({
      type: 'APP_LOADING'
    });

    Axios.post(requestUrl, {data, options})
      .then(() => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        setUpdateScheduledPopupStatus(false);
        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      });
  }

  const handleDeleteButton = () => {
    if (latestItem.isScheduled > 0) {
      setDeleteScheduledPopupStatus(true);
    } else {
      // App Loading Status
      dispatch({
        type: 'APP_LOADING'
      });

      Axios.delete(`/api/wacai/deleteFinItem?id=${latestItem.id}`)
        .then(() => {
          // App Loaded Status
          dispatch({
            type: 'APP_LOADED'
          });

          dispatch({
            type: 'RESET_SELECTED_ITEM'
          });
        }, ({response}) => {
          // App Loaded Status
          dispatch({
            type: 'APP_LOADED'
          });

          if (response.status === 401) {
            dispatch({
              type: 'TOKEN_INVALID'
            });
          }
        });
    }
  }

  const popupButtonsCancelHandler = () => {
    setDeleteScheduledPopupStatus(false);
    setUpdateScheduledPopupStatus(false);
  }

  const deleteSingleScheduledItem = () => {
    // App Loading Status
    dispatch({
      type: 'APP_LOADING'
    });

    Axios.delete(`/api/wacai/deleteFinItem?id=${latestItem.id}`)
      .then(() => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        setDeleteScheduledPopupStatus(false);
        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      }, ({response}) => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        setDeleteScheduledPopupStatus(false);
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }

  const deleteSeriesScheduledItems = () => {
    // App Loading Status
    dispatch({
      type: 'APP_LOADING'
    });

    const now = new Date();
    Axios.delete(`/api/wacai/deleteScheduledFinItem?scheduleId=${latestItem.scheduleId}&year=${now.getFullYear()}&month=${now.getMonth()}&day=${now.getDate()}`)
      .then(() => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        setDeleteScheduledPopupStatus(false);
        dispatch({
          type: 'RESET_SELECTED_ITEM'
        });
      }, ({response}) => {
        // App Loaded Status
        dispatch({
          type: 'APP_LOADED'
        });

        setDeleteScheduledPopupStatus(false);
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }

  const deleteScheduledPopupButtons = [{
    name: '只删除这一笔',
    clickHandler: deleteSingleScheduledItem
  }, {
    name: '删除这一笔以及以后所有',
    clickHandler: deleteSeriesScheduledItems
  }];

  const updateScheduledPopupButtons = [{
    name: '只更新这一笔',
    clickHandler: updateSingleScheduledItem
  }, {
    name: '更新这一笔以及以后所有',
    clickHandler: updateSeriesScheduledItems
  }];

  const toggleCalculator = () => {
    setCalculatorStatus(!calculatorStatus);
  }

  const handleCalculatorCallback = (result) => {
    let amount = +parseFloat(result).toFixed(2);
    setLatestItem(Object.assign({}, latestItem, {amount}));
    setCalculatorStatus(false);

    // Set input value
    amountInputRef.current.value = parseFloat(result).toFixed(2);
  }

  const handleRepeatButton = () => {
    handleSaveButton({repeatRecord: true});
  }

  const handleTagInputChange = (evt) => {
    const currInput = evt.target.value;
    setFilteredTagList(tagList.filter((tag) => tag.indexOf(currInput) > -1));
  }

  const handleTagAdd = () => {
    const newTag = tagInputRef.current.value;
    if (tagList.indexOf(newTag) < 0) {
      setTagList([newTag, ...tagList]);
      setFilteredTagList([newTag, ...tagList]);
    } else {
      setFilteredTagList([...tagList]);
    }

    // Automatically add new tag to selected list
    selectedTags.indexOf(newTag) < 0 && setSelectedTags([...selectedTags, newTag]);

    // clear value once new tag is added
    tagInputRef.current.value = '';
  }

  const toggleTagSelection = (tag, isSelected) => {
    const index = selectedTags.indexOf(tag);
    let newSelectedTags = selectedTags.slice();
    if (index > -1) {
      newSelectedTags.splice(index, 1);
      setSelectedTags(newSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
          onChange={handleDateTimeChange}
          inputProps={{disabled: isUpdate && latestItem.isScheduled > 0}} />
      </div>
      <div className='Fin-Schedule Fin-WhiteBack'>
        <DropdownList
          isDisabled={isUpdate}
          defaultSelectedValue={scheduleModeItems[latestItem.isScheduled || 0].value}
          items={scheduleModeItems}
          customizeItemClickHandler={handleScheduleModeChange} />
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
            ref={amountInputRef}
            onFocus={handleAmountFocus}
            onBlur={handleAmountBlur}
            onChange={handleAmountChange}
            defaultValue={parseFloat(latestItem.amount).toFixed(2) || '0.00'} />
            {/* value={latestItem.amount || 0} /> */}
          <div className='CalculatorIcon' onClick={toggleCalculator}>
            {
              calculatorStatus &&
              <div className='CalculatorPanel'>
                <Calculator defaultValue={latestItem.amount + ''} confirmCallback={handleCalculatorCallback} />
              </div>
            }
          </div>
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
        <SearchDropdown
          optionList={commentOptions}
          filterFunction={commentFilterFn}
          placeholder='备注'
          onChangeCallback={handleCommentChange}
          defaultValue={latestItem.comment} />
      </div>
      <div className='Fin-FullDetails Fin-WhiteBack'>
        <div className='Fin-Place'>
          <SearchDropdown
            optionList={placeOptions}
            filterFunction={placeFilterFn}
            placeholder='商场'
            onChangeCallback={handlePlaceChange}
            defaultValue={latestItem.place} />
        </div>
        <div className='Fin-City'>
          <input
            type='input'
            placeholder='城市'
            onChange={handleCityChange}
            defaultValue={latestItem.city || DEFAULT_CITY} />
        </div>
      </div>
      <div className='Fin-Toolbar Fin-WhiteBack'>
        <div className='Fin-Btns'>
          <div
            className='Fin-Btn Fin-BackBtn'
            onClick={handleBackBtn}>
            返回
          </div>
          {
            latestItem.id ?
            <div
              className='Fin-Btn Fin-DeleteBtn'
              onClick={handleDeleteButton}>
              删除
            </div>
            :
            <div
              className='Fin-Btn Fin-RepeatBtn'
              onClick={handleRepeatButton}>
              保存再记
            </div>
          }
          <div
            className='Fin-Btn Fin-SaveBtn'
            onClick={handleSaveButton}>
            保存
          </div>
        </div>
      </div>
      <div className='Fin-Tags Fin-WhiteBack'>
        <div className='Fin-Tags-Add'>
          <input
            type='input'
            ref={tagInputRef}
            placeholder='新加标签'
            onChange={handleTagInputChange}
            defaultValue='' />
          <div className='Fin-Tags-Add-Btn' onClick={handleTagAdd} />
        </div>
        <div className='Fin-TagsManagement'>
          <HashTagManagement tags={filteredTagList} selectedTags={selectedTags} toggleTagSelection={toggleTagSelection} />
        </div>
      </div>
      {
        deleteScheduledPopupStatus &&
        <div className="PopupButtons--Container">
          <PopupButtons
            buttons={deleteScheduledPopupButtons}
            cancelHandler={popupButtonsCancelHandler} />
        </div>
      }
      {
        updateScheduledPopupStatus &&
        <div className="PopupButtons--Container">
          <PopupButtons
            buttons={updateScheduledPopupButtons}
            cancelHandler={popupButtonsCancelHandler} />
        </div>
      }
      {
        commentHintDialogStatus &&
        <div className="FinDetails__CommentHintDialog">
          <CommentHintDialog closeCallback={toggleCommentHintDialogStatus} successCallback={saveCommentHintResult} optionList={commentFullInfoOptions} commentKeyWord={latestItem.comment} />
        </div>
      }
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
