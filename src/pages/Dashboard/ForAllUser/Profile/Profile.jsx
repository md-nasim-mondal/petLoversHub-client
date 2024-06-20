import { Helmet } from "react-helmet-async";

const Profile = () => {
  return (
    <div>
      <Helmet>
        <title>PetLoversHub || User Profile</title>
      </Helmet>
      <h3 className='text-3xl'>Welcome to your profile</h3>
    </div>
  );
};

export default Profile;