import {combineReducers} from 'redux';
import fin from './fin';
import errorMsg from './errorMsg';

const reducers = combineReducers({
  fin,
  errorMsg
});

export default reducers;
