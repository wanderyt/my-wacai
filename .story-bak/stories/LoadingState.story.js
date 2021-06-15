import React from 'react';
import {FinListItemLoadingState} from '../../src/modules/loading-state';
import {storiesOf} from '@storybook/react';

storiesOf('Loading State', module)
  .add('Fin Item (home page)', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <FinListItemLoadingState />
    </div>
  ));
