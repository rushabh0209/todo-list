import React from 'react';
import RouterHook from '../../hooks/useRoute';

import './index.css';

const PageNotFound = () => {
  const { navigate } = RouterHook();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className="p404">
      <div className="p404-text">Page Not Found</div>
      <button className="p404-button" onClick={goHome}>
        Back to home
      </button>
    </div>
  );
};

export default PageNotFound;
