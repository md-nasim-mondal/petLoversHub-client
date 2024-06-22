import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/Shared/SectionTitle/SectionTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import TanStackTable from "../../../../components/Dashboard/Table/TanStackTable";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [campaignId, setCampaignId] = useState("");

  const {
    data: payments = [],
    refetch,
    isLoading,
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

  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donationCampaigns`);
      setCampaignsData(data);
      return data;
    },
  });

  const [campaignsData, setCampaignsData] = useState(campaigns);
  const [campaignData, setCampaignData] = useState({});

  useEffect(() => {
    if (campaignId) {
      const campaign = campaignsData.find(
        (campaign) => campaign?._id === campaignId
      );
      setCampaignData(campaign[0] || {});
    }
  }, [campaignId, campaignsData]);

  // refund Payment
  const { mutateAsync: refundPayment } = useMutation({
    mutationFn: async (updateCampaignData) => {
      const { data } = await axiosSecure.put(
        `/refund-payment`,
        updateCampaignData
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      setCampaignData({});
      toast.success("Successfully Requested For Refund!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRefund = async (donateInfo) => {
    if (campaignData && campaignData?.donators) {
      const updatedDonators = campaignData.donators.filter(
        (donator) => donator.transactionId !== donateInfo.transactionId
      );
      const updatedTotalDonatedAmount =
        parseFloat(campaignData.donatedAmount) -
        parseFloat(donateInfo.donator.donateAmount);

      if (updatedDonators && !isNaN(updatedTotalDonatedAmount)) {
        const updatedCampaignData = {
          ...campaignData,
          donators: updatedDonators,
          donatedAmount: updatedTotalDonatedAmount,
          donateInfoId: donateInfo._id,
          campaignId: donateInfo.campaignId,
        };

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
              await refundPayment(updatedCampaignData);
            } catch (err) {
              toast.error(err.message);
            }
          }
        });
      }
    } else {
      toast.error("Campaign data is not available or donators list is empty.");
    }
  };

  // Add serial numbers to payments
  const paymentsWithSerialNumbers = useMemo(
    () =>
      payments.map((payment, index) => ({
        ...payment,
        serialNumber: index + 1,
      })),
    [payments]
  );

  const columns = useMemo(
    () => [
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
                setCampaignId(row?.original?.campaignId);
                handleRefund(row?.original);
              }}
              className={` px-2 py-1 rounded font-semibold ${
                row?.original?.refund
                  ? "bg-gray-300 text-black"
                  : "bg-rose-400  text-white"
              }`}>
              {row?.original?.refund
                ? "You Already Asked For Refund"
                : "Ask For Refund"}
            </button>
          </div>
        ),
      },
    ],
    [handleRefund]
  );

  return (
    <div>
      <Helmet>
        <title>PetLoversHub || My Donations</title>
      </Helmet>
      <SectionTitle title='Your Donations List' />
      <div>
        <TanStackTable data={paymentsWithSerialNumbers} columns={columns} />
      </div>
    </div>
  );
};

export default MyDonations;
