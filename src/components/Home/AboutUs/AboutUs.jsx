import img from "../../../assets/images/aboutPetLoversHub1.jpg";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutUs = () => {
  const { loading } = useAuth();

  return (
    <section className='py-16 bg-gradient-to-r from-green-100 to-blue-100 dark:from-blue-900 dark:to-green-900'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center'>
        <div className='w-full md:w-3/4 lg:w-1/2 mb-8 md:mb-0'>
          {loading ? (
            <>
              <Skeleton height={40} width={300} className='mb-4' />
              <Skeleton count={5} height={20} className='mb-4' />
            </>
          ) : (
            <>
              <h2 className='text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300'>
                About PetLoversHub
              </h2>
              <p className='text-lg mb-4 text-gray-700 dark:text-gray-200'>
                <span className='text-green-700 dark:text-green-300 font-semibold'>
                  PetLoversHub
                </span>{" "}
                was created to connect loving families with pets in need of a
                forever home. Our mission is to simplify the pet adoption
                process, provide resources and support for new pet owners, and
                advocate for the well-being of all animals. Join our community
                and help us make a difference, one adoption at a time.
              </p>
            </>
          )}
        </div>
        <div className='w-full md:w-3/4 lg:w-1/2'>
          {loading ? (
            <Skeleton height={300} className='rounded-lg shadow-lg' />
          ) : (
            <img src={img} alt='About Us' className='rounded-lg shadow-lg' />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
