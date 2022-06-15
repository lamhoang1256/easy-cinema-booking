import styled from "styled-components";
import { useController } from "react-hook-form";

const StyledInput = styled.input`
  border-radius: 6px;
  width: 100%;
  padding: 12px 14px;
  background: hsla(0, 0%, 100%, 0.01);
  border: 1px solid #656293;
  font-size: 1.8rem;
  &:focus {
    border: 1px solid #8a3cff;
  }
`;

const Input = ({ name, control, defaultValue, ...otherProps }) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });
  return <StyledInput id={name} {...field} {...otherProps} />;
};

export default Input;
