import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import './index.scss';

const Notification = ({type, message, errorTimeout = 1000, dispatch}) => {
  const [addAnimation, setAddAnimation] = useState(true);
  useEffect(() => {
    setAddAnimation(false);
    setTimeout(() => {
      setAddAnimation(true);
      setTimeout(() => {
        dispatch({
          type: 'RESET_MESSAGE'
        });
      }, 1000);
    }, errorTimeout);
  }, []);
  return (
    <div className={`Notification ${addAnimation ? 'fadeOutAnimation' : ''}`}>
      <div className={`${type === 'error' ? 'Message-Container Error' : 'Message-Container Info'}`}>
        <div className={`${type === 'error' ? 'ErrorMessage' : 'InfoMessage'}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default connect()(Notification);
