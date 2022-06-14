import styled from "styled-components";

const StyledSection = styled.div`
  background-color: var(--darker-color);
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
`;

const Section = ({ children }) => {
  return <StyledSection>{children}</StyledSection>;
};

export default Section;
