import React from 'react';
import {connect} from 'react-redux';

import Login from './index';

import './login-provider.scss';

const LoginProvider = ({loginStatus, dispatch, children}) => {
  const handleLoginSuccess = () => {
    dispatch({
      type: 'LOGIN_SUCCESS'
    });
  }

  return (
    <div className='LoginProvider'>
      {
        loginStatus ?
        children
        :
        <div className='App-Login'>
          <Login
            loginSuccess={handleLoginSuccess} />
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
