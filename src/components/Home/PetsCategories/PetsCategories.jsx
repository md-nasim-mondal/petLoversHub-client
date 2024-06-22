import { useState } from "react";
import usePets from "../../../hooks/usePets";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PetTab from "./PetTab";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const PetsCategories = () => {
  const { loading } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);
  const [pets] = usePets();

  // Filter pets into different categories
  const cats = pets.filter((pet) => pet?.petCategory === "Cat");
  const birds = pets.filter((pet) => pet?.petCategory === "Bird");
  const rabbits = pets.filter((pet) => pet?.petCategory === "Rabbit");
  const dogs = pets.filter((pet) => pet?.petCategory === "Dog");
  const fishes = pets.filter((pet) => pet?.petCategory === "Fish");
  const others = pets.filter(
    (pet) =>
      pet?.petCategory !== "Fish" &&
      pet?.petCategory !== "Cat" &&
      pet?.petCategory !== "Bird" &&
      pet?.petCategory !== "Rabbit" &&
      pet?.petCategory !== "Dog"
  );

  // If loading, show skeleton loading
  if (loading) {
    return (
      <div className='dark:text-white'>
        <SectionTitle
          title='Our Pets Category'
          description='At PetLoversHub, we cater to all your pet adoption needs. Explore categories for dogs, cats, birds, and small animals, along with expert advice, care tips, and resources to ensure a happy, healthy adoption experience.'
        />
        <Skeleton height={40} width={200} className='mb-4' />
        <Skeleton height={100} count={6} />
        <div className='text-center my-12'>
          <Link
            to='/pet-listing'
            className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white'>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
              See All Pets
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Once loaded, show the tabs and panels
  return (
    <div className='dark:text-white'>
      <SectionTitle
        title='Our Pets Category'
        description='At PetLoversHub, we cater to all your pet adoption needs. Explore categories for dogs, cats, birds, and small animals, along with expert advice, care tips, and resources to ensure a happy, healthy adoption experience.'
      />
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Cats</Tab>
          <Tab>Birds</Tab>
          <Tab>Rabbits</Tab>
          <Tab>Dogs</Tab>
          <Tab>Fishes</Tab>
          <Tab>Others</Tab>
        </TabList>

        <TabPanel>
          <PetTab pets={cats} />
        </TabPanel>
        <TabPanel>
          <PetTab pets={birds} />
        </TabPanel>
        <TabPanel>
          <PetTab pets={rabbits} />
        </TabPanel>
        <TabPanel>
          <PetTab pets={dogs} />
        </TabPanel>
        <TabPanel>
          <PetTab pets={fishes} />
        </TabPanel>
        <TabPanel>
          <PetTab pets={others} />
        </TabPanel>
      </Tabs>
      <div className='text-center my-12'>
        <Link
          to='/pet-listing'
          className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            See All Pets
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PetsCategories;
