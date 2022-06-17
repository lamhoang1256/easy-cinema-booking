import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledActionView = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(107 114 128);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(107 114 128);
  background-color: transparent;
  border-radius: 4px;
  .icon {
    width: 20px;
    height: 20px;
  }
`;

const ActionView = ({ onClick = () => {}, to, ...props }) => {
  if (to) {
    return (
      <Link to={to}>
        <StyledActionView onClick={onClick} {...props}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </StyledActionView>
      </Link>
    );
  }
  return (
    <StyledActionView onClick={onClick} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </StyledActionView>
  );
};

export default ActionView;
