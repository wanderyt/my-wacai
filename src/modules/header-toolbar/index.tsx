import React, { FC } from 'react';
import { useAppDispatch } from '../../store';
import { switchToMain, switchToSearchFinMode } from '../../store/fin';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 40px;
`;
const CloseBtn = styled.div`
  width: 30px;
  background-image: url('./close.png');
  background-position: center;
  background-size: 30px;
  background-repeat: no-repeat;
`;
const BarInfo = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
`;
const BarContent = styled.div`
  flex-grow: 1;
`;
const BarHeader = styled.div`
  flex-grow: 1;
`;
const ToolBtns = styled.div`
  width: 30px;
  display: flex;
  flex-direction: row-reverse;
`;
const SearchBtn = styled.div`
  flex-grow: 1;
  background-image: url('./search.svg');
  background-position: right center;
  background-size: 30px;
  background-repeat: no-repeat;
`;

const HeaderToolbar: FC<{
  closeHandler?: () => void;
  hasSearch?: boolean;
  barTitle?: string;
  searchHandler?: () => void;
}> = ({
  closeHandler,
  hasSearch = true,
  barTitle = '',
  searchHandler,
  children,
}) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    if (closeHandler) {
      closeHandler();
    } else {
      dispatch(switchToMain());
    }
  };

  const handleSearch = () => {
    if (searchHandler) {
      searchHandler();
    } else {
      dispatch(switchToSearchFinMode());
    }
  };

  return (
    <div>
      <Container>
        <CloseBtn onClick={handleClose} />
        {barTitle && <BarInfo>{barTitle}</BarInfo>}
        {!barTitle && children && typeof children === 'function' && (
          <BarContent>{children()}</BarContent>
        )}
        {!barTitle && !children && <BarHeader />}
        {hasSearch && (
          <ToolBtns>
            <SearchBtn onClick={handleSearch} />
          </ToolBtns>
        )}
      </Container>
    </div>
  );
};

export default HeaderToolbar;
