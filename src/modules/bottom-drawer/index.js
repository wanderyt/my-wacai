import React, {useState} from 'react';
import {connect} from 'react-redux';

import './index.scss';

const BottomDrawer = ({children}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`BottomDrawer ${isExpanded ? 'BottomDrawer--Expand' : 'BottomDrawer--Fold'}`}>
      <div className='Handle' onClick={toggleDrawer} />
        <div className='Content'>
          {isExpanded ? children : null}
        </div>
    </div>
  );
};

export default BottomDrawer;