import { NavLink } from "react-router-dom";
import  PropTypes  from "prop-types";
import useAuth from "../../../hooks/useAuth";
const NavItem = ({ address, label}) => {
  const {setDropdownVisible} = useAuth()
  return (
    <>
      <li>
        <NavLink
          onClick={() => setDropdownVisible(false)}
          to={address}
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-3 w-full text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 text-nowrap"
              : "block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 w-full text-nowrap"
          }>
          {label}
        </NavLink>
      </li>
    </>
  );
};

NavItem.propTypes = {
  address: PropTypes.string,
  label: PropTypes.string,
  setDropdownVisible: PropTypes.func,
};

export default NavItem;