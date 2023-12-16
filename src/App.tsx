import { ApolloProvider } from '@apollo/client';
import React, { FC } from 'react';

import apolloClient from './graphql/client';
import SearchList from './modules/search';
import { LocaleProvider } from './modules/locale';
import { ThemeProvider } from './ui/Theme';

const App: FC = () => (
  <main>
    <ThemeProvider>
      <LocaleProvider>
        <ApolloProvider client={apolloClient}>
          <SearchList />
        </ApolloProvider>
      </LocaleProvider>
    </ThemeProvider>
  </main>
);

export default App;
