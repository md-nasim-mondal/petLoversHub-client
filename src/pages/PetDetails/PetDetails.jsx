import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import AdoptModal from "../../components/Modal/AdoptModal";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetDetails = () => {
  const { id } = useParams();
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: pet = {}, isLoading: isPetLoading } = useQuery({
    queryKey: ["pet", id],
    enabled: !!id,
    queryFn: async () => {
      if (id) {
        const { data } = await axiosSecure.get(`/pet/${id}`);
        return data;
      }
    },
  });
  const formattedDate = pet?.createdAt
    ? format(new Date(pet.createdAt), "MMMM dd, yyyy")
    : "";

  const { mutateAsync: adoptRequest } = useMutation({
    mutationFn: async (adoptingData) => {
      const { data } = await axiosSecure.post(
        "/adopting-request-pets",
        adoptingData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Pet Added Successfully");
      navigate("/pet-listing");
      setIsLoading(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const handleAdoptRequest = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const mobileNumber = form.mobileNumber.value;
    const location = form.location.value;
    const petData = Object.assign({}, pet);
    delete petData._id;
    delete petData.createdAt;
    const adoptingData = {
      petId: pet?._id,
      ...petData,
      postedAt: pet?.createdAt,
      requester: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        mobileNumber: mobileNumber,
        location: location,
      },
      requestedAt: new Date().toISOString(),
    };

    try {
      adoptRequest(adoptingData);
      form.reset();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      {isPetLoading || loading ? (
        <Skeleton height={40} width={300} className='my-6 md:my-12' />
      ) : (
        <h3 className='mt-6 text-xl md:text-3xl lg:text-4xl font-bold text-center dark:text-white'>
          Details Page of {pet?.petName}{" "}
        </h3>
      )}
      <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-4xl hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 mx-auto my-12 md:my-24'>
        {isPetLoading || loading ? (
          <Skeleton
            width={400}
            height={400}
            className='rounded-t-lg md:rounded-none md:rounded-l-lg'
          />
        ) : (
          <img
            className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg shadow-md'
            src={pet?.petImage}
            alt={pet?.petName}
          />
        )}
        <div className='flex flex-col justify-between p-6 leading-normal space-y-4'>
          {isPetLoading ? (
            <Skeleton count={10} />
          ) : (
            <>
              <div>
                <h5 className='text-3xl font-bold tracking-tight text-lime-400 dark:text-purple-300'>
                  Pet Name: {pet?.petName}
                </h5>
                <h3 className='text-lg font-semibold text-teal-800 dark:text-teal-300'>
                  Pet Age: {pet?.petAge} months
                </h3>
              </div>
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-semibold text-pink-800 dark:text-pink-300'>
                  Pet Category: {pet?.petCategory}
                </h3>
                <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300'>
                  Pet Location: {pet?.petLocation}
                </h3>
              </div>
              <p className='font-normal text-gray-700 dark:text-white'>
                <span className='font-bold text-indigo-800 dark:text-indigo-300'>
                  Short Description:
                </span>
                <br />
                <span className='text-gray-700 dark:text-gray-400'>
                  {pet?.shortDescription}
                </span>
              </p>
              <p className='font-normal text-gray-700 dark:text-white'>
                <span className='font-bold text-green-800 dark:text-green-300'>
                  Full Description:
                </span>
                <br />
                <span className='text-gray-700 dark:text-gray-400'>
                  {pet?.longDescription}
                </span>
              </p>
              <div>
                <h2 className='text-xl font-bold text-red-800 dark:text-red-300'>
                  Posted by:
                </h2>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Name: {pet?.presentOwner?.name}
                </p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Email: {pet?.presentOwner?.email}
                </p>
              </div>
              <h3 className='text-lg font-semibold text-yellow-800 dark:text-yellow-300'>
                Posted Date: <span>{formattedDate}</span>
              </h3>
              <button
                onClick={() => setIsAdoptModalOpen(true)}
                className='px-6 py-2 mt-4 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all duration-300'>
                Adopt
              </button>
              <AdoptModal
                setIsAdoptModalOpen={setIsAdoptModalOpen}
                isOpen={isAdoptModalOpen}
                pet={pet}
                user={user}
                handleAdoptRequest={handleAdoptRequest}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
