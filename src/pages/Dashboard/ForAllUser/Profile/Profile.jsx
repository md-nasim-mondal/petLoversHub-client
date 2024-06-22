import { Helmet } from "react-helmet-async";
import useAuth from "../../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useRole from "../../../../hooks/useRole";

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white shadow-lg rounded-2xl w-3/5 p-4'>
          <Skeleton height={144} className='rounded-t-lg mb-4' />
          <div className='flex flex-col items-center'>
            <Skeleton circle={true} height={96} width={96} className='-mt-16' />
            <Skeleton height={24} width={120} className='mt-2' />
            <Skeleton height={20} width={200} className='mt-2' />
            <div className='w-full p-2 mt-4'>
              <div className='flex flex-wrap items-center justify-between text-sm'>
                <Skeleton height={20} width={80} />
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={80} />
                <Skeleton height={20} width={150} />
                <Skeleton height={36} width={200} className='mt-2' />
                <Skeleton height={36} width={200} className='mt-2' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
          </a>
          <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
            {role.slice(0, 1).toUpperCase() + role.slice(1, role?.length)}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>
              <div>
                <button className='bg-blue-400 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                <button className='bg-blue-400 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
