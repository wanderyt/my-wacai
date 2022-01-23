import React, { MouseEvent, useState, useRef } from 'react';
import FinComCatItem from '../fin-com-cat-item';
import SearchDropdown from '../search-dropdown';
import PopupButtons from '../popup-buttons';
import DateTime from 'react-datetime';
import DropdownList from '../dropdown-list';
import Calculator from '../calculator';
import HashTagManagement from '../hash-tag';
import CommentHintDialog from '../comment-hint-dialog';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import { comCatItems } from './config';
import { uuid } from '../../utils/helper';
import { commentFilterFn, placeFilterFn } from './util';
import BottomDrawer from '../bottom-drawer';
import Rating from '../rating';

import './index.scss';
import { sendGraphqlRequest } from '../../utils/graphql-request';
import { createFinItem } from '../../utils/gql-client';
import { useAppDispatch } from '../../store';
import {
  resetSelectedItem,
  setAppLoaded,
  setAppLoading,
  switchToCategorySelection,
} from '../../store/fin';
import {
  // useCommentList,
  // useTagList,
  useUpdatedCatGroup,
} from '../../store/fin/hooks';
import { IFinItem } from '../../utils/gql-client/props';
import { useCommentContext } from '../../context/CommentContext';
import { useTagContext } from '../../context/TagContext';
import { setLoginStatus } from '../../store/login';

const scheduleModeItems = [
  {
    key: 0,
    value: '非周期入账',
  },
  {
    key: 1,
    value: '每天入账',
  },
  {
    key: 2,
    value: '每周入账',
  },
  {
    key: 3,
    value: '每月入账',
  },
  {
    key: 4,
    value: '每年入账',
  },
];

const DEFAULT_CITY = '上海';

const FinItemDetails = ({
  item = { amount: 0, city: DEFAULT_CITY },
}: {
  item: Partial<IFinItem>;
}) => {
  const updatedCatGroup = useUpdatedCatGroup();
  const dispatch = useAppDispatch();

  const [latestItem, setLatestItem] = useState({ ...item, ...updatedCatGroup });
  const [selectedTags, setSelectedTags] = useState(
    item.tags ? item.tags.split(',') : []
  );
  const [deleteScheduledPopupStatus, setDeleteScheduledPopupStatus] =
    useState(false);
  const [updateScheduledPopupStatus, setUpdateScheduledPopupStatus] =
    useState(false);
  const [calculatorStatus, setCalculatorStatus] = useState(false);
  const [commentHintDialogStatus, setCommentHintDialogStatus] = useState(false);
  const isUpdate = !!item.id;
  const amountInputRef = useRef(null);
  const tagInputRef = useRef(null);

  const { commentOptions, placeOptions, commentFullInfoOptions } =
    useCommentContext();
  const basicTagList = useTagContext();
  // const { commentOptions, placeOptions, commentFullInfoOptions } =
  //   useCommentList();
  // const basicTagList = useTagList();
  const [tagList, setTagList] = useState(basicTagList);
  const [filteredTagList, setFilteredTagList] = useState(basicTagList);

  const handleBackBtn = () => {
    dispatch(resetSelectedItem());
  };

  const handleCommonCatClick = (category: string, subcategory: string) => {
    setLatestItem(Object.assign({}, latestItem, { category, subcategory }));
  };

  const handleCommentChange = (newValue, triggerHint) => {
    const isCommentValid =
      commentFullInfoOptions.filter(({ comment }) => comment === newValue)
        .length > 0;
    if (isCommentValid && triggerHint) {
      setCommentHintDialogStatus(true);
    }
    setLatestItem(Object.assign({}, latestItem, { comment: newValue }));
  };

  const toggleCommentHintDialogStatus = () => {
    setCommentHintDialogStatus(!commentHintDialogStatus);
  };

  const saveCommentHintResult = ({ place, category, subcategory }) => {
    let result: {
      place?: string;
      category?: string;
      subcategory?: string;
    } = {};
    if (place) {
      result.place = place;
    }

    if (category && subcategory) {
      result.category = category;
      result.subcategory = subcategory;
    }

    setLatestItem(Object.assign({}, latestItem, result));
    setCommentHintDialogStatus(false);
  };

  const handleDateTimeChange = newDate => {
    let newDateString = newDate.format('YYYY-MM-DD hh:mm:ss');
    setLatestItem(Object.assign({}, latestItem, { date: newDateString }));
  };

  const handleScheduleModeChange = newItem => {
    let newScheduleMode = newItem.key;
    setLatestItem(
      Object.assign({}, latestItem, { isScheduled: newScheduleMode })
    );
  };

  const handlePlaceChange = place => {
    setLatestItem(Object.assign({}, latestItem, { place: place }));
  };

  const handleCityChange = evt => {
    let city = evt.target.value || '';
    setLatestItem(Object.assign({}, latestItem, { city: city }));
  };

  const handleCatSelection = () => {
    dispatch(
      switchToCategorySelection({
        currentItem: latestItem,
        selectedCatGroup: {
          category: latestItem.category,
          subcategory: latestItem.subcategory,
        },
      })
    );
  };

  const handleAmountFocus = evt => {
    if (latestItem.amount) {
      evt.target.value = latestItem.amount;
    } else {
      evt.target.value = '';
    }
  };

  const handleAmountChange = evt => {
    let newAmount = parseFloat(evt.target.value);
    if (Number.isNaN(newAmount)) {
      newAmount = 0;
    }
    setLatestItem(Object.assign({}, latestItem, { amount: newAmount }));
  };

  const handleAmountBlur = evt => {
    evt.target.value = parseFloat(latestItem.amount + '').toFixed(2);
  };

  const validateFinItem = ({
    category,
    subcategory,
    comment,
    amount,
  }: Partial<IFinItem>) => {
    if (!category || !subcategory) {
      return {
        errorMsg: '请选择类别！',
      };
    } else if (!amount) {
      return {
        errorMsg: '请输入有效金额！',
      };
    }

    return null;
  };

  const handleSaveButton = (evt: MouseEvent<HTMLDivElement>) => {
    handleSaveAction({ repeatRecord: false });
  };

  const handleSaveAction = ({
    repeatRecord = false,
  }: {
    repeatRecord: boolean;
  }) => {
    let isInvalid = validateFinItem(latestItem);
    if (isInvalid) {
      dispatch({
        type: 'SET_MESSAGE',
        notificationType: 'error',
        message: isInvalid.errorMsg,
      });
      return;
    }

    let requestUrl = '',
      data: Partial<IFinItem> = {};
    if (latestItem.id) {
      if (latestItem.isScheduled > 0) {
        setUpdateScheduledPopupStatus(true);
        return;
      } else {
        requestUrl = '/api/wacai/updateFinItem';

        data = { ...latestItem, tags: selectedTags.join(',') };
      }
    } else {
      // if (latestItem.isScheduled > 0) {
      //   requestUrl = '/api/wacai/createScheduledFinItem';
      //   data = {...latestItem, tags: selectedTags.join(',')};
      // } else {
      //   requestUrl = '/api/wacai/createFinItem';
      //   data = {...latestItem, tags: selectedTags.join(',')};
      // }
      data = { ...latestItem, tags: selectedTags.join(',') };
      requestUrl = createFinItem(data);
    }

    // App Loading Status
    dispatch(setAppLoading());

    // Axios.post(requestUrl, {data})
    //   .then(() => {
    //     // App Loaded Status
    //     dispatch(setAppLoaded());

    //     dispatch({
    //       type: 'SET_MESSAGE',
    //       notificationType: 'info',
    //       message: '保存成功'
    //     });

    //     if (repeatRecord) {
    //       setLatestItem(Object.assign({}, latestItem, {amount: 0}));
    //       amountInputRef.current.value = '0.00';
    //     } else {
    //       dispatch(resetSelectedItem());
    //     }
    //   });
    sendGraphqlRequest(createFinItem(data), false)
      .then(() => {
        // App Loaded Status
        dispatch(setAppLoaded());

        dispatch({
          type: 'SET_MESSAGE',
          notificationType: 'info',
          message: '保存成功',
        });

        if (repeatRecord) {
          setLatestItem(Object.assign({}, latestItem, { amount: 0 }));
          amountInputRef.current.value = '0.00';
        } else {
          dispatch(resetSelectedItem());
        }
      })
      .catch(e => {
        // App Loaded Status
        dispatch(setAppLoaded());

        dispatch({
          type: 'SET_MESSAGE',
          notificationType: 'error',
          message: '保存失败',
        });
      });
  };

  const updateSingleScheduledItem = () => {
    setUpdateScheduledPopupStatus(false);
    const requestUrl = '/api/wacai/updateFinItem';
    const data = { ...latestItem };

    // App Loading Status
    dispatch(setAppLoading());

    Axios.post(requestUrl, { data }).then(() => {
      // App Loaded Status
      dispatch(setAppLoaded());

      dispatch(resetSelectedItem());
    });
  };

  const updateSeriesScheduledItems = () => {
    const requestUrl = '/api/wacai/updateScheduledFinItem';
    const data = { ...latestItem };
    const options: {
      scheduledId?: string;
      year?: number;
      month?: number;
      day?: number;
    } = {};
    const now = new Date();
    options.scheduledId = data.scheduleId;
    options.year = now.getFullYear();
    options.month = now.getMonth() + 1;
    options.day = now.getDate();

    // App Loading Status
    dispatch(setAppLoading());

    Axios.post(requestUrl, { data, options }).then(() => {
      // App Loaded Status
      dispatch(setAppLoaded());

      setUpdateScheduledPopupStatus(false);
      dispatch(resetSelectedItem());
    });
  };

  const handleDeleteButton = () => {
    if (latestItem.isScheduled > 0) {
      setDeleteScheduledPopupStatus(true);
    } else {
      // App Loading Status
      dispatch(setAppLoading());

      Axios.delete(`/api/wacai/deleteFinItem?id=${latestItem.id}`).then(
        () => {
          // App Loaded Status
          dispatch(setAppLoaded());

          dispatch(resetSelectedItem());
        },
        ({ response }) => {
          // App Loaded Status
          dispatch(setAppLoaded());

          if (response.status === 401) {
            dispatch(setLoginStatus(false));
          }
        }
      );
    }
  };

  const popupButtonsCancelHandler = () => {
    setDeleteScheduledPopupStatus(false);
    setUpdateScheduledPopupStatus(false);
  };

  const deleteSingleScheduledItem = () => {
    // App Loading Status
    dispatch(setAppLoading());

    Axios.delete(`/api/wacai/deleteFinItem?id=${latestItem.id}`).then(
      () => {
        // App Loaded Status
        dispatch(setAppLoaded());

        setDeleteScheduledPopupStatus(false);
        dispatch(resetSelectedItem());
      },
      ({ response }) => {
        // App Loaded Status
        dispatch(setAppLoaded());

        setDeleteScheduledPopupStatus(false);
        if (response.status === 401) {
          dispatch(setLoginStatus(false));
        }
      }
    );
  };

  const deleteSeriesScheduledItems = () => {
    // App Loading Status
    dispatch(setAppLoading());

    const now = new Date();
    Axios.delete(
      `/api/wacai/deleteScheduledFinItem?scheduleId=${
        latestItem.scheduleId
      }&year=${now.getFullYear()}&month=${
        now.getMonth() + 1
      }&day=${now.getDate()}`
    ).then(
      () => {
        // App Loaded Status
        dispatch(setAppLoaded());

        setDeleteScheduledPopupStatus(false);
        dispatch(resetSelectedItem());
      },
      ({ response }) => {
        // App Loaded Status
        dispatch(setAppLoaded());

        setDeleteScheduledPopupStatus(false);
        if (response.status === 401) {
          dispatch(setLoginStatus(false));
        }
      }
    );
  };

  const deleteScheduledPopupButtons = [
    {
      name: '只删除这一笔',
      clickHandler: deleteSingleScheduledItem,
    },
    {
      name: '删除这一笔以及以后所有',
      clickHandler: deleteSeriesScheduledItems,
    },
  ];

  const updateScheduledPopupButtons = [
    {
      name: '只更新这一笔',
      clickHandler: updateSingleScheduledItem,
    },
    {
      name: '更新这一笔以及以后所有',
      clickHandler: updateSeriesScheduledItems,
    },
  ];

  const toggleCalculator = () => {
    setCalculatorStatus(!calculatorStatus);
  };

  const handleCalculatorCallback = result => {
    let amount = +parseFloat(result).toFixed(2);
    setLatestItem(Object.assign({}, latestItem, { amount }));
    setCalculatorStatus(false);

    // Set input value
    amountInputRef.current.value = parseFloat(result).toFixed(2);
  };

  const handleRepeatButton = () => {
    handleSaveAction({ repeatRecord: true });
  };

  const handleTagInputChange = evt => {
    const currInput = evt.target.value;
    setFilteredTagList(tagList.filter(tag => tag.indexOf(currInput) > -1));
  };

  const handleTagAdd = () => {
    const newTag = tagInputRef.current.value;
    if (tagList.indexOf(newTag) < 0) {
      setTagList([newTag, ...tagList]);
      setFilteredTagList([newTag, ...tagList]);
    } else {
      setFilteredTagList([...tagList]);
    }

    // Automatically add new tag to selected list
    selectedTags.indexOf(newTag) < 0 &&
      setSelectedTags([...selectedTags, newTag]);

    // clear value once new tag is added
    tagInputRef.current.value = '';
  };

  const toggleTagSelection = (tag, isSelected) => {
    const index = selectedTags.indexOf(tag);
    let newSelectedTags = selectedTags.slice();
    if (index > -1) {
      newSelectedTags.splice(index, 1);
      setSelectedTags(newSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onNegativeCommentChange = comment => {
    const newRating = {
      ...(latestItem.rating || {}),
      negativeComment: comment,
    };
    setLatestItem(Object.assign({}, latestItem, { rating: newRating }));
  };

  const onPositiveCommentChange = comment => {
    const newRating = {
      ...(latestItem.rating || {}),
      positiveComment: comment,
    };
    setLatestItem(Object.assign({}, latestItem, { rating: newRating }));
  };

  const onRatingFaceSelected = rating => {
    const newRating = {
      ...(latestItem.rating || {}),
      rating,
    };
    setLatestItem(Object.assign({}, latestItem, { rating: newRating }));
  };

  /*
    Format change from '2019-04-20 19:20:00' to '2019/04/20 19:20:00'
    Required on mobile browser difference
    latestItem.date.replace(/-/g, '/')
  */
  return (
    <div className="FinItemDetails">
      <div className="Fin-Nav">
        <div className="Fin-Nav-Out">支出</div>
        <div className="Fin-Nav-Arrow" />
      </div>
      <div className="Fin-Date Fin-WhiteBack">
        <DateTime
          value={new Date(latestItem.date.replace(/-/g, '/'))}
          defaultValue={new Date()}
          onChange={handleDateTimeChange}
          inputProps={{ disabled: isUpdate && latestItem.isScheduled > 0 }}
        />
      </div>
      <div className="Fin-Schedule Fin-WhiteBack">
        <DropdownList
          isDisabled={isUpdate}
          defaultSelectedValue={
            scheduleModeItems[latestItem.isScheduled || 0].value
          }
          items={scheduleModeItems}
          customizeItemClickHandler={handleScheduleModeChange}
        />
      </div>
      <div className="Fin-Header Fin-WhiteBack">
        <div className="Fin-SubCat" onClick={handleCatSelection}>
          <div className="Category">{latestItem.category}</div>
          <div className="SubCategory">{latestItem.subcategory}</div>
        </div>
        <div className="Fin-Amount">
          <input
            type="number"
            ref={amountInputRef}
            onFocus={handleAmountFocus}
            onBlur={handleAmountBlur}
            onChange={handleAmountChange}
            defaultValue={
              parseFloat(latestItem.amount + '').toFixed(2) || '0.00'
            }
          />
          {/* value={latestItem.amount || 0} /> */}
          <div className="CalculatorIcon" onClick={toggleCalculator}>
            {calculatorStatus && (
              <div className="CalculatorPanel">
                <Calculator
                  defaultValue={latestItem.amount + ''}
                  confirmCallback={handleCalculatorCallback}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Fin-ComCats Fin-WhiteBack">
        <div className="Fin-ComCat-Container">
          {comCatItems.map((comItem, index) => (
            <div className="Fin-ComCat" key={index}>
              <FinComCatItem
                category={comItem.category}
                subcategory={comItem.subcategory}
                onClickHandler={handleCommonCatClick}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="Fin-Comment Fin-WhiteBack">
        <SearchDropdown
          optionList={commentOptions}
          filterFunction={commentFilterFn}
          placeholder="备注"
          onChangeCallback={handleCommentChange}
          defaultValue={latestItem.comment}
        />
      </div>
      <div className="Fin-FullDetails Fin-WhiteBack">
        <div className="Fin-Place">
          <SearchDropdown
            optionList={placeOptions}
            filterFunction={placeFilterFn}
            placeholder="商场"
            onChangeCallback={handlePlaceChange}
            defaultValue={latestItem.place}
          />
        </div>
        <div className="Fin-City">
          <input
            type="input"
            placeholder="城市"
            onChange={handleCityChange}
            defaultValue={latestItem.city || DEFAULT_CITY}
          />
        </div>
      </div>
      <div className="Fin-Toolbar Fin-WhiteBack">
        <div className="Fin-Btns">
          <div className="Fin-Btn Fin-BackBtn" onClick={handleBackBtn}>
            返回
          </div>
          {latestItem.id ? (
            <div className="Fin-Btn Fin-DeleteBtn" onClick={handleDeleteButton}>
              删除
            </div>
          ) : (
            <div className="Fin-Btn Fin-RepeatBtn" onClick={handleRepeatButton}>
              保存再记
            </div>
          )}
          <div className="Fin-Btn Fin-SaveBtn" onClick={handleSaveButton}>
            保存
          </div>
        </div>
      </div>
      <div className="Fin-Tags Fin-WhiteBack">
        <div className="Fin-Tags-Add">
          <input
            type="input"
            ref={tagInputRef}
            placeholder="新加标签"
            onChange={handleTagInputChange}
            defaultValue=""
          />
          <div className="Fin-Tags-Add-Btn" onClick={handleTagAdd} />
        </div>
        <div className="Fin-TagsManagement">
          <HashTagManagement
            tags={filteredTagList}
            selectedTags={selectedTags}
            toggleTagSelection={toggleTagSelection}
          />
        </div>
      </div>
      {deleteScheduledPopupStatus && (
        <div className="PopupButtons--Container">
          <PopupButtons
            buttons={deleteScheduledPopupButtons}
            cancelHandler={popupButtonsCancelHandler}
          />
        </div>
      )}
      {updateScheduledPopupStatus && (
        <div className="PopupButtons--Container">
          <PopupButtons
            buttons={updateScheduledPopupButtons}
            cancelHandler={popupButtonsCancelHandler}
          />
        </div>
      )}
      {commentHintDialogStatus && (
        <div className="FinDetails__CommentHintDialog">
          <CommentHintDialog
            closeCallback={toggleCommentHintDialogStatus}
            successCallback={saveCommentHintResult}
            optionList={commentFullInfoOptions}
            commentKeyWord={latestItem.comment}
          />
        </div>
      )}
      <BottomDrawer autoExpand={!!latestItem.id}>
        <Rating
          rating={latestItem.rating}
          onNegativeCommentChange={onNegativeCommentChange}
          onPositiveCommentChange={onPositiveCommentChange}
          onRatingFaceSelected={onRatingFaceSelected}
        />
      </BottomDrawer>
    </div>
  );
};

export default FinItemDetails;
