import { createGlobalStyle } from 'styled-components';
import { color, ColorProps } from 'styled-system';

export const GlobalStyles = createGlobalStyle<ColorProps>`
  body {
    font-family: sans-serif;
    margin: 0;
    ${color};
  }
`;
