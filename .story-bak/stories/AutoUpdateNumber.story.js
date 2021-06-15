import React from 'react';
import AutoUpdateNumber from '../../src/modules/autoupdate-number';
import {storiesOf} from '@storybook/react';

storiesOf('AutoUpdateNumber', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <AutoUpdateNumber total={11086} />
    </div>
  ));
