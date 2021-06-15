import React from 'react';
import KeyTest, {Example} from '../../src/modules/test-key';
import {storiesOf} from '@storybook/react';

storiesOf('Key Test', module)
  .add('default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <KeyTest />
    </div>
  ))
  .add('setState status', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Example />
    </div>
  ));
