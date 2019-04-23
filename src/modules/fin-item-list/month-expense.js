import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DayExpense from './day-expense';

import './month-expense.scss';

// Base width for the highest monthly expense
// In Pixel
// const BAR_WIDTH_BASE_PIXEL = 200;
// In percentage
const BAR_WIDTH_BASE_PERC = 1;

const MonthExpense = ({month = '04', year = '2019', amount = 11086.00, barWidthRatio = 1, dayItems = []}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded(!expanded);
  }

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  return (
    <div className='MonthExpense'>
      <div className={`MonthExpense-Container ${expanded ? '' : 'MonthExpenseBorder'}`}>
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
        <div
          className={`MonthExpense-Dropdown ${expanded ? 'MonthExpense-Expanded' : ''}`}
          onClick={handleExpansion} />
      </div>
      {
        expanded && dayItems.map((dayItem, index) => (
          <div
            key={index}>
            <DayExpense
              date={dayItem.date}
              isLast={index === dayItems.length}
              amount={dayItem.amount}
              items={dayItem.items} />
          </div>
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

export default MonthExpense;
