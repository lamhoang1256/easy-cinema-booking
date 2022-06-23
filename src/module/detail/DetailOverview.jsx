import styled from "styled-components";

const StyledDetailOverview = styled.div`
  margin-top: -100px;
  .desc {
    font-size: 1.9rem;
    line-height: 2;
  }
  @media screen and (max-width: 767.98px) {
    margin-top: 0;
  }
`;

const DetailOverview = ({ overview, description = "" }) => {
  return (
    <StyledDetailOverview>
      <h2 className="heading-sub">Overview</h2>
      <p className="desc">{description}</p>
      <p className="desc">{overview}</p>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
