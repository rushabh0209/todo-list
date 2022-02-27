import React from 'react';
import RouterHook from '../../hooks/useRoute';
import { setCookies } from '../../utils/cookies';

import './login.css';

function Login() {
  const { navigate } = RouterHook();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target['inputEmail'].value;
    const password = e.target['inputPassword'].value;
    if (email === 'test@gmail.com' && password === 'test') {
      console.log('success');
      setCookies('isLogin', true);
      navigate('/')
    } else {
      console.log('failed');
    }
  };
  return (
    <div className="login">
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <div className="row login-form-header">
            <div className="col-auto login-form-header-content">Login</div>
          </div>
          <div className="row mt-3">
            <label htmlFor="inputEmail" className="col-sm-4 col-form-label">
              Email
            </label>
            <div className="col-sm-8">
              <input type="email" className="form-control" id="inputEmail" required />
            </div>
          </div>
          <div className="row mt-3">
            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">
              Password
            </label>
            <div className="col-sm-8">
              <input type="password" className="form-control" id="inputPassword" required />
            </div>
          </div>
          <div className="row mt-3 login-form-submit">
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
