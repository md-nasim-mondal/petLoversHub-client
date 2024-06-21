import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Skeleton height={40} width={40} circle={true} />
        <span className='ml-4'>Loading...</span>
      </div>
    );
  }

  if (role === "admin") return children;
  return <Navigate to='/dashboard' />;
};

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminRoute;
