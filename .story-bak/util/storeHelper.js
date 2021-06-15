import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../../src/reducers';

const initialState = {
  fin: {
    pageIndex: 'MAIN'
  }
};

const store = createStore(
  // combineReducers({}),
  reducer,
  initialState, // preloadedState
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const StoreProvider = (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
};

export default StoreProvider;
