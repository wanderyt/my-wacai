import React from 'react';
import SearchDropdown from '../../src/modules/search-dropdown';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('Search Dropdown', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <SearchDropdown
        placeholder='请输入' />
    </div>
  ));
