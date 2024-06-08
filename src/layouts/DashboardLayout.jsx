import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-white dark:bg-gray-800'>
      {/* Sidebar */}
      <Sidebar />
      {/* Outlet ----> Dynamic Content */}
      <div className='flex-1 md:ml-80'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
