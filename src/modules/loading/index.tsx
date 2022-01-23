import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{
  width: string;
  height: string;
}>`
  font-size: 10px;
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  &:after {
    position: absolute;
    border: 0.25em solid rgb(141, 140, 140);
    border-top-color: #1ac7c7;
    width: 100%;
    height: 100%;
    display: inline-block;
    content: ' ';
    left: 0;
    box-sizing: border-box;
    // animation: animate-loading 2.5s steps(4, end) infinite;
    animation: animate-loading 2.5s linear infinite;
    border-radius: 50%;
  }

  @keyframes animate-loading {
    100% {
      border-top-color: #cfeb34;
      transform: rotateZ(360deg);
    }
  }
`;

const Loading = props => {
  const style = {
    width: props.width || '4em',
    height: props.height || '4em',
  };
  return <Wrapper className="Loading" style={style} />;
};

export default Loading;
