import React from 'react';
import {connect} from 'react-redux';

import './template-toolbar.scss';

const TemplateToolbar = ({dispatch}) => {
  const createTemplateHandler = () => {
    dispatch({
      type: 'CREATE_TEMPLATE'
    });
  };

  return (
    <div className='TemplateToolbar'>
      <div className='ToolbarContainer'>
        <div className='ToolbarInfo'>记账模板</div>
        <div className='ToolbarBtns'>
          <div
            className='CreateBtn'
            onClick={createTemplateHandler}>
            添加模板
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(TemplateToolbar);
