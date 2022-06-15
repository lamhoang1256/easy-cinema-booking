import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #e62e80;
    --secondary-color:#ffce73;
    --primary-font: "Poppins", sans-serif;
    --width-container: 1400px;
    --black: #000;
    --white: #fff;
    --light: #f8f9ff;
    --dark-color: #0d0321;
    --darker-color:#1c093c;
    --gray-color:#dbdbdb;
    --gray-light:#e1dff4;
    --gradient-primary:linear-gradient(270deg, #c042ff, #8a3cff);
    /* --redff8: #ff8282;
    --redffe: #ffe2e2;
    --grayea: #eaeaea;
    --gray61: #616173;
    --gray80: #808080;
    --grayf9: #f9f8ff;
    --grayed: #edf1f5; */
    --purple-color:#6f5cf1;
    --bg-skeleton: #656871;
    --primary-gradient:linear-gradient(270deg,#c042ff,#8a3cff);
  }
`;
