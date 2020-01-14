import React from 'react';
import PopupButtons from '../../src/modules/popup-buttons';
import {storiesOf} from '@storybook/react';

const buttons = [{
  name: '确定',
  clickHandler: () => {
    alert('确定');
  }
}];

storiesOf('Popup Buttons', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <PopupButtons buttons={buttons} />
    </div>
  ));
