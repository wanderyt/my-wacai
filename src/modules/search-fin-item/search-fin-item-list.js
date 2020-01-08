import React from 'react';
import FinItem from '../fin-item';
import SearchFinItemByMonth from './search-fin-item-by-month';
import {padZero} from '../../utils/helper';

import './search-fin-item-list.scss'

const SearchFinItemList = ({finItems = []}) => {
  let total = 0;
  if (finItems.length > 0) {
    finItems.forEach((item) => {
      total = total + item.amount;
    });
  }

  const translateFinItems = (finItems = []) => {
    let historyExpense = {}, highestMonthAmount = 0;
    finItems.map((item, index) => {
      // Issue: https://stackoverflow.com/questions/4310953/invalid-date-in-safari
      // Mobile Safari does not support YYYY-MM-DD as a standard date
      let itemDate = new Date(item.date.replace(/-/g, '/'));
      let month = padZero(itemDate.getMonth() + 1);
      let year = itemDate.getFullYear();
      if (historyExpense[`${year}-${month}`]) {
        historyExpense[`${year}-${month}`].amount += item.amount;
        historyExpense[`${year}-${month}`].dayItems.push(item);
      } else {
        historyExpense[`${year}-${month}`] = {
          amount: item.amount,
          dayItems: [item]
        };
      }
    });
    Object.values(historyExpense).forEach((expense) => {
      if (expense.amount > highestMonthAmount) {
        highestMonthAmount = expense.amount;
      }
    });

    return {
      highestMonthAmount,
      items: historyExpense
    };
  }

  const historyExpense = translateFinItems(finItems);

  return (
    <div className='SearchFinItemList'>
      <div className='SearchResultContainer'>
        <div className='SearchResult-Summary'>
          <div className='SummaryItem SummaryAmount'>
            ￥ {parseFloat(total).toFixed(2)}
          </div>
          <div className='SummaryItem SummaryCaption'>
            支出
          </div>
        </div>
      </div>
      <div className='ListContainer'>
        {
          // finItems.map((item, index) => (
          //   <div
          //     className='ListItemContainer'
          //     key={index}>
          //     <FinItem
          //       item={item} />
          //   </div>
          // ))
          finItems.length > 0 && Object.keys(historyExpense.items).sort().reverse().map((month, index) =>(
            <div key={index}>
              <SearchFinItemByMonth
                month={month.split('-')[1]}
                year={month.split('-')[0]}
                amount={historyExpense.items[month].amount}
                barWidthRatio={historyExpense.items[month].amount / historyExpense.highestMonthAmount}
                dayItems={historyExpense.items[month].dayItems} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchFinItemList;
