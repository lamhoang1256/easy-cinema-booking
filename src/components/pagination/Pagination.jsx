import styled from "styled-components";
import PropTypes from "prop-types";

const StyledPagination = styled.div`
  margin: 10px 0;
  justify-content: center;
  display: flex;
  gap: 6px;
  button {
    width: 40px;
    height: 40px;
    background-color: var(--purple-color);
    color: var(--white);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:disabled {
    opacity: 0.7;
  }
`;

const Pagination = ({ pagination = {}, onPageChange }) => {
  const { page, totalPages } = pagination;
  const handleOnPageChange = (newPage) => {
    if (onPageChange) onPageChange(newPage);
  };
  return (
    <StyledPagination>
      <button
        type="button"
        className="prev"
        disabled={page <= 1}
        onClick={() => handleOnPageChange(page - 1)}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      <button
        type="button"
        className="next"
        disabled={page >= totalPages}
        onClick={() => handleOnPageChange(page + 1)}
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </StyledPagination>
  );
};

Pagination.propsType = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

export default Pagination;
