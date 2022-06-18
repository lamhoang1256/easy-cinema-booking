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
  purple: css`
    color: #273167;
  `,
};

const StyledTag = styled.span`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.8;
  ${(props) => props.kind && STATUS[props.kind]}
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

const Tag = ({ children, className, ...props }) => (
  <StyledTag className={className} {...props}>
    {children}
  </StyledTag>
);

export default Tag;
