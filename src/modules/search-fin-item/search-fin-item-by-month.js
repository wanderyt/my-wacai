import React, {useState} from 'react';
import DayExpense from '../fin-item-list/day-expense';
import PropTypes from 'prop-types';
import {padZero} from '../../utils/helper';

import '../fin-item-list/month-expense.scss';

const BAR_WIDTH_BASE_PERC = 1;

const SearchFinItemByMonth = ({month = '04', year = '2019', amount = 11086.00, barWidthRatio = 1, dayItems = []}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded(!expanded);
  }

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  const translateDayItems = (items) => {
    let dayItems = {};
    items.map((item) => {
      let itemDate = new Date(item.date);
      let day = padZero(itemDate.getDate());
      let month = padZero(itemDate.getMonth() + 1);
      let year = itemDate.getFullYear();
      if (dayItems[`${year}-${month}-${day}`]) {
        dayItems[`${year}-${month}-${day}`].amount += item.amount;
        dayItems[`${year}-${month}-${day}`].items.push(item);
      } else {
        dayItems[`${year}-${month}-${day}`] = {
          amount: item.amount,
          items: [item]
        }
      }
    });

    return dayItems;
  }

  const transformedDayItems = translateDayItems(dayItems);

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
              style={{width: barWidth}} />
          </div>
        </div>
        <div className={`MonthExpense-Dropdown ${expanded ? 'MonthExpense-Expanded' : ''}`} />
      </div>
      {
        expanded && Object.keys(transformedDayItems).sort().reverse().map((day, index) => (
          <div
            key={index}>
            <DayExpense
              date={day}
              amount={transformedDayItems[day].amount}
              items={transformedDayItems[day].items} />
          </div>
        ))
      }
    </div>
  );
};

SearchFinItemByMonth.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  amount: PropTypes.number,
  barWidthRatio: PropTypes.number,
  dayItems: PropTypes.array,
};

export default SearchFinItemByMonth;
