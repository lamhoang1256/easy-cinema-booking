import styled from "styled-components";
import ImageResize from "components/image/ImageResize";

const StyledDetailBanner = styled.div`
  height: 50vh;
  opacity: 0.5;
  span {
    width: 100%;
    height: 100%;
  }
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const DetailBanner = ({ banner, fallback }) => {
  return (
    <StyledDetailBanner>
      <ImageResize
        width="1440"
        className="banner-image"
        url={banner ? `https://image.tmdb.org/t/p/original/${banner}` : fallback}
      ></ImageResize>
    </StyledDetailBanner>
  );
};

export default DetailBanner;
