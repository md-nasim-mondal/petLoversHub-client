import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";
import Container from "../components/Shared/Container";
import { useEffect } from "react";
const Main = () => {
  const { setDropdownVisible, setMenuVisible } = useAuth();
  const handleMenubar = () => {
    setDropdownVisible(false);
    setMenuVisible(false);
  };
  
  const { pathname } = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=' bg-white dark:bg-gray-900'>
      <Navbar />
      <div onClick={handleMenubar} className='pt-16 md:pt-24 lg:pt-32 min-h-[calc(100vh-120px)]'>
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
