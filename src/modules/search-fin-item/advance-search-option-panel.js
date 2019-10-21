import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import DropdownList from '../dropdown-list';

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
          type: 'SET_ERROR_MESSAGE',
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