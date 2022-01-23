import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const Container = styled.div`
  background-color: ${Colors.GreyLightIIII};
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  &.Border {
    border-bottom: 1px solid ${Colors.GreyLightIII};
  }
`;

export const MonthTitle = styled.div`
  width: 30px;
  padding: 5px 5px;
  text-align: center;
`;
export const Month = styled.div`
  color: ${Colors.GreyRegular};
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 0;
  letter-spacing: 1px;
`;
export const Year = styled.div`
  color: ${Colors.GreyLightI};
  font-size: 12px;
  line-height: 12px;
  padding: 2px 0;
`;
export const Content = styled.div`
  flex-grow: 10;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ExpenseTitle = styled.div`
  padding: 2px 0;
  color: ${Colors.ExpenseFont};
  font-size: 14px;
  line-height: 14px;
`;
export const ExpenseAmount = styled.div`
  padding: 3px 0;
`;
export const AmountBar = styled.div<{
  width: string;
}>`
  height: 2px;
  background-color: ${Colors.ExpenseFont};
  vertical-align: middle;
  width: ${props => props.width};
`;
export const Dropdown = styled.div`
  width: 30px;
  background-image: url('./arrow.svg');
  background-position: center;
  background-size: 10px;
  background-repeat: no-repeat;
  transition: 0.2s linear;
  &.Expanded {
    transform: rotate(90deg);
  }
`;
