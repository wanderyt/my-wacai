import React from 'react';
import MultiSelection from '../../src/modules/multi-selection';
import {storiesOf} from '@storybook/react';

const VALID_SELECTIONS = [
  '上海',
  '日本大阪',
  '日本和歌山',
  '日本京都',
  '成都',
  '重庆',
  '杭州',
];

storiesOf('MultiSelection', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <MultiSelection
        validSeletions={VALID_SELECTIONS}
        defaultSelection={['上海', '成都']} />
    </div>
  ));
