import React, {useState} from 'react';

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
  return (
    <div className='KeywordsSelectionPanel'>
      <div className='InputContainer'>
        <input onChange={onChangeHandler} placeholder='请输入关键字' value={keyword} />
      </div>
      <SelectionPanelButtonGroup submitHandler={submitHandlerFn} cancelHandler={cancelHandler} />
    </div>
  );
};
