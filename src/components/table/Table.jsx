import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
  overflow-x: auto;
  table {
    border-collapse: collapse;
    width: 100%;
    border-radius: 8px;
  }
  td,
  th {
    text-align: left;
    padding: 20px;
    vertical-align: middle;
    white-space: nowrap;
  }
  thead {
    background-color: #210b47;
  }
  tbody tr {
    background-color: rgb(40, 15, 76);
  }
`;

const Table = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Table;
