import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const COLOR = {
  primary: css`
    color: var(--white);
    background-color: var(--primary-color);
  `,
  normal: css`
    color: var(--white);
    background-color: #9f9e9e;
  `,
  purple: css`
    color: var(--white);
    background-color: var(--purple-color);
  `,
  gradient: css`
    color: var(--white);
    background-image: var(--gradient-primary);
  `,
};

const DISABLED = css`
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
`;

const StyledButton = styled.button`
  cursor: pointer;
  font-size: 1.6rem;
  color: var(--white);
  padding: 0 25px;
  height: ${(props) => `${props.height}px`};
  border-radius: 8px;
  border: 0;
  outline: 0;
  cursor: pointer;
  ${(props) => props.kind && COLOR[props.kind]}
  ${(props) => props.disabled && DISABLED}
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  to,
  type = "button",
  children,
  height = "44",
  kind = "normal",
  onClick,
  ...props
}) => {
  if (to) {
    return (
      <Link to={to} style={{ display: "block" }}>
        <StyledButton kind={kind} type={type} height={height} {...props} onClick={onClick}>
          {children}
        </StyledButton>
      </Link>
    );
  }
  return (
    <StyledButton kind={kind} type={type} height={height} {...props} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
