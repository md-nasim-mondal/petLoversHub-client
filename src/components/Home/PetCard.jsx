import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../hooks/useAuth";

const PetCard = ({ pet }) => {
  const { loading } = useAuth();

  return (
    <div className='md:p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 max-w-[290px] md:max-w-[350px]'>
      {loading ? (
        <Skeleton height={192} className='rounded-t-lg' />
      ) : (
        <img
          className='rounded-t-lg min-w-full md:min-w-[300px] h-48 mx-auto'
          src={pet?.petImage}
          alt={pet?.petName}
        />
      )}
      <div className='p-4 md:p-0'>
        <h4 className='mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Name:{" "}
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <span className='text-blue-500'>{pet?.petName}</span>
          )}
        </h4>
        <div className='flex justify-between items-center flex-wrap gap-1'>
          <p className='mb-1 font-medium text-gray-700 dark:text-gray-400 flex flex-wrap'>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <>
                {pet?.petName} Age:{" "}
                <span className='text-green-500 ml-1'>
                  {pet?.petAge} months
                </span>
              </>
            )}
          </p>
          <p className='mb-1 font-medium text-gray-700 dark:text-gray-400'>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <>
                Category:{" "}
                <span className='text-green-500 ml-1'>{pet?.petCategory}</span>
              </>
            )}
          </p>
        </div>
        <div className='flex justify-between items-center flex-wrap gap-1 '>
          <p className='text-black dark:text-white  flex flex-wrap'>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                Location: <span className='ml-2'> {pet?.petLocation}</span>
              </>
            )}
          </p>
          {loading ? (
            <Skeleton width={100} height={36} className='rounded-lg' />
          ) : (
            <Link
              to={`/pet-details/${pet?._id}`}
              className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 min-w-fit'>
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object,
};

export default PetCard;
