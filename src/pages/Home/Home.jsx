import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";
import PetsCategories from "../../components/Home/PetsCategories/PetsCategories";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PetLoversHub | Home</title>
      </Helmet>
      <Banner />
      <PetsCategories />
    </>
  );
};

export default Home;
