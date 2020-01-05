import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './fin-template-item.scss';

const FinTemplateItem = ({item = {}, isLast = false, dispatch}) => {
  const {comment, category, subcategory, place} = item;

  const handleItemClick = () => {
    dispatch({
      type: 'SELECT_ITEM',
      item: {
        comment,
        category,
        subcategory,
        place,
        amount: 0
      }
    });
  };

  return (
    <div className='FinTemplateItem'>
      <div
        className={`ItemContainer ${isLast ? '' : 'ItemBorder'}`}
        onClick={handleItemClick}>
        <div className='Categories'>
          <div className='Category'>{category}</div>
          <div className='SubCategory'>{subcategory}</div>
        </div>
        <div className='Comment'>{comment}</div>
      </div>
    </div>
  )
};

FinTemplateItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

export default connect()(FinTemplateItem);
