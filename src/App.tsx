import React, { FC } from 'react';
import { ThemeProvider } from './ui/theme';

const App: FC = () => (
  <ThemeProvider>
    <main>
      app content
    </main>
  </ThemeProvider>
);

export default App;
