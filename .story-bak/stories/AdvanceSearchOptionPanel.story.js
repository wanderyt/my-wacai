import React from 'react';
import {AmountRangeSelectionPanel, DateRangeSelectionPanel} from '../../src/modules/search-fin-item/advance-search-option-panel';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('Advanced Search Selection Panel', module)
  .add('Amount Range Selection', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <AmountRangeSelectionPanel />
      </div>
    </StoreProvider>
  ))
  .add('Date Range Selection', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <DateRangeSelectionPanel />
    </div>
  ));
