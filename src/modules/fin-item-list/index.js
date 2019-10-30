import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import MonthExpense from './month-expense';
import HeaderToolbar from '../header-toolbar';

// import historyExpense from './mockData.json';

const FinItemList = ({dispatch}) => {
  const [historyExpense, setHistoryExpense] = useState({});

  useEffect(() => {
    let now = new Date();
    Axios.get(`/api/wacai/getHistoryExpense?year=${now.getFullYear()}&month=${now.getMonth() + 1}`)
      .then(({data}) => {
        let responseData = data.data || {};
        setHistoryExpense(responseData);
      }, ({response}) => {
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }, []);

  return (
    <div className='FinItemList'>
      <HeaderToolbar />
      {
        historyExpense.items && historyExpense.items.map((monthItem, index) => (
          <div key={index}>
            <MonthExpense
              month={monthItem.month}
              year={monthItem.year}
              amount={monthItem.amount}
              barWidthRatio={monthItem.amount / historyExpense.highestMonthAmount} />
          </div>
        ))
      }
    </div>
  );
};

export default connect()(FinItemList);
