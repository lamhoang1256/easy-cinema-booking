import styled from "styled-components";

const StyledField = styled.div`
  gap: 8px;
  display: flex;
`;

const Field = ({ children, ...props }) => {
  return <StyledField {...props}>{children}</StyledField>;
};

export default Field;
