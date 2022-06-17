import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  thead {
    background-color: rgb(247, 247, 248);
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
`;

const Table = ({ children }) => {
  return (
    <StyledTable>
      <table>{children}</table>
    </StyledTable>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Table;
