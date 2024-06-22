import  { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import TanStackTable from "../../../../components/Dashboard/Table/TanStackTable";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    refetch,
    isLoading: contentLoading,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure.get(`/donates/${user.email}`);
        return data;
      }
    },
  });

  // Delete
  const { mutateAsync: refundHandle } = useMutation({
    mutationFn: async (updateData) => {
      const { data } = await axiosSecure.put(`/refund-payment`, updateData);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Successfully Sent Refund Request!!");
    },
  });

  const handleRefund = (paymentInfo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Refund it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await refundHandle(paymentInfo);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  // Add serial numbers to payments
  const paymentsWithSerialNumbers = payments.map((payment, index) => ({
    ...payment,
    serialNumber: index + 1,
  }));

  const data = useMemo(
    () => paymentsWithSerialNumbers,
    [paymentsWithSerialNumbers]
  );

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "S/N",
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
      header: "Pet Name",
      accessorKey: "petName",
    },
    {
      header: "Donated Amount",
      accessorKey: `donator.donateAmount`,
      cell: ({ row }) => <h2>{row?.original?.donator?.donateAmount} $</h2>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className='space-x-2 flex justify-center'>
          <button
            disabled={row?.original?.refund}
            onClick={() => {
              handleRefund(row?.original);
            }}
            className={`${
              row?.original?.refund
                ? "bg-gray-400 dark:bg-gray-700 text-white"
                : "bg-rose-400 text-white"
            } px-2 py-1 rounded font-semibold`}>
            {row?.original?.refund
              ? "You Already Asked For Refund"
              : "Ask For Refund"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>PetLoversHub || My Donations</title>
      </Helmet>
      <SectionTitle title='Your Donations List' />
      <div>
        {contentLoading || loading ? (
          <div>
            <Skeleton height={50} count={1} />
            <Skeleton height={40} count={3} style={{ marginTop: 10 }} />
          </div>
        ) : (
          <TanStackTable data={data} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default MyDonations;
