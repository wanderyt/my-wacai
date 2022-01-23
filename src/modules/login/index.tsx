import React, { FC, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';
import { StringifyOptions } from 'querystring';

const LoginContainer = styled.div`
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;
const LoginFormItem = styled.div`
  height: 40px;
  line-height: 40px;
  input {
    inline-size: 200px;
    text-indent: 10px;
    font-size: 16px;
    outline: none;
    border: 0;
    @media screen and (min-width: 330px) {
      inline-size: 250px;
    }
  }
`;
const FormItemImage = styled.div<{
  imagePath: string;
}>`
  padding-left: 30px;
  background-image: url('${props => props.imagePath}');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 10px center;
`;
const ButtonGroup = styled.div`
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
`;
const SubmitButton = styled.div`
  width: 100px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  font-family: 'HelveticaNeue', 'Monaco';
  border: 1px solid ${Colors.GreyLightII};
  border-radius: 5px;
  cursor: pointer;
`;

const Login: FC<{
  loginSuccessCallback: () => void;
}> = ({ loginSuccessCallback }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = evt => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = evt => {
    setPassword(evt.target.value);
  };

  const validateInput = () => {
    return username && password;
  };

  const handleLogin = () => {
    const inputValid = validateInput();
    if (!inputValid) {
      return;
    }

    const API_HOST = process.env.REACT_SERVER_API_HOST || '';

    Axios.post(`${API_HOST}/api/user/login`, {
      data: { username, password },
    }).then(() => {
      loginSuccessCallback && loginSuccessCallback();
    });
  };

  return (
    <div className="Login">
      <LoginContainer>
        <LoginFormItem className="UsernameInput">
          <FormItemImage className="Username-Image" imagePath="./username.png">
            <input
              type="input"
              placeholder="用户名"
              onChange={handleUserNameChange}
              value={username}
            />
          </FormItemImage>
        </LoginFormItem>
        <LoginFormItem className="PasswordInput">
          <FormItemImage className="Password-Image" imagePath="./password.png">
            <input
              type="password"
              placeholder="密码"
              onChange={handlePasswordChange}
              value={password}
            />
          </FormItemImage>
        </LoginFormItem>
        <ButtonGroup>
          <SubmitButton onClick={handleLogin}>登录</SubmitButton>
        </ButtonGroup>
      </LoginContainer>
    </div>
  );
};

export default Login;
