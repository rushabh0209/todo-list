import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import Todo from './containers/Todo/Index';
import RouterHook from './hooks/useRoute';
import { getCookies } from './utils/cookies';

import './App.css';
import PageNotFound from './containers/PageNotFound';

const App = () => {
  const { navigate, location } = RouterHook();

  const checkTokenState = async () => {
    const isLogin = await getCookies('isLogin');
    
    if (location.pathname === '/') {
      if (!isLogin) {
        navigate('login');
      }
    } else {
      if (isLogin) {
        navigate('/');
      }
    }
  };

  React.useEffect(() => {
    checkTokenState();
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<Todo />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
