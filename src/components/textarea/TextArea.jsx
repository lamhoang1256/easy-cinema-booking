import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--purple-color);
`;

const TextArea = ({ ...props }) => {
  return <StyledTextArea {...props}></StyledTextArea>;
};

export default TextArea;
