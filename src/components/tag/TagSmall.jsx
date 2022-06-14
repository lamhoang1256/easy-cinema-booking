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

const StyledTagSmall = styled.span`
  display: inline-block;
  ${(props) => props.kind && STATUS[props.kind]}
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

const TagSmall = ({ children, className, ...props }) => (
  <StyledTagSmall className={className} {...props}>
    {children}
  </StyledTagSmall>
);

export default TagSmall;
