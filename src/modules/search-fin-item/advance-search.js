import React from 'react';
import {connect} from 'react-redux';
import AdvanceSearchItem from './advance-search-item';
import {ADVANCE_SEARCH_ITEMS} from './advance-search-config';
import Axios from 'axios';

import './advance-search.scss';

const AdvancedSearch = ({searchParams, dispatch, submitHandler = void 0}) => {
  const handleSubmit = () => {
    let params = [];
    Object.keys(searchParams).map((key) => {
      if (Array.isArray(searchParams[key])) {
        params.push(`${key}=${JSON.stringify(searchParams[key])}`);
      } else if (typeof searchParams[key] === 'object') {
        for (const item in searchParams[key]) {
          params.push(`${item}=${searchParams[key][item]}`);
        }
      } else {
        params.push(`${key}=${searchParams[key]}`);
      }
    });
    Axios.get(`/api/wacai/deepSearchFinItems?${params.join('&')}`)
      .then(({data}) => {
        submitHandler();
        let finItems = data.data || [];
        dispatch({type: 'SEARCH_FIN_RESULTS_LOADED', finItems});
      });
  }
  return (
    <div className='AdvancedSearch'>
      <div className='AdvancedSearch-Toolbar'>
        <div
          className='SubmitButton'
          onClick={handleSubmit}>
          确认
        </div>
        <div className='clearFloat' />
      </div>
      {
        ADVANCE_SEARCH_ITEMS && ADVANCE_SEARCH_ITEMS.map(({type, name, comp, defaultValue, formatter}, index) => (
          <div
            className='AdvanceSearchItem-Container'
            key={index}>
            <AdvanceSearchItem
              type={type}
              name={name}
              Comp={comp}
              defaultValue={defaultValue}
              formatter={formatter} />
          </div>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const searchParams = (state.search || {}).searchParams || {};
  return {
    searchParams
  }
}

export default connect(mapStateToProps)(AdvancedSearch);
