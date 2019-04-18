import React from 'react';
import {connect} from 'react-redux';
import FinItemThin from '../fin-item-thin';

import './index.scss';

const FinMain = ({items, dispatch}) => {
  const handleCreateItem = () => {
    dispatch({type: 'CREATE_ITEM'});
  }
  return (
    <div className='FinMain'>
      <div className='App-Toolbar'>
        <div className='App-Toolbtn'>
          <div
            className={`App-Btn forbid-select App-CreateItem`}
            onClick={handleCreateItem}>
            记一笔
          </div>
          <div
            className={`App-Btn forbid-select App-CreateFast`}>
            速记
          </div>
        </div>
      </div>
      <div className='App-Container'>
        {
          items.map((item) => (
            <FinItemThin item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default connect()(FinMain);
