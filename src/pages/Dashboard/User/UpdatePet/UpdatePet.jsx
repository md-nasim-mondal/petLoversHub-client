import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdatePet = () => {
  const { id } = useParams();
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

  // Update
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.put(`/pet/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Deleted!");
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    
  }
  return (
    <div>
      <h3 className='text-3xl'>Here is update pet page for {pet?.petName}</h3>
    </div>
  );
};

export default UpdatePet;