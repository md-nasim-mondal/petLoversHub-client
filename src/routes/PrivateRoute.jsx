import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Skeleton height={40} width={40} circle={true} />
        <span className='ml-4'>Loading...</span>
      </div>
    );
  }

  if (user) return children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
