import { useState } from "react";
import usePets from "../../../hooks/usePets";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PetTab from "./PetTab";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetsCategories = () => {
  const { loading } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);
  const [pets] = usePets();

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


  return (
    <div className='dark:text-white'>
      <SectionTitle
        title='Our Pets Category'
        description='At PetLoversHub, we cater to all your pet adoption needs. Explore categories for dogs, cats, birds, and small animals, along with expert advice, care tips, and resources to ensure a happy, healthy adoption experience.'
      />
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        {loading ? (
          <>
            <div className='dark:text-white'>
              <Skeleton height={40} width={200} className='mb-4' />
            </div>
          </>
        ) : (
          <>
            <TabList>
              <Tab>Cats</Tab>
              <Tab>Birds</Tab>
              <Tab>Rabbits</Tab>
              <Tab>Dogs</Tab>
              <Tab>Fishes</Tab>
              <Tab>Others</Tab>
            </TabList>
          </>
        )}

        <TabPanel>
          <PetTab pets={cats}></PetTab>
        </TabPanel>
        <TabPanel>
          <PetTab pets={birds}></PetTab>
        </TabPanel>
        <TabPanel>
          <PetTab pets={rabbits}></PetTab>
        </TabPanel>
        <TabPanel>
          <PetTab pets={dogs}></PetTab>
        </TabPanel>
        <TabPanel>
          <PetTab pets={fishes}></PetTab>
        </TabPanel>
        <TabPanel>
          <PetTab pets={others}></PetTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PetsCategories;
