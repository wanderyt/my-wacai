import React from 'react';
import {connect} from 'react-redux';

import './index.scss';

const HeaderToolbar = ({closeHandler, hasSearch = true, barTitle = '', searchHandler, dispatch}) => {
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
        <div
          className='BarInfo'>
          {barTitle}
        </div>
        <div
          className='ToolBtns'>
          {
            hasSearch &&
            <div
              className='SearchBtn'
              onClick={handleSearch} />
          }
        </div>
      </div>
    </div>
  );
};

export default connect()(HeaderToolbar);
