import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import FinMain from './modules/fin-main';
import FinItemDetails from './modules/fin-item-details';

import './App.scss';

const App = ({selectedItem}) => {
  let [monthTotal, setMonthTotal] = useState(0);
  let [finList, setFinList] = useState([]);

  // Set monthly total amount
  useEffect(() => {
    Axios.get('/api/wacai/getFinList')
      .then(({data}) => {
        let total = data.total || 0;
        let finList = data.data || [];
        setFinList(finList);
        setMonthTotal(total);
      });

    // setMonthTotal(100);
  }, []);

  return (
    <div className="App">
      <div className='App-Header'>
        <div className='Header-MonthTotal'>
          <div className='Caption'>本月总计</div>
          <div className='Amount'>{parseFloat(monthTotal).toFixed(2)}</div>
        </div>
      </div>
      {
        selectedItem ?
        <div className='App-FinDetails'>
          <FinItemDetails item={selectedItem} />
        </div>
        :
        <div className='App-Main'>
          <FinMain items={finList} />
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedItem: state.fin ? state.fin.selectedItem : null
});

export default connect(mapStateToProps)(App);
