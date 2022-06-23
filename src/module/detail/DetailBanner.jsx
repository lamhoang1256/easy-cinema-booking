import styled from "styled-components";
import ImageResize from "components/image/ImageResize";
import { tmdbAPI } from "apis/tmdbApi";

const StyledDetailBanner = styled.div`
  background-color: var(--bg-skeleton);
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
        url={banner ? tmdbAPI.imageOriginal(banner) : fallback}
      ></ImageResize>
    </StyledDetailBanner>
  );
};

export default DetailBanner;
