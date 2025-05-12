import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import CampaignPetCard from "../../components/Shared/CampaignPetCard";

const DonationCampaigns = () => {
  const axiosCommon = useAxiosCommon();
  const { ref, inView } = useInView();
  const [limit, setLimit] = useState(8);

  const fetchCampaigns = async ({ pageParam = 0 }) => {
    const { data } = await axiosCommon.get(`/donation-campaigns`, {
      params: { page: pageParam, limit: limit },
    });
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["campaigns"],
      queryFn: fetchCampaigns,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      setLimit(4);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const renderSkeletons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <Skeleton height={160} />
        <Skeleton
          height={30}
          width={`60%`}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={20} width={`40%`} style={{ marginTop: 10 }} />
        <Skeleton height={40} width={`50%`} style={{ marginTop: 10 }} />
      </div>
    ));
  };

  console.log(data);

  return (
    <>
      <Helmet>
        <title>PetLoversHub | Donation-Campaigns</title>
      </Helmet>
      <SectionTitle
        title='Support Our Donation Campaigns'
        description='Join our mission to provide loving homes for pets in need. Contribute to our donation campaigns to help fund essential medical care, food, and shelter for rescued animals. Your generosity makes a world of difference in their lives.'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 justify-around w-full'>
        {isLoading
          ? renderSkeletons(10) // Render 10 skeletons initially
          : data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.campaigns.map((campaign) => (
                  <React.Fragment key={campaign?._id}>
                    <CampaignPetCard campaign={campaign} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
      </div>
      {isFetchingNextPage && (
        <p className='text-lg md:text-xl my-6 text-center'>Loading more campaigns...</p>
      )}
      {!hasNextPage && (
        <p className='text-xl text-center md:text-2xl my-6'>
          No More Campaigns Card to Show
        </p>
      )}
      <div ref={ref}></div>
    </>
  );
};

export default DonationCampaigns;
