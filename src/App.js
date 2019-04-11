import React, {useEffect, useState} from 'react';

import './App.scss';

const App = (props) => {
  let [monthTotal, setMonthTotal] = useState(0);

  // Set monthly total amount
  useEffect(() => {
    setMonthTotal(100);
  });

  return (
    <div className="App">
      <div className='App-Header'>
        <div className='Header-MonthTotal'>
          <div className='Caption'>本月总计</div>
          <div className='Amount'>{monthTotal}</div>
        </div>
        <div className='App-Toolbar'>
          <div className='App-Toolbtn'>
            <span className='App-Btn App-CreateItem'>记一笔</span>
            <span className='App-Btn App-CreateFast'>速记</span>
          </div>
        </div>
      </div>
      <div className='App-Container'></div>
    </div>
  );
}

export default App;
