import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import MonthExpense from './month-expense';
import HeaderToolbar from '../header-toolbar';
import BottomButtonGroup from '../bottom-button-group';
import { useAppDispatch } from '../../store';
import { setLoginStatus } from '../../store/login';

// import historyExpense from './mockData.json';

const FinItemList = () => {
  const dispatch = useAppDispatch();
  const [historyExpense, setHistoryExpense] = useState<any>({});
  const [btnExpanded, setBtnExpanded] = useState(false);
  const headerEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let now = new Date();
    Axios.get(
      `/api/wacai/getHistoryExpense?year=${now.getFullYear()}&month=${
        now.getMonth() + 1
      }`
    ).then(
      ({ data }) => {
        let responseData = data.data || {};
        setBtnExpanded(false);
        setHistoryExpense(responseData);
      },
      ({ response }) => {
        if (response.status === 401) {
          dispatch(setLoginStatus(false));
        }
      }
    );
  }, []);

  // useRef need to be used together with useEffect
  // as ref element could be binded only after rendering done
  useEffect(() => {}, [headerEl]);

  return (
    <div className="FinItemList" ref={headerEl}>
      <HeaderToolbar />
      {historyExpense.items &&
        historyExpense.items.map((monthItem, index) => (
          <div key={index}>
            <MonthExpense
              month={monthItem.month}
              year={monthItem.year}
              amount={monthItem.amount}
              barWidthRatio={
                monthItem.amount / historyExpense.highestMonthAmount
              }
            />
          </div>
        ))}
      {historyExpense.items && (
        <BottomButtonGroup
          isExpanded={btnExpanded}
          scrollIntoViewRef={headerEl}
        />
      )}
    </div>
  );
};

export default FinItemList;
