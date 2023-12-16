import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
  }
});

export default client;
