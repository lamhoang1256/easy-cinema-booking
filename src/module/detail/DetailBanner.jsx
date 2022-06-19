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
    object-position: top;
    border-radius: 10px;
  }
`;

const DetailBanner = ({ hinhAnh }) => {
  return (
    <StyledDetailBanner>
      <ImageResize width="1440" height="470" className="banner-image" url={hinhAnh}></ImageResize>
    </StyledDetailBanner>
  );
};

export default DetailBanner;
