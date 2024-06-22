import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section
      className='bg-cover bg-center relative h-96 rounded-t-xl'
      style={{ backgroundImage: "url(/path/to/your/inspirational-image.jpg)" }}>
      <div className='absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex flex-col items-center justify-center text-center p-4 rounded-t-xl'>
        <h2 className='text-white text-4xl font-bold mb-4 dark:text-yellow-300'>
          Make a Difference Today
        </h2>
        <p className='text-white text-lg mb-8 dark:text-yellow-200'>
          Every pet deserves a loving home. Your new best friend is waiting for
          you. Adopt a pet today and change a life forever.
        </p>
        <Link
          to='/pet-listing'
          className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          Adopt Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
