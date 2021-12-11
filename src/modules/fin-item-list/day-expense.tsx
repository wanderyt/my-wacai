import React from 'react';
import PropTypes from 'prop-types';
import FinItem from '../fin-item';

import './day-expense.scss';

const weekdayMapping = (date = '2019-04-22') => {
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  const mapping = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return mapping[day];
};

const DayExpense = ({ date = '2019-04-22', amount = 1203, items = [] }) => {
  const day = date.substring(date.length - 2);
  return (
    <div className="DayExpense">
      <div className="DayExpense-Container">
        <div className="DayInfo">{day}</div>
        <div className="DayExpenseInfo">
          <div className="DayHeader">
            <div className="DayHeader-Weekday">{weekdayMapping(date)}</div>
            <div className="DayExpenseAmount">
              支：{parseFloat(amount + '').toFixed(2)}
            </div>
          </div>
          <div className="DayExpenseList">
            {items.map((item, index) => (
              <div key={item.id}>
                <FinItem
                  dayMode={true}
                  isLast={index === items.length - 1}
                  item={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DayExpense.propTypes = {
  date: PropTypes.string,
  amount: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default DayExpense;
