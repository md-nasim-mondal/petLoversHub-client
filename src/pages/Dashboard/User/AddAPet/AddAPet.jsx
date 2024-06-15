import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { imageUpload } from "../../../../api/utils";
import Skeleton from "react-loading-skeleton";
import { TbFidgetSpinner } from "react-icons/tb";

const petCategories = [
  { value: "Cat", label: "Cat" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Dog", label: "Dog" },
  { value: "Fish", label: "Fish" },
  { value: "Other", label: "Other" },
];

const renderSkeletons = (count) => {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index} className="my-4">
      <Skeleton height={40} />
    </div>
  ));
};

const AddAPet = () => {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (petData) => {
      const { data } = await axiosSecure.post("/pets", petData);
      return data;
    },
    onSuccess: () => {
      toast.success("Pet Added Successfully");
      reset();
      navigate("/dashboard/my-added-pets");
      setIsLoading(false);
    },
  });

  const stripHtmlTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const petName = data.petName;
    const petAge = data.petAge;
    const shortDescription = data.shortDescription;
    const longDescription = stripHtmlTags(data.longDescription);
    const petLocation = data.petLocation;
    const petCategory = data.petCategory.value;
    const image = data.petImage[0];
    const presentOwner = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    try {
      const image_url = await imageUpload(image);
      const petData = {
        petName,
        petAge,
        petCategory,
        petLocation,
        image: image_url,
        shortDescription,
        longDescription,
        presentOwner,
        adopted: false,
        createdAt: new Date().toISOString(),
      };

      await mutateAsync(petData);
    } catch (error) {
      toast.error(error.message || "Error adding pet");
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center min-h-[95vh]'>
      {isLoading || loading ? (
        <div className='lg:w-1/2 mx-auto bg-gray-300 dark:bg-cyan-200 dark:bg-opacity-80 p-8 rounded-xl'>
          {isLoading && <h3 className='text-3xl md:text-4xl font-bold text-center my-6'>
            Adding Your Pet...
          </h3>}
          {renderSkeletons(10)}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='lg:w-1/2 mx-auto bg-gray-300 dark:bg-cyan-200 dark:bg-opacity-80 p-8 rounded-xl'>
          <h3 className='text-3xl md:text-4xl font-bold text-center my-6'>
            Add Your Pet For Adoption
          </h3>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='petImage' className='font-semibold'>
              Pet Image
            </label>
            <input
              {...register("petImage", { required: "Pet Image is required" })}
              type='file'
              id='petImage'
              name='petImage'
              className='rounded-md'
            />
            {errors.petImage && (
              <p className='text-red-600'>{errors.petImage.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='petName' className='font-semibold'>
              Pet Name
            </label>
            <input
              className='rounded-lg'
              type='text'
              id='petName'
              {...register("petName", { required: "Pet name is required" })}
            />
            {errors.petName && (
              <p className='text-red-600'>{errors.petName.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='petAge' className='font-semibold'>
              Pet Age(month)
            </label>
            <input
              className='rounded-lg'
              type='number'
              id='petAge'
              {...register("petAge", {
                required: "Pet age is required",
                validate: {
                  positive: (value) =>
                    parseInt(value) > 0 ||
                    "Age must be positive and Minimum 1 month",
                  integer: (value) =>
                    Number.isInteger(parseFloat(value)) ||
                    "Age must be an integer",
                },
              })}
            />
            {errors.petAge && (
              <p className='text-red-600'>{errors.petAge.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='petCategory' className='font-semibold'>
              Pet Category
            </label>
            <Controller
              name='petCategory'
              control={control}
              rules={{ required: "Pet category is required" }}
              render={({ field }) => (
                <Select {...field} options={petCategories} />
              )}
            />
            {errors.petCategory && (
              <p className='text-red-600'>{errors.petCategory.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='petLocation' className='font-semibold'>
              Pet Location
            </label>
            <input
              className='rounded-lg'
              type='text'
              id='petLocation'
              {...register("petLocation", {
                required: "Pet location is required",
              })}
            />
            {errors.petLocation && (
              <p className='text-red-600'>{errors.petLocation.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label htmlFor='shortDescription' className='font-semibold'>
              Short Description
            </label>
            <input
              className='rounded-lg'
              type='text'
              id='shortDescription'
              {...register("shortDescription", {
                required: "Short description is required",
              })}
            />
            {errors.shortDescription && (
              <p className='text-red-600'>{errors.shortDescription.message}</p>
            )}
          </div>
          <div className='h-40 my-6 space-y-3'>
            <label htmlFor='longDescription' className='font-semibold'>
              Long Description
            </label>
            <Controller
              name='longDescription'
              control={control}
              rules={{
                required: "Long description is required",
                validate: (value) =>
                  value.trim() !== "" || "Long description cannot be empty",
              }}
              render={({ field }) => (
                <ReactQuill
                  className='h-20'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.longDescription && (
              <p className='text-red-600'>{errors.longDescription.message}</p>
            )}
          </div>
          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='text-white hover:bg-green-500 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
              {isLoading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                "Add Pet"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAPet;

