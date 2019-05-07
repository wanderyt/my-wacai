import React from 'react';
import {connect} from 'react-redux';

import './index.scss';

const HeaderToolbar = ({closeHandler, hasSearch = true, barTitle = '', searchHandler, children, dispatch}) => {
  const handleClose = () => {
    if (closeHandler) {
      closeHandler();
    } else {
      dispatch({
        type: 'CHANGE_TO_MAIN'
      });
    }
  }

  const handleSearch = () => {
    if (searchHandler) {
      searchHandler();
    }
  }

  return (
    <div className='HeaderToolbar'>
      <div className='HeaderToolbar-Container'>
        <div
          className='CloseBtn'
          onClick={handleClose} />
        {
          barTitle &&
          <div
            className='BarInfo'>
            {barTitle}
          </div>
        }
        {
          children && typeof children === 'function' &&
          <div
            className='BarContent'>
            {children()}
          </div>
        }
        {
          !barTitle && !children &&
          <div className='BarHeader' />
        }
        {
          hasSearch &&
          <div
            className='ToolBtns'>
            <div
              className='SearchBtn'
              onClick={handleSearch} />
          </div>
        }
      </div>
    </div>
  );
};

export default connect()(HeaderToolbar);
