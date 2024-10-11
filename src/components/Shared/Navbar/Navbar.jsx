import Container from "../Container";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import NavItem from "./NavItem";
import toast from "react-hot-toast";
import logo from "../../../assets/images/petLoversHubLogo.png";
import ThemeSwitcher from "../SectionTitle/ThemeSwitcher";

const Navbar = () => {
  const {
    user,
    logOut,
    dropdownVisible,
    setDropdownVisible,
    menuVisible,
    setMenuVisible,
  } = useAuth();

  const toggleDropdown = () => {
    setMenuVisible(false);
    setDropdownVisible(!dropdownVisible);
  };
  const toggleMenu = () => {
    setDropdownVisible(false);
    setMenuVisible(!menuVisible);
  };

  // handle logout button
  const handleLogout = () => {
    setDropdownVisible(false);
    logOut()
      .then()
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const navItems = (
    <>
      <NavItem address='/' label='Home' />
      <NavItem address='/pet-listing' label='Pet Listing' />
      <NavItem address='/donation-campaigns' label='Donation Campaigns' />
      <NavItem address='/contact' label='Contact' />
      {!user && (
        <li>
          <Link
            type='button'
            to='/login'
            className='md:hidden block w-40 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
            <button>Login</button>
          </Link>
        </li>
      )}
    </>
  );
  const menuLinks = (
    <>
      <li>
        <Link to='/dashboard'>
          <button
            type='button'
            onClick={() => setDropdownVisible(false)}
            className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2 ml-4'>
            Dashboard
          </button>
        </Link>
      </li>
      <li>
        <button
          onClick={handleLogout}
          type='button'
          className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4'>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className='sticky top-0 w-full bg-white z-10 shadow-sm dark:bg-gray-900 border-b border-gray-200'>
      <Container>
        <nav className='bg-white dark:bg-gray-900'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 md:py-3 relative'>
            <Link
              to='/'
              className='flex items-center space-x-3 rtl:space-x-reverse'>
              <img
                src={logo}
                className='h-8 md:h-10 lg:h-12'
                alt='Flowbite Logo'
              />
            </Link>
            <div className='flex items-center md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse'>
              {user ? (
                <>
                  <button
                    type='button'
                    className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                    id='user-menu-button'
                    aria-expanded={dropdownVisible}
                    onClick={toggleDropdown}>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='w-8 h-8 rounded-full'
                      referrerPolicy='no-referrer'
                      src={user?.photoURL || avatarImg}
                      alt='user photo'
                    />
                  </button>
                  {dropdownVisible && (
                    <div
                      className='z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                      id='user-dropdown'>
                      <div className='absolute right-[1%] top-[74%] mt-4 bg-gray-50 border border-gray-100 rounded-b-lg dark:bg-gray-800 dark:border-gray-700'>
                        <div className='px-4 py-3'>
                          <span className='block text-sm text-gray-900  dark:text-white'>
                            {user?.displayName}
                          </span>
                          <span className='block text-sm text-gray-500 truncate dark:text-gray-200'>
                            {user?.email}
                          </span>
                        </div>
                        <ul className='py-2' aria-labelledby='user-menu-button'>
                          {menuLinks}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  type='button'
                  to='/login'
                  className='hidden md:block text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                  <button>Login</button>
                </Link>
              )}
              <button
                data-collapse-toggle='navbar-user'
                type='button'
                className='inline-flex items-center md:p-2 md:w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400'
                aria-controls='navbar-user'
                aria-expanded={menuVisible}
                onClick={toggleMenu}>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-5 h-5 mx-auto'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 17 14'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 1h15M1 7h15M1 13h15'
                  />
                </svg>
              </button>
              <div className='md:pl-4 hidden md:block'>
                <ThemeSwitcher />
              </div>
            </div>
            <div
              className={`items-center justify-between md:flex md:w-auto md:order-1 absolute md:static right-0 top-[42px] ${
                menuVisible ? "" : "hidden"
              }`}>
              <ul className='flex flex-col w-52 ml-auto md:w-full md:ml-0 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-b-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li className='md:hidden'>
                  <ThemeSwitcher />
                </li>
                {navItems}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
