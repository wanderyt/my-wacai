import React, { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { buildDraftFinItem, switchToTemplateList } from '../../store/fin';
import { IFinItem } from '../../utils/gql-client/props';
import FinItem from '../fin-item';

const Wrapper = styled.div``;
const AppToolbar = styled.div`
  position: absolute;
  top: 46vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const AppToolbtn = styled.div`
  display: inline-block;
  height: 60px;
  width: 90%;
`;
const AppButton = styled.div`
  display: inline-block;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 60px;
  color: #fff;
  font-family: 'HelveticaNeue', 'Monaco';
`;

const AppCreateItem = styled(AppButton)`
  background: linear-gradient(to left, #bd6035, #c28062);
  width: 60%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  &:active,
  &:focus {
    background: linear-gradient(to left, #bd5b2e, #bd5b2e);
  }
`;

const AppCreateFast = styled(AppButton)`
  background: linear-gradient(to left, #bb4c18, #bd6035);
  width: 40%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: -1px;
  &:active,
  &:focus {
    background: linear-gradient(to left, #bd4913, #bb4c18);
  }
`;

const AppContainer = styled.div`
  padding-top: 10px;
`;

const AppFinList = styled.div`
  padding: 0 10px;
`;

const FinMain: FC<{
  isLoading: boolean;
  items: IFinItem[];
}> = ({ isLoading, items }) => {
  const dispatch = useAppDispatch();
  const handleCreateItem = () => {
    dispatch(buildDraftFinItem());
  };
  const handleCreateByTemplate = () => {
    dispatch(switchToTemplateList());
  };
  return (
    <Wrapper>
      <AppToolbar>
        <AppToolbtn>
          <AppCreateItem className="forbid-select" onClick={handleCreateItem}>
            记一笔
          </AppCreateItem>
          <AppCreateFast
            className="forbid-select"
            onClick={handleCreateByTemplate}
          >
            速记
          </AppCreateFast>
        </AppToolbtn>
      </AppToolbar>
      <AppContainer>
        <AppFinList>
          {items.map((item, index) => {
            return (
              <div key={index}>
                {<FinItem isLoading={isLoading} item={item} />}
              </div>
            );
          })}
        </AppFinList>
      </AppContainer>
    </Wrapper>
  );
};

export default FinMain;
