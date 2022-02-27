import { useNavigate, useLocation } from 'react-router-dom';

const RouterHook = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return { navigate, location };
};

export default RouterHook;
