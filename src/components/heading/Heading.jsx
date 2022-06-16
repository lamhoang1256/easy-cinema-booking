import styled, { css } from "styled-components";

const STATUS = {
  primary: css`
    color: var(--primary-color);
  `,
  secondary: css`
    color: var(--secondary-color);
  `,
  normal: css`
    color: var(--white);
  `,
  gray: css`
    color: var(--gray-light);
  `,
};

const StyledHeading = styled.h3`
  ${(props) => props.kind && STATUS[props.kind]}
`;

const Heading = ({ children, className, kind, ...props }) => (
  <StyledHeading className={className} kind={kind} {...props}>
    {children}
  </StyledHeading>
);

export default Heading;
