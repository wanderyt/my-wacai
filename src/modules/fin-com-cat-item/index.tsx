import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const Container = styled.div`
  padding: 2px;
  text-align: center;
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 5px;
  min-width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
`;
const SubCatName = styled.span``;

const FinComCatItem = ({
  category,
  subcategory,
  onClickHandler = () => void 0,
}: {
  category: string;
  subcategory: string;
  onClickHandler: (category: string, subcategory: string) => void;
}) => {
  const handleClick = () => {
    onClickHandler(category, subcategory);
  };
  return (
    <Container onClick={handleClick}>
      <SubCatName>{subcategory}</SubCatName>
    </Container>
  );
};

export default FinComCatItem;
