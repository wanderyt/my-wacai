import {combineReducers} from 'redux';
import fin from './fin';
import errorMsg from './errorMsg';
import login from './login';

const reducers = combineReducers({
  fin,
  errorMsg,
  login,
});

export default reducers;
