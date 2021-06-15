import React from 'react';
import Rating from '../../src/modules/rating';
import {storiesOf} from '@storybook/react';

storiesOf('Rating', module)
  .add('Faces', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <Rating />
    </div>
  ));
