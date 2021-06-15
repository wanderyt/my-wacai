import React from 'react';
import DropdownList from '../../src/modules/dropdown-list';
import {storiesOf} from '@storybook/react';

const ITEMS = [{
  key: 'all-dates',
  value: 'All dates'
}, {
  key: 'today',
  value: 'Today'
}, {
  key: 'this-weekend',
  value: 'This weekend',
  selected: true
}, {
  key: 'this-month',
  value: 'This month'
}, {
  key: 'custom-dates',
  value: 'Custom dates'
}];

storiesOf('Dropdown List', module)
  .add('Default', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <DropdownList title='dropdown list options' items={ITEMS} />
    </div>
  ));
