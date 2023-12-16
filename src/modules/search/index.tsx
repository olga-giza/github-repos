import { useQuery } from '@apollo/client';
import React, { FC, Fragment } from 'react';

import { searchQuery } from './query';
import { type Repository, type SearchResult } from './types';
import { useLocale } from '../locale';

const Search: FC = () => {
  const query = 'is:public language:javascript sort:updatedAt';
  const after = null;
  const first = 20;
  const variables = { query, after, first };
  const { loading, error, data } = useQuery<SearchResult<Repository>>(searchQuery, { variables });
  const { t } = useLocale();

  if (loading) {
    return <Fragment>{t('loading')}</Fragment>;
  }

  if (error) {
    return <Fragment>{t('loading_error')}: {error.message}</Fragment>;
  }

  if (!data?.search.edges.length) {
    return <Fragment>{t('empty_results')}</Fragment>;
  }

  return (
    <ul>
      {data?.search.edges.map(({ node }) => <li key={node.id}>{node.name}</li>)}
    </ul>
  );
};

export default Search;
