import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #8a3cff;
    --secondary-color:#ffce73;
    --black: #000;
    --white: #fff;
    --darker-color:#1c093c;
    --gray-color:#dbdbdb;
    --gray-darker:#647380;
    --gradient-primary:linear-gradient(270deg, #c042ff, #8a3cff);
    --purple-color:#6f5cf1;
    --bg-skeleton: #656871;
  }
`;
