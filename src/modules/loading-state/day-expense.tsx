import React from 'react';
import FinListItem from './fin-list-item';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { ImageAnimation } from '.';

const DayExpenseLoading = styled.div`
  border-bottom: 1px solid ${Colors.GreyLightII};
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
`;
const DayInfo = styled.div`
  width: 40px;
  box-sizing: border-box;
  padding: 1px 2px;
  .LoadingState {
    height: 20px;
  }
`;
const DayExpenseInfo = styled.div`
  padding-right: 10px;
  flex-grow: 1;
  padding: 1px 2px;
`;
const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;
const DayHeaderItem = styled.div`
  box-sizing: border-box;
  width: 100px;
  .LoadingState {
    height: 15px;
  }
`;
const DayExpenseList = styled.div`
  .FinListItem--LoadingState {
    clear: both;
  }
  .FinListItem--LoadingState:first-of-type {
    height: 75px;
    border-bottom: 1px solid $GREY-REGULAR;
  }
`;

const DayExpense = () => {
  return (
    <>
      {[0, 1].map(item => {
        return (
          <DayExpenseLoading key={item}>
            <DayInfo>
              <ImageAnimation className="LoadingState" />
            </DayInfo>
            <DayExpenseInfo>
              <DayHeader>
                <DayHeaderItem>
                  <ImageAnimation className="LoadingState" />
                </DayHeaderItem>
                <DayHeaderItem>
                  <ImageAnimation className="LoadingState" />
                </DayHeaderItem>
              </DayHeader>
              <DayExpenseList>
                <FinListItem />
                <FinListItem />
              </DayExpenseList>
            </DayExpenseInfo>
          </DayExpenseLoading>
        );
      })}
    </>
  );
};

export default DayExpense;
