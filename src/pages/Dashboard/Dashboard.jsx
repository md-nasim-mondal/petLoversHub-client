import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const [role] = useRole();
  return (
    <div>
      <Helmet>
        <title>PetLoversHub || Dashboard</title>
      </Helmet>
      <h3 className='text-3xl'>
        Welcome to{" "}
        {role.slice(0, 1).toUpperCase() + role.slice(1, role?.length)} Dashboard
      </h3>
    </div>
  );
};

export default Dashboard;
