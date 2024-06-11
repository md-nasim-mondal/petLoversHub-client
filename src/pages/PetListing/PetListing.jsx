import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Select from "react-select";

// Todo: Have Scrolling related problems
const PetListing = () => {
  const axiosCommon = useAxiosCommon();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  const searchInputRef = useRef();
  const categorySelectRef = useRef();

  const fetchPets = async ({ pageParam = 1 }) => {
    const { data } = await axiosCommon.get("/available-pets", {
      params: { page: pageParam, search, category },
    });
    return {
      pets: data.pets,
      nextPage: data.nextPage,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["pets", search, category],
      queryFn: fetchPets,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    console.log(inView, hasNextPage);
    if (inView === true && hasNextPage === true) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearchChange = useCallback(() => {
    setSearch(searchInputRef.current.value);
    refetch();
  }, [refetch]);

  const handleCategoryChange = useCallback(
    (selectedOption) => {
      setCategory(selectedOption?.value || null);
      refetch();
    },
    [refetch]
  );

  return (
    <>
      <Helmet>
        <title>PetLoversHub || Pet-Listing</title>
      </Helmet>
      <h3 className='text-3xl mb-4'>This is petListing Page</h3>
      <div className='flex flex-col md:flex-row gap-4 items-center justify-center mb-4'>
        <input
          type='text'
          placeholder='Search pets by name'
          ref={searchInputRef}
          onChange={handleSearchChange}
          className='border p-2 mr-2'
        />
        <Select
          options={[
            { value: "dog", label: "Dog" },
            { value: "cat", label: "Cat" },
            { value: "bird", label: "Bird" },
            { value: "other", label: "Other" },
            // Add more categories as needed
          ]}
          placeholder='Select category'
          isClearable
          onChange={handleCategoryChange}
          className='w-48'
          ref={categorySelectRef}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.pages?.flatMap((page) =>
          page.pets?.map((pet) => (
            <div key={pet._id} className='border p-4'>
              <img
                src={pet.image}
                alt={pet.petName}
                className='w-full h-32 object-cover mb-2'
              />
              <h4 className='text-xl'>{pet.petName}</h4>
              <p>Age: {pet.petAge}</p>
              <p>Location: {pet.petLocation}</p>
              <button className='mt-2 bg-blue-500 text-white px-4 py-2'>
                View Details
              </button>
            </div>
          ))
        )}
      </div>
      <div ref={ref} className='h-1'></div>
      {isFetchingNextPage && <p>Loading more pets...</p>}
      {!hasNextPage && <p>No More Data Available Now</p>}
    </>
  );
};

export default PetListing;
