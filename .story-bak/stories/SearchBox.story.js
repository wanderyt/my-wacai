import React from 'react';
import SearchBox from '../../src/modules/search-box';
import HeaderToolbar from '../../src/modules/header-toolbar';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

const customStyles = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

storiesOf('Search Box', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <SearchBox />
    </div>
  ))
  .add('Search box in header toolbar', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <HeaderToolbar
          hasSearch={false}>
          {() => (
            <SearchBox customStyles={customStyles}/>
          )}
        </HeaderToolbar>
      </div>
    </StoreProvider>
  ));
