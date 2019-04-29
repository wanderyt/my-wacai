import React, {useState} from 'react';
import Axios from 'axios';

import './index.scss';

const Login = ({loginSuccessCallback}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (evt) => {
    setUsername(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const validateInput = () => {
    return username && password;
  }

  const handleLogin = () => {
    const inputValid = validateInput();
    if (!inputValid) {
      return;
    }

    Axios.post('/api/user/login', {data: {username, password}})
      .then(() => {
        loginSuccessCallback && loginSuccessCallback();
      });
  }

  return (
    <div className='Login'>
      <div className='LoginContainer'>
        <div className='UsernameInput'>
          <div className='Username-Image'>
            <input
              type='input'
              placeholder='用户名'
              onChange={handleUserNameChange}
              value={username} />
          </div>
        </div>
        <div className='PasswordInput'>
          <div className='Password-Image'>
            <input
              type='password'
              placeholder='密码'
              onChange={handlePasswordChange}
              value={password} />
          </div>
        </div>
        <div className='ButtonGroup'>
          <div
            className='SubmitButton'
            onClick={handleLogin}>
            登录
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
