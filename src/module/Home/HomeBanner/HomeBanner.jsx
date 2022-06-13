import { Link } from "react-router-dom";
import Slider from "react-slick";
import { dataCarouselHome } from "constants/dataCarouselHome";
import { SliderArrow } from "components/temp/SliderArrow";
import styles from "./homeBanner.module.scss";
import classNames from "classnames/bind";
const styled = classNames.bind(styles);

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
      <div className={styled("banner")}>
        <Slider {...settingsHomeBanner}>
          {dataCarouselHome.map((banner) => {
            return (
              <Link to={"/"} key={banner.id}>
                <img className={styled("banner-image")} src={banner.img} alt="banner" />
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBanner;
