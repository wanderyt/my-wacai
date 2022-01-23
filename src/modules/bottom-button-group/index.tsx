import React, { FC, MutableRefObject, useState } from 'react';
import { useAppDispatch } from '../../store';
import { switchToMain } from '../../store/fin';
import styled from 'styled-components';
import {
  ButtonSize,
  HalfButtonSize,
  SecondaryButtonSize,
} from '../../styles/size';
import { Colors } from '../../styles/colors';

const Wrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;
const ControlButton = styled.div`
  width: ${ButtonSize};
  height: ${ButtonSize};
  background-image: url('./details-white.svg');
  background-color: ${Colors.ButtonMain};
  background-size: ${ButtonSize};
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${HalfButtonSize};
  cursor: pointer;
  transition: background-image 500ms linear;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  &.buttonExpanded {
    background-image: url('./cross-white.png');
  }
`;
const ButtonGroup = styled.div`
  position: fixed;
  animation: buttonExpand linear 0.2s forwards;
  @keyframes buttonExpand {
    0% {
      bottom: 0;
      opacity: 0;
    }
    100% {
      bottom: 70px;
      opacity: 1;
    }
  }
`;
const BottomButton = styled.div`
  width: ${ButtonSize};
  height: ${ButtonSize};
  background-color: ${Colors.ButtonMain};
  background-size: ${SecondaryButtonSize};
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${HalfButtonSize};
  cursor: pointer;
  margin: 5px 0;
`;
const BackToTop = styled(BottomButton)`
  background-image: url('./escalator-up-white.png');
`;
const BackToMain = styled(BottomButton)`
  background-image: url('./up-white.png');
  transform: rotate(-90deg);
`;

const BottomButtonGroup: FC<{
  isExpanded: boolean;
  scrollIntoViewRef: MutableRefObject<HTMLDivElement | null>;
}> = ({ isExpanded = false, scrollIntoViewRef }) => {
  const [buttonExpanded, setbuttonExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const toggleExpandedButton = () => {
    setbuttonExpanded(!buttonExpanded);
  };

  const goToTop = () => {
    // window.scrollTo(0, 0);
    scrollIntoViewRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setbuttonExpanded(false);
  };

  const goToMain = () => {
    dispatch(switchToMain());
    setbuttonExpanded(false);
  };

  return (
    <Wrapper>
      <ControlButton
        className={`${buttonExpanded ? 'buttonExpanded' : ''}`}
        onClick={toggleExpandedButton}
      />
      {buttonExpanded && (
        <ButtonGroup>
          <BackToTop onClick={goToTop} />
          <BackToMain onClick={goToMain} />
        </ButtonGroup>
      )}
    </Wrapper>
  );
};

export default BottomButtonGroup;
