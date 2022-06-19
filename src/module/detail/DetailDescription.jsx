import styled from "styled-components";

const StyledDetailDescription = styled.span`
  font-size: 2rem;
  color: #e1dff4;
  line-height: 1.7;
`;

const DetailDescription = ({ children, ...props }) => (
  <StyledDetailDescription {...props}>{children}</StyledDetailDescription>
);

export default DetailDescription;
