import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Axios from 'axios';
import DayExpense from './day-expense';
import {DayExpenseLoadingState} from '../loading-state';

import './month-expense.scss';

// Base width for the highest monthly expense
// In Pixel
// const BAR_WIDTH_BASE_PIXEL = 200;
// In percentage
const BAR_WIDTH_BASE_PERC = 1;
const API_LOADING_DELAY = 0;

const MonthExpense = ({month = '04', year = '2019', amount = 11086.00, barWidthRatio = 1, dayItems = [], dispatch}) => {
  const [expanded, setExpanded] = useState(false);
  const [dailyDetails, setDailyDetails] = useState(dayItems);
  const [isDailyDetailsLoading, setIsDailyDetailsLoading] = useState(false);

  const handleExpansion = () => {
    if (!expanded) {
      setExpanded(!expanded);
      if (dailyDetails.length <= 0) {
        setIsDailyDetailsLoading(true);
        Axios.get(`/api/wacai/getFinItemsByMonth?month=${month}&year=${year}`)
          .then(({data}) => {
            let responseData = data.data || [];
            setDailyDetails(responseData);

            setTimeout(() => {
              setIsDailyDetailsLoading(false);
            }, API_LOADING_DELAY);
          }, ({response}) => {
            if (response.status === 401) {
              dispatch({
                type: 'TOKEN_INVALID'
              });
            }
          });
      }
    } else {
      setExpanded(!expanded);
    }
  }

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  return (
    <div className='MonthExpense'>
      <div
        className={`MonthExpense-Container ${expanded ? '' : 'MonthExpenseBorder'}`}
        onClick={handleExpansion}>
        <div className='MonthTitle'>
          <div className='Month'>{month}</div>
          <div className='Year'>{year}</div>
        </div>
        <div className='MonthExpense'>
          <div className='ExpenseTitle'>
            支出：{parseFloat(amount).toFixed(2)}
          </div>
          <div className='ExpenseAmount'>
            <div
              className='AmountBar'
              // style={{width: barWidth + 'px'}}
              style={{width: barWidth}} />
          </div>
        </div>
        <div className={`MonthExpense-Dropdown ${expanded ? 'MonthExpense-Expanded' : ''}`} />
      </div>
      {
        expanded && (!isDailyDetailsLoading ? dailyDetails.map((dayItem, index) => (
          <div
            key={index}>
            <DayExpense
              date={dayItem.date}
              amount={dayItem.amount}
              items={dayItem.items} />
          </div>
        )) : (
          <DayExpenseLoadingState />
        ))
      }
    </div>
  );
};

MonthExpense.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  amount: PropTypes.number,
  barWidthRatio: PropTypes.number,
  expansionCallback: PropTypes.func,
};

export default connect()(MonthExpense);
