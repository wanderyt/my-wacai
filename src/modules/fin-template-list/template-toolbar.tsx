import React from 'react';
import { useAppDispatch } from '../../store';
import { createTemplate } from '../../store/fin';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const ToolbarContainer = styled.div`
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;
const ToolbarInfo = styled.div`
  flex-grow: 1;
  font-size: 16px;
  font-weight: bold;
`;
const ToolbarBtns = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
`;
const CreateBtn = styled.div`
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  width: 80px;
  text-align: center;
`;

const TemplateToolbar = () => {
  const dispatch = useAppDispatch();
  const createTemplateHandler = () => {
    dispatch(createTemplate());
  };

  return (
    <div className="TemplateToolbar">
      <ToolbarContainer>
        <ToolbarInfo>记账模板</ToolbarInfo>
        <ToolbarBtns>
          <CreateBtn onClick={createTemplateHandler}>添加模板</CreateBtn>
        </ToolbarBtns>
      </ToolbarContainer>
    </div>
  );
};

export default TemplateToolbar;
