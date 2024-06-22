import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SectionTitle = ({ title = "", description = "" }) => {
  const { loading } = useAuth();

  return (
    <div className='w-[90%] md:w-[80%] mx-auto'>
      {loading ? (
        <>
          <Skeleton
            height={40}
            width={`100%`}
            className='pt-12 pb-6'
          />
          <Skeleton count={2} width={`100%`} className='mb-10' />
        </>
      ) : (
        <>
          <h1 className='text-2xl md:text-3xl xl:text-4xl dark:text-white text-center font-bold pt-12 pb-6'>
            {title}
          </h1>
          <p className='text-center dark:text-white text-base md:text-lg mb-10'>
            {description}
          </p>
        </>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SectionTitle;
