import React, { useState } from 'react';
import CommentHintDialog from '../../src/modules/comment-hint-dialog';
import {storiesOf} from '@storybook/react';
// import StoreProvider from '../util/storeHelper';

import MockData from '../../src/modules/comment-hint-dialog/mockData.json';

storiesOf('Comment Hint Dialog', module)
  .add('Default Comment Hint Dialog', () => {
    const [isShow, setIsShow] = useState(true);
    const [selectedValue, setSelectedValue] = useState({});
    const successCallback = (result) => {
      setSelectedValue(result);
    }
    return (
      <div style={{
        width: '500px',
        height: '300px'
      }}>
        {
          selectedValue.place && ("place : " + selectedValue.place)
        }
        {
          selectedValue.category && ("category : " + selectedValue.category)
        }
        {
          selectedValue.subcategory && ("subcategory : " + selectedValue.subcategory)
        }
        {isShow && <CommentHintDialog optionList={MockData.data.options} commentKeyWord='7分甜' closeCallback={() => setIsShow(false)} successCallback={successCallback} />}
      </div>
    )
  });
