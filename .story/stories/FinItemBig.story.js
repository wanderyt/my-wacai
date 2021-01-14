import React from 'react';
import FinItem from '../../src/modules/fin-item';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

const item = {
  id: '893E5F3263FB4FF89A00464B87630A26',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
};

storiesOf('Fin Item (home page)', module)
  .add('Default', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FinItem item={item} />
      </div>
    </StoreProvider>
  ));
