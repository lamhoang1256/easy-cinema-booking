import styled from "styled-components";

const StyledDetailBanner = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .banner-heading {
    position: relative;
    z-index: 100;
    font-size: 4rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #fff;
  }
  .banner-image {
    inset: 0;
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat !important;
    background-position: top;
    opacity: 0.7;
    border-radius: 10px;
  }
  .banner-image::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const DetailBanner = ({ hinhAnh }) => {
  return (
    <div className="container">
      <StyledDetailBanner>
        <div className="banner-image" style={{ backgroundImage: `url(${hinhAnh})` }}></div>
      </StyledDetailBanner>
    </div>
  );
};

export default DetailBanner;
