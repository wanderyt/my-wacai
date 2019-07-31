import {combineReducers} from 'redux';
import fin from './fin';
import errorMsg from './errorMsg';
import login from './login';
import search from './search';
// import test from './test';

const reducers = combineReducers({
  fin,
  errorMsg,
  login,
  search,
  // test,
});

export default reducers;
