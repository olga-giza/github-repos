import { useQuery } from '@apollo/client';
import React, { FC, Fragment } from 'react';

import { searchQuery } from './query';
import { type Repository, type SearchResult } from './types';

const Search: FC = () => {
  const query = 'is:public language:javascript sort:updatedAt';
  const after = null;
  const first = 20;
  const variables = { query, after, first };
  const { loading, error, data } = useQuery<SearchResult<Repository>>(searchQuery, { variables });

  if (loading) {
    return <Fragment>Loading ...</Fragment>;
  }

  if (error) {
    return <Fragment>{error.toString()}</Fragment>;
  }

  if (!data?.search.edges.length) {
    return <Fragment>No results found</Fragment>;
  }

  return (
    <ul>
      {data?.search.edges.map(({ node }) => <li key={node.id}>{node.name}</li>)}
    </ul>
  );
};

export default Search;
