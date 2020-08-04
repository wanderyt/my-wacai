import React, {useRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import HeaderToolbar from '../header-toolbar';
import SearchBox from '../search-box';
import SearchFinItemList from './search-fin-item-list';
import BottomButtonGroup from '../bottom-button-group';
import AdvancedSearch from './advance-search';

import './index.scss';

const SearchFinItem = ({finItems = [], dispatch}) => {
  const headerEl = useRef(null);
  const [advancedSearchStatus, setAdvancedSearchStatus] = useState(false);
  const searchBoxStyles = {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  };

  useEffect(() => {
  }, [headerEl])

  const toolbarCloseHanlder = () => {
    if (advancedSearchStatus) {
      setAdvancedSearchStatus(false);
    } else {
      dispatch({
        type: 'CHANGE_TO_FIN_HISTORY'
      });
    }
  }

  const openAdvancedSearchPanel = () => {
    setAdvancedSearchStatus(true);
  };

  const submitHandler = () => {
    setAdvancedSearchStatus(false);
  }

  return (
    <div className='SearchFinItem' ref={headerEl}>
      <HeaderToolbar
        closeHandler={toolbarCloseHanlder}
        hasSearch={false}
        barTitle={advancedSearchStatus ? '高级搜索' : ''}
        >
        {() => (
          advancedSearchStatus ?
          null
          :
          <SearchBox
            customStyles={searchBoxStyles}
            advancedSearchHanlder={openAdvancedSearchPanel} />
        )}
      </HeaderToolbar>
      {
        !advancedSearchStatus && finItems.length > 0 &&
        <React.Fragment>
          <SearchFinItemList
            finItems={finItems} />
          <BottomButtonGroup isExpanded={false} scrollIntoViewRef={headerEl} />
        </React.Fragment>
      }
      {
        advancedSearchStatus &&
        <div className='AdvancedSearch-Container'>
          <AdvancedSearch submitHandler={submitHandler} />
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  let search = state.search || {};
  return {
    finItems: search.finItems || []
  };
};

export default connect(mapStateToProps)(SearchFinItem);
