import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HeaderToolbar from '../header-toolbar';
import SearchBox from '../search-box';
import SearchFinItemList from './search-fin-item-list';
import BottomButtonGroup from '../bottom-button-group';
import AdvancedSearch from './advance-search';
import { switchToFinHistory } from '../../store/fin';
import { useAppDispatch } from '../../store';
import { Colors } from '../../styles/colors';
import styled from 'styled-components';

const NoResults = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.GreyLightIII};
`;

const SearchFinItem = ({ finItems = [] }) => {
  const dispatch = useAppDispatch();
  const headerEl = useRef<HTMLDivElement | null>(null);
  const [advancedSearchStatus, setAdvancedSearchStatus] = useState(false);
  const searchBoxStyles = {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  };

  // useRef need to be used together with useEffect
  // as ref element could be binded only after rendering done
  useEffect(() => {}, [headerEl]);

  const toolbarCloseHanlder = () => {
    if (advancedSearchStatus) {
      setAdvancedSearchStatus(false);
    } else {
      dispatch(switchToFinHistory());
    }
  };

  const openAdvancedSearchPanel = () => {
    setAdvancedSearchStatus(true);
  };

  const submitHandler = () => {
    setAdvancedSearchStatus(false);
  };

  return (
    <div className="SearchFinItem" ref={headerEl}>
      <HeaderToolbar
        closeHandler={toolbarCloseHanlder}
        hasSearch={false}
        barTitle={advancedSearchStatus ? '高级搜索' : ''}
      >
        {() =>
          advancedSearchStatus ? null : (
            <SearchBox
              customStyles={searchBoxStyles}
              advancedSearchHanlder={openAdvancedSearchPanel}
            />
          )
        }
      </HeaderToolbar>
      {!advancedSearchStatus && finItems.length > 0 && (
        <React.Fragment>
          <SearchFinItemList finItems={finItems} />
          <BottomButtonGroup isExpanded={false} scrollIntoViewRef={headerEl} />
        </React.Fragment>
      )}
      {!advancedSearchStatus && finItems.length === 0 && (
        <NoResults>无结果</NoResults>
      )}
      {advancedSearchStatus && (
        <div className="AdvancedSearch-Container">
          <AdvancedSearch submitHandler={submitHandler} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  let search = state.search || {};
  return {
    finItems: search.finItems || [],
  };
};

export default connect(mapStateToProps)(SearchFinItem);
