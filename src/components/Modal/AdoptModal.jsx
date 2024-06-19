import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
const AdoptModal = ({
  setIsAdoptModalOpen,
  isOpen,
  pet,
  user,
  handleAdoptRequest,
  isLoading
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsAdoptModalOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 dark:text-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-xl md:text-3xl font-medium text-center leading-6 text-gray-900 dark:text-white'>
                  Requesting to Adopt the Pet
                </DialogTitle>
                <div className='mt-2 w-full'>
                  <hr className='mt-8 ' />
                  <div className='flex my-3 justify-center items-center gap-4'>
                    <img
                      src={pet?.petImage}
                      alt={pet?.petName}
                      className='w-28 h-28 rounded-full'
                    />
                    <h3 className='text-2xl font-semibold'>
                      You are adopting <span>{pet?.petName}.</span>
                      <br />(<span>Which age is {pet?.petAge} months</span>)
                    </h3>
                  </div>
                  {/* Adopt pet form */}
                  <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
                    <form className='space-y-6' onSubmit={handleAdoptRequest}>
                      <h5 className='text-xl font-medium text-gray-900 dark:text-white'>
                        Your Information
                      </h5>
                      <div>
                        <label
                          htmlFor='name'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                          Your Name
                        </label>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          defaultValue={user?.displayName}
                          disabled
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder={user?.displayName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='email'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                          Your Email
                        </label>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          defaultValue={user?.email}
                          disabled
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder={user?.email}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor='mobileNumber'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                          Your Mobile Number
                        </label>
                        <input
                          type='number'
                          name='mobileNumber'
                          id='mobileNumber'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder='Please write you mobile number'
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='location'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                          Your Location
                        </label>
                        <input
                          type='text'
                          name='location'
                          id='location'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                          placeholder='Your location'
                          required
                        />
                      </div>
                      <button
                        type='submit'
                        className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                        {isLoading ? (
                          <TbFidgetSpinner className='animate-spin m-auto' />
                        ) : (
                          "Send Adopt Request"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={() => setIsAdoptModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

AdoptModal.propTypes = {
  setIsAdoptModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  pet: PropTypes.object,
  user: PropTypes.any,
  handleAdoptRequest: PropTypes.func,
  isLoading: PropTypes.bool
};

export default AdoptModal;
