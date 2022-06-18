import styled from "styled-components";

const StyledField = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 6px;
`;

const Field = ({ children }) => {
  return <StyledField>{children}</StyledField>;
};

export default Field;
