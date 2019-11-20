import React, {useState} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import './index.scss';

const SearchBox = ({customStyles = {}, advancedSearchHanlder = void 0, dispatch}) => {
  const [searchString, setSearchString] = useState('');

  const handleSearchInputChange = (evt) => {
    setSearchString(evt.target.value);
  }

  const handleSearch = () => {
    if (!searchString) {
      return;
    }

    let now = new Date();
    Axios.get(`/api/wacai/searchFinItems?searchString=${searchString}&year=${now.getFullYear()}&month=${now.getMonth() + 1}`)
      .then(({data}) => {
        let finItems = data.data || [];
        dispatch({type: 'SEARCH_FIN_RESULTS_LOADED', finItems});
      });
  }

  const handleAdvancedSearch = () => {
    advancedSearchHanlder && advancedSearchHanlder();
  };

  return (
    <div
      className='SearchBox'
      style={customStyles}>
      <div className='SearchBox-Container'>
        <div className='AdvanceSearch'>
          <div
            className='AdvanceSearch-Text'
            onClick={handleAdvancedSearch}>
            高级搜索
          </div>
        </div>
        <div className='SimpleSearch'>
          <input
            placeholder='请输入关键词'
            onChange={handleSearchInputChange}
            value={searchString} />
        </div>
      </div>
      <div className='Btns'>
        <div
          className='SearchBtn'
          onClick={handleSearch}>
          确定
        </div>
      </div>
    </div>
  );
};

export default connect()(SearchBox);
