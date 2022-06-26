import styled from "styled-components";
import { tmdbAPI } from "apis/tmdbApi";
import ImageResize from "components/image/ImageResize";

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
    object-position: top;
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
