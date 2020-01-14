import React from 'react';
import Notification from '../../src/modules/notification';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('Notification', module)
  .add('Error Type Notification', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Notification type='error' msg='请输入有效金额' />
    </div>
  ));
