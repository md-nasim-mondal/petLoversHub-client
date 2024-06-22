import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Login = () => {
  const { loading, setLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { signIn, signInWithGoogle, signInWithGitHub, resetPassword } =
    useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setIsLoading(true);
      await signIn(email, password);
      navigate(from);
      toast.success("SignIn Successful");
      setIsLoading(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email)
      return toast.error(
        "Please write your email first in the email input field!!"
      );
    try {
      setIsLoading(true);
      await resetPassword(email);
      toast.success(
        "Request Success! Check your email for further process.........."
      );
      setIsLoading(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate(from);
      toast.success("LogIn Successful With Google");
      setIsLoading(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGitHub();
      navigate(from);
      toast.success("LogIn Successful With Github!!");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[80vh] bg-gray-100 dark:bg-gray-900'>
        <Helmet>
          <title>PetLoversHub || Login</title>
        </Helmet>
        <div className='flex flex-col w-full max-w-xl p-6 rounded-md sm:p-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg'>
          <Skeleton height={40} width={200} className='mb-4' />
          <Skeleton height={20} width={300} className='mb-4' />
          <div className='space-y-4'>
            <Skeleton height={40} className='mb-2' />
            <Skeleton height={40} className='mb-2' />
            <Skeleton height={40} className='mb-4' />
            <Skeleton height={40} width={150} />
          </div>
          <div className='flex items-center pt-4 space-x-1'>
            <Skeleton height={2} width={50} />
            <Skeleton height={20} width={150} />
            <Skeleton height={2} width={50} />
          </div>
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} />
          <Skeleton height={20} width={250} className='mt-4' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center min-h-[80vh] bg-gray-100 dark:bg-gray-900'>
      <Helmet>
        <title>PetLoversHub | Login</title>
      </Helmet>
      <div className='flex flex-col w-full max-w-xl p-6 rounded-md sm:p-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='space-y-6 ng-untouched ng-pristine ng-valid'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                onBlur={(e) => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-rose-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-700 focus:outline-rose-500 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type='submit'
              className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full'>
              {isLoading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button
            onClick={handleResetPassword}
            className='text-xs hover:underline hover:text-rose-500 text-gray-400 dark:text-gray-500'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700'></div>
          <p className='px-3 text-sm text-gray-600 dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <button
          disabled={isLoading}
          type='button'
          onClick={handleGithubSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 md:p-3 border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600'>
          <svg
            className='w-6 h-6 me-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
              clipRule='evenodd'
            />
          </svg>
          <p>Continue with Github</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-600 dark:text-gray-400'>
          Don&apos;t have an account yet?{" "}
          <Link to='/signup' className='hover:underline text-blue-500'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
