import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledActionUpdate = styled.button`
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

const ActionUpdate = ({ onClick = () => {}, to, ...props }) => {
  if (to) {
    return (
      <Link to={to}>
        <StyledActionUpdate onClick={onClick} {...props}>
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </StyledActionUpdate>
      </Link>
    );
  }
  return (
    <StyledActionUpdate onClick={onClick} {...props}>
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </StyledActionUpdate>
  );
};

export default ActionUpdate;
