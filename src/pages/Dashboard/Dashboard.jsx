import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const [role] = useRole();
  return (
    <div>
      <h3 className='text-3xl'>
        Welcome to{" "}
        {role.slice(0, 1).toUpperCase() + role.slice(1, role?.length)} Dashboard
      </h3>
    </div>
  );
};

export default Dashboard;
