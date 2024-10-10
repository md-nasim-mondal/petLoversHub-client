import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PetCard from "../../components/Home/PetCard";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const PetListing = () => {
  const axiosCommon = useAxiosCommon();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { ref, inView } = useInView();
  const [limit, setLimit] = useState(8);

  const fetchPets = async ({ pageParam = 0 }) => {
    const { data } = await axiosCommon.get(`/available-pets`, {
      params: { search, category, page: pageParam, limit: limit },
    });
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pets", search, category],
      queryFn: fetchPets,
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

  return (
    <>
      <Helmet>
        <title>PetLoversHub || Pet-Listing</title>
      </Helmet>
      <SectionTitle
        title='Find Your Perfect Pet'
        description='Discover your ideal furry, feathered, or scaly companion on our Pet Listing page. Browse a wide variety of pets available for adoption, complete with detailed profiles, photos, and essential information to help you make the best choice for your new family member.'
      />
      <div className='flex flex-col gap-5 md:gap-0 my-6 md:my-12 md:flex-row items-center justify-center'>
        <input
          type='text'
          value={search}
          className='md:rounded-l-md'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search pets by name'
        />
        <select
          className='rounded-r-md'
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value=''>All Categories</option>
          <option value='Cat'>Cat</option>
          <option value='Bird'>Bird</option>
          <option value='Rabbit'>Rabbit</option>
          <option value='Dog'>Dog</option>
          <option value='Fish'>Fish</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <div className='flex flex-wrap gap-8 justify-center md:justify-evenly w-full'>
        {isLoading
          ? renderSkeletons(10) // Render 10 skeletons initially
          : data?.pages?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page?.pets?.map((pet) => (
                  <React.Fragment key={pet?._id}>
                    <PetCard pet={pet} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
      </div>
      {isFetchingNextPage && (
        <p className='text-lg md:text-xl my-6 dark:text-white text-center'>Loading more pets...</p>
      )}
      {!hasNextPage && (
        <p className='text-xl text-center md:text-2xl my-6 dark:text-white:'>
          No More Pets to Show
        </p>
      )}
      <div ref={ref}></div>
    </>
  );
};

export default PetListing;
