import { Link } from "react-router-dom";
import Slider from "react-slick";
import { dataCarouselHome } from "constants/dataCarouselHome";
import { SliderArrow } from "components/button/SliderArrow";
import styled from "styled-components";

const StyledHomeBanner = styled.div`
  --radius: 14px;
  height: 510px;
  border-radius: var(--radius);
  background-color: var(--bg-skeleton);
  margin-top: 30px;
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1440px) {
    height: 40vw;
    .banner-image {
      height: 40vw;
    }
  }
  @media screen and (max-width: 750px) {
    height: 54vw;
    .banner-image {
      height: 54vw;
    }
  }
  // override style react-slick of HomeBanner

  .slick-list {
    height: 100%;
    border-radius: var(--radius);
  }
  .slick-slide > div > div {
    outline: none;
    border: none;
  }
  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
    }
    &::before {
      display: none;
    }
  }
  @media screen and (max-width: 767.98px) {
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
  }
`;

const settingsHomeBanner = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <SliderArrow onClick={undefined} style={undefined} className="">
      <img src="assets/images/chore/arrow-back.svg" alt="prev" />
    </SliderArrow>
  ),
  nextArrow: (
    <SliderArrow onClick={undefined} style={undefined} className="">
      <img src="assets/images/chore/arrow-next.svg" alt="next" />
    </SliderArrow>
  ),
};

const HomeBanner = () => {
  return (
    <div className="container">
      <StyledHomeBanner>
        <Slider {...settingsHomeBanner}>
          {dataCarouselHome.map((banner) => {
            return (
              <Link to={"/"} key={banner.id}>
                <img className="banner-image" src={banner.img} alt="banner" />
              </Link>
            );
          })}
        </Slider>
      </StyledHomeBanner>
    </div>
  );
};

export default HomeBanner;
