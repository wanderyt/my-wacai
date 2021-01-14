import React from 'react';
import App from '../../src/modules/test-portal';
import * as Test1 from '../../src/modules/test-portal/test1';
import * as Test2 from '../../src/modules/test-portal/test2';
import * as Test3 from '../../src/modules/test-portal/test3';
import {storiesOf} from '@storybook/react';

storiesOf('Test Portal', module)
  .add('Test Portal App', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <App />
    </div>
  ))
  .add('Test Portal App with 1 Child', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Test1.default />
    </div>
  ))
  .add('Test Portal App with 1 Child initialized first', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Test2.default />
    </div>
  ))
  // .add('Test Portal App with 1 Child initialized first', () => (
  //   <div style={{
  //     margin: '0 20px'
  //   }}>
  //     <Test3.default />
  //   </div>
  // ))
  ;
