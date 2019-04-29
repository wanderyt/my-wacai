import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import Login from './index';

import './login-provider.scss';

const LoginProvider = ({loginStatus, dispatch, children}) => {
  const handleLoginSuccess = () => {
    dispatch({
      type: 'LOGIN_SUCCESS'
    });
  }

  useEffect(() => {
    if (loginStatus === undefined) {
      Axios.get('/api/user/validateToken')
        .then(() => {
          handleLoginSuccess();
        }, () => {
          dispatch({
            type: 'TOKEN_INVALID'
          });
        });
    }
  }, [])

  return (
    // Do not render login panel at first time
    // Until token validation is complete
    loginStatus === undefined ?
    null
    :
    <div className='LoginProvider'>
      {
        loginStatus ?
        children
        :
        <div className='App-Login'>
          <Login
            loginSuccessCallback={handleLoginSuccess} />
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const login = state.login || {};
  return {
    loginStatus: login.loginStatus
  }
};

export default connect(mapStateToProps)(LoginProvider);
