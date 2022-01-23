import React, { useEffect, useState } from 'react';
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
import { sendGraphqlRequest } from './utils/graphql-request';
import { initialLoadQuery } from './utils/gql-client';

import './App.scss';
import { IFinItem } from './utils/gql-client/props';
import {
  useIsAppLoading,
  usePageType,
  useSelectedItem,
} from './store/fin/hooks';
import { useAppDispatch } from './store';
import { switchToFinHistory } from './store/fin';
import { setLoginStatus } from './store/login';

const DEFAULT_FIN_ITEMS = 15;

const App = ({
  // pageIndex,
  notificationType,
  notificationMsg,
  // selectedItem,
  // isAppLoading,
  // dispatch,
}) => {
  // selectedItem: state.fin ? state.fin.selectedItem : null,
  // pageIndex: state.fin ? state.fin.pageIndex : 'MAIN',
  // isAppLoading: state.fin && state.fin.isAppLoading,
  // notificationType: state.notification
  //   ? state.notification.notificationType
  //   : '',
  // notificationMsg: state.notification ? state.notification.notificationMsg : '',
  const selectedItem = useSelectedItem();
  const pageIndex = usePageType();
  const isAppLoading = useIsAppLoading();
  const dispatch = useAppDispatch();

  let [monthTotal, setMonthTotal] = useState<number>(0);
  let [weekTotal, setWeekTotal] = useState<number>(0);
  let [dayTotal, setDayTotal] = useState<number>(0);
  let [finList, setFinList] = useState<IFinItem[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // If go to create / update fin item panel, do not fetch data.
    if (selectedItem && (selectedItem.amount === 0 || selectedItem.id)) {
      return;
    }

    setIsLoading(true);

    if (!selectedItem) {
      let now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const dayOfWeek = now.getDay();
      const top = DEFAULT_FIN_ITEMS;
      // Axios.get(`/api/wacai/getFinList?year=${now.getFullYear()}&month=${now.getMonth() + 1}&day=${now.getDate()}&dayOfWeek=${now.getDay()}&top=${DEFAULT_FIN_ITEMS}`)
      sendGraphqlRequest<{
        sumByDay: number;
        sumByWeek: number;
        sumByYearMonth: number;
        finTopList: IFinItem[];
      }>(initialLoadQuery(year, month, day, dayOfWeek, top)).then(
        response => {
          setIsLoading(false);

          let {
            sumByDay = 0,
            sumByWeek = 0,
            sumByYearMonth = 0,
            finTopList = [],
          } = response;
          setFinList(finTopList);
          setMonthTotal(sumByYearMonth || 0);
          setWeekTotal(sumByWeek || 0);
          setDayTotal(sumByDay || 0);
        },
        ({ response }) => {
          setIsLoading(false);

          if (response.status === 401) {
            dispatch(setLoginStatus(false));
          }
        }
      );
    }
  }, [selectedItem]);

  const handleTotalAmountClick = () => {
    dispatch(switchToFinHistory());
  };

  const handleLogout = () => {
    Axios.post(`/api/user/logout`).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  };

  return (
    <div className="App">
      {notificationMsg && (
        <div className="App-Page-Notification">
          <Notification type={notificationType} message={notificationMsg} />
        </div>
      )}
      {isAppLoading && (
        <div className="App-Page-Loading">
          <div className="LoadingContainer">
            <Loading />
          </div>
        </div>
      )}
      {pageIndex === 'SEARCH_FIN_ITEM' && (
        <div className="App-Page-Fin-Search">
          <SearchFinItem />
        </div>
      )}
      {pageIndex === 'CATEGORY_SELECTION' && (
        <div className="App-Page-Cat-Selection">
          <FinCatSelection />
        </div>
      )}
      {pageIndex === 'FIN_HISTORY' && (
        <div className="App-Page-Fin-History">
          <FinItemList />
        </div>
      )}
      {pageIndex === 'FIN_TEMPLATE_LIST' && (
        <div className="App-Page-Fin-Template-List">
          <FinTemplateList />
        </div>
      )}
      {pageIndex === 'MAIN' && (
        <div className="App-Page-Main">
          <div className="App-Logout" onClick={handleLogout} />
          <div className="App-Header">
            <div className="Header-MonthTotal">
              <div className="Caption">本月总计</div>
              <div className="Amount" onClick={handleTotalAmountClick}>
                <AutoUpdateNumber total={monthTotal} duration={100} />
              </div>
            </div>
            <div className="Header-WeekDayTotal">
              <div className="Caption">本周总计</div>
              <div className="Amount">
                <AutoUpdateNumber total={weekTotal} duration={100} />
              </div>
              <div className="Caption">今日总计</div>
              <div className="Amount">
                <AutoUpdateNumber total={dayTotal} duration={100} />
              </div>
            </div>
          </div>
          {selectedItem ? (
            <div className="App-FinDetails">
              <FinItemDetails item={selectedItem} />
            </div>
          ) : (
            <div className="App-Main">
              <FinMain isLoading={isLoading} items={finList} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedItem: state.fin ? state.fin.selectedItem : null,
  pageIndex: state.fin ? state.fin.pageIndex : 'MAIN',
  isAppLoading: state.fin && state.fin.isAppLoading,
  notificationType: state.notification
    ? state.notification.notificationType
    : '',
  notificationMsg: state.notification ? state.notification.notificationMsg : '',
});

// export default connect(mapStateToProps)(App);
export default App;
