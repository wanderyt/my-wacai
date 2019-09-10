import React from 'react';
import FinListItem from './fin-list-item';

import './day-expense.scss';

const DayExpense = () => {
  return (
    <React.Fragment>
      <div className='DayExpense--Loading'>
        <div className='DayInfo'>
          <div className='LoadingState'></div>
        </div>
        <div className='DayExpenseInfo'>
          <div className='DayHeader'>
            <div className='DayHeader-Weekday'>
              <div className='LoadingState'></div>
            </div>
            <div className='DayExpenseAmount'>
              <div className='LoadingState'></div>
            </div>
          </div>
          <div className='DayExpenseList'>
            <FinListItem />
            <FinListItem />
          </div>
        </div>
      </div>
      <div className='DayExpense--Loading'>
        <div className='DayInfo'>
          <div className='LoadingState'></div>
        </div>
        <div className='DayExpenseInfo'>
          <div className='DayHeader'>
            <div className='DayHeader-Weekday'>
              <div className='LoadingState'></div>
            </div>
            <div className='DayExpenseAmount'>
              <div className='LoadingState'></div>
            </div>
          </div>
          <div className='DayExpenseList'>
            <FinListItem />
            <FinListItem />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DayExpense;
