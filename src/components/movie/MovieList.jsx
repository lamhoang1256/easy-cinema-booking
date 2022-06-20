import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import HeadingH3 from "components/heading/HeadingH3";

const StyledMovieList = styled.div`
  margin-top: 20px;
  .heading {
    color: var(--white);
    margin-bottom: 10px;
  }
  .swiper-slide {
    width: 185px;
    height: auto;
  }
  .movie-list {
    margin-top: 20px;
  }
`;

const MovieList = ({ data, heading }) => {
  return (
    <StyledMovieList>
      <HeadingH3 kind="grayDarker">{heading}</HeadingH3>
      <div className="movie-list">
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
      </div>
    </StyledMovieList>
  );
};

export default MovieList;
