import React from 'react';
import FinItem from '../fin-item';

import './search-fin-item-list.scss'

const SearchFinItemList = ({finItems = []}) => {
  let total = 0;
  if (finItems.length > 0) {
    finItems.forEach((item) => {
      total = total + item.amount;
    });
  }

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
          finItems.map((item, index) => (
            <div
              className='ListItemContainer'
              key={index}>
              <FinItem
                item={item} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchFinItemList;
