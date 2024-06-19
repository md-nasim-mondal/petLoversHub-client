import toast from "react-hot-toast";
import { imageUpload } from "../../../../api/utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const CreateDonationCampaign = () => {
  const { user } = useAuth();
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
    const maxDonationAmount = parseFloat(form.maxDonation.value);
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
    <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-2xl font-bold mb-4'>Create Donation Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Pet Picture
          </label>
          <input
            type='file'
            name='petPicture'
            accept='image/*'
            className='mt-1 block w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Pet Name
          </label>
          <input
            type='text'
            name='petName'
            className='mt-1 block w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Maximum Donation Amount
          </label>
          <input
            type='number'
            name='maxDonation'
            className='mt-1 block w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Last Date of Donation
          </label>
          <input
            type='date'
            name='endDate'
            className='mt-1 block w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Short Description
          </label>
          <input
            type='text'
            name='shortDescription'
            className='mt-1 block w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Long Description
          </label>
          <textarea
            name='longDescription'
            className='mt-1 block w-full'
            required
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700'>
          {isLoading ? (
            <TbFidgetSpinner className='animate-spin m-auto' />
          ) : (
            "Create Campaign"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationCampaign;
