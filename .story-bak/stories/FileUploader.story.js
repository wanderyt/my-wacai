import React from 'react';
import FileUploader from '../../src/modules/file-uploader';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

storiesOf('File Uploader', module)
  .add('Default', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FileUploader />
      </div>
    </StoreProvider>
  ));
