import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
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
