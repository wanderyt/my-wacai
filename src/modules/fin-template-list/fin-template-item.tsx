import React from 'react';
import { useAppDispatch } from '../../store';
import { setSelectedItem } from '../../store/fin';
import { IFinItem } from '../../utils/gql-client/props';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const ItemContainer = styled.div<{
  hasBorder: boolean;
}>`
  height: 50px;
  display: flex;
  border-bottom: ${props =>
    props.hasBorder ? `1px solid ${Colors.GreyLightIIII}` : 'none'};
`;
const Categories = styled.div`
  flex-grow: 1;
  text-align: left;
`;
const Comment = styled.div`
  flex-grow: 1;
  text-align: right;
  font-size: 16px;
  line-height: 50px;
  font-weight: bold;
`;
const Category = styled.div`
  font-size: 10px;
  line-height: 15px;
`;
const SubCategory = styled.div`
  font-size: 16px;
  line-height: 35px;
  font-weight: bold;
`;

const FinTemplateItem = ({
  item,
  isLast = false,
}: {
  item: IFinItem;
  isLast: boolean;
}) => {
  const { comment, category, subcategory, place } = item;
  const dispatch = useAppDispatch();

  const handleItemClick = () => {
    dispatch(
      setSelectedItem({
        item: {
          comment,
          category,
          subcategory,
          place,
          amount: 0,
        },
      })
    );
  };

  return (
    <ItemContainer hasBorder={!isLast} onClick={handleItemClick}>
      <Categories>
        <Category>{category}</Category>
        <SubCategory>{subcategory}</SubCategory>
      </Categories>
      <Comment>{comment}</Comment>
    </ItemContainer>
  );
};

export default FinTemplateItem;
