import styled from "styled-components";

const StyledStatus = styled.span`
  display: inline-block;
  background-color: ${(props) => (props.status === "success" ? "#5fc67d" : "#ff0000")};
  color: #fff;
  padding: 2px 0;
  width: 80px;
  border-radius: 4px;
  text-align: center;
`;

const ActionStatus = ({ status, children }) => {
  return <StyledStatus status={status}>{children}</StyledStatus>;
};

export default ActionStatus;
