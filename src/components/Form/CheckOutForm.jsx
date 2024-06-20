import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ImSpinner9 } from "react-icons/im";
import "./CheckOutForm.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ closeModal, donateInfo, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [donators, setDonators] = useState(donateInfo?.donators || []);

  // get clientSecret
  const getClientSecret = async (donateAmount) => {
    const { data } = await axiosSecure.post(
      "/create-payment-intent",
      donateAmount
    );
    setClientSecret(data.clientSecret);
    // console.log(data);
    // return data;
  };

  useEffect(() => {
    // fetch client secret
    if (
      donateInfo?.donator?.donateAmount &&
      donateInfo?.donator?.donateAmount > 1
    ) {
      getClientSecret({ donateAmount: donateInfo?.donator?.donateAmount });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donateInfo?.donator?.donateAmount]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setProcessing(false);
      return setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // 1. Create Payment Info Object
      const donateInfoData = {
        ...donateInfo,
        totalDonatedAmount: donateInfo?.donatedAmount,
        campaignId: donateInfo?._id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      const updateDonatedAmount = parseFloat(
        parseFloat(donateInfo?.donatedAmount) +
          parseFloat(donateInfo?.donator?.donateAmount)
      );
      setDonators(donateInfo?.donators);
      const newDonator = {
        ...donateInfo?.donator,
        donatedAmount: donateInfo?.donator?.donateAmount,
        donatedDate: new Date().toISOString(),
      };
      const updateCampaignData = {
        donators: [...donators, newDonator],
        donatedAmount: updateDonatedAmount,
      };
      delete donateInfoData._id;
      delete donateInfoData.donatedAmount;
      // console.log(donateInfoData);
      try {
        // 2. save payment info in donates collection (db)
        await axiosSecure.post(`/donates`, donateInfoData);
        // 3. change room status to booked in db
        await axiosSecure.put(
          `/update-donateInfo-campaign/${donateInfo._id}`,
          updateCampaignData
        );

        // update UI
        refetch();
        closeModal();
        toast.success("Successfully Donated!!");
        navigate("/dashboard/my-donations");
        setProcessing(false);
      } catch (err) {
        setProcessing(false);
        setCardError(err.message);
      }
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className='flex mt-2 justify-around'>
          <button
            disabled={!stripe || !clientSecret || processing}
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'>
            {processing ? (
              <ImSpinner9 className='animate-spin m-auto' size={24} />
            ) : (
              `Donate $${donateInfo?.donator?.donateAmount}`
            )}
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
  donateInfo: PropTypes.object,
};
