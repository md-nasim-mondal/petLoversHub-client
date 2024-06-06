import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
const Main = () => {
  const { setDropdownVisible, setMenuVisible } = useAuth();
  const handleMenubar = () => {
    setDropdownVisible(false);
    setMenuVisible(false);
  };
  return (
    <div className=' bg-white dark:bg-gray-900'>
      <Navbar />
      <div onClick={handleMenubar} className='pt-32 min-h-[calc(100vh-120px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
