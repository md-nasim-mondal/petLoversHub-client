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
        address='/dashboard/add-pet'
      />
      <MenuItem
        icon={MdPlaylistAddCheckCircle}
        label='My Added Pets'
        address='/dashboard/my-added-pets'
      />
      <MenuItem
        icon={VscGitPullRequestNewChanges}
        label='Adoption Request'
        address='/dashboard/adoption-request'
      />
      <MenuItem
        icon={MdCreateNewFolder}
        label='Create Donation Campaign'
        address='/dashboard/create-donation-campaign'
      />
      <MenuItem
        icon={FaDonate}
        label='My Donation Campaigns'
        address='/dashboard/my-donation-campaigns'
      />
      <MenuItem
        icon={FcDonate}
        label='My Donations'
        address='/dashboard/my-donations'
      />
    </>
  );
};

export default UserMenu;
