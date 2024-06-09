import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  return (
    <div className='relative min-h-screen md:flex bg-white dark:bg-gray-800'>
      {/* Sidebar */}
      <Sidebar isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
      {/* Outlet ----> Dynamic Content */}
      <div className={`flex-1 p-10 ${isDrawerOpen && "md:ml-80 md:p-0"}`}>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
