import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import p1 from "../../../assets/images/cat2.jpg";
import p2 from "../../../assets/images/bird1.jpg";
import p3 from "../../../assets/images/rabbit1.jpg";
import p4 from "../../../assets/images/fish1.jpg";
import p5 from "../../../assets/images/cat1.jpg";
import p6 from "../../../assets/images/dog1.jpg";
import useAuth from "../../../hooks/useAuth";

const Banner = () => {
  const { loading } = useAuth();

  const slides = [
    {
      image: p1,
      title: "Adopt Your New Feline Friend",
      description:
        "Discover the joy of having a cat as your companion. At PetLoversHub, we connect you with loving cats looking for a forever home. Start your adoption journey today!",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
    {
      image: p2,
      title: "Welcome A Feathered Friend Into Your Home",
      description:
        "Birds bring color and song into our lives. PetLoversHub helps you find the perfect feathered companion to brighten your days and provide endless entertainment.",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
    {
      image: p3,
      title: "Find Your Perfect Rabbit Companion",
      description:
        "Rabbits are gentle, loving, and playful. Let PetLoversHub guide you in adopting a rabbit that will hop right into your heart and home.",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
    {
      image: p4,
      title: "Dive Into Pet Ownership With Aquatic Life",
      description:
        "Fish tanks bring tranquility and beauty to any space. Explore our wide range of aquatic pets at PetLoversHub and create your own underwater paradise.",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
    {
      image: p5,
      title: "Meet Your New Kitten",
      description:
        "Kittens bring endless joy and mischief. Find your playful bundle of fur at PetLoversHub and experience the magic of kittenhood.",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
    {
      image: p6,
      title: "Find Your Loyal Dog Companion",
      description:
        "Dogs are more than pets; they&apos;re family. Discover the perfect dog at PetLoversHub and bring home a loyal friend who will always be by your side.",
      linkText: "Adopt A Pet",
      linkTo: "/pet-listing",
    },
  ];

  return (
    <div>
      {loading ? (
        <div className='w-[94%] md:w-full mx-auto mb-12 mt-6 md:mb-16 md:mt-8'>
          <Skeleton height={550} className='rounded-xl md:rounded-3xl' />
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          className='mySwiper'>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto mb-12 md:mb-16 md:mt-8'
                style={{
                  backgroundImage: `url(${slide?.image})`,
                }}>
                <div className='flex items-center justify-center w-full h-full bg-gray-900/40 rounded-xl md:rounded-3xl'>
                  <div className='text-center w-[90%] lg:w-[80%]'>
                    <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                      {slide?.title}
                    </h1>
                    <p className='mb-5 font-medium text-white'>
                      {slide?.description}
                    </p>
                    <Link
                      to={slide?.linkTo}
                      className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                      {slide?.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
