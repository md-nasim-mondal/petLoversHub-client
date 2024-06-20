import { Helmet } from 'react-helmet-async'
import Banner from '../../components/Home/Banner/Banner'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PetLoversHub | Home</title>
      </Helmet>
      <Banner/>
    </>
  )
}

export default Home
