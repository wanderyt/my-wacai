import React, {useState} from 'react';

import './month-header.scss';

// Base width for the highest monthly expense
// In Pixel
// const BAR_WIDTH_BASE_PIXEL = 200;
// In percentage
const BAR_WIDTH_BASE_PERC = 1;

const MonthHeader = ({month = '04', year = '2019', amount = 11086.00, barWidthRatio = 1}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded(!expanded);
  }

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  return (
    <div className='MonthHeader'>
      <div className='MonthHeader-Container'>
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
          className={`MonthHeader-Dropdown ${expanded ? 'MonthHeader-Expanded' : ''}`}
          onClick={handleExpansion} />
      </div>
    </div>
  );
};

export default MonthHeader;
