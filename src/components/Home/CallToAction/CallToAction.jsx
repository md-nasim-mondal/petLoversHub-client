import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import pic from "../../../assets/images/3810386.jpg";
import useAuth from "../../../hooks/useAuth";

const CallToAction = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <section
        className='relative min-h-96 bg-cover bg-center rounded-t-xl flex flex-col items-center justify-center text-center p-4 sm:p-8'
        style={{ backgroundImage: `url(${pic})` }}>
        <div className='bg-black bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 rounded-t-xl'>
          <Skeleton height={40} width={300} className='mb-4' />
          <Skeleton
            count={3}
            height={20}
            width={250}
            smWidth={400}
            className='mb-2'
          />
          <Skeleton height={40} width={200} />
        </div>
      </section>
    );
  }

  return (
    <section
      className='relative min-h-96 bg-contain bg-center rounded-t-xl flex flex-col items-center justify-center text-center'
      style={{ backgroundImage: `url(${pic})` }}>
      <div className='bg-black min-h-96 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 w-full h-full flex flex-col items-center justify-center text-center p-4 sm:p-8 rounded-t-xl'>
        <h2 className='text-gray-200 dark:text-blue-200 text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 leading-tight'>
          Find Your Perfect Companion
        </h2>
        <p className='text-gray-200 dark:text-blue-100 text-lg lg:text-xl mb-4 sm:mb-6 font-semibold w-full md:w-[90%]'>
          At PetLoversHub, we believe every pet deserves a loving home. Whether
          you&apos;re looking for a playful puppy, a serene cat, or a gentle
          rabbit, your new best friend is waiting for you. Adopting a pet not
          only enriches your life but also saves theirs. Join us in making a
          difference today by opening your heart and home to a deserving animal.
        </p>
        <ul className='text-gray-200 dark:text-blue-100 text-left mb-4 sm:mb-6 font-medium  text-base lg:text-lg'>
          <li className='flex items-center mb-2'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6 fill-current text-green-300 dark:text-green-200 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
            </svg>
            Our adoption process is designed to be easy and personalized,
            ensuring you find the perfect match for your lifestyle and
            preferences.
          </li>
          <li className='flex items-center mb-2'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6 fill-current text-green-300 dark:text-green-200 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
            </svg>
            Meet pets who are eagerly waiting to become a part of your family
            and share their unconditional love.
          </li>
          <li className='flex items-center'>
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6 fill-current text-green-300 dark:text-green-200 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
            </svg>
            By adopting from PetLoversHub, you not only provide a loving home
            but also support our mission to rescue and care for animals in need.
          </li>
        </ul>
        <Link
          to='/pet-listing'
          className='text-white bg-gradient-to-r from-green-400 to-green-500 hover:bg-gradient-to-br font-semibold rounded-lg py-2 px-4 sm:py-3 sm:px-8 text-center inline-block transition duration-300 ease-in-out max-w-full'>
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
