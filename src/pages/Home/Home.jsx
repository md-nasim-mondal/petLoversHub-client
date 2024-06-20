import { Helmet } from 'react-helmet-async'
import Banner from '../../components/Home/Banner/Banner'
import PetsCategory from '../../components/Home/PetsCategory/PetsCategory'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PetLoversHub | Home</title>
      </Helmet>
      <Banner />
      <PetsCategory/>
    </>
  )
}

export default Home
