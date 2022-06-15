import styled from "styled-components";

const StyledLabel = styled.label`
  color: rgb(75, 82, 100);
`;

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
