import styled from "styled-components";

const StyledDetailOverview = styled.div`
  margin-top: -40px;
  .desc {
    font-size: 1.9rem;
    line-height: 2;
  }
`;

const DetailOverview = ({ overview }) => {
  return (
    <StyledDetailOverview>
      <h2 className="heading-sub">Overview</h2>
      <p className="desc">{overview}</p>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
