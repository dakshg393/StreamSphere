// components/Auth/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../../Store/user.Store';

const PrivateRoute = () => {
  const user = useUserStore(state => state.user);

  // Only allow access if user exists
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
