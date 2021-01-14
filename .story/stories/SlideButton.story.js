import React from 'react';
import SlideButton from '../../src/modules/slide-button';
import {storiesOf} from '@storybook/react';

storiesOf('Slide Button', module)
  .add('Default as inactive', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <SlideButton />
    </div>
  ))
  .add('Default as active', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <SlideButton isActive={true} />
    </div>
  ));
