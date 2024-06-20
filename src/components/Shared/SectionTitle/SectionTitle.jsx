import PropTypes from "prop-types"
const SectionTitle = ({ title="", description="" }) => {
  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <h1 className='text-2xl md:text-3xl xl:text-4xl dark:text-white text-center font-bold mt-12 md:mt-16 mb-6'>{title}</h1>
      <p className="text-center dark:text-white text-base md:text-lg mb-10">{description}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,

}

export default SectionTitle;