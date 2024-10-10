import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for the skeleton
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";

const CommunityTestimonials = () => {
  const { loading } = useAuth();
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      location: "New York, NY",
      testimonial:
        "Adopting from PetLoversHub was the best decision our family made. Our new dog has brought so much joy into our lives!",
    },
    {
      id: 2,
      name: "John Smith",
      location: "Los Angeles, CA",
      testimonial:
        "We adopted two cats from PetLoversHub, and they quickly became part of our family. Thank you for making the process easy and rewarding.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      location: "Chicago, IL",
      testimonial:
        "After adopting a kitten from PetLoversHub, our home feels complete. She's brought so much love and laughter into our lives!",
    },
    {
      id: 4,
      name: "Michael Brown",
      location: "Houston, TX",
      testimonial:
        "We found our perfect match through PetLoversHub—a playful dog who has become our hiking buddy and best friend. Adopting was a breeze!",
    },
    {
      id: 5,
      name: "Sarah Adams",
      location: "Miami, FL",
      testimonial:
        "PetLoversHub made it easy to find a companion for our elderly cat. They matched us with a calm and loving cat who fits right in.",
    },
    {
      id: 6,
      name: "David Martinez",
      location: "Seattle, WA",
      testimonial:
        "We couldn't be happier with our decision to adopt a rescue rabbit from PetLoversHub. He's brought so much joy and curiosity into our home.",
    },
  ];

  if (loading) {
    return (
      <section className='pb-16 px-4 lg:px-8 bg-purple-100 dark:bg-gray-800'>
        <div className='container mx-auto '>
          <SectionTitle
            title='Community Testimonials'
            description='Explore heartfelt testimonials from our community members about their experiences with PetLoversHub. Learn how our platform has connected pets with loving families, fostering bonds that enrich lives. Join our community and share your own story of pet adoption and companionship.'
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg dark:text-white'>
                  <Skeleton count={3} height={20} className='mb-2' />
                  <Skeleton height={20} width={100} className='mb-1' />
                  <Skeleton height={20} width={150} />
                </div>
              ))}
          </div>
          <div className='mt-6 text-center'>
            <Skeleton height={40} width={200} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='pb-16 bg-purple-100 dark:bg-gray-800'>
      <div className='container mx-auto px-4 lg:px-8'>
        <SectionTitle
          title='Community Testimonials'
          description='Explore heartfelt testimonials from our community members about their experiences with PetLoversHub. Learn how our platform has connected pets with loving families, fostering bonds that enrich lives. Join our community and share your own story of pet adoption and companionship.'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg dark:text-white'>
              <p className='text-lg mb-4'>{testimonial?.testimonial}</p>
              <p className='text-sm font-bold'>{testimonial?.name}</p>
              <p className='text-sm'>{testimonial?.location}</p>
            </div>
          ))}
        </div>
        <div className='mt-6 text-center'>
          <button className='text-black hover:text-white dark:text-white hover:bg-blue-500 hover:dark:text-black font-medium rounded-lg py-3 px-8 text-center inline-block transition duration-300 ease-in-out border border-blue-600'>
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityTestimonials;
