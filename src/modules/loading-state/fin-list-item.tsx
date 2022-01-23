import React from 'react';
import styled from 'styled-components';
import { NameAnimation } from '.';

const FinListItemLoading = styled.div``;
const FinListItemLeft = styled.div`
  float: left;
  width: 150px;
`;
const FinListItemCat = styled.div`
  width: 75%;
  height: 30px;
  padding: 6px 0;
  box-sizing: border-box;
`;
const FinListItemDate = styled.div`
  height: 20px;
  padding: 3px 0;
  box-sizing: border-box;
`;
const FinListItemComment = styled.div`
  height: 20px;
  padding: 3px 0;
  box-sizing: border-box;
`;
const FinListItemRight = styled.div`
  float: right;
  width: 80px;
`;
const FinListItemAmount = styled.div`
  height: 50px;
  padding: 15px 0;
  box-sizing: border-box;
`;

const FinListItem = () => {
  return (
    <FinListItemLoading className="FinListItem--LoadingState">
      <FinListItemLeft>
        <FinListItemCat>
          <NameAnimation className="LoadingState" />
        </FinListItemCat>
        <FinListItemDate>
          <NameAnimation className="LoadingState" />
        </FinListItemDate>
        <FinListItemComment>
          <NameAnimation className="LoadingState" />
        </FinListItemComment>
      </FinListItemLeft>
      <FinListItemRight>
        <FinListItemAmount>
          <NameAnimation className="LoadingState" />
        </FinListItemAmount>
      </FinListItemRight>
    </FinListItemLoading>
  );
};

export default FinListItem;
