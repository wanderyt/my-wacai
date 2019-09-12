import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Loading from './modules/loading';
import FileUploader from './modules/file-uploader';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

// Start: Redux code
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

// Login Provider
import LoginProvider from './modules/login/login-provider';

const initialState = {
  fin: {
    pageIndex: 'MAIN'
  }
};

const store = createStore(
  reducer,
  initialState, // preloadedState
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const InnerComp = ({location = {pathname: ''}}) => {
  return (
    <React.Fragment>
      {
        location.pathname.indexOf('fileUploader') > -1 ?
          <FileUploader />
          :
          <App />
      }
    </React.Fragment>
  )
}

const InnerCompWithRouter = withRouter(InnerComp);

const Routers = () => {
  return (
    <React.Fragment>
      <Route exact path={'' || '/'} component={App} key='App'/>
      <Route path='/fileUploader' component={FileUploader} key="FileUploader"/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <LoginProvider>
      <Router>
        {/* <InnerCompWithRouter /> */}
        <Routers />
      </Router>
    </LoginProvider>
    {/* <Loading /> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
