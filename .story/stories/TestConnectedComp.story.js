import React from 'react';
import {Parent, TestClass, TestFunctional, TestPure} from '../../src/modules/test-connect-comp';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('Test Connected Comp', module)
  .add('TestClass', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <Parent>
          <TestClass />
        </Parent>
      </div>
    </StoreProvider>
  ))
  .add('TestFunctional', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <Parent>
          <TestFunctional />
        </Parent>
      </div>
    </StoreProvider>
  ))
  .add('TestPure', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <Parent>
          <TestPure />
        </Parent>
      </div>
    </StoreProvider>
  ));
