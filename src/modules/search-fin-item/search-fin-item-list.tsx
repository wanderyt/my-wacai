import React, { FC } from 'react';
import SearchFinItemByMonth from './search-fin-item-by-month';
import { padZero } from '../../utils/helper';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { IFinItem } from '../../utils/gql-client/props';

const Container = styled.div`
  border-top: 1px solid ${Colors.GreyLightIIII};
`;
const SearchResultSummary = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${Colors.Red};
`;
const SummaryAmount = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 16px;
`;
const SummaryCaption = styled.div`
  margin-top: -10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
`;
const ListContainer = styled.div`
  background-color: ${Colors.GreyLightIIII};
  .ListItemContainer {
    padding: 0 10px;
  }
`;

const SearchFinItemList: FC<{
  finItems: IFinItem[];
}> = ({ finItems = [] }) => {
  let total = 0;
  if (finItems.length > 0) {
    finItems.forEach(item => {
      total = total + item.amount;
    });
  }

  const translateFinItems = (finItems = []) => {
    let historyExpense: {
        [monthYear: string]: {
          amount: number;
          dayItems: IFinItem[];
        };
      } = {},
      highestMonthAmount = 0;
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
          dayItems: [item],
        };
      }
    });
    Object.values(historyExpense).forEach(expense => {
      if (expense.amount > highestMonthAmount) {
        highestMonthAmount = expense.amount;
      }
    });

    return {
      highestMonthAmount,
      items: historyExpense,
    };
  };

  const historyExpense = translateFinItems(finItems);

  return (
    <div className="SearchFinItemList">
      <Container>
        <SearchResultSummary>
          <SummaryAmount>￥ {total.toFixed(2)}</SummaryAmount>
          <SummaryCaption>支出</SummaryCaption>
        </SearchResultSummary>
      </Container>
      <ListContainer>
        {finItems.length > 0 &&
          Object.keys(historyExpense.items)
            .sort()
            .reverse()
            .map((month, index) => (
              <div key={index}>
                <SearchFinItemByMonth
                  month={month.split('-')[1]}
                  year={month.split('-')[0]}
                  amount={historyExpense.items[month].amount}
                  barWidthRatio={
                    historyExpense.items[month].amount /
                    historyExpense.highestMonthAmount
                  }
                  dayItems={historyExpense.items[month].dayItems}
                />
              </div>
            ))}
      </ListContainer>
    </div>
  );
};

export default SearchFinItemList;
