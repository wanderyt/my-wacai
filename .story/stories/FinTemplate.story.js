import React from 'react';
import FinTemplateItem from '../../src/modules/fin-template-list/fin-template-item';
import FinTemplateToolbar from '../../src/modules/fin-template-list/template-toolbar';
import FinTemplateList from '../../src/modules/fin-template-list';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

const item = {
  category: '周中',
  subcategory: '晚餐',
  comment: '紫燕百味鸡',
};

storiesOf('Fin Template Item List', module)
  .add('Fin Template Item', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FinTemplateItem item={item} />
      </div>
    </StoreProvider>
  ))
  .add('Fin Template Toolbar', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FinTemplateToolbar item={item} />
      </div>
    </StoreProvider>
  ))
  .add('Fin Template List', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FinTemplateList />
      </div>
    </StoreProvider>
  ));
