import {
  MdOutlineAddToPhotos,
  MdPlaylistAddCheckCircle,
  MdCreateNewFolder,
} from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaDonate } from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import MenuItem from "./MenuItem";
const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineAddToPhotos}
        label='Add A Pet'
        address='add-pet'
      />
      <MenuItem
        icon={MdPlaylistAddCheckCircle}
        label='My Added Pets'
        address='my-added-pets'
      />
      <MenuItem
        icon={VscGitPullRequestNewChanges}
        label='Adoption Request'
        address='adoption-request'
      />
      <MenuItem
        icon={MdCreateNewFolder}
        label='Create Donation Campaign'
        address='create-donation-campaign'
      />
      <MenuItem
        icon={FaDonate}
        label='My Donation Campaigns'
        address='my-donation-campaigns'
      />
      <MenuItem
        icon={FcDonate}
        label='My Donations'
        address='my-donations'
      />
    </>
  );
};

export default UserMenu;
