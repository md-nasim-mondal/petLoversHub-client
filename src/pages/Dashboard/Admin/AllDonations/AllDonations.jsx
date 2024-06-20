import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonTable from "../../../../components/SkeletonTable/SkeletonTable";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyDonationCampaigns = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showDonators, setShowDonators] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pauseStatus, setPauseStatus] = useState(null);

  const {
    data: campaigns = [],
    refetch,
    isLoading: isCampaignsLoading,
  } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donationCampaigns`);
      return data;
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

  const { mutateAsync: deleteCampaign } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/delete-campaign/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Campaign Successfully Deleted!!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCampaign(id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  }

  const handlePause = async (campaignId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Pause Status",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          updateCampaignPauseStatus(campaignId);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
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
          `Any Donation Campaigns Not Available.`
        )}
      </h1>
    );
  }

  return (
    <div className='container mx-auto'>
      <Helmet>
        <title>PetLoversHub || All Donations</title>
      </Helmet>
      {isCampaignsLoading || loading ? (
        <Skeleton height={40} width={300} className='my-6 md:my-12 mx-auto' />
      ) : (
        <h1 className='text-2xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
          All Donation Campaigns List.
        </h1>
      )}
      <div className='overflow-x-auto'>
        {isCampaignsLoading || loading ? (
          <Skeleton count={5} height={40} className='my-2' />
        ) : (
          <table className='table-auto w-full dark:text-white'>
            <thead>
              <tr>
                <th className='border px-4 py-2'>Campaigns Created By</th>
                <th className='border px-4 py-2'>Pet Name</th>
                <th className='border px-4 py-2'>Maximum Donation Amount</th>
                <th className='border px-4 py-2'>Donated Amount</th>
                <th className='border px-4 py-2'>Donation Progress</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign?._id}>
                  <td className='border px-4 py-2 text-center'>
                    {campaign?.creator?.name}
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    {campaign?.petName}
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    {campaign?.maxDonationAmount} $
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    {campaign?.donatedAmount} $
                  </td>
                  <td className='border px-4 py-2 text-center'>
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
                  <td className='border px-4 py-2 text-center flex'>
                    <button
                      className='text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-0 md:py-2.5 me-2 mb-2'
                      onClick={() => {
                        setPauseStatus(campaign?.pauseStatus);
                        handlePause(campaign?._id);
                      }}>
                      {campaign?.pauseStatus ? "Unpause" : "Pause"}
                    </button>{" "}
                    <button
                      className='text-white bg-red-400 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-0 md:py-2.5 me-2 mb-2'
                      onClick={() => {
                        handleDelete(campaign?._id);
                      }}>
                      Delete
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
          <div className='modal-content bg-white md:w-1/2 p-4 overflow-auto w-[90%]'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl md:text-3xl xl:text-4xl flex-1 text-center font-bold'>
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
                  <th className='border px-4 py-2 text-center'>Donator Name</th>
                  <th className='border px-4 py-2 text-center'>
                    Donated Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCampaign.donators?.map((donator, index) => (
                  <tr key={index}>
                    <td className='border px-4 py-2 text-center'>
                      {donator?.name}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {donator?.donateAmount} $
                    </td>
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
