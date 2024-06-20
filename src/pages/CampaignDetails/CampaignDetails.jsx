import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import DonateModal from "../../components/Modal/DonateModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

const CampaignDetails = () => {
  const { id } = useParams();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const [donateAmount, setDonateAmount] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    data: campaign = {},
    refetch,
    isLoading: isCampaignLoading,
  } = useQuery({
    queryKey: ["campaign", id],
    enabled: !!id,
    queryFn: async () => {
      if (id) {
        const { data } = await axiosSecure.get(`/campaign/${id}`);
        return data;
      }
    },
  });
  const formattedDate = campaign?.createdAt
    ? format(new Date(campaign.createdAt), "MMMM dd, yyyy")
    : "";

  const closeModal = () => {
    setIsDonateModalOpen(false);
  };

  const handleDonateModal = () => {
    const pause = campaign?.pauseStatus;
    if (pause) return toast.error('This Campaign is Pause So You cannot Donate For this pet');
     setIsDonateModalOpen(true);
  };

  return (
    <div>
      {isCampaignLoading || loading ? (
        <Skeleton height={40} width={400} className='mx-auto mt-6' />
      ) : (
        <h3 className='mt-6 text-xl md:text-3xl lg:text-4xl font-bold text-center dark:text-white'>
          Here is Showing Campaign Details
        </h3>
      )}
      <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto my-12 md:my-24 transition-all duration-300'>
        {isCampaignLoading || loading ? (
          <Skeleton
            width={320}
            height={320}
            className='rounded-t-lg md:rounded-none md:rounded-s-lg'
          />
        ) : (
          <img
            className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg'
            src={campaign?.petImage}
            alt=''
          />
        )}
        <div className='flex flex-col justify-between p-6 leading-normal space-y-4 relative'>
          {isCampaignLoading ? (
            <>
              <Skeleton height={30} width={300} />
              <Skeleton height={20} width={250} />
              <Skeleton count={3} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={150} />
              <Skeleton height={50} width={120} />
            </>
          ) : (
            <>
              <h5 className='text-3xl font-extrabold tracking-tight text-purple-700 dark:text-purple-300'>
                Pet Name: {campaign?.petName}
              </h5>
              <div className='flex flex-wrap justify-between items-center gap-8'>
                <p className='text-xl font-bold text-blue-800 dark:text-blue-300'>
                  Donated Amount: {campaign?.donatedAmount} $
                </p>
                <p>
                  <span className='font-semibold dark:text-white'>
                    Campaign Status:
                  </span>{" "}
                  <span className={`px-2 py-1 rounded-md ${campaign?.pauseStatus ? "bg-orange-300" : 'bg-blue-300'}`}>{campaign?.pauseStatus ? "Paused" : "Unpaused"}</span>
                </p>
              </div>
              <p className='text-xl font-bold text-green-800 dark:text-green-300'>
                Maximum Donation Amount: {campaign?.maxDonationAmount} $
              </p>
              <p className='font-medium text-gray-700 dark:text-gray-400'>
                <span className='text-lg font-bold text-indigo-800 dark:text-indigo-300'>
                  Short Description:
                </span>
                <br />
                {campaign?.shortDescription}
              </p>
              <p className='font-medium text-gray-700 dark:text-gray-400'>
                <span className='text-lg font-bold text-teal-800 dark:text-teal-300'>
                  Full Description:
                </span>
                <br />
                {campaign?.longDescription}
              </p>
              <div className='flex flex-wrap justify-between items-center gap-8'>
                <p className='text-lg font-semibold text-red-800 dark:text-red-300'>
                  Posted At: {formattedDate}
                </p>
                <p className='text-lg font-semibold text-yellow-800 dark:text-yellow-300'>
                  End Date: {campaign?.endDate}
                </p>
              </div>
              <button
                onClick={() => handleDonateModal()}
                className='px-6 py-2 mt-4 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300'>
                Donate Now
              </button>
              <DonateModal
                isOpen={isDonateModalOpen}
                closeModal={closeModal}
                donateInfo={{
                  ...campaign,
                  donator: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                    donateAmount,
                  },
                }}
                setDonateAmount={setDonateAmount}
                refetch={refetch}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
