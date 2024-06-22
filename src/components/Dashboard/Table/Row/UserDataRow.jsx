import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User role updated successfully!!");
    },
  });

  // modal handler
  const modalHandler = async (selected) => {
    if (loggedInUser?.email === user?.email) {
      toast.error("Action Not Allow!");
      return setIsOpen(false);
    }
    const userRole = {
      role: selected,
      status: "Verified",
    };

    try {
      await mutateAsync(userRole);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
      setIsOpen(false);
    }
  };
  return (
    <tr className='bg-white dark:bg-gray-800'>
      <td className='px-5 py-3 border border-gray-200 text-sm text-gray-900 dark:text-gray-200'>
        <p className='whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-3 border border-gray-200 text-sm text-gray-900 dark:text-gray-200'>
        <p className='whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='flex justify-center items-center px-5 py-3 border border-gray-200'>
        <img src={user?.photo} className='w-20 h-20 rounded-full' alt='' />
      </td>
      <td className='px-5 py-3 border border-gray-200 text-sm text-gray-900 dark:text-gray-200'>
        <p className='whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-3 border border-gray-200 text-sm text-left'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}>
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>
      <td className='px-5 py-3 border border-gray-200 text-sm text-left'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 dark:text-white leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 dark:bg-green-600 opacity-50 dark:opacity-75 rounded-full'></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
