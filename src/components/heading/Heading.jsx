import styled from "styled-components";

const StyledHeading = styled.h3`
  color: var(--white);
`;

const Heading = ({ children, className, ...props }) => (
  <StyledHeading className={className} {...props}>
    {children}
  </StyledHeading>
);

export default Heading;
