import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import HeaderToolbar from '../header-toolbar';
import TemplateToolbar from './template-toolbar';
import FinTemplateItem from './fin-template-item';
import CreateTemplate from './create-template';

// import mockTemplates from './mockData.json';

import './index.scss';

const FinTemplateList = ({isCreatingTemplate}) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    Axios.get('/api/wacai/getFinTemplates')
      .then(({data}) => {
        let templates = data.data || [];
        setTemplates(templates);
      })
  }, [isCreatingTemplate]);

  return (
    <div className='FinTemplateList'>
      <HeaderToolbar
        barTitle={isCreatingTemplate ? '创建模板' : ''}
        hasSearch={false} />
      <TemplateToolbar />
      {
        isCreatingTemplate ?
        <CreateTemplate />
        :
        <div className='Templates'>
          {
            templates.map((item, index) => (
              <div
                key={index}
                className='Template'>
                <FinTemplateItem
                  item={item}
                  isLast={index === templates.length - 1} />
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  let fin = state.fin || {};
  return {
    isCreatingTemplate: fin.isCreatingTemplate
  };
};

export default connect(mapStateToProps)(FinTemplateList);
