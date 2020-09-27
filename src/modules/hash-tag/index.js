import React from 'react';
import PropTypes from 'prop-types';
import HashTagItem from './hash-tag-item';

import './index.scss';

const HashTagManagement = ({tags = [], selectedTags = [], toggleTagSelection}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className='HashTagManagement'>
      {
        tags.map((tag, index) => {
          return (
            <div className='HashTag__Item'
              key={index}>
              <HashTagItem tag={tag} isSelected={selectedTags.indexOf(tag) > -1} toggleSelection={toggleTagSelection} />
            </div>
          );
        })
      }
    </div>
  );
}

HashTagManagement.propTypes = {
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
  toggleTagSelection: PropTypes.func
};

export default HashTagManagement;
