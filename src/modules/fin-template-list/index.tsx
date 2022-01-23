import React, { useState, useEffect, FC } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import HeaderToolbar from '../header-toolbar';
import TemplateToolbar from './template-toolbar';
import FinTemplateItem from './fin-template-item';
import CreateTemplate from './create-template';
import { useAppDispatch } from '../../store';
import { useIsCreatingTemplate } from '../../store/fin/hooks';
import { setLoginStatus } from '../../store/login';
import { Colors } from '../../styles/colors';

// import mockTemplates from './mockData.json';
const Templates = styled.div`
  border-top: 1px solid ${Colors.GreyLightIIII};
  border-bottom: 1px solid ${Colors.GreyLightIIII};
`;
const Template = styled.div`
  padding: 0 10px;
`;

const FinTemplateList: FC = () => {
  const [templates, setTemplates] = useState([]);
  const dispatch = useAppDispatch();
  const isCreatingTemplate = useIsCreatingTemplate();

  useEffect(() => {
    Axios.get('/api/wacai/getFinTemplates').then(
      ({ data }) => {
        let templates = data.data || [];
        setTemplates(templates);
      },
      ({ response }) => {
        if (response.status === 401) {
          dispatch(setLoginStatus(false));
        }
      }
    );
  }, [isCreatingTemplate]);

  return (
    <div className="FinTemplateList">
      <HeaderToolbar
        barTitle={isCreatingTemplate ? '创建模板' : ''}
        hasSearch={false}
      />
      <TemplateToolbar />
      {isCreatingTemplate ? (
        <CreateTemplate />
      ) : (
        <Templates>
          {templates.map((item, index) => (
            <Template key={index}>
              <FinTemplateItem
                item={item}
                isLast={index === templates.length - 1}
              />
            </Template>
          ))}
        </Templates>
      )}
    </div>
  );
};

export default FinTemplateList;
