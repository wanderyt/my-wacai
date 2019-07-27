import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';

import './advance-search-item.scss';

const AdvanceSearchItem = ({type, name, Comp, searchParams, dispatch}) => {
  const [isSelectionPanelOpen, setIsSelectionPanelOpen] = useState(false);

  const setSelectionValue = (value) => {
    dispatch({
      type: 'SET_ADVANCE_SEARCH_PARAM',
      itemType: type,
      itemValue: value
    });
  }

  const openSelectionDetailPanel = () => {
    // TODO
    setIsSelectionPanelOpen(true);
    setSelectionValue('选中');
  }

  const formatValue = (value) => {
    // TODO
    return value;
  }

  return (
    <Fragment>
      <div className='AdvanceSearchItem'>
        <div className='ItemName'>
          <span>{name}</span>
        </div>
        <div className='ItemOption'>
          <div
            className='ItemOption-Container'
            onClick={openSelectionDetailPanel}>
            <span className='ItemSelectedValue'>{searchParams[type] ? formatValue(searchParams[type]) : '全部'}</span>
            <span className='ItemSelectionButton'>></span>
          </div>
        </div>
      </div>
      {
        isSelectionPanelOpen && Comp && <Comp />
      }
    </Fragment>
  )
};

const mapStateToProps = (state) => {
  const searchParams = (state.search || {}).searchParams || {};
  return {
    searchParams
  };
};

export default connect(mapStateToProps)(AdvanceSearchItem);
