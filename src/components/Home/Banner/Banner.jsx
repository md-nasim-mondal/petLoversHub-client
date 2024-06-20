import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import p1 from "../../../assets/images/cat2.jpg";
import p2 from "../../../assets/images/bird1.jpg";
import p3 from "../../../assets/images/rabbit1.jpg";
import p4 from "../../../assets/images/fish1.jpg";
import p5 from "../../../assets/images/cat1.jpg";
import p6 from "../../../assets/images/dog1.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // Change this to false
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        className='mySwiper'>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p1})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Adopt Your New{" "}
                  <span className='text-blue-400'>Feline Friend</span>
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Discover the joy of having a cat as your companion. At
                  PetLoversHub, we connect you with loving cats looking for a
                  forever home. Start your adoption journey today!
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p2})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Welcome A{" "}
                  <span className='text-blue-400'>Feathered Friend</span> Into
                  Your Home
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Birds bring color and song into our lives. PetLoversHub helps
                  you find the perfect feathered companion to brighten your days
                  and provide endless entertainment.
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p3})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Find Your Perfect{" "}
                  <span className='text-blue-400'>Rabbit Companion</span>
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Rabbits are gentle, loving, and playful. Let PetLoversHub
                  guide you in adopting a rabbit that will hop right into your
                  heart and home.
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p4})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Dive Into Pet Ownership With{" "}
                  <span className='text-blue-400'>Aquatic Life</span>
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Fish tanks bring tranquility and beauty to any space. Explore
                  our wide range of aquatic pets at PetLoversHub and create your
                  own underwater paradise.
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p5})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Meet Your New <span className='text-blue-400'>Kitten</span>
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Kittens bring endless joy and mischief. Find your playful
                  bundle of fur at PetLoversHub and experience the magic of
                  kittenhood.
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className='bg-cover bg-center h-[550px] lg:min-h-[660px] xl:min-h-[720px] rounded-xl md:rounded-3xl bg-no-repeat w-[94%] md:w-full mx-auto my-12 md:my-16'
            style={{
              backgroundImage: `url(${p6})`,
            }}>
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40'>
              <div className='text-center w-[90%] lg:w-[80%]'>
                <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
                  Find Your Loyal <span className='text-blue-400'>Dog</span>{" "}
                  Companion
                </h1>
                <p className='mb-5 font-medium text-white'>
                  Dogs are more than pets; they&apos;re family. Discover the
                  perfect dog at PetLoversHub and bring home a loyal friend who
                  will always be by your side.
                </p>
                <Link
                  to='/pet-listing'
                  className='w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md md:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                  Adopt A Pet
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
