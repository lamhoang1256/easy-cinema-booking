import { Link } from "react-router-dom";
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
  grayDarker: css`
    color: var(--gray-darker);
  `,
};

const StyledHeadingH3 = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.48px;
  line-height: 18.4px;
  text-transform: uppercase;
  ${(props) => props.kind && STATUS[props.kind]}
`;

const HeadingH3 = ({ children, className, kind, to, ...props }) => {
  if (to) {
    <Link to={to}>
      <StyledHeadingH3 className={className} kind={kind} {...props}>
        {children}
      </StyledHeadingH3>
    </Link>;
  }
  return (
    <StyledHeadingH3 className={className} kind={kind} {...props}>
      {children}
    </StyledHeadingH3>
  );
};

export default HeadingH3;
