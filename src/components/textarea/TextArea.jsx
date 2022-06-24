import { useController } from "react-hook-form";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--purple-color);
  background-color: transparent;
  height: 100%;
`;

const TextArea = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <StyledTextArea {...field} {...props}>
      {children}
    </StyledTextArea>
  );
};

export default TextArea;
