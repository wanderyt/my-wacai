import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import FileUploader from './modules/file-uploader';
import {withRouter} from 'react-router';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

// Start: Redux code
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

// Provider
import LoginProvider from './modules/login/login-provider';
import {CommentProvider} from './context/CommentContext';
import {TagProvider} from './context/TagContext';

// import './index.scss';

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
      <Route path='/fileUploader' component={FileUploader} key="FileUploader"/>
      <Route exact path={'' || '/'} component={App} key='App'/>
    </React.Fragment>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <LoginProvider>
      <CommentProvider>
        <TagProvider>
          <Router>
            {/* <InnerCompWithRouter /> */}
            <Routers />
          </Router>
        </TagProvider>
      </CommentProvider>
    </LoginProvider>
    {/* <Loading /> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
