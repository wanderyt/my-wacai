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

  const toggleSelectionDetailPanel = () => {
    setIsSelectionPanelOpen(!isSelectionPanelOpen);
  }

  const formatValue = (value) => {
    return value;
  }

  const submitHandler = (value) => {
    setSelectionValue(value);
    setIsSelectionPanelOpen(false);
  }

  const cancelHandler = () => {
    setIsSelectionPanelOpen(false);
  }

  return (
    <Fragment>
      <div className={`AdvanceSearchItem ${isSelectionPanelOpen && Comp ? 'AdvanceSearchItem-NoBottomBorder' : ''}`}>
        <div className='ItemName'>
          <span>{name}</span>
        </div>
        <div className='ItemOption'>
          <div
            className='ItemOption-Container'
            onClick={toggleSelectionDetailPanel}>
            <div className='ItemSelectedValue'>{searchParams[type] ? formatValue(searchParams[type]) : '全部'}</div>
            <div className='ItemSelectionButton'>></div>
          </div>
        </div>
      </div>
      {
        isSelectionPanelOpen && Comp && <Comp currentValue={searchParams[type]} submitHandler={submitHandler} cancelHandler={cancelHandler} />
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
