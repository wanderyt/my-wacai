import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import FinMain from './modules/fin-main';
import FinItemDetails from './modules/fin-item-details';
import FinCatSelection from './modules/fin-cat-subcat';
import FinItemList from './modules/fin-item-list';
import FinTemplateList from './modules/fin-template-list';
import AutoUpdateNumber from './modules/autoupdate-number';
import Notification from './modules/notification';
import SearchFinItem from './modules/search-fin-item';
import Loading from './modules/loading';

import './App.scss';

const API_LOADING_DELAY = 0;
const DEFAULT_FIN_ITEMS = 15;

const App = ({pageIndex, notificationType, notificationMsg, selectedItem, isAppLoading, dispatch}) => {
  let [monthTotal, setMonthTotal] = useState(0);
  let [weekTotal, setWeekTotal] = useState(0);
  let [dayTotal, setDayTotal] = useState(0);
  let [finList, setFinList] = useState(new Array(5).fill({}));
  let [isLoading, setIsLoading] = useState(true);

  // Set monthly total amount
  useEffect(() => {
    setIsLoading(true);

    if (!selectedItem) {
      let now = new Date();
      Axios.get(`/api/wacai/getFinList?year=${now.getFullYear()}&month=${now.getMonth() + 1}&day=${now.getDate()}&dayOfWeek=${now.getDay()}&top=${DEFAULT_FIN_ITEMS}`)
        .then(({data}) => {
          setTimeout(() => {
            setIsLoading(false);

            let {monthTotal = 0, weekTotal = 0, dayTotal = 0} = data;
            let finList = data.data || [];
            setFinList(finList);
            setMonthTotal(monthTotal);
            setWeekTotal(weekTotal);
            setDayTotal(dayTotal);
          }, API_LOADING_DELAY);
        }, ({response}) => {
          setIsLoading(false);

          if (response.status === 401) {
            dispatch({
              type: 'TOKEN_INVALID'
            });
          }
        });
    }
  }, [selectedItem]);

  const handleTotalAmountClick = () => {
    dispatch({
      type: 'CHANGE_TO_FIN_HISTORY'
    });
  }

  return (
    <div className="App">
      {
        notificationMsg &&
        <div className='App-Page-Notification'>
          <Notification
            type={notificationType}
            message={notificationMsg} />
        </div>
      }
      {
        isAppLoading &&
        <div className='App-Page-Loading'>
          <div className='LoadingContainer'>
            <Loading />
          </div>
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
          <div className='App-Logout' />
          <div className='App-Header'>
            <div className='Header-MonthTotal'>
              <div className='Caption'>本月总计</div>
              <div
                className='Amount'
                onClick={handleTotalAmountClick}>
                <AutoUpdateNumber
                  total={monthTotal}
                  duration={100} />
              </div>
            </div>
            <div className='Header-WeekDayTotal'>
              <div className='Caption'>本周总计</div>
              <div className='Amount'>
                <AutoUpdateNumber
                  total={weekTotal}
                  duration={100} />
              </div>
              <div className='Caption'>今日总计</div>
              <div className='Amount'>
                <AutoUpdateNumber
                  total={dayTotal}
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
              <FinMain isLoading={isLoading} items={finList} />
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
  isAppLoading: state.fin && state.fin.isAppLoading,
  notificationType: state.notification ? state.notification.notificationType : '',
  notificationMsg: state.notification ? state.notification.notificationMsg : '',
});

export default connect(mapStateToProps)(App);
