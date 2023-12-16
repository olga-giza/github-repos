import { createGlobalStyle } from 'styled-components';
import { color, ColorProps } from 'styled-system';

const GlobalStyle = createGlobalStyle<ColorProps>`
  body {
    font-family: sans-serif;
    margin: 0;
    ${color};
  }
`;

export default GlobalStyle;
