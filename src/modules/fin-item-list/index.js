import React from 'react';
import MonthExpense from './month-expense';
import ListToolbar from './list-toolbar';

import mockData from './mockData.json';

const FinItemList = (props) => {
  return (
    <div className='FinItemList'>
      <ListToolbar />
      {
        mockData.items.map((monthItem) => (
          <MonthExpense
            month={monthItem.month}
            year={monthItem.year}
            amount={monthItem.amount}
            barWidthRatio={monthItem.amount / mockData.highestMonthAmount}
            dayItems={monthItem.items} />
        ))
      }
    </div>
  );
};

export default FinItemList;
