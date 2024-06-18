import { Helmet } from "react-helmet-async";
import UserDataRow from "../../../../components/Dashboard/Table/Row/UserDataRow";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const renderSkeletons = (count) => {
    return Array.from({ length: count }).map((_, index) => (
      <tr key={index}>
        <td className='p-3'>
          <Skeleton height={25} />
        </td>
        <td className='p-3'>
          <Skeleton height={25} />
        </td>
        <td className='p-3 text-center'>
          <Skeleton circle={true} height={50} width={50} />
        </td>
        <td className='p-3'>
          <Skeleton height={25} />
        </td>
        <td className='p-3'>
          <Skeleton height={25} />
        </td>
        <td className='p-3'>
          <Skeleton height={25} />
        </td>
      </tr>
    ));
  };

  const renderHeaderSkeletons = () => (
    <tr>
      <th className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
      <th className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
      <th className='p-3 text-center bg-white border-y border-gray-200 text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
      <th className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
      <th className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
      <th className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
        <Skeleton height={25} width={100} />
      </th>
    </tr>
  );

  return (
    <div>
      <Helmet>
        <title>PetLoversHub || Users</title>
      </Helmet>
      <h3 className='text-3xl md:text-5xl text-center font-bold dark:text-white'>
        List All Users of PetLoversHub
      </h3>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 w-full text-center overflow-x-auto'>
          <div className='inline-block mx-auto shadow rounded-lg overflow-hidden'>
            <table className='w-full leading-normal'>
              <thead>
                {isLoading ? (
                  renderHeaderSkeletons()
                ) : (
                  <tr>
                    <th
                      scope='col'
                      className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Name
                    </th>
                    <th
                      scope='col'
                      className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Email
                    </th>
                    <th
                      scope='col'
                      className='p-3 text-center bg-white border-y border-gray-200 text-sm uppercase font-normal'>
                      Profile Picture
                    </th>
                    <th
                      scope='col'
                      className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Role
                    </th>
                    <th
                      scope='col'
                      className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Status
                    </th>
                    <th
                      scope='col'
                      className='p-3 bg-white border-y border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                      Action
                    </th>
                  </tr>
                )}
              </thead>
              <tbody>
                {isLoading
                  ? renderSkeletons(5)
                  : users.map((user) => (
                      <UserDataRow
                        key={user?._id}
                        user={user}
                        refetch={refetch}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
