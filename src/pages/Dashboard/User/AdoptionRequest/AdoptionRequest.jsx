import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMemo } from "react";
import TanStackTable from "../../../../components/Dashboard/Table/TanStackTable";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SkeletonTable from "../../../../components/SkeletonTable/SkeletonTable";

const AdoptionRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: pets = [],
    isLoading,
  } = useQuery({
    queryKey: ["pets", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(
          `/adopting-request-pets/${user.email}`
        );
        return data;
      }
    },
  });

  // update request
  const { mutateAsync: updateRequest } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/adopting-request-pet/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast.success("Successfully Updated Request Status!");
    },
  });

  // Handle Adopted
  const { mutateAsync: updateAdoptedStatus } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/pet/${id}`, {
        adopted: true,
      });
      return data;
    },
    onSuccess: () => {
      navigate("/dashboard/my-added-pets");
    },
  });

  const handleAccept = (pet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateAdoptedStatus(pet?.petId);
          await updateRequest(pet?._id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRequest(id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  // Add serial numbers to pets
  const petsWithSerialNumbers = pets.map((pet, index) => ({
    ...pet,
    serialNumber: index + 1,
  }));

  const data = useMemo(() => petsWithSerialNumbers, [petsWithSerialNumbers]);

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "S/N",
    },
    {
      header: "Pet Name",
      accessorKey: "petName",
    },
    {
      header: "Requester Name",
      accessorKey: "requester.name",
    },
    {
      header: "Email",
      accessorKey: "requester.email",
    },
    {
      header: "Mobile Number",
      accessorKey: "requester.mobileNumber",
    },
    {
      header: "Location",
      accessorKey: "requester.location",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className='space-x-2 flex justify-center'>
          <button
            onClick={() => handleAccept(row.original)}
            className='bg-green-500 text-white px-2 py-1 rounded'>
            Accept
          </button>
          <button
            onClick={() => handleReject(row.original._id)}
            className='bg-red-500 text-white px-2 py-1 rounded'>
            Reject
          </button>
        </div>
      ),
    },
  ];

   if (!pets.length) {
     return (
       <h1 className='text-3xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
         {isLoading || loading ? (
           <SkeletonTable rows={5} columns={7} />
         ) : (
           `You haven't any adopting pet request.`
         )}
       </h1>
     );
   }

  return (
    <div>
      <h1 className='text-2xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
        {isLoading || loading ? (
          <Skeleton width={300} />
        ) : (
          `List Of Adoption Requested Pets`
        )}
      </h1>
      <div>
        {isLoading || loading ? (
          <SkeletonTable rows={5} columns={7} />
        ) : (
          <TanStackTable data={data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default AdoptionRequest;
