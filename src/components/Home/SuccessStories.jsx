import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      beforeImg: "/path/to/before-image1.jpg",
      afterImg: "/path/to/after-image1.jpg",
      story: "This is a success story 1",
    },
    {
      id: 2,
      beforeImg: "/path/to/before-image2.jpg",
      afterImg: "/path/to/after-image2.jpg",
      story: "This is a success story 2",
    },
    // Add more stories as needed
  ];

  return (
    <section className='pb-16 bg-green-100 dark:bg-purple-900 dark:bg-opacity-20'>
      <div className='container mx-auto'>
        <SectionTitle
          title='Success Stories'
          description="Read heartwarming tales of pets finding their forever homes through PetLoversHub. Explore how our community's support and dedication have transformed the lives of rescued animals. Celebrate the joy of adoption and share in the inspiring journeys of these beloved pets."
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {stories.map((story, index) => (
            <div
              key={index + 1}
              className='bg-white dark:bg-purple-700 dark:bg-opacity-30 p-4 rounded-lg shadow-lg'>
              <div className='flex justify-between'>
                <img
                  src={story?.beforeImg}
                  alt='Before'
                  className='w-1/2 rounded-lg mr-2'
                />
                <img
                  src={story?.afterImg}
                  alt='After'
                  className='w-1/2 rounded-lg ml-2'
                />
              </div>
              <p className='mt-4 text-gray-900 dark:text-gray-200'>
                {story?.story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
