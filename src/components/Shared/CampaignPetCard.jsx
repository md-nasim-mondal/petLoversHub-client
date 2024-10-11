import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../hooks/useAuth";
const CampaignPetCard = ({ campaign }) => {
  const { loading } = useAuth();
  const renderSkeletons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <Skeleton height={160} />
        <Skeleton
          height={30}
          width={`60%`}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={20} width={`40%`} style={{ marginTop: 10 }} />
        <Skeleton height={40} width={`50%`} style={{ marginTop: 10 }} />
      </div>
    ));
  };
  return (
    <>
      {loading ? (
        renderSkeletons(1)
      ) : (
        <>
          <div className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <img
              className='rounded-t-lg h-[350px] w-full'
              src={campaign?.petImage}
              alt={campaign?.petName}
            />
            <h4 className='mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Pet Name:{" "}
              <span className='text-blue-500 dark:text-blue-300'>
                {campaign?.petName}
              </span>
            </h4>
            <p className='mb-3 font-medium text-gray-700 dark:text-gray-400'>
              Maximum Donation Amount:{" "}
              <span className='text-green-500 dark:text-green-300'>
                {campaign?.maxDonationAmount} $
              </span>
            </p>
            <p className='mb-3 font-medium text-gray-700 dark:text-gray-400'>
              Donated Amount:{" "}
              <span className='text-purple-500 dark:text-purple-300'>
                {campaign?.donatedAmount} $
              </span>
            </p>
            <h3 className='dark:text-white'>
              <span>PostedAt:</span>{" "}
              {format(new Date(campaign?.createdAt), "MMMM dd, yyyy")}
            </h3>
            <div className="mt-4">
              <Link
                to={`/campaign-details/${campaign?._id}`}
                className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600'>
                View Details
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

CampaignPetCard.propTypes = {
  campaign: PropTypes.object,
};

export default CampaignPetCard;
