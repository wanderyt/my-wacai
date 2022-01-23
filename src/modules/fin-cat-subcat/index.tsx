import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import HeaderToolbar from '../header-toolbar';
import { useSelectedCatGroup } from '../../store/fin/hooks';
import { useAppDispatch } from '../../store';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { completeCategorySelection } from '../../store/fin';
import { setLoginStatus } from '../../store/login';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${Colors.GreyLightIIII};
`;
const Container = styled.div`
  display: flex;
`;
const Cats = styled.div`
  flex-grow: 1;
`;
const CatItem = styled.div`
  height: 60px;
  position: relative;
`;
const CatItemBorder = styled.div`
  line-height: 60px;
  font-size: 16px;
  text-align: center;
  &.Selected {
    color: red;
    &::after {
      content: '';
      border-left: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: 7px solid #fff;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
`;
const SubCats = styled.div`
  flex-grow: 4;
  background-color: #fff;
`;
const SubCatItem = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 10px;
`;
const SubCatBorder = styled.div<{
  hasBorder: boolean;
}>`
  border-bottom: ${props =>
    props.hasBorder ? `1px solid ${Colors.GreyLightIII}` : 'none'};
`;
const SubCatText = styled.div``;

const FinCatSubCat = () => {
  const selectedCatGroup = useSelectedCatGroup();
  const dispatch = useAppDispatch();
  const [selectedCat, setSelectedCat] = useState<string>(
    'category' in selectedCatGroup ? selectedCatGroup.category : ''
  );
  const [categoryGroups, setCategoryGroups] = useState({});

  useEffect(() => {
    Axios.get('/api/wacai/getCategoryGroup').then(
      ({ data }) => {
        let categoryGroupData = data.data || {};
        setCategoryGroups(categoryGroupData);
      },
      ({ response }) => {
        if (response.status === 401) {
          dispatch(setLoginStatus(false));
        }
      }
    );
  }, []);

  const handleCatClick = cat => {
    setSelectedCat(cat);
  };

  const handleSubCatSelected = subcat => {
    dispatch(
      completeCategorySelection({
        updatedCatGroup: {
          category: selectedCat,
          subcategory: subcat,
        },
      })
    );
  };

  return (
    <Wrapper>
      <HeaderToolbar barTitle="支出类别" hasSearch={false} />
      <Container>
        <Cats>
          {Object.keys(categoryGroups).map((cat, index) => (
            <CatItem key={index} onClick={() => handleCatClick(cat)}>
              <CatItemBorder
                className={`${selectedCat === cat ? 'Selected' : ''}`}
              >
                {cat}
              </CatItemBorder>
            </CatItem>
          ))}
        </Cats>
        <SubCats>
          {selectedCat &&
            categoryGroups[selectedCat] &&
            categoryGroups[selectedCat].map(
              ({ subcategory, isCommon }, index) => (
                <SubCatItem
                  onClick={() => handleSubCatSelected(subcategory)}
                  key={index}
                >
                  <SubCatBorder
                    hasBorder={index !== categoryGroups[selectedCat].length - 1}
                  >
                    <SubCatText>{subcategory}</SubCatText>
                  </SubCatBorder>
                </SubCatItem>
              )
            )}
        </SubCats>
      </Container>
    </Wrapper>
  );
};

export default FinCatSubCat;
