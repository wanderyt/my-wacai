import React from 'react';
import EventCarousel from '../../src/modules/test-carousel';
import {storiesOf} from '@storybook/react';

storiesOf('Test Carousel', module)
  .add('Test Event Carousel', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <EventCarousel />
    </div>
  ))
  ;
