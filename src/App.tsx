import { ApolloProvider } from '@apollo/client';
import React, { FC } from 'react';

import SearchList from './modules/search';
import { ThemeProvider } from './ui/theme';
import apolloClient from './graphql/client';

const App: FC = () => (
  <main>
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <SearchList />
      </ApolloProvider>
    </ThemeProvider>
  </main>
);

export default App;
