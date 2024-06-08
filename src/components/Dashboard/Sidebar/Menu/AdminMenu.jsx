import { FaDonate, FaUsers } from "react-icons/fa";
import { SiPetsathome } from "react-icons/si";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUsers} label='Users' address='users' />
      <MenuItem icon={SiPetsathome} label='All Pets' address='all-pets' />
      <MenuItem icon={FaDonate} label='All Donations' address='all-donations' />
    </>
  );
};

export default AdminMenu;
