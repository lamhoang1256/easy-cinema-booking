import styled from "styled-components";

const StyledFieldText = styled.div`
  & > span:first-child {
    margin-right: 8px;
  }
`;

const FieldText = ({ children, ...props }) => {
  return <StyledFieldText {...props}>{children}</StyledFieldText>;
};

export default FieldText;
