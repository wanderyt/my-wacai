import {combineReducers} from 'redux';
import fin from './fin';
import notification from './notification';
import login from './login';
import search from './search';
// import test from './test';

const reducers = combineReducers({
  fin,
  notification,
  login,
  search,
  // test,
});

export default reducers;
