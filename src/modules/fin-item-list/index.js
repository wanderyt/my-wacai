import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import MonthExpense from './month-expense';
import HeaderToolbar from '../header-toolbar';
import BottomButtonGroup from '../buttom-button-group';

// import historyExpense from './mockData.json';

const FinItemList = ({dispatch}) => {
  const [historyExpense, setHistoryExpense] = useState({});
  const [btnExpanded, setBtnExpanded] = useState(false);
  const headerEl = useRef(null);

  useEffect(() => {
    let now = new Date();
    Axios.get(`/api/wacai/getHistoryExpense?year=${now.getFullYear()}&month=${now.getMonth() + 1}`)
      .then(({data}) => {
        let responseData = data.data || {};
        setBtnExpanded(false);
        setHistoryExpense(responseData);
      }, ({response}) => {
        if (response.status === 401) {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        }
      });
  }, []);

  // useRef need to be used together with useEffect
  // as ref element could be binded only after rendering done
  useEffect(() => {
  }, [headerEl]);

  return (
    <div className='FinItemList' ref={headerEl}>
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
      {
        historyExpense.items && <BottomButtonGroup isExpanded={btnExpanded} scrollIntoViewRef={headerEl} />
      }
    </div>
  );
};

export default connect()(FinItemList);
