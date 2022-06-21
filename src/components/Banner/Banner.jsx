import styled from "styled-components";

const StyledBanner = styled.div`
  .banner {
    position: relative;
    height: 30vh;
    width: 100%;
    padding-top: 80px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
  .banner-heading {
    position: relative;
    color: #fff;
    font-size: 4rem;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 1023.98px) {
    height: 30vh;
  }
  @media screen and (max-width: 767.98px) {
    font-size: 3rem;
  }
`;

const Banner = ({ urlBanner, heading }) => {
  return (
    <StyledBanner>
      <div className="container">
        <div className="banner" style={{ backgroundImage: urlBanner }}>
          <h2 className="banner-heading">{heading}</h2>
        </div>
      </div>
    </StyledBanner>
  );
};

export default Banner;
