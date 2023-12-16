import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import lightTheme from './palette/light';
import { GlobalStyles } from './global';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <StyledThemeProvider theme={lightTheme}>
    <GlobalStyles bg="neutral.20" color="neutral.90" />
    {children}
  </StyledThemeProvider>
);
