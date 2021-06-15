import React from 'react';
import Calculator from '../../src/modules/calculator';
import {storiesOf} from '@storybook/react';

storiesOf('Calculator', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Calculator />
    </div>
  ));
