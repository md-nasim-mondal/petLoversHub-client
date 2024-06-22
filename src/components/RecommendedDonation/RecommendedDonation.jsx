import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CampaignPetCard from "../Shared/CampaignPetCard";
import PropTypes from "prop-types";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const RecommendedDonation = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns", id],
    enabled: !!id,
    queryFn: async () => {
      if (id) {
        const { data } = await axiosSecure.get(
          `/donationCampaigns?limit=3&id=${id}`
        );
        return data;
      }
    },
  });
  return (
    <>
      <SectionTitle
        title='Recommended For Donations'
        description='Support our mission by making a recommended donation. Your contributions directly aid in providing food, medical care, and shelter for pets awaiting adoption. Choose from suggested amounts to make a meaningful impact and help ensure every pet gets the love and care they deserve.'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {campaigns?.map((campaign, index) => (
          <CampaignPetCard key={index} campaign={campaign}></CampaignPetCard>
        ))}
      </div>
    </>
  );
};

RecommendedDonation.propTypes = {
  id: PropTypes.string,
};

export default RecommendedDonation;
