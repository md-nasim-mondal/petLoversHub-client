import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";

const UpdateCampaign = () => {
  const { id } = useParams();
  const { loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

  const [campaignData, setCampaignData] = useState(campaign);

  useEffect(() => {
    if (campaign) {
      setCampaignData(campaign);
    }
  }, [campaign]);

  const { mutateAsync: updateCampaign } = useMutation({
    mutationFn: async (campaignData) => {
      const { data } = await axiosSecure.put(
        `/update-campaign/${campaign._id}`,
        campaignData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Campaign Data Successfully Updated!!");
      refetch();
      navigate("/dashboard/my-donation-campaigns");
      setIsLoading(false);
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message);
    },
  });

  const handleImage = async (image) => {
    setIsLoading(true);
    try {
      const image_url = await imageUpload(image);
      setCampaignData({ ...campaignData, petImage: image_url });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedCampaignData = Object.assign({}, campaignData);
    delete updatedCampaignData._id;
    try {
      await updateCampaign(updatedCampaignData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>PetLoversHub || Update Pet</title>
      </Helmet>
      {isCampaignLoading || loading ? (
        <Skeleton height={40} width={300} />
      ) : (
        <h1 className='text-2xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
          You are editing information of {campaignData?.petName}{" "}
        </h1>
      )}
      {isCampaignLoading || loading ? (
        <div className='border-2 p-8 rounded-lg max-w-4xl mx-auto'>
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={40} className='mb-4' />
          <Skeleton height={50} className='mb-4' />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='border-2 p-8 rounded-lg max-w-4xl mx-auto'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Pet Picture
            </label>
            <input
              type='file'
              name='petPicture'
              onChange={(e) => handleImage(e.target.files[0])}
              accept='image/*'
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Pet Name
            </label>
            <input
              type='text'
              name='petName'
              value={campaignData?.petName}
              onChange={(e) =>
                setCampaignData({ ...campaignData, petName: e.target.value })
              }
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Maximum Donation Amount
            </label>
            <input
              type='number'
              name='maxDonationAmount'
              value={campaignData?.maxDonationAmount}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  maxDonationAmount: e.target.value,
                })
              }
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Last Date of Donation
            </label>
            <input
              type='date'
              name='endDate'
              value={campaignData?.endDate}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  endDate: e.target.value,
                })
              }
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Short Description
            </label>
            <input
              type='text'
              name='shortDescription'
              value={campaignData?.shortDescription}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  shortDescription: e.target.value,
                })
              }
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Long Description
            </label>
            <textarea
              name='longDescription'
              value={campaignData?.longDescription}
              onChange={(e) =>
                setCampaignData({
                  ...campaignData,
                  longDescription: e.target.value,
                })
              }
              className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'>
            {isLoading ? (
              <TbFidgetSpinner className='animate-spin m-auto' />
            ) : (
              "Update Campaign"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateCampaign;
