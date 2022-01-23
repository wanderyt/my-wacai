import React, { FC, useState } from 'react';
import DayExpense from '../fin-item-list/day-expense';
import PropTypes from 'prop-types';
import { padZero } from '../../utils/helper';
import {
  Container,
  Month,
  MonthTitle,
  Year,
  Content,
  ExpenseAmount,
  ExpenseTitle,
  AmountBar,
  Dropdown,
} from '../fin-item-list/styles';
import { IFinItem } from '../../utils/gql-client/props';

const BAR_WIDTH_BASE_PERC = 1;

const SearchFinItemByMonth: FC<{
  month: string;
  year: string;
  amount: number;
  barWidthRatio: number;
  dayItems: IFinItem[];
}> = ({
  month = '04',
  year = '2019',
  amount = 11086.0,
  barWidthRatio = 1,
  dayItems = [],
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded(!expanded);
  };

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  const translateDayItems = items => {
    let dayItems: {
      [date: string]: {
        amount: number;
        items: IFinItem[];
      };
    } = {};
    items.map(item => {
      // Issue: https://stackoverflow.com/questions/4310953/invalid-date-in-safari
      // Mobile Safari does not support YYYY-MM-DD as a standard date
      let itemDate = new Date(item.date.replace(/-/g, '/'));
      let day = padZero(itemDate.getDate());
      let month = padZero(itemDate.getMonth() + 1);
      let year = itemDate.getFullYear();
      if (dayItems[`${year}-${month}-${day}`]) {
        dayItems[`${year}-${month}-${day}`].amount += item.amount;
        dayItems[`${year}-${month}-${day}`].items.push(item);
      } else {
        dayItems[`${year}-${month}-${day}`] = {
          amount: item.amount,
          items: [item],
        };
      }
    });

    return dayItems;
  };

  const transformedDayItems = translateDayItems(dayItems);

  return (
    <div className="MonthExpense">
      <Container
        className={expanded ? '' : 'MonthExpenseBorder'}
        onClick={handleExpansion}
      >
        <MonthTitle>
          <Month>{month}</Month>
          <Year>{year}</Year>
        </MonthTitle>
        <Content>
          <ExpenseTitle>支出：{amount.toFixed(2)}</ExpenseTitle>
          <ExpenseAmount>
            <AmountBar width={barWidth} />
          </ExpenseAmount>
        </Content>
        <Dropdown className={expanded ? 'MonthExpense-Expanded' : ''} />
      </Container>
      {expanded &&
        Object.keys(transformedDayItems)
          .sort()
          .reverse()
          .map((day, index) => (
            <div key={index}>
              <DayExpense
                date={day}
                amount={transformedDayItems[day].amount}
                items={transformedDayItems[day].items}
              />
            </div>
          ))}
    </div>
  );
};

SearchFinItemByMonth.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  amount: PropTypes.number,
  barWidthRatio: PropTypes.number,
  dayItems: PropTypes.array,
};

export default SearchFinItemByMonth;
