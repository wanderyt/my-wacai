import React, {useState} from 'react';
import {connect} from 'react-redux';
import HeaderToolbar from '../header-toolbar';
import SearchBox from '../search-box';
import SearchFinItemList from './search-fin-item-list';
import AdvancedSearch from './advance-search';

import './index.scss';

const SearchFinItem = ({finItems = [], dispatch}) => {
  const [advancedSearchStatus, setAdvancedSearchStatus] = useState(false);
  const searchBoxStyles = {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  };

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
    // setAdvancedSearchStatus(true);
  };

  return (
    <div className='SearchFinItem'>
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
        <SearchFinItemList
          finItems={finItems} />
      }
      {
        advancedSearchStatus &&
        <div className='AdvancedSearch-Container'>
          <AdvancedSearch />
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
