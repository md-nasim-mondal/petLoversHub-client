import { Link } from "react-router-dom";
import pic from "../../../assets/images/callToActionPetCard.jpg";

const CallToAction = () => {
  return (
    <section
      className='relative h-96 bg-cover bg-center rounded-t-xl'
      style={{ backgroundImage: `url(${pic})` }}>
      <div className='absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex flex-col items-center justify-center text-center p-8 rounded-t-xl'>
        <h2 className='text-white text-4xl font-bold mb-4 leading-tight'>
          Find Your Perfect Companion
        </h2>
        <p className='text-white text-lg mb-6 font-semibold'>
          At PetLoversHub, we believe every pet deserves a loving home. Whether
          you&apos;re looking for a playful puppy, a serene cat, or a gentle
          rabbit, your new best friend is waiting for you. Adopting a pet not
          only enriches your life but also saves theirs. Join us in making a
          difference today by opening your heart and home to a deserving animal.
        </p>
        <ul className='text-white text-left mb-6 font-medium'>
          <li className='flex items-center mb-2'>
            <svg
              className='w-6 h-6 fill-current text-blue-400 mr-2'
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
              className='w-6 h-6 fill-current text-blue-400 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' />
            </svg>
            Meet pets who are eagerly waiting to become a part of your family
            and share their unconditional love.
          </li>
          <li className='flex items-center'>
            <svg
              className='w-6 h-6 fill-current text-blue-400 mr-2'
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
          className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg py-3 px-8 text-center inline-block transition duration-300 ease-in-out'>
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
