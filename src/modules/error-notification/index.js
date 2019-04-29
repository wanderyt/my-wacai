import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import './index.scss';

const ErrorNotification = ({errorMsg, errorTimeout = 1000, dispatch}) => {
  const [addAnimation, setAddAnimation] = useState(true);
  useEffect(() => {
    setAddAnimation(false);
    setTimeout(() => {
      setAddAnimation(true);
      setTimeout(() => {
        dispatch({
          type: 'RESET_ERROR_MESSAGE'
        });
      }, 1000);
    }, errorTimeout);
  }, []);
  return (
    <div className={`ErrorNotification ${addAnimation ? 'fadeOutAnimation' : ''}`}>
      <div className='ErrorMessage-Container'>
        <div className='ErrorMessage'>
          {errorMsg}
        </div>
      </div>
    </div>
  );
};

export default connect()(ErrorNotification);
