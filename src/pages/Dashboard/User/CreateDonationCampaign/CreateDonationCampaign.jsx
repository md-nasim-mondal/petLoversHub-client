import toast from "react-hot-toast";
import { imageUpload } from "../../../../api/utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";

const CreateDonationCampaign = () => {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutateAsync: createDonationCampaign } = useMutation({
    mutationFn: async (campaignData) => {
      const { data } = await axiosSecure.post(
        "/donation-campaigns",
        campaignData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Donation Campaign Created Successfully!!!");
      navigate("/dashboard/my-donation-campaigns");
      setIsLoading(false);
    },
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const petName = form.petName.value;
    const maxDonationAmount = parseFloat(form.maxDonationAmount.value);
    const donatedAmount = 0;
    const endDate = form.endDate.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const image = form.petPicture.files[0];
    try {
      const image_url = await imageUpload(image);
      const campaignData = {
        petImage: image_url,
        petName,
        maxDonationAmount,
        endDate,
        shortDescription,
        longDescription,
        donatedAmount,
        creator: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
        createdAt: new Date().toISOString(),
        pauseStatus: false,
      };
      try {
        await createDonationCampaign(campaignData);
        form.reset();
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>PetLoversHub || Create-Donation-Campaigns</title>
      </Helmet>
      <SectionTitle
        title='Create a Donation Campaign'
        description='Launch a donation campaign to support pets in need. Customize your campaign with a compelling story, set fundraising goals, and share it with the community. Your initiative can provide vital resources and care for homeless pets, helping them find loving homes.'
      />
      <div className='max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-md'>
        {isLoading || loading ? (
          <Skeleton height={30} width={300} />
        ) : (
          <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
            Create Donation Campaign
          </h1>
        )}
        {isLoading || loading ? (
          <div>
            <Skeleton height={200} />
            <Skeleton height={40} className='mt-4' />
            <Skeleton height={40} className='mt-4' />
            <Skeleton height={40} className='mt-4' />
            <Skeleton height={40} className='mt-4' />
            <Skeleton height={40} className='mt-4' />
            <Skeleton height={100} className='mt-4' />
            <Skeleton height={50} className='mt-4' />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Pet Picture
              </label>
              <input
                type='file'
                name='petPicture'
                accept='image/*'
                className='mt-1 block w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Pet Name
              </label>
              <input
                type='text'
                name='petName'
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
                "Create Campaign"
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default CreateDonationCampaign;
