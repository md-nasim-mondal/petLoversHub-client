import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PetCard = ({ pet }) => {
  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <img
        className='rounded-t-lg h-48 w-full'
        src={pet?.petImage}
        alt={pet?.petName}
      />
      <div>
        <h4 className='mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Name: <span className='text-blue-500'>{pet?.petName}</span>
        </h4>
        <div className='flex justify-between items-center'>
          <p className='mb-1 font-medium text-gray-700 dark:text-gray-400'>
            {pet?.petName} Age:{" "}
            <span className='text-green-500'>{pet?.petAge} months</span>
          </p>
          <p className='mb-1 font-medium text-gray-700 dark:text-gray-400'>
            Category: <span className='text-green-500'>{pet?.petCategory}</span>
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-teal-500'>Location: {pet?.petLocation}</p>
          <Link
            to={`/pet-details/${pet?._id}`}
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object,
};

export default PetCard;
