import React from 'react';
import HashTagManagement from '../../src/modules/hash-tag';
import HashTagItem from '../../src/modules/hash-tag/hash-tag-item';
import {storiesOf} from '@storybook/react';

let tags = [{
  tag: 'tag1',
  isSelected: false
}, {
  tag: 'tag2',
  isSelected: true
}, {
  tag: 'tag3',
  isSelected: false
}, {
  tag: 'tag4',
  isSelected: true
}, {
  tag: 'tag5',
  isSelected: true
}];

const toggleTagSelection = (tagName, isSelected) => {
  tags = tags.map((tag) => tag.tag === tagName ? {tag: tagName, isSelected} : tag);
  alert('selected items: ' + tags.filter((tag) => tag.isSelected).map(({tag}) => tag).join(', '));
};

storiesOf('Hash Tag Management', module)
  .add('Unselected Hash Tag', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <HashTagItem {...tags[0]} />
    </div>
  ))
  .add('Selected Hash Tag', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <HashTagItem {...tags[1]} />
    </div>
  ))
  .add('Hash Tag List', () => (
    <div style={{
      margin: '0 20px'
    }}>
      <HashTagManagement tags={tags} toggleTagSelection={toggleTagSelection} />
    </div>
  ));
