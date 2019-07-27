import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import FinMain from './modules/fin-main';
import FinItemDetails from './modules/fin-item-details';
import FinCatSelection from './modules/fin-cat-subcat';
import FinItemList from './modules/fin-item-list';
import FinTemplateList from './modules/fin-template-list';
import AutoUpdateNumber from './modules/autoupdate-number';
import ErrorNotification from './modules/error-notification';
import SearchFinItem from './modules/search-fin-item';

import './App.scss';

const App = ({pageIndex, errorMsg, selectedItem, dispatch}) => {
  let [monthTotal, setMonthTotal] = useState(0);
  let [finList, setFinList] = useState([]);

  // Set monthly total amount
  useEffect(() => {
    Axios.get('/api/wacai/getFinList')
      .then(({data}) => {
        let total = data.total || 0;
        let finList = data.data || [];
        setFinList(finList);
        setMonthTotal(total);
      }, ({response}) => {
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }, [selectedItem]);

  const handleTotalAmountClick = () => {
    dispatch({
      type: 'CHANGE_TO_FIN_HISTORY'
    });
  }

  return (
    <div className="App">
      {
        errorMsg &&
        <div className='App-Page-Error-Notification'>
          <ErrorNotification
            errorMsg={errorMsg} />
        </div>
      }
      {
        pageIndex === 'SEARCH_FIN_ITEM' &&
        <div className='App-Page-Fin-Search'>
          <SearchFinItem />
        </div>
      }
      {
        pageIndex === 'CATEGORY_SELECTION' &&
        <div className='App-Page-Cat-Selection'>
          <FinCatSelection />
        </div>
      }
      {
        pageIndex === 'FIN_HISTORY' &&
        <div className='App-Page-Fin-History'>
          <FinItemList />
        </div>
      }
      {
        pageIndex === 'FIN_TEMPLATE_LIST' &&
        <div className='App-Page-Fin-Template-List'>
          <FinTemplateList />
        </div>
      }
      {
        pageIndex === 'MAIN' &&
        <div className='App-Page-Main'>
          <div className='App-Header'>
            <div className='Header-MonthTotal'>
              <div className='Caption'>本月总计</div>
              <div
                className='Amount'
                onClick={handleTotalAmountClick}>
                {/* {parseFloat(monthTotal).toFixed(2)} */}
                <AutoUpdateNumber
                  total={monthTotal}
                  duration={100} />
              </div>
            </div>
          </div>
          {
            selectedItem ?
            <div className='App-FinDetails'>
              <FinItemDetails item={selectedItem} />
            </div>
            :
            <div className='App-Main'>
              <FinMain items={finList} />
            </div>
          }
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedItem: state.fin ? state.fin.selectedItem : null,
  pageIndex: state.fin ? state.fin.pageIndex : 'MAIN',
  errorMsg: state.errorMsg ? state.errorMsg.message : '',
});

export default connect(mapStateToProps)(App);
