import { useEffect, useState } from "react";
import {
  FaFacebookMessenger,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTelegram,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const Contact = () => {
  const { loading } = useAuth();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShouldAnimate(true);
      AOS.init();
    }
  }, []);

  if (loading) {
    return (
      <div className='w-[94%] md:w-full mx-auto mb-12 py-16 lg:py-32 md:min-h-[60vh] bg-cover bg-center bg-no-repeat bg-opacity-60 shadow-lg my-12 rounded-3xl'>
        <Helmet>
          <title>PetLoversHub || Contact</title>
        </Helmet>
        <h1 className='text-2xl md:text-5xl flex items-center font-bold text-blue-500'>
          <IoMdContact className='text-7xl text-blue-600' />
          <Skeleton width={300} height={40} />
        </h1>
        <div className='flex flex-col md:flex-row justify-center gap-8 mt-12'>
          <div className='flex flex-col w-[94%] mx-auto md:w-[40%] gap-6 border-2 p-6 rounded-lg'>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={100} />
            <Skeleton width={150} height={40} />
          </div>
          <div className='flex flex-col gap-4 items-center md:items-start md:pr-8'>
            <Skeleton width={300} height={40} />
            <div className='text-4xl flex gap-4 text-blue-500'>
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
            </div>
            <Skeleton width={300} height={40} />
            <div className='text-4xl flex gap-4 text-blue-500'>
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
            </div>
            <Skeleton width={300} height={40} />
            <Skeleton width={200} height={40} />
          </div>
        </div>
        <div className="text-center">

        <Skeleton width={300} height={40} className='mt-12' />
        </div>
      </div>
    );
  }

  const handleSendButton = () => {
    toast.success("This section is under maintaining Process.");
  };

  return (
    <div className='w-[94%] md:w-full mx-auto pb-12 md:min-h-[60vh] bg-cover bg-center bg-no-repeat bg-opacity-60 shadow-lg rounded-3xl'>
      <Helmet>
        <title>PetLoversHub || Contact</title>
      </Helmet>
      <SectionTitle
        title='Get in Touch with Us'
        description="Have questions or need assistance? Reach out to the PetLoversHub team! Whether you're looking for adoption advice, want to learn more about our services, or need support with your account, we're here to help. Contact us via phone, email, or our online form, and we'll respond promptly to ensure you have the best experience."
      />
      <h1
        className={`${
          shouldAnimate ? "animate__animated animate__backInDown" : ""
        } text-2xl md:text-5xl flex items-center font-bold text-blue-500`}>
        <IoMdContact className='text-7xl text-blue-600' /> Contact With Us
      </h1>
      <div className='flex flex-col md:flex-row justify-center gap-8 mt-12'>
        <div
          className={`${
            shouldAnimate ? "animate__animated animate__fadeInUpBig" : ""
          } flex flex-col w-[94%] mx-auto md:w-[40%] gap-6 border-2 p-6 rounded-lg`}>
          <input
            type='text'
            placeholder='Name'
            className='input input-bordered w-full'
          />
          <input
            type='number'
            placeholder='Mobile'
            className='input input-bordered w-full'
          />
          <input
            type='email'
            placeholder='E-mail'
            className='input input-bordered w-full'
          />
          <textarea
            placeholder='Message'
            className='textarea textarea-bordered textarea-lg w-full'></textarea>
          <button
            onClick={handleSendButton}
            className='w-[40%] bg-blue-600 text-[#FFFFFF] rounded-md py-2'>
            Send
          </button>
        </div>
        <div className='flex flex-col gap-4 items-center md:items-start md:pr-8'>
          <h3
            className={`${
              shouldAnimate ? "animate__animated animate__flip" : ""
            } text-3xl dark:text-white`}>
            Visit our social pages
          </h3>
          <div
            className={`${
              shouldAnimate ? "animate__animated animate__rollIn" : ""
            } text-4xl flex gap-4 text-blue-500`}>
            <a href='#'>
              <FaFacebookSquare />
            </a>
            <a href='#'>
              <FaInstagramSquare />
            </a>
            <a href='#'>
              <FaTwitterSquare />
            </a>
            <a href='#'>
              <FaLinkedinIn />
            </a>
          </div>
          <h3
            className={`${
              shouldAnimate ? "animate__animated animate__zoomInUp" : ""
            } text-3xl dark:text-white font-semibold`}>
            Chat With Us
          </h3>
          <div
            className={`${
              shouldAnimate ? "animate__animated animate__zoomInRight" : ""
            } text-4xl flex gap-4 text-blue-500`}>
            <a href='#'>
              <FaFacebookMessenger />
            </a>
            <a href='#'>
              <FaWhatsappSquare />
            </a>
            <a href='#'>
              <FaTelegram />
            </a>
          </div>
          <div
            className={`${
              shouldAnimate ? "animate__animated animate__rollIn" : ""
            }`}>
            <h3 className='text-3xl dark:text-white'>Call Our Hot-Lines</h3>
            <a className='text-3xl dark:text-white' href='#'>
              01699308-485
            </a>
          </div>
        </div>
      </div>
      <h3 className='text-3xl font-semibold text-center mt-12 dark:text-white'>
        Thanks for visiting us
      </h3>
    </div>
  );
};

export default Contact;
