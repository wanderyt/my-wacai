import React from 'react';
import Comment from '../../src/modules/comment';
import CommentTicket from '../../src/modules/comment-ticket';
import {storiesOf} from '@storybook/react';
// import StoreProvider from '../util/storeHelper';

storiesOf('Comment', module)
  .add('Default Comment', () => (
    <div style={{
      width: '500px',
      height: '300px'
    }}>
      <Comment />
    </div>
  ))
  .add('Ticket Styled Comment', () => (
    <div style={{
      width: '500px',
      height: '300px'
    }}>
      <CommentTicket />
    </div>
  ));
