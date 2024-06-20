import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DonateModal = ({
  closeModal,
  isOpen,
  donateInfo,
  refetch,
  setDonateAmount,
}) => {
  const maxDonationAmount = donateInfo?.maxDonationAmount;
  const donateAmount = donateInfo?.donatedAmount;
  const remainingAmount =
    maxDonationAmount !== undefined && donateAmount !== undefined
      ? maxDonationAmount - donateAmount
      : 0;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'>
                  Review Info Before Donation
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    PetName: {donateInfo?.petName}
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    For Completing the Donate Maximum Amount Need: {remainingAmount} $
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Donator: {donateInfo?.donator?.name}
                  </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'></p>
                </div>

                <div className='mt-2'>
                  <label htmlFor='donateAmount'>Donate Amount: </label>
                  <input
                    type='number'
                    id='donateAmount'
                    name='donateAmount'
                    value={donateInfo?.donator?.donateAmount}
                    onChange={(e) => setDonateAmount(e.target.value)}
                    aria-describedby='helper-text-explanation'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='90210'
                    required
                  />
                </div>
                <hr className='mt-8 ' />
                {/* checkout form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    refetch={refetch}
                    donateInfo={donateInfo}
                    closeModal={closeModal}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

DonateModal.propTypes = {
  donateInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  refetch: PropTypes.func,
  setDonateAmount: PropTypes.func,
};

export default DonateModal;
