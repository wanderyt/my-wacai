import React from 'react';
import {connect} from 'react-redux';
import FinItem from '../fin-item';

import './index.scss';

const FinMain = ({isLoading, items, dispatch}) => {
  const handleCreateItem = () => {
    dispatch({type: 'CREATE_ITEM'});
  }
  const handleCreateByTemplate = () => {
    dispatch({type: 'CHANGE_TO_FIN_TEMPLATE_LIST'});
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
            className={`App-Btn forbid-select App-CreateFast`}
            onClick={handleCreateByTemplate}>
            速记
          </div>
        </div>
      </div>
      <div className='App-Container'>
        <div className='App-FinList'>
          {
            items.map((item, index) => {
              return (
                <div key={index}>
                  {
                    <FinItem isLoading={isLoading} item={item} />
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default connect()(FinMain);
