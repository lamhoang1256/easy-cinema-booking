import FieldText from "components/field/FieldText";
import styled from "styled-components";

const StyledDetailOverview = styled.div`
  margin-top: -40px;
`;

const DetailOverview = () => {
  return (
    <StyledDetailOverview>
      <h2 className="heading-sub">Overview</h2>
      <p>
        After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true
        hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in
        search for an emerald that has the power to destroy civilizations. Sonic teams up with his
        own sidekick, Tails, and together they embark on a globe-trotting journey to find the
        emerald before it falls into the wrong hands.
      </p>
    </StyledDetailOverview>
  );
};

export default DetailOverview;
