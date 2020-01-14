import React from 'react';
import {Parent, TestClass, TestFunctional, TestPure} from '../../src/modules/test-comp';
import {storiesOf} from '@storybook/react';

storiesOf('Test Comp', module)
  .add('TestClass', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Parent>
        {(props) => (
          <TestClass {...props} />
        )}
      </Parent>
    </div>
  ))
  .add('TestFunctional', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Parent>
        {(props) => (
          <TestFunctional {...props} />
        )}
      </Parent>
    </div>
  ))
  .add('TestPure', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Parent>
        {(props) => (
          <TestPure {...props} />
        )}
      </Parent>
    </div>
  ));
