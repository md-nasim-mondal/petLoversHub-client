import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton

const ResourcesTips = () => {
  const { loading } = useAuth();

  const resources = [
    {
      title: "Training Tips",
      description: "Learn how to train your pet with our comprehensive guides.",
      link: "/training-tips",
    },
    {
      title: "Health & Nutrition",
      description: "Ensure your pet stays healthy with our nutrition advice.",
      link: "/health-nutrition",
    },
    {
      title: "Pet Care Guides",
      description:
        "Find out how to take care of your pet with our detailed guides.",
      link: "/pet-care-guides",
    },
    {
      title: "Community Forums",
      description: "Join our community and share your experiences.",
      link: "/community-forums",
    },
  ];

  return (
    <section className='pb-16 bg-blue-50 dark:bg-teal-900 rounded-b-xl'>
      <div className='container mx-auto px-4 lg:px-8'>
        <SectionTitle
          title='Resources & Tips'
          description='Discover valuable resources and expert tips to enhance your pet adoption journey. From care guides to training advice, our comprehensive resources empower you to provide the best for your new furry friend. Ensure a happy and fulfilling life together with these helpful insights.'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className='bg-white dark:bg-teal-800 p-4 rounded-lg shadow-lg'>
                    <Skeleton height={30} className='mb-2' />
                    <Skeleton count={3} height={20} className='mb-4' />
                    <Skeleton width={100} height={20} />
                  </div>
                ))
            : resources.map((resource, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-teal-800 p-4 rounded-lg shadow-lg'>
                  <h3 className='text-xl font-bold mb-2 text-gray-900 dark:text-gray-100'>
                    {resource.title}
                  </h3>
                  <p className='mb-4 text-gray-700 dark:text-gray-200'>
                    {resource.description}
                  </p>
                  <a
                    href={resource.link}
                    className='text-green-500 font-bold dark:text-green-300'>
                    Learn More
                  </a>
                </div>
              ))}
        </div>
        <div className='mt-6 text-center'>
          <button className='text-black hover:text-white dark:text-white hover:bg-blue-500  hover:dark:text-black font-medium rounded-lg py-3 px-8 text-center inline-block transition duration-300 ease-in-out border border-blue-600'>
            See More Resource & Tips
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesTips;
