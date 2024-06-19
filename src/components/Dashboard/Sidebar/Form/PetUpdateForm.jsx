import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";

const PetUpdateForm = ({
  petData,
  setPetData,
  isLoading,
  onSubmit,
  handleImage,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      petName: petData?.petName,
      petAge: petData?.petAge,
      petCategory: petData?.petCategory,
      petLocation: petData?.petLocation,
      shortDescription: petData?.shortDescription,
      longDescription: petData?.longDescription,
    },
  });

  const petCategories = [
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Dog", label: "Dog" },
    { value: "Fish", label: "Fish" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className='flex flex-col justify-center min-h-[95vh] bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 dark:bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg max-h-[80vh] overflow-auto'>
        <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center my-4 sm:my-6 text-gray-900 dark:text-white'>
          Update Your Pet ({petData?.petName})
        </h3>
        <div className='flex flex-col space-y-2 my-3'>
          <label
            htmlFor='petImage'
            className='font-semibold text-gray-700 dark:text-gray-300'>
            Pet Image
          </label>
          <input
            type='file'
            id='petImage'
            name='petImage'
            onChange={(e) => handleImage(e.target.files[0])}
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
            {...register("petName")}
            defaultValue={petData?.petName}
            onChange={(e) => {
              setPetData({ ...petData, petName: e.target.value });
            }}
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
            {...register("petAge")}
            defaultValue={petData?.petAge}
            onChange={(e) => {
              setPetData({ ...petData, petAge: e.target.value });
            }}
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
          <select
            className='w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            id='petCategory'
            {...register("petCategory")}
            defaultValue={petData?.petCategory}
            onChange={(e) => {
              setPetData({ ...petData, petCategory: e.target.value });
            }}>
            {petCategories.map((category) => (
              <option value={category?.value} key={category?.label}>
                {category?.label}
              </option>
            ))}
          </select>
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
            {...register("petLocation")}
            defaultValue={petData?.petLocation}
            onChange={(e) => {
              setPetData({ ...petData, petLocation: e.target.value });
            }}
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
            id='shortDescription'
            {...register("shortDescription")}
            defaultValue={petData?.shortDescription}
            onChange={(e) => {
              setPetData({ ...petData, shortDescription: e.target.value });
            }}
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
            render={({ field }) => (
              <ReactQuill
                className='bg-gray-200 text-gray-900'
                value={field.value || petData?.longDescription}
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
              "Update Pet"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

PetUpdateForm.propTypes = {
  petData: PropTypes.object,
  setPetData: PropTypes.func,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  handleImage: PropTypes.func,
};

export default PetUpdateForm;
