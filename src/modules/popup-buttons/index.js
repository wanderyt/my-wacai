import React, { useState } from 'react';

import './index.scss';

const PopupButtons = ({buttons = [], cancelHandler = () => void 0}) => {

  const defaultCancelHandler = () => {
    cancelHandler();
  }

  return (
    <div className='PopupButtons'>
      <div className='PopupButtons--CustomItems'>
        {
          buttons.map((buttonItem, index) => (
            <div
              key={index}
              className='PopupButton--Item'
              onClick={buttonItem.clickHandler}>
              <span className='PopupButton--ItemTitle'>{buttonItem.name}</span>
            </div>
          ))
        }
      </div>
      <div
        key={buttons.length}
        className='PopupButtons--CancelItem'
        onClick={defaultCancelHandler}>
        <span className='PopupButton--ItemTitle'>取消</span>
      </div>
    </div>
  );
};

export default PopupButtons;
