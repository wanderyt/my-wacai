import {configure} from '@storybook/react';

// https://webpack.js.org/guides/dependency-management/#require-context
// const req = require.context('../src/scripts/', true, /\.stories\.js$/);
// const testStory = '../src/scripts/uikit/UIFinTile.story.js';

const loadStories = () => {
  // req.keys().forEach((fileName) => req(fileName));
  require('./stories');
};

configure(loadStories, module);
