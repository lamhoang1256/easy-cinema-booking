import styled from "styled-components";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { TextClamp } from "assets/styles/_mixin";
import Button from "components/button/Button";

const StyledHomeShowtimes = styled.div`
  display: flex;
  gap: 10px;
  color: var(--white);
  .swiper {
    margin-left: 0;
  }
  .swiper-slide {
    width: 290px;
    height: auto;
  }
  .movie-header {
    display: flex;
    gap: 10px;
  }
  .movie-poster {
    width: 100px;
    border-radius: 8px;
    aspect-ratio: 2/3;
  }
  .movie-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .movie-name {
    margin-top: 6px;
    height: 53px;
    font-size: 1.7rem;
    font-weight: 400;
    ${TextClamp.multilines(2)}
  }
  .movie-booking {
    width: 100%;
    background-color: var(--purple-color);
  }
  @media screen and (max-width: 1023.98px) {
    flex-direction: column;
  }
`;

export const HomeShowtimes = ({ showtimes }) => {
  if (showtimes?.length === 0) return <h3>No movies showing</h3>;
  return (
    <StyledHomeShowtimes>
      <Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={"auto"}>
        {showtimes?.map((showtime) => {
          const { id, startTime, endTime, movie } = showtime;
          const { name, poster, rating, duration } = movie;
          return (
            <SwiperSlide key={id}>
              <div className="movie-header">
                <img src={poster} alt="movie" className="movie-poster" />
                <div className="movie-meta">
                  <span>Rating: {rating}</span>
                  <span>Duration: {duration} minutes</span>
                  <span>Start: {moment(startTime).format("lll")}</span>
                  <span>End: {moment(endTime).format("lll")}</span>
                </div>
              </div>
              <div className="movie-bottom">
                <h4 className="movie-name">{name}</h4>
                <Button to={`/booking/${showtime.id}`} className="movie-booking">
                  Booking now
                </Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StyledHomeShowtimes>
  );
};
