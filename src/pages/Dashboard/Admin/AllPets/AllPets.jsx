import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMemo } from "react";
import TanStackTable from "../../../../components/Dashboard/Table/TanStackTable";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import SkeletonTable from "../../../../components/SkeletonTable/SkeletonTable";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const { data: pets = [], refetch, isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pets`);
      return data;
    },
  });

  // Delete
  const { mutateAsync: deletePet } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/pet/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Deleted!");
    },
  });

  // Handle Adopted
  const { mutateAsync: updateAdoptedStatus } = useMutation({
    mutationFn: async ({ id, adopted }) => {
      const { data } = await axiosSecure.patch(`/pet/${id}`, { adopted });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Changed Adopted Status!!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePet(id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  const handleAdopted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Adopt it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateAdoptedStatus({ id, adopted: true });
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  const handleUnAdopted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make UnAdopted!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateAdoptedStatus({ id, adopted: false });
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
      header: "Added By",
      accessorKey: "presentOwner.name",
    },
    {
      header: "Pet Name",
      accessorKey: "petName",
    },
    {
      header: "Category",
      accessorKey: "petCategory",
    },
    {
      header: "Image",
      accessorKey: "petImage",
      cell: ({ getValue }) => (
        <img
          src={getValue()}
          alt='Pet'
          className='w-16 h-16 object-cover rounded-md my-2 mx-auto'
        />
      ),
    },
    {
      header: "Status",
      accessorKey: "adopted",
      cell: ({ row }) => (row.original.adopted ? "Adopted" : "Available"),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className='space-x-2 flex justify-center'>
          <Link to={`/dashboard/update-pet/${row.original._id}`}>
            <button className='bg-blue-500 text-white px-2 py-1 rounded'>
              Update
            </button>
          </Link>
          <button
            onClick={() => handleDelete(row.original._id)}
            className='bg-red-500 text-white px-2 py-1 rounded'>
            Delete
          </button>
          {row.original.adopted ? (
            <button
              onClick={() => handleUnAdopted(row.original._id)}
              className='bg-emerald-950 text-white px-2 py-1 rounded'>
              Make it UnAdopted
            </button>
          ) : (
            <button
              onClick={() => handleAdopted(row.original._id)}
              className='bg-green-500 text-white px-2 py-1 rounded'>
              Make it Adopted
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3 className='text-2xl md:text-3xl dark:text-white text-center'>
        List of All Pets
      </h3>
      <div>
        {isLoading || loading ? (
          <SkeletonTable rows={10} columns={7} />
        ) : (
          <TanStackTable data={data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default AllPets;
