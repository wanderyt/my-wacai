import React from 'react';
import Login from '../../src/modules/login';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('Login', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Login />
    </div>
  ));
