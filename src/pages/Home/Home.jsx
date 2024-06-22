import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";
import PetsCategories from "../../components/Home/PetsCategories/PetsCategories";
import CallToAction from "../../components/Home/CallToAction/CallToAction";
import AboutUs from "../../components/Home/AboutUs/AboutUs";
import ResourcesTips from "../../components/Home/ResourcesTips/ResourcesTips";
import CommunityTestimonials from "../../components/Home/CommunityTestimonials/CommunityTestimonials";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PetLoversHub | Home</title>
      </Helmet>
      <Banner />
      <PetsCategories />
      <CallToAction />
      <AboutUs />
      <CommunityTestimonials/>
      {/* <SuccessStories /> */}
      <ResourcesTips/>
    </>
  );
};

export default Home;
