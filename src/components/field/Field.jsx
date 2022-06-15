import styled from "styled-components";

const StyledField = styled.div`
  span:first-child {
    margin-right: 8px;
  }
`;

const Field = ({ children, ...props }) => {
  return <StyledField {...props}>{children}</StyledField>;
};

export default Field;
