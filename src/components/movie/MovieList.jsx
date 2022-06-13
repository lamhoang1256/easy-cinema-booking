import { SwiperSlide, Swiper } from "swiper/react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const StyledMovieList = styled.div`
  margin: 20px 0 40px;
  .heading {
    color: var(--white);
    margin-bottom: 10px;
  }
  .swiper-slide {
    width: 210px;
    height: auto;
  }
`;

const MovieList = ({ data, heading }) => {
  return (
    <StyledMovieList>
      <h2 className="heading">{heading}</h2>
      {data && (
        <Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={"auto"}>
          {data.length > 0 &&
            data.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard movie={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {!data && (
        <Swiper grabCursor={"true"} spaceBetween={30} slidesPerView={"auto"}>
          {Array(6)
            .fill(0)
            .map(() => (
              <SwiperSlide key={uuidv4()}>
                <MovieCardSkeleton />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </StyledMovieList>
  );
};

export default MovieList;
