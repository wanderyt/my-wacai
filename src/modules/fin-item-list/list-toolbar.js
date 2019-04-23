import React from 'react';
import {connect} from 'react-redux';

import './list-toolbar.scss';

const ListToolbar = ({dispatch}) => {
  const handleClose = () => {
    dispatch({
      type: 'CHANGE_TO_MAIN'
    });
  }

  return (
    <div className='ListToolbar'>
      <div className='ListToolbar-Container'>
        <div
          className='CloseBtn'
          onClick={handleClose} />
        <div className='SearchBtn' />
      </div>
    </div>
  );
};

export default connect()(ListToolbar);
