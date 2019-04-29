import React, {useState, useEffect} from 'react';
import Axios from 'axios';

import './index.scss';

const Login = ({loginSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Axios.get('/api/user/validateToken')
      .then(() => {
        loginSuccess && loginSuccess();
        setUsername('');
        setPassword('');
      });

    return () => {
      alert('login unmounted!');
    }
  })

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
        loginSuccess && loginSuccess();
        setUsername('');
        setPassword('');
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
