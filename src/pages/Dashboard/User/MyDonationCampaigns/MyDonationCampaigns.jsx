import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonTable from "../../../../components/SkeletonTable/SkeletonTable";

const MyDonationCampaigns = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showDonators, setShowDonators] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pauseStatus, setPauseStatus] = useState(null);

  const {
    data: campaigns = [],
    refetch,
    isLoading: isCampaignsLoading,
  } = useQuery({
    queryKey: ["campaigns", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/donation-campaigns/${user.email}`
        );
        return data;
      }
    },
  });

  const { mutateAsync: updateCampaignPauseStatus } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/updateStatus-campaign/${id}`, {
        pauseStatus: !pauseStatus,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Campaign Pause Status Successfully Updated!!");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handlePause = async (campaignId) => {
    try {
      updateCampaignPauseStatus(campaignId);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleViewDonators = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonators(true);
  };

  const handleCloseDonators = () => {
    setShowDonators(false);
    setSelectedCampaign(null);
  };
  
  if (!campaigns.length) {
    return (
      <h1 className='text-3xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
        {isCampaignsLoading || loading ? (
          <SkeletonTable rows={5} columns={7} />
        ) : (
          `You haven't Created Any Campaigns.`
        )}
      </h1>
    );
  }

  return (
    <div className='container mx-auto'>
      {isCampaignsLoading || loading ? (
        <Skeleton height={40} width={300} className='my-6 md:my-12 mx-auto' />
      ) : (
        <h1 className='text-2xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
          Created Donation Campaigns List Of {user?.displayName}
        </h1>
      )}
      <div className='overflow-x-auto'>
        {isCampaignsLoading || loading ? (
          <Skeleton count={5} height={40} className='my-2' />
        ) : (
          <table className='table-auto w-full dark:text-white'>
            <thead>
              <tr>
                <th className='border px-4 py-2'>Pet Name</th>
                <th className='border px-4 py-2'>Maximum Donation Amount</th>
                <th className='border px-4 py-2'>Donation Progress</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign?._id}>
                  <td className='border px-4 py-2'>{campaign?.petName}</td>
                  <td className='border px-4 py-2'>
                    {campaign?.maxDonationAmount}
                  </td>
                  <td className='border px-4 py-2'>
                    <div className='bg-gray-200 w-full'>
                      <div
                        className='bg-green-500 text-xs leading-none py-1 text-center text-white'
                        style={{
                          width: `${
                            (campaign?.donatedAmount /
                              campaign?.maxDonationAmount) *
                            100
                          }%`,
                        }}>
                        {Math.round(
                          (campaign?.donatedAmount /
                            campaign?.maxDonationAmount) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </td>
                  <td className='border px-4 py-2'>
                    <button
                      className='text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'
                      onClick={() => {
                        handlePause(campaign?._id);
                        setPauseStatus(campaign?.pauseStatus);
                      }}>
                      {campaign?.pauseStatus ? "Unpause" : "Pause"}
                    </button>{" "}
                    <Link to={`/dashboard/update-campaign/${campaign?._id}`}>
                      <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                        Edit
                      </button>{" "}
                    </Link>
                    <button
                      className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                      onClick={() => handleViewDonators(campaign)}>
                      View Donators
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedCampaign && (
        <div
          className={
            showDonators
              ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              : "hidden"
          }>
          <div className='modal-content bg-white w-1/2 p-4'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold'>
                Donators for {selectedCampaign.petName}
              </h2>
              <button
                onClick={handleCloseDonators}
                className='text-red-500 hover:text-red-700 text-3xl'>
                &times;
              </button>
            </div>
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <th className='border px-4 py-2'>Donator</th>
                  <th className='border px-4 py-2'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedCampaign.donators?.map((donator, index) => (
                  <tr key={index}>
                    <td className='border px-4 py-2'>{donator?.name}</td>
                    <td className='border px-4 py-2'>{donator?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaigns;
