import styled from "styled-components";

const StyledLabel = styled.label`
  color: var(--white);
`;

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
