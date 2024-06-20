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
import { Helmet } from "react-helmet-async";

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
    <div key={index} className='my-4'>
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
        petImage: image_url,
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
    <div className='flex flex-col justify-center min-h-[95vh] bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8'>
      <Helmet>
        <title>PetLoversHub || Add A Pet</title>
      </Helmet>
      {isLoading || loading ? (
        renderSkeletons(10)
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 dark:bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg max-h-[80vh] overflow-auto'>
          <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center my-4 sm:my-6 text-gray-900 dark:text-white'>
            Add Your Pet For Adoption
          </h3>
          <div className='flex flex-col space-y-2 my-3'>
            <label
              htmlFor='petImage'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Pet Image
            </label>
            <input
              {...register("petImage", { required: "Pet Image is required" })}
              type='file'
              id='petImage'
              name='petImage'
              className='rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 p-2'
            />
            {errors.petImage && (
              <p className='text-red-600'>{errors.petImage.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label
              htmlFor='petName'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Pet Name
            </label>
            <input
              className='rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 p-2'
              type='text'
              id='petName'
              {...register("petName", { required: "Pet name is required" })}
            />
            {errors.petName && (
              <p className='text-red-600'>{errors.petName.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label
              htmlFor='petAge'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Pet Age (months)
            </label>
            <input
              className='rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 p-2'
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
            <label
              htmlFor='petCategory'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Pet Category
            </label>
            <Controller
              name='petCategory'
              control={control}
              rules={{ required: "Pet category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={petCategories}
                  className='rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 border border-gray-300 dark:border-gray-600 p-2'
                />
              )}
            />
            {errors.petCategory && (
              <p className='text-red-600'>{errors.petCategory.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-2 my-3'>
            <label
              htmlFor='petLocation'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Pet Location
            </label>
            <input
              className='rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 p-2'
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
            <label
              htmlFor='shortDescription'
              className='font-semibold text-gray-700 dark:text-gray-300'>
              Short Description
            </label>
            <textarea
              className='rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 p-2'
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
            <label
              htmlFor='longDescription'
              className='font-semibold text-gray-700 dark:text-gray-300'>
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
                  className='bg-gray-200 text-gray-900'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.longDescription && (
              <p className='text-red-600'>{errors.longDescription.message}</p>
            )}
          </div>
          <div className='pt-8 md:pt-0 text-center'>
            <button
              type='submit'
              disabled={isLoading}
              className='text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>
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
