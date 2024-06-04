import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
const Main = () => {
  return (
    <div className=' bg-white dark:bg-gray-900'>
      <Navbar />
      <div className='pt-32 min-h-[calc(100vh-120px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main
