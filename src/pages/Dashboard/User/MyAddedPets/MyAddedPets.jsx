import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyAddedPets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: pets = [], refetch } = useQuery({
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
      const { data } = await axiosSecure.patch(`/pet/${id}`,{adopted: true});
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Change Adopted Status true!");
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
    }).then(async(result) => {
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

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "S/N",
        cell: (info) => info.row.original.index + 1,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt='Pet'
            className='w-16 h-16 object-cover rounded-md mx-auto'
          />
        ),
      },
      {
        accessorKey: "petName",
        header: "Name",
      },
      {
        accessorKey: "petCategory",
        header: "Category",
      },
      {
        accessorKey: "adopted",
        header: "Status",
        cell: ({ row }) => (row?.original?.adopted ? "Adopted" : "Available"),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className='space-x-2 flex pl-4 justify-center'>
            <Link to={`/dashboard/update-pet/${row?.original?._id}`}>
              <button
                className='bg-blue-500 text-white px-2 py-1 rounded'>
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return pets.slice(start, end).map((pet, index) => ({
      ...pet,
      index: start + index,
    }));
  }, [pets, pageIndex, pageSize]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount: Math.ceil(pets.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      sorting: sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='mx-auto p-4 overflow-x-auto'>
      <h1 className='text-3xl md:text-4xl font-bold my-6 md:my-12 text-center'>
        List Of Pets Added by {user?.displayName}
      </h1>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='bg-gray-100 border-b border-gray-300'>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className='p-4 text-center text-sm font-medium text-gray-700'>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index} className='border-b border-gray-300'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='text-center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getPageCount() > 1 && (
        <div className='flex justify-between items-center mt-4'>
          <button
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded'
            onClick={() => table.setPageIndex(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <span className='text-sm text-gray-700'>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded'
            onClick={() => table.setPageIndex(pageIndex + 1)}
            disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAddedPets;
