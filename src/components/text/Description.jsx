import styled, { css } from "styled-components";
import { TextClamp } from "assets/styles/mixin";

const StyledDescription = styled.p`
  font-size: 1.7rem;
  color: #e1dff4;
  line-height: 1.7;
  ${(props) => props.rowLines && TextClamp(props.rowLines)}
  ${(props) =>
    props.lineHeight &&
    css`
      line-height: ${props.lineHeight};
    `}
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
`;

const Description = ({ children, rowLines, fontSize, lineHeight, ...props }) => (
  <StyledDescription rowLines={rowLines} fontSize={fontSize} lineHeight={lineHeight} {...props}>
    {children}
  </StyledDescription>
);

export default Description;
