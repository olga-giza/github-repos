import React, { FC, Fragment } from 'react';

import { type Repository } from './types';
import { useLocale } from '../locale';
import usePaginatedQuery from './hooks/usePaginatedQuery';

const Search: FC = () => {
  const { loading, error, data, requestNextPage, requestPreviousPage } = usePaginatedQuery<Repository>();
  const { t } = useLocale();

  return (
    <ul>
      {loading ? (
        <Fragment>{t('loading')}</Fragment>
      ) : error ? (
        <Fragment>{t('loading_error')}: {error.message}</Fragment>
      ) : data?.search.edges.length ? (
        <Fragment>
          {data?.search.edges.map(({ node }) => <li key={node.id}>{node.name}</li>)}
        </Fragment>
      ) : (
        <Fragment>{t('empty_results')}</Fragment>
      )}
      {data?.search.pageInfo.hasNextPage && (
        <button disabled={!!error || loading} onClick={requestPreviousPage}>{t('prev_page')}</button>
      )}
      {data?.search.pageInfo.hasNextPage && (
        <button disabled={!!error || loading} onClick={requestNextPage}>{t('next_page')}</button>
      )}
    </ul>
  );
};

export default Search;
