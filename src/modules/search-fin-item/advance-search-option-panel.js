import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import DropdownList from '../dropdown-list';
import {formatDate, formatDateObject} from '../../utils/helper';
import DateTime from 'react-datetime';

import './advance-search-option-panel.scss';

export const SelectionPanelButtonGroup = ({enableSubmitButton = true, enableCancelButton = true, submitHandler = void 0, cancelHandler = void 0}) => {
  return (
    <div className='Selection__ButtonGroups'>
      {
        enableSubmitButton &&
        <div className='SubmitButton' onClick={submitHandler}>
          确认
        </div>
      }
      {
        enableCancelButton &&
        <div className='CancelButton' onClick={cancelHandler}>
          取消
        </div>
      }
    </div>
  );
};

export const KeywordsSelectionPanel = ({currentValue = '', submitHandler = void 0, cancelHandler = void 0}) => {
  const [keyword, setKeyword] = useState(currentValue);
  const onChangeHandler = (evt) => {
    setKeyword(evt.target.value);
  }
  const submitHandlerFn = () => {
    submitHandler(keyword);
  }
  const cancelHandlerFn = () => {
    cancelHandler();
  }
  return (
    <div className='KeywordsSelectionPanel'>
      <div className='InputContainer'>
        <input onChange={onChangeHandler} placeholder='请输入关键字' value={keyword} />
      </div>
      <SelectionPanelButtonGroup submitHandler={submitHandlerFn} cancelHandler={cancelHandlerFn} />
    </div>
  );
};

const CategorySelectionPanelComp = ({currentValue = {}, submitHandler = void 0, cancelHandler = void 0, dispatch}) => {
  const [category, setCategory] = useState(currentValue.category || '全部');
  const [subCategory, setSubCategory] = useState(currentValue.subcategory || '全部');
  const [categoryGroup, setCategoryGroup] = useState({});
  const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState((currentValue.category || '全部') === '全部');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const categoryDataProcessor = (data) => {
    let validCategories = Object.keys(data);
    validCategories = validCategories.map((item, index) => {
      return {
        key: index + 1,
        value: item
      };
    });

    validCategories.unshift({
      key: 0,
      value: '全部'
    });

    return validCategories;
  }

  const categorySelectionHandler = (item) => {
    setCategory(item.value);
    const defaultSubCategories = [{
      key: 0,
      value: '全部'
    }];
    if (item.value === '全部') {
      setSubCategories(defaultSubCategories);
      setIsSubCategoryDisabled(false);
    } else {
      let alternateSubCategories = categoryGroup[item.value];
      alternateSubCategories = alternateSubCategories.map((item, index) => {
        return {
          key: index + 1,
          value: item.subcategory
        };
      });
      setSubCategories([...defaultSubCategories, ...alternateSubCategories]);
      setIsSubCategoryDisabled(false);
    }
  }

  const subCategorySelectionHandler = (item) => {
    setSubCategory(item.value);
  }

  useEffect(() => {
    Axios.get('/api/wacai/getCategoryGroup')
      .then(({data}) => {
        let categoryGroupData = data.data || {};
        setCategoryGroup(categoryGroupData);
        const categories = categoryDataProcessor(categoryGroupData);
        setCategories(categories);
      }, ({response}) => {
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }, []);

  const submitHandlerFn = () => {
    submitHandler({
      category: category,
      subcategory: subCategory
    });
  }

  const cancelHandlerFn = () => {
    cancelHandler();
  }

  return (
    <div className='CategorySelectionPanel'>
      <div className='CategorySelectionContainer'>
        <div className='CategoryTitle'>类别</div>
        <div className='CategorySelection'>
          <DropdownList
            defaultSelectedValue={category}
            items={categories}
            customizeItemClickHandler={categorySelectionHandler} />
        </div>
      </div>
      <div className='SubCategorySelectionContainer'>
        <div className='SubCategoryTitle'>子类</div>
        <div className='SubCategorySelection'>
          <DropdownList
            defaultSelectedValue={subCategory}
            isDisabled={isSubCategoryDisabled}
            items={subCategories}
            customizeItemClickHandler={subCategorySelectionHandler} />
        </div>
      </div>
      <SelectionPanelButtonGroup submitHandler={submitHandlerFn} cancelHandler={cancelHandlerFn} />
    </div>
  )
};

export const CategorySelectionPanel = connect()(CategorySelectionPanelComp);

const AmountRangeSelectionPanelComp = ({currentValue = [], submitHandler = () => void 0, cancelHandler = () => void 0, dispatch}) => {
  const [amountRanges, setAmountRanges] = useState(currentValue);

  const amountRangeAdder = () => {
    setAmountRanges([...amountRanges, {minAmount: 0, maxAmount: 0}]);
  }

  const amountRangeRemover = (index) => {
    const tmpAmountRanges = [...amountRanges];
    tmpAmountRanges.splice(index, 1);
    setAmountRanges([...tmpAmountRanges]);
  }

  const onMinAmountChange = (evt, index) => {
    const tmpAmountRanges = [...amountRanges];
    const value = evt.target.value;
    tmpAmountRanges[index].minAmount = value;
    setAmountRanges([...tmpAmountRanges]);
  }

  const onMaxAmountChange = (evt, index) => {
    const tmpAmountRanges = [...amountRanges];
    const value = evt.target.value;
    tmpAmountRanges[index].maxAmount = value;
    setAmountRanges([...tmpAmountRanges]);
  }

  const submitHandlerFn = () => {
    for (const item in amountRanges) {
      if (amountRanges[item].minAmount > amountRanges[item].maxAmount && amountRanges[item].maxAmount != 0) {
        dispatch({
          type: 'SET_MESSAGE',
          notificationType: 'error',
          message: '金额区间设置有误'
        });

        return;
      }
    }

    submitHandler(amountRanges);
  }

  const cancelHandlerFn = () => {
    cancelHandler();
  }

  return (
    <div className='AmountRangeSelectionPanel'>
      <div
        className='AmountRangeAdder'
        onClick={amountRangeAdder}>+</div>
      <div className='AmountRangeContainer'>
        {
          amountRanges.map(({minAmount, maxAmount}, index) => (
            <div className='AmountRangeItem' key={index}>
              <div className='AmountRangeMain'>
                <input className='AmountRangeItem--Min' onChange={(evt) => onMinAmountChange(evt, index)} value={minAmount} />
                <div className='AmountRangeItem--Sep'> - </div>
                <input className='AmountRangeItem--Max' onChange={(evt) => onMaxAmountChange(evt, index)} value={maxAmount} />
              </div>
              <div className='AmountRangeRemover' onClick={() => {amountRangeRemover(index)}}>-</div>
            </div>
          ))
        }
      </div>
      <SelectionPanelButtonGroup submitHandler={submitHandlerFn} cancelHandler={cancelHandlerFn} />
    </div>
  );
};

export const AmountRangeSelectionPanel = connect()(AmountRangeSelectionPanelComp);

export const DateRangeSelectionPanel = ({currentValue = {}, submitHandler = () => void 0, cancelHandler = () => void 0}) => {
  const [selectedDateRange, setSelectedDateRange] = useState(currentValue);
  const [isFreeDateRangeEnabled, setIsFreeDateRangeEnabled] = useState(currentValue.key === 9);
  const [customStartDate, setCustomStartDate] = useState(currentValue.key === 9 ? new Date(currentValue.minDate) : new Date());
  const [startDateStatus, setStartDateStatus] = useState(false);
  const [customEndDate, setCustomEndDate] = useState(currentValue.key === 9 ? new Date(currentValue.maxDate) : new Date());
  const [endDateStatus, setEndDateStatus] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();

  const getLastSeason = (year, month) => {
    if (month < 3) {
      return {
        minDate: formatDate(year - 1, 9),
        maxDate: formatDate(year - 1, 12)
      };
    } else {
      return {
        minDate: formatDate(year, month - (month % 3) - 3),
        maxDate: formatDate(year, month + (3 - month % 3) - 3)
      };
    }
  }

  const daysInMonth = (year, month) => { // m is 0 indexed: 0-11
    switch (month) {
        case 2 :
            return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
        case 9 : case 4 : case 6 : case 11 :
            return 30;
        default :
            return 31
    }
  }

  const getLastMonth = (year, month) => {
    if (month === 1) {
      return {
        minDate: formatDate(year - 1, 12, 1),
        maxDate: formatDate(year - 1, 12, 31)
      }
    } else {
      return {
        minDate: formatDate(year, month - 1, 1),
        maxDate: formatDate(year, month - 1, daysInMonth(year, month - 1))
      }
    }
  }

  const getThisWeek = (year, month, date, day) => {
    if (date < day) {
      const diff = day - date;
      return {
        minDate: formatDate(year, month - 1, daysInMonth(year, month - 1) - (diff - 1)),
        maxDate: formatDate(year, month, date + (7 - day))
      };
    } else {
      return {
        minDate: formatDate(year, month, date - (day - 1)),
        maxDate: formatDate(year, month, date + (7 - day))
      };
    }
  }

  const getLastWeek = (year, month, date, day) => {
    if ((date - 7) <= 0) {
      return {
        ...getThisWeek(year, month - 1, daysInMonth(year, month - 1) - (7 - date), day)
      };
    } else {
      return {
        ...getThisWeek(year, month, date - 7, day)
      };
    }
  }

  const dateRangeOptions = [{
    key: 0,
    value: '全部'
  }, {
    key: 1,
    value: '本年',
    minDate: year,
    maxDate: year + 1
  }, {
    key: 2,
    value: '去年',
    minDate: year - 1,
    maxDate: year
  }, {
    key: 3,
    value: '本季',
    minDate: formatDate(year, month - (month % 3)),
    maxDate: formatDate(year, month + (3 - month % 3))
  }, {
    key: 4,
    value: '上季',
    ...getLastSeason(year, month)
  }, {
    key: 5,
    value: '本月',
    minDate: formatDate(year, month, 1),
    maxDate: formatDate(year, month, daysInMonth(year, month))
  }, {
    key: 6,
    value: '上月',
    ...getLastMonth(year, month)
  }, {
    key: 7,
    value: '本周',
    ...getThisWeek(year, month, date, day)
  }, {
    key: 8,
    value: '上周',
    ...getLastWeek(year, month, date, day)
  }, {
    key: 9,
    value: '自定义'
  }];

  const dateRangeSelectedHandler = (item) => {
    if (item.key < 9) {
      setIsFreeDateRangeEnabled(false);
    } else {
      setIsFreeDateRangeEnabled(true);
    }
    setSelectedDateRange(dateRangeOptions[item.key]);
  }

  const handleStartDateChange = (newStartDate) => {
    let newDateString = newStartDate.format('YYYY-MM-DD');
    setCustomStartDate(new Date(newDateString));
    setStartDateStatus(!startDateStatus);
  }

  const handleEndDateChange = (newEndDate) => {
    let newDateString = newEndDate.format('YYYY-MM-DD');
    setCustomEndDate(new Date(newDateString));
    setEndDateStatus(!endDateStatus);
  }

  const toggleStartDateSelection = () => {
    setStartDateStatus(!startDateStatus);
  }

  const toggleEndDateSelection = () => {
    setEndDateStatus(!endDateStatus);
  }

  const submitHandlerFn = () => {
    if (selectedDateRange.key === 9) {
      submitHandler({
        ...selectedDateRange,
        minDate: customStartDate,
        maxDate: customEndDate
      });
    } else {
      submitHandler(selectedDateRange);
    }
  }

  const cancelHandlerFn = () => {
    cancelHandler();
  }

  return (
    <div className='DateRangeSelectionPanel'>
      <div className='DateRangeDropdownList'>
        <DropdownList
          items={dateRangeOptions}
          defaultSelectedValue={selectedDateRange.value || '全部'}
          customizeItemClickHandler={dateRangeSelectedHandler} />
      </div>
      {
        isFreeDateRangeEnabled &&
        <div className='DateRangeSelection--Custom'>
          <div className='DateRangeSelection DateRangeSelection--CustomStart'>
            <div className='StartDateContainer' onClick={toggleStartDateSelection}>
              <div className='Title'>起始时间</div>
              <div className='Value'>{formatDateObject(customStartDate)}</div>
            </div>
            {
              startDateStatus &&
              <DateTime
                input={false}
                value={customStartDate}
                defaultValue={customStartDate}
                onChange={handleStartDateChange}
                className='DateTimeStyles StartDatePicker'
                timeFormat={false} />
            }
          </div>
          <div className='DateRangeSelection DateRangeSelection--CustomEnd'>
            <div className='EndDateContainer' onClick={toggleEndDateSelection}>
              <div className='Title'>终止时间</div>
              <div className='Value'>{formatDateObject(customEndDate)}</div>
            </div>
            {
              endDateStatus &&
              <DateTime
                input={false}
                value={customEndDate}
                defaultValue={customEndDate}
                onChange={handleEndDateChange}
                className='DateTimeStyles EndDatePicker'
                timeFormat={false} />
            }
          </div>
        </div>
      }
      <SelectionPanelButtonGroup submitHandler={submitHandlerFn} cancelHandler={cancelHandlerFn} />
    </div>
  )
}