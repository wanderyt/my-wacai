import React, { FC } from 'react';
import AdvanceSearchItem from './advance-search-item';
import { ADVANCE_SEARCH_ITEMS } from './advance-search-config';
import Axios from 'axios';
import { setAppLoaded, setAppLoaded, setAppLoading } from '../../store/fin';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { useAppDispatch } from '../../store';

const AdvancedSearchToolbar = styled.div`
  padding: 0 10px;
`;
const SubmitButton = styled.div`
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin: 5px 0;
  border: 1px solid ${Colors.GreyLightIIII};
  border-radius: 5px;
  float: right;
`;
const ClearFloat = styled.div`
  clear: right;
`;
const AdvanceSearchItemContainer = styled.div`
  padding: 0 10px;
`;

const AdvancedSearch: FC<{
  searchParams: any;
  submitHandler: () => void;
}> = ({ searchParams, submitHandler = void 0 }) => {
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    let params = [];
    Object.keys(searchParams).map(key => {
      if (Array.isArray(searchParams[key])) {
        if (key === 'amountRanges') {
          // Amount Range Handler
          params.push(`${key}=${JSON.stringify(searchParams[key])}`);
        } else if (key === 'city' || key === 'tags') {
          params.push(`${key}=${searchParams[key].join(',')}`);
        }
      } else if (typeof searchParams[key] === 'object') {
        if (key === 'dateRange') {
          params.push(`${key}=${JSON.stringify(searchParams[key])}`);
        } else if (key === 'category') {
          for (const item in searchParams[key]) {
            params.push(`${item}=${searchParams[key][item]}`);
          }
        }
      } else {
        params.push(`${key}=${searchParams[key]}`);
      }
    });

    // App Loading Status
    dispatch(setAppLoading());

    Axios.get(`/api/wacai/deepSearchFinItems?${params.join('&')}`).then(
      ({ data }) => {
        submitHandler();
        let finItems = data.data || [];
        dispatch({
          type: 'SEARCH_FIN_RESULTS_LOADED',
          finItems,
          searchLoading: false,
        });

        // App Loaded Status
        dispatch(setAppLoaded());
      },
      () => {
        // App Loaded Status
        dispatch(setAppLoaded());
      }
    );
  };
  return (
    <div className="AdvancedSearch">
      <AdvancedSearchToolbar>
        <SubmitButton onClick={handleSubmit}>确认</SubmitButton>
        <ClearFloat />
      </AdvancedSearchToolbar>
      {ADVANCE_SEARCH_ITEMS &&
        ADVANCE_SEARCH_ITEMS.map(
          ({ type, name, comp, defaultValue, formatter }, index) => (
            <AdvanceSearchItemContainer key={index}>
              <AdvanceSearchItem
                type={type}
                name={name}
                Comp={comp}
                defaultValue={defaultValue}
                formatter={formatter}
              />
            </AdvanceSearchItemContainer>
          )
        )}
    </div>
  );
};

// const mapStateToProps = state => {
//   const searchParams = (state.search || {}).searchParams || {};
//   return {
//     searchParams,
//   };
// };

export default AdvancedSearch;
