import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../../Store/user.Store';

const PublicRoute = () => {
  const user = useUserStore(state => state.user);

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to public route
  return <Outlet />;
};

export default PublicRoute;
