import React, { FC, useState } from 'react';
import Axios from 'axios';
import DayExpense from './day-expense';
import { DayExpenseLoadingState } from '../loading-state';
import { useAppDispatch } from '../../store';
import { setLoginStatus } from '../../store/login';
import {
  Container,
  MonthTitle,
  ExpenseTitle,
  ExpenseAmount,
  Content,
  Dropdown,
  Month,
  Year,
  AmountBar,
} from './styles';

// Base width for the highest monthly expense
// In Pixel
// const BAR_WIDTH_BASE_PIXEL = 200;
// In percentage
const BAR_WIDTH_BASE_PERC = 1;
const API_LOADING_DELAY = 0;

const MonthExpense: FC<{
  month: string;
  year: string;
  amount: number;
  barWidthRatio: number;
  dayItems: any;
}> = ({
  month = '04',
  year = '2019',
  amount = 11086.0,
  barWidthRatio = 1,
  dayItems = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const [dailyDetails, setDailyDetails] = useState<any>(dayItems);
  const [isDailyDetailsLoading, setIsDailyDetailsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleExpansion = () => {
    if (!expanded) {
      setExpanded(!expanded);
      if (dailyDetails.length <= 0) {
        setIsDailyDetailsLoading(true);
        Axios.get(
          `/api/wacai/getFinItemsByMonth?month=${month}&year=${year}`
        ).then(
          ({ data }) => {
            let responseData = data.data || [];
            setDailyDetails(responseData);

            setTimeout(() => {
              setIsDailyDetailsLoading(false);
            }, API_LOADING_DELAY);
          },
          ({ response }) => {
            if (response.status === 401) {
              dispatch(setLoginStatus(false));
            }
          }
        );
      }
    } else {
      setExpanded(!expanded);
    }
  };

  // Dynamically compute bar width
  const barWidth = barWidthRatio * BAR_WIDTH_BASE_PERC * 100 + '%';

  return (
    <div className="MonthExpense">
      <Container className={expanded ? '' : 'Border'} onClick={handleExpansion}>
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
        <Dropdown className={expanded ? 'Expanded' : ''} />
      </Container>
      {expanded &&
        (!isDailyDetailsLoading ? (
          dailyDetails.map((dayItem, index) => (
            <div key={index}>
              <DayExpense
                date={dayItem.date}
                amount={dayItem.amount}
                items={dayItem.items}
              />
            </div>
          ))
        ) : (
          <DayExpenseLoadingState />
        ))}
    </div>
  );
};

export default MonthExpense;
