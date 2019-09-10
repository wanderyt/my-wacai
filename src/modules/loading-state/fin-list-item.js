import React from 'react';
import './fin-list-item.scss';

const FinListItem = () => {
  return (
    <div className='FinListItem--LoadingState'>
      <div className='FinListItem--Left'>
        <div className='FinListItem__Cat'>
          <div className='LoadingState' />
        </div>
        <div className='FinListItem__Date'>
          <div className='LoadingState' />
        </div>
        <div className='FinListItem__Comment'>
          <div className='LoadingState' />
        </div>
      </div>
      <div className='FinListItem--Right'>
        <div className='FinListItem--Amount'>
          <div className='LoadingState' />
        </div>
      </div>
    </div>
  );
}

export default FinListItem;
