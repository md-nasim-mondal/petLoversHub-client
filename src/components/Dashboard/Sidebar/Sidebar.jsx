import { useState, useEffect } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import MenuItem from "./Menu/MenuItem";
import logo from "../../../assets/images/petLoversHubLogo.png";
import useRole from "../../../hooks/useRole";
import UserMenu from "./Menu/UserMenu";
import AdminMenu from "./Menu/AdminMenu";
import ToggleBtn from "../../Shared/Button/ToggleBtn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThemeSwitcher from "../../Shared/ThemeSwitcher/ThemeSwitcher";

const Sidebar = () => {
  const { logOut, loading, isDrawerOpen, setDrawerOpen } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(() => {
    const savedToggleState = localStorage.getItem("sidebarToggle");
    return savedToggleState ? JSON.parse(savedToggleState) : false;
  });
  const [role, isLoading] = useRole();

  useEffect(() => {
    localStorage.setItem("sidebarToggle", JSON.stringify(toggle));
  }, [toggle]);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className='my-4'>
        <Skeleton height={40} />
      </div>
    ));
  };

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const isContentLoading = loading || isLoading;

  return (
    <div className='text-center'>
      <button
        className={`absolute left-0 hover:bg-slate-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 my-2 p-1 dark:hover:bg-slate-400 focus:outline-none dark:focus:ring-blue-800 ${
          isDrawerOpen && "hidden"
        }`}
        type='button'
        onClick={toggleDrawer}>
        <RiMenuUnfold4Fill className='text-3xl bg-gray-100 rounded-sm p-0.5' />
      </button>

      <div
        id='drawer-navigation'
        className={`fixed top-0 left-0 z-40 w-80 h-[135vh] md:h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex='-1'
        aria-labelledby='drawer-navigation-label'>
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-600 w-80 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform  transition duration-200 ease-in-out`}>
          <div className=' absolute top-0 flex justify-between w-[95%]'>
            <div className='py-3'>
              <ThemeSwitcher />
            </div>
            <div className='flex items-center'>
              <button
                type='button'
                aria-controls='drawer-navigation'
                className='text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 md:px-3 h-8 inline-flex items-center dark:hover:bg-gray-900 dark:text-white '
                onClick={toggleDrawer}>
                X<span className='sr-only'>Close menu</span>
              </button>
            </div>
          </div>
          <div>
            <div>
              <div className='w-full flex px-4 py-2 mt-5 shadow-lg rounded-lg justify-center items-center bg-blue-200 dark:bg-blue-200 mx-auto'>
                {isContentLoading ? (
                  <Skeleton height={64} width={128} />
                ) : (
                  <Link to='/'>
                    <img src={logo} alt='logo' />
                  </Link>
                )}
              </div>
            </div>

            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6'>
              {/* Conditional toggle button here.. */}
              {role === "admin" && (
                <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />
              )}

              {/*  Menu Items */}
              <nav>
                {/* Simple Dashboard */}
                {isContentLoading ? (
                  renderSkeletons(1)
                ) : (
                  <MenuItem
                    label={"Dashboard"}
                    address={"/dashboard"}
                    icon={MdDashboard}
                  />
                )}

                {role === "user" && !isContentLoading && <UserMenu />}
                {role === "admin"
                  ? toggle
                    ? !isContentLoading && <UserMenu />
                    : !isContentLoading && <AdminMenu />
                  : undefined}
              </nav>
            </div>
          </div>

          <div>
            <hr />

            {/* Profile Menu */}
            {isContentLoading ? (
              renderSkeletons(1)
            ) : (
              <MenuItem
                label={"Profile"}
                address={"/dashboard/profile"}
                icon={FcSettings}
              />
            )}

            <button
              onClick={handleLogout}
              className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform dark:text-white'>
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
