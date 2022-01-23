import React from 'react';
import { useAppDispatch } from '../../store';
import { setSelectedItem } from '../../store/fin';
import { IFinItem } from '../../utils/gql-client/props';
import { FinListItemLoadingState } from '../loading-state';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const FinItemPanel = styled.div`
  &:active {
    background-color: ${Colors.GreyLightIIII};
  }
`;
const FinItemContainer = styled.div<{
  hasBorder: boolean;
}>`
  height: 75px;
  padding: 5px 0;
  border-bottom: ${props =>
    props.hasBorder ? `1px solid ${Colors.GreyRegular}` : 'none'};
`;
const FinLeft = styled.div`
  float: left;
`;
const FinSubCat = styled.div`
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
`;
const FinInfo = styled.div`
  line-height: 20px;
  font-size: 14px;
  color: ${Colors.GreyRegular};
`;
const FinComment = styled(FinInfo)`
  margin-top: 5px;
`;
const FinIsScheduled = styled.span`
  border: 1px solid ${Colors.GreyRegular};
  border-radius: 2px;
  padding: 1px 2px;
  margin-right: 5px;
`;
const FinRight = styled.div`
  float: right;
  line-height: 50px;
  font-size: 20px;
  color: red;
  font-weight: bold;
`;

const FinItem = ({
  item,
  isLoading,
  dayMode = false,
  isLast = false,
}: {
  item: IFinItem;
  isLoading?: boolean;
  dayMode?: boolean;
  isLast?: boolean;
}) => {
  const { category, subcategory, date, amount, comment, isScheduled } = item;
  const dispatch = useAppDispatch();

  const selectItem = () => {
    dispatch(
      setSelectedItem({
        item,
      })
    );
  };

  return (
    <FinItemPanel className="forbid-select" onClick={selectItem}>
      <FinItemContainer hasBorder={!isLast}>
        {isLoading ? (
          <FinListItemLoadingState />
        ) : (
          <>
            <FinLeft>
              <FinSubCat>
                {category} - {subcategory}
              </FinSubCat>
              <FinInfo>
                <span>{dayMode ? date.substring(11) : date}</span>
              </FinInfo>
              <FinComment>
                {isScheduled && <FinIsScheduled>周期</FinIsScheduled>}
                <span>{comment}</span>
              </FinComment>
            </FinLeft>
            <FinRight>
              <span>{parseFloat(amount + '').toFixed(2)}</span>
            </FinRight>
          </>
        )}
      </FinItemContainer>
    </FinItemPanel>
  );
};

export default FinItem;
