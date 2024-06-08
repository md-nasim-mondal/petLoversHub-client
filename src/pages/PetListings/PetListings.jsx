import { Helmet } from "react-helmet-async";

const PetListings = () => {
  return (
    <>
      <Helmet>
        <title>PetLoversHub | Pet-Listing</title>
      </Helmet>
      <h3 className='text-3xl'>This is petListing Page</h3>
    </>
  );
};

export default PetListings;