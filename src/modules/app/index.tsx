import { ApolloProvider } from '@apollo/client';
import React, { FC } from 'react';

import apolloClient from '../../graphql/client';
import { ThemeProvider } from '../../ui/Theme';
import { Search as SearchList } from '../search';
import { LocaleProvider } from '../locale';

export const App: FC = () => (
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
