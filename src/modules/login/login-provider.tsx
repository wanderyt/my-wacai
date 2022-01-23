import React, { useEffect } from 'react';
import Axios from 'axios';
import Login from './index';
import styled from 'styled-components';
import { useLoginStatus } from '../../store/login/hooks';
import { useAppDispatch } from '../../store';
import { setLoginStatus } from '../../store/login';

const AppLogin = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const LoginProvider = ({ children }) => {
  const loginStatus = useLoginStatus();
  const dispatch = useAppDispatch();
  const handleLoginSuccess = () => {
    dispatch(setLoginStatus(true));
  };

  useEffect(() => {
    const API_HOST = process.env.REACT_SERVER_API_HOST || '';
    if (loginStatus === undefined) {
      Axios.get(`${API_HOST}/api/user/validateToken`).then(
        () => {
          handleLoginSuccess();
        },
        () => {
          dispatch(setLoginStatus(false));
        }
      );
    }
  }, []);

  return (
    // Do not render login panel at first time
    // Until token validation is complete
    loginStatus === undefined ? null : (
      <div className="LoginProvider">
        {loginStatus ? (
          children
        ) : (
          <AppLogin>
            <Login loginSuccessCallback={handleLoginSuccess} />
          </AppLogin>
        )}
      </div>
    )
  );
};

export default LoginProvider;
