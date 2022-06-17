import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledActionDelete = styled.button`
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

const ActionDelete = ({ onClick = () => {}, to, ...props }) => {
  if (to) {
    return (
      <Link to={to}>
        <StyledActionDelete onClick={onClick} {...props}>
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </StyledActionDelete>
      </Link>
    );
  }
  return (
    <StyledActionDelete onClick={onClick} {...props}>
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </StyledActionDelete>
  );
};

export default ActionDelete;
