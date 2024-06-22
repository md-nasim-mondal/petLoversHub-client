import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { isDrawerOpen } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className='relative min-h-screen md:flex bg-white dark:bg-gray-800'>
      {/* Sidebar */}
      <Sidebar />
      {/* Outlet ----> Dynamic Content */}
      <div
        className={`flex-1 p-5 md:p-10 ${isDrawerOpen && "md:ml-80 md:p-0"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
