import { createGlobalStyle } from 'styled-components';
import { color, ColorProps } from 'styled-system';

const GlobalStyle = createGlobalStyle<ColorProps>`
  body {
    margin: 0;
    ${color};
  }
`;

export default GlobalStyle;
