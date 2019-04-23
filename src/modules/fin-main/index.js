import React from 'react';
import {connect} from 'react-redux';
import FinItem from '../fin-item';

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
        <div className='App-FinList'>
          {
            items.map((item, index) => (
              <div key={index}>
                <FinItem item={item} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default connect()(FinMain);
