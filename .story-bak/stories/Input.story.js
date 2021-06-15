import React, {useState} from 'react';
import Input from '../../src/modules/input';
import {storiesOf} from '@storybook/react';

storiesOf('Input', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px',
      width: '200px'
    }}>
      <Input defaultValue='default' />
    </div>
  ))
  .add('Change value outside', () => {
    const [defaultValue, setDefaultValue] = useState('');
    const resetValue = () => {
      setDefaultValue(Math.floor(Math.random() * 10000) + '');
    };
    return (
      <div style={{
        margin: '0 20px',
        width: '200px'
      }}>
        <button onClick={resetValue}>Click me to change value!</button>
        <Input defaultValue={defaultValue} />
      </div>
    );
  });
