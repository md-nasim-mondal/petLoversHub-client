import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const Dashboard = () => {
  const [role] = useRole();
  return (
    <div>
      <Helmet>
        <title>PetLoversHub || Dashboard</title>
      </Helmet>
      <SectionTitle
        title={`Welcome to
        ${
          role.slice(0, 1).toUpperCase() + role.slice(1, role?.length)
        } Dashboard`}
        description={`${
          role === "user"
            ? "Welcome to your PetLoversHub Dashboard! Manage your pet adoption applications, track donations, update your profile, and access personalized pet care resources. Stay organized and informed as you navigate your pet adoption journey, all in one convenient place."
            : "Welcome to the PetLoversHub Admin Dashboard! Efficiently manage user accounts, oversee pet listings, track donation campaigns, and monitor site activity. Streamline your administrative tasks with our comprehensive tools, ensuring a smooth and effective operation of the pet adoption platform."
        }`}
      />
    </div>
  );
};

export default Dashboard;
