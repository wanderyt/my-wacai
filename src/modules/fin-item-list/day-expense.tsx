import React, { FC } from 'react';
import FinItem from '../fin-item';
import { IFinItem } from '../../utils/gql-client/props';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

type Weekday = '周日' | '周一' | '周二' | '周三' | '周四' | '周五' | '周六';

const weekdayMapping = (date: string): Weekday => {
  const dateObj = new Date(date);
  const day = dateObj.getDay();
  const mapping: Weekday[] = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
  ];
  return mapping[day];
};

const Wrapper = styled.div`
  border-bottom: 1px solid ${Colors.GreyLightII};
`;
const Container = styled.div`
  padding-top: 5px;
  display: flex;
  justify-content: flex-start;
`;
const DayInfo = styled.div`
  width: 40px;
  text-align: center;
  font-size: 20px;
  letter-spacing: 1px;
  color: ${Colors.GreyRegular};
  font-weight: bold;
`;
const DayExpenseInfo = styled.div`
  padding-right: 10px;
  flex-grow: 1;
`;
const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Colors.GreyRegular};
  font-size: 15px;
`;
const DayHeaderWeekday = styled.div`
  font-weight: bold;
`;
const DayExpenseAmount = styled.div``;

const DayExpense: FC<{
  date: string;
  amount: number;
  items: IFinItem[];
}> = ({ date = '2019-04-22', amount = 1203, items = [] }) => {
  const day = date.substring(date.length - 2);
  return (
    <Wrapper>
      <Container>
        <DayInfo>{day}</DayInfo>
        <DayExpenseInfo>
          <DayHeader>
            <DayHeaderWeekday>{weekdayMapping(date)}</DayHeaderWeekday>
            <DayExpenseAmount>
              支：{parseFloat(amount + '').toFixed(2)}
            </DayExpenseAmount>
          </DayHeader>
          <div className="DayExpenseList">
            {items.map((item, index) => (
              <div key={item.id}>
                <FinItem
                  isLoading={false}
                  dayMode={true}
                  isLast={index === items.length - 1}
                  item={item}
                />
              </div>
            ))}
          </div>
        </DayExpenseInfo>
      </Container>
    </Wrapper>
  );
};

export default DayExpense;
