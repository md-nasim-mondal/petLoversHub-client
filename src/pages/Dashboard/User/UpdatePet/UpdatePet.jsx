import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import PetUpdateForm from "../../../../components/Dashboard/Sidebar/Form/PetUpdateForm";
import useAuth from "../../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { imageUpload } from "../../../../api/utils";

const UpdatePet = () => {
  const { id } = useParams();
  const { loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: pet = {}, refetch } = useQuery({
    queryKey: ["pet", id],
    enabled: !!id,
    queryFn: async () => {
      if (id) {
        const { data } = await axiosSecure.get(`/pet/${id}`);
        return data;
      }
    },
  });
  const [petData, setPetData] = useState(pet);
   useEffect(() => {
     if (pet) {
       setPetData(pet);
     }
   }, [pet]);
  const { mutateAsync } = useMutation({
    mutationFn: async (petData) => {
      const { data } = await axiosSecure.put(`/pet/${pet._id}`, petData);
      return data;
    },
    onSuccess: () => {
      toast.success("Pet Update Successfully");
      refetch();
      navigate("/dashboard/my-added-pets");
      setIsLoading(false);
    },
  });

  const handleImage = async (image) => {
    setIsLoading(true)
    try {
      const image_url = await imageUpload(image);
      setPetData({ ...petData, petImage: image_url });
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      toast.error(err.message)
    }
  };

  const stripHtmlTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const longDescription = stripHtmlTags(data.longDescription);
    setPetData({ ...petData, longDescription: longDescription });
    const updatedPetData = Object.assign({}, petData);
    delete updatedPetData._id;
    try {
      await mutateAsync(updatedPetData);
    } catch (error) {
      toast.error(error.message || "Error updating the pet");
      setIsLoading(false);
    }
  };

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className='my-4'>
        <Skeleton height={40} />
      </div>
    ));
  };

  if (loading)
    return (
      <div className='bg-gray-300 p-4 md:p-12 w-1/2 m-auto rounded-lg'>
        {renderSkeletons(10)}
      </div>
    );

  return (
    <div>
      <PetUpdateForm
        petData={petData}
        setPetData={setPetData}
        isLoading={isLoading}
        onSubmit={onSubmit}
        handleImage={handleImage}
      />
    </div>
  );
};

export default UpdatePet;
