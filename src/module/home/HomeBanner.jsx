import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";
import { fetcher, tmdbAPI } from "apis/tmdbApi";
import styled from "styled-components";
import { path } from "constants/path";
import ImageResize from "components/image/ImageResize";

const StyledHomeBanner = styled.section`
  position: relative;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  .banner-img {
    object-fit: cover;
    object-position: center;
    aspect-ratio: 16/9;
  }
  .banner-content {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 20;
    padding: 30px;
  }
  .banner-title {
    font-size: 3.6rem;
    font-weight: 700;
  }
  .category {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .banner-watch {
    width: 160px;
    height: 48px;
  }
  @media screen and (max-width: 767.98px) {
    .banner-title {
      font-size: 2.6rem;
    }
  }
`;

const HomeBanner = () => {
  const { data } = useSWR(tmdbAPI.getUpcoming(), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner">
      <div className="container">
        <Swiper grabCursor="true" slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <HomeBannerItem item={item}></HomeBannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

function HomeBannerItem({ item }) {
  const { title, backdrop_path, id } = item;
  const navigate = useNavigate();
  return (
    <StyledHomeBanner>
      <ImageResize
        width="1440"
        url={tmdbAPI.imageOriginal(backdrop_path)}
        imageError={tmdbAPI.imageOriginal("4gqDdWoTf1wNOiliYWXMMSIlBnK.jpg")}
        className="banner-img"
        alt="banner"
      />
      <div className="banner-content">
        <h2 className="banner-title">{title}</h2>
        <div className="category">
          <span>Animation</span>
          <span>Adventure</span>
          <span>Action</span>
        </div>
        <Button
          className="banner-watch"
          kind="gradient"
          onClick={() => navigate(`${path.detailTmdb}?tmdbId=${id}`)}
        >
          Watch now
        </Button>
      </div>
      <div className="overlay"></div>
    </StyledHomeBanner>
  );
}

export default HomeBanner;
