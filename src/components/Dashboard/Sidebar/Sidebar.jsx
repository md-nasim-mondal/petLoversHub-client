import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import MenuItem from "./Menu/MenuItem";
import logo from "../../../assets/images/petLoversHubLogo.png";
import ThemeToggle from "../../Shared/ThemeToggle/ThemeToggle";
import useRole from "../../../hooks/useRole";
import UserMenu from "./Menu/UserMenu";
import ToggleBtn from "../../Shared/Button/ToggleBtn";
import AdminMenu from "./Menu/AdminMenu";
import LoadingSpinner from "./../../Shared/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [role, isLoading] = useRole();
  // console.log(role, isLoading);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  if (isLoading) return <LoadingSpinner />;
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
        className={`fixed top-0 left-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex='-1'
        aria-labelledby='drawer-navigation-label'>
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-600 w-80 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform  transition duration-200 ease-in-out`}>
          <div className=' absolute top-0 end-2.5 inline-flex'>
            <div className='mr-56 py-3'>
              <ThemeToggle />
            </div>
            <div className='flex items-center'>
              <button
                type='button'
                aria-controls='drawer-navigation'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 h-8 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white '
                onClick={toggleDrawer}>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6 text-black dark:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>Close menu</span>
              </button>
            </div>
          </div>
          <div>
            <div>
              <div className='w-full flex px-4 py-2 mt-5 shadow-lg rounded-lg justify-center items-center bg-blue-200 dark:bg-blue-200 mx-auto'>
                <Link to='/'>
                  <img src={logo} alt='logo' />
                </Link>
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
                {/* Statistics */}
                <MenuItem
                  label={"Dashboard"}
                  address={"/dashboard"}
                  icon={MdDashboard}
                />

                {role === "user" && <UserMenu />}
                {role === "admin" ? (
                  toggle ? (
                    <UserMenu />
                  ) : (
                    <AdminMenu />
                  )
                ) : undefined}
              </nav>
            </div>
          </div>

          <div>
            <hr />

            {/* Profile Menu */}
            <MenuItem
              label={"Profile"}
              address={"/dashboard/profile"}
              icon={FcSettings}
            />

            <button
              onClick={logOut}
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
