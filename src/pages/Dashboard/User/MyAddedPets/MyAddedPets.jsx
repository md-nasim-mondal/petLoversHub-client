import { useMemo} from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TanStackTable from "../../../../components/Dashboard/Table/TanStackTable";

const MyAddedPets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pets", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(`/pets/${user.email}`);
        return data;
      }
    },
  });

  // Delete
  const { mutateAsync } = useMutation({
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
  const { mutateAsync: makeAdopted } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/pet/${id}`, { adopted: true });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Changed Adopted Status to true!");
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
          await mutateAsync(id);
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
      confirmButtonText: "Yes, Already Adopt it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await makeAdopted(id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

const data = useMemo(() => pets, [pets]);

const columns = [
  {
    accessorKey: "_id",
    header: "S/N",
    cell: ({ row }) => row?.index + 1,
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
        className='w-16 h-16 object-cover rounded-md my-2'
      />
    ),
  },
  {
    header: "Status",
    accessorKey: "adopted",
    cell: ({ row }) => (row?.original?.adopted ? "Adopted" : "Available"),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className='space-x-2 flex justify-start'>
        <Link to={`/dashboard/update-pet/${row?.original?._id}`}>
          <button className='bg-blue-500 text-white px-2 py-1 rounded'>
            Update
          </button>
        </Link>
        <button
          onClick={() => handleDelete(row?.original?._id)}
          className='bg-red-500 text-white px-2 py-1 rounded'>
          Delete
        </button>
        {row?.original?.adopted ? (
          <button
            disabled={true}
            className='bg-emerald-950 text-white px-2 py-1 rounded'>
            Already Adopted
          </button>
        ) : (
          <button
            onClick={() => handleAdopted(row?.original?._id)}
            className='bg-green-500 text-white px-2 py-1 rounded'>
            Adopt
          </button>
        )}
      </div>
    ),
  },
];

  const renderSkeletons = (count) => {
    const skeletonArray = Array.from({ length: count });
    return skeletonArray.map((_, index) => (
      <tr key={index} className=' flex items-center border border-gray-300'>
        <td className='text-center'>
          <Skeleton width={50} />
        </td>
        <td className='text-center'>
          <Skeleton circle={true} height={64} width={64} />
        </td>
        <td className='text-center'>
          <Skeleton width={100} />
        </td>
        <td className='text-center'>
          <Skeleton width={100} />
        </td>
        <td className='text-center'>
          <Skeleton width={100} />
        </td>
        <td className='text-center'>
          <Skeleton width={200} />
        </td>
      </tr>
    ));
  };

  if (!pets.length) {
    return (
      <h1 className='text-3xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
        {isLoading || loading ? (
          <div className='flex flex-col justify-center items-center gap-10'>
            <Skeleton width={300} />
            <table>
              <tbody>{renderSkeletons(10)}</tbody>
            </table>
          </div>
        ) : (
          `You haven't any added any pet.`
        )}
      </h1>
    );
  }

  return (
    <div className='mx-auto p-4 overflow-x-auto'>
      <h1 className='text-3xl dark:text-white md:text-4xl font-bold my-6 md:my-12 text-center'>
        {isLoading || loading ? (
          <Skeleton width={300} />
        ) : (
          `List Of Pets (Added by ${user?.displayName})`
        )}
      </h1>
      <div>
        <TanStackTable data={data} columns={columns}/>
      </div>
    </div>
  );
};

export default MyAddedPets;
