import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import PetCard from '../PetCard';
const PetTab = ({pets}) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className='mySwiper'>
        <SwiperSlide>
          <div className='flex flex-wrap justify-center gap-10 md:justify-between lg:justify-evenly'>
            {pets.slice(0,8).map((pet) => (
              <PetCard key={pet?._id} pet={pet}></PetCard>
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

PetTab.propTypes = {
  pets: PropTypes.array,
}

export default PetTab;