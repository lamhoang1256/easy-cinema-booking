import styled from "styled-components";

const StyledActionDelete = styled.button`
  background-color: #fb4f83;
`;

const ActionDelete = ({ children, ...props }) => {
  return <StyledActionDelete {...props}>{children}</StyledActionDelete>;
};

export default ActionDelete;
