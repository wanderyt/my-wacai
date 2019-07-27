import React, {useState} from 'react';

export const KeywordsSelectionPanel = ({currentValue = ''}) => {
  const [keyword, setKeyword] = useState(currentValue);
  const onChangeHandler = (evt) => {
    setKeyword(evt.target.value);
  }
  return (
    <div className='KeywordsSelectionPanel'>
      <div className='InputContainer'>
        <input onChange={onChangeHandler} placeholder='请输入关键字' value={keyword} />
      </div>
      <div className='BtnContainer'>
        <div className='SubmitBtn'>确认</div>
      </div>
    </div>
  );
};
